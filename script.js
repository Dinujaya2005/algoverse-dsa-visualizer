const $ = id => document.getElementById(id);
const details = {
  bubble: ['Bubble Sort', 'Repeatedly compares adjacent elements and swaps them when they are in the wrong order.', 'O(n²)'],
  selection: ['Selection Sort', 'Finds the smallest remaining element and moves it to its correct position.', 'O(n²)'],
  insertion: ['Insertion Sort', 'Builds a sorted portion by inserting each new element into its proper place.', 'O(n²)'],
  merge: ['Merge Sort', 'Divides the array into halves, sorts each half, and merges them in order.', 'O(n log n)'],
  quick: ['Quick Sort', 'Partitions elements around a pivot and recursively sorts the partitions.', 'O(n log n)*'],
  linear: ['Linear Search', 'Checks each element from left to right until the target is found.', 'O(n)'],
  binary: ['Binary Search', 'Searches a sorted array by repeatedly eliminating half the remaining elements.', 'O(log n)']
};
let values = [], comparisons = 0, writes = 0, elapsedMs = 0, startedAt = 0;
let running = false, paused = false, cancelled = false, runId = 0;
let pauseWaiters = [];
const isSearch = () => ['linear', 'binary'].includes($('algorithm').value);
const setStatus = message => { $('status').textContent = message; };
const updateStats = () => {
  $('comparisons').textContent = comparisons.toLocaleString();
  $('swaps').textContent = writes.toLocaleString();
  $('elapsed').textContent = (elapsedMs / 1000).toFixed(2) + 's';
};
function render(highlight = {}, completed = []) {
  const fragment = document.createDocumentFragment();
  const showNumbers = values.length <= 22;
  values.forEach((value, i) => {
    const bar = document.createElement('div');
    bar.className = 'bar' + (completed.includes(i) ? ' sorted' : highlight[i] ? ' ' + highlight[i] : '');
    bar.style.height = `${value}%`;
    bar.title = `Index ${i}: ${value}`;
    if (showNumbers) { const number = document.createElement('span'); number.textContent = value; bar.append(number); }
    fragment.append(bar);
  });
  $('bars').replaceChildren(fragment);
  $('bars').setAttribute('aria-label', `Array with ${values.length} elements. ${$('status').textContent}`);
}
function releasePause() { paused = false; for (const resolve of pauseWaiters.splice(0)) resolve(); }
function stopRun() {
  cancelled = true; runId++;
  releasePause(); running = false;
  $('start').disabled = false; $('shuffle').disabled = false; $('algorithm').disabled = false;
  $('size').disabled = false; $('target').disabled = false; $('pause').disabled = true;
  $('pause').textContent = 'Ⅱ Pause';
}
function newArray() {
  stopRun(); comparisons = 0; writes = 0; elapsedMs = 0; updateStats();
  values = Array.from({length: Number($('size').value)}, () => Math.floor(Math.random() * 95) + 5);
  if (isSearch()) {
    if ($('algorithm').value === 'binary') values.sort((a,b) => a-b);
    $('target').value = values[Math.floor(Math.random() * values.length)];
  }
  $('arrayLabel').textContent = `${values.length} ELEMENTS`;
  setStatus('Ready to visualize'); render();
}
function onAlgorithmChange() {
  const key = $('algorithm').value;
  $('targetGroup').hidden = !isSearch();
  $('algoTitle').textContent = details[key][0];
  $('algoDescription').textContent = details[key][1];
  $('complexity').textContent = details[key][2];
  newArray();
}
const delayMs = () => Math.round(210 * Math.pow(0.965, Number($('speed').value)) + 5);
async function step(highlight = {}, completed = [], id) {
  if (cancelled || id !== runId) throw Error('cancelled');
  while (paused && !cancelled && id === runId) await new Promise(resolve => pauseWaiters.push(resolve));
  if (cancelled || id !== runId) throw Error('cancelled');
  render(highlight, completed); updateStats();
  const duration = delayMs();
  let waited = 0;
  while (waited < duration) {
    if (cancelled || id !== runId) throw Error('cancelled');
    if (paused) { await new Promise(resolve => pauseWaiters.push(resolve)); continue; }
    const chunk = Math.min(25, duration - waited);
    await new Promise(resolve => setTimeout(resolve, chunk));
    if (!paused) { waited += chunk; elapsedMs += chunk; }
  }
}
async function execute(key, id) {
  const n = values.length;
  if (key === 'bubble') {
    for (let i=0;i<n-1;i++) {
      let changed = false;
      for (let j=0;j<n-i-1;j++) {
        comparisons++; await step({[j]:'compare',[j+1]:'compare'}, [], id);
        if (values[j]>values[j+1]) { [values[j],values[j+1]]=[values[j+1],values[j]]; writes++; changed=true; await step({[j]:'swap',[j+1]:'swap'}, [], id); }
      }
      if (!changed) break;
    }
  } else if (key === 'selection') {
    for (let i=0;i<n;i++) {
      let min=i;
      for (let j=i+1;j<n;j++) { comparisons++; await step({[min]:'compare',[j]:'compare'}, [], id); if (values[j]<values[min]) min=j; }
      if (min!==i) { [values[i],values[min]]=[values[min],values[i]]; writes++; await step({[i]:'swap',[min]:'swap'}, [], id); }
    }
  } else if (key === 'insertion') {
    for (let i=1;i<n;i++) {
      const item=values[i]; let j=i-1;
      while(j>=0) { comparisons++; await step({[j]:'compare',[j+1]:'compare'}, [], id); if(values[j]<=item) break; values[j+1]=values[j]; writes++; await step({[j+1]:'swap'}, [], id); j--; }
      values[j+1]=item; writes++; await step({[j+1]:'swap'}, [], id);
    }
  } else if (key === 'merge') {
    async function mergeSort(lo,hi) {
      if(hi-lo<=1) return;
      const mid=Math.floor((lo+hi)/2); await mergeSort(lo,mid); await mergeSort(mid,hi);
      const left=values.slice(lo,mid),right=values.slice(mid,hi); let a=0,b=0,k=lo;
      while(a<left.length && b<right.length) { comparisons++; await step({[lo+a]:'compare',[mid+b]:'compare'}, [], id); values[k++]=left[a]<=right[b]?left[a++]:right[b++]; writes++; await step({[k-1]:'swap'}, [], id); }
      while(a<left.length) { values[k++]=left[a++]; writes++; await step({[k-1]:'swap'}, [], id); }
      while(b<right.length) { values[k++]=right[b++]; writes++; await step({[k-1]:'swap'}, [], id); }
    }
    await mergeSort(0,n);
  } else if (key === 'quick') {
    async function quickSort(lo,hi) {
      if(lo>=hi) return;
      const pivot=values[hi]; let i=lo;
      for(let j=lo;j<hi;j++) { comparisons++; await step({[j]:'compare',[hi]:'swap'}, [], id); if(values[j]<pivot) { if(i!==j) { [values[i],values[j]]=[values[j],values[i]]; writes++; await step({[i]:'swap',[j]:'swap'}, [], id); } i++; } }
      if(i!==hi) { [values[i],values[hi]]=[values[hi],values[i]]; writes++; await step({[i]:'swap',[hi]:'swap'}, [], id); }
      await quickSort(lo,i-1); await quickSort(i+1,hi);
    }
    await quickSort(0,n-1);
  } else {
    const target=Number($('target').value);
    if (!Number.isFinite(target)) { setStatus('Enter a valid search target'); return false; }
    if(key==='linear') {
      for(let i=0;i<n;i++) { comparisons++; await step({[i]:'compare'}, [], id); if(values[i]===target) { setStatus(`Found ${target} at index ${i}`); await step({},[i],id); return false; } }
    } else {
      let lo=0,hi=n-1;
      while(lo<=hi) { const mid=Math.floor((lo+hi)/2); comparisons++; await step({[mid]:'compare'}, [], id); if(values[mid]===target) { setStatus(`Found ${target} at index ${mid}`); await step({},[mid],id); return false; } if(values[mid]<target) lo=mid+1; else hi=mid-1; }
    }
    setStatus(`${target} was not found in the array`); return false;
  }
  return true;
}
async function start() {
  if(running) return;
  const id=++runId; cancelled=false; running=true; paused=false; comparisons=0; writes=0; elapsedMs=0; startedAt=performance.now();
  $('start').disabled=true; $('shuffle').disabled=true; $('algorithm').disabled=true; $('size').disabled=true; $('target').disabled=true; $('pause').disabled=false;
  setStatus(`Running ${details[$('algorithm').value][0]}...`);
  try {
    const finished=await execute($('algorithm').value,id);
    if(id===runId && !cancelled && finished) { setStatus('Sorting complete!'); render({},values.map((_,i)=>i)); }
  } catch(error) { if(error.message!=='cancelled') { console.error(error); setStatus('An error occurred'); } }
  finally { if(id===runId) { running=false; releasePause(); $('start').disabled=false; $('shuffle').disabled=false; $('algorithm').disabled=false; $('size').disabled=false; $('target').disabled=false; $('pause').disabled=true; $('pause').textContent='Ⅱ Pause'; updateStats(); } }
}
$('algorithm').addEventListener('change',onAlgorithmChange);
$('size').addEventListener('input',e=>{ $('sizeValue').textContent=e.target.value; newArray(); });
$('speed').addEventListener('input',e=>{ $('speedValue').textContent=e.target.value+'%'; });
$('shuffle').addEventListener('click',newArray);
$('start').addEventListener('click',start);
$('pause').addEventListener('click',()=>{ if(!running)return; if(paused) { releasePause(); $('pause').textContent='Ⅱ Pause'; setStatus(`Running ${details[$('algorithm').value][0]}...`); } else { paused=true; $('pause').textContent='▶ Resume'; setStatus('Paused'); } });
$('year').textContent=new Date().getFullYear();
onAlgorithmChange();
