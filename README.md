# AlgoVerse — NSBM DSA Lecture Edition

A futuristic, responsive, dual-theme, dependency-free **Data Structures & Algorithms learning lab** built with HTML, CSS and vanilla JavaScript. The project adapts the supplied NSBM lecture topics into interactive demonstrations; it is an independent student project, **not an official NSBM application**.

## Features

- Fresh botanical teal, mint and amber palette with **dark and light modes** (saved locally).
- Topic cards without lecture numbers for a cleaner portfolio presentation.


- **Sorting:** Bubble, Selection, Insertion, Merge, plus Quick Sort as an extra topic
- **Searching:** Linear and Binary Search (automatically sorted array for binary search)
- **Stack:** Push, pop, peek, overflow/underflow; LIFO
- **Queue:** Enqueue, dequeue, peek; FIFO
- **Circular queue:** 8-slot array, front/rear pointers and modulo wraparound
- **Tree DFS:** Preorder (VLR), inorder (LVR), postorder (LRV), step-through visits
- **Recursion:** Factorial trace and base case, for n = 0–8
- **Complexity:** Relative growth curves O(1), O(log n), O(n), O(n log n), O(n²)
- Sorting/searching speed, array-size, pause/resume, operation counts, time complexity and status

## Lecture alignment

| Supplied lecture | Topics represented |
|---|---|
| L1 Introduction to Data Structures & Algorithms | Algorithms and efficiency in the course roadmap |
| L2 Searching Algorithms | Linear and Binary Search |
| L3.1 Stacks | LIFO, push, pop, peek |
| L3.2 Queues | FIFO, enqueue, dequeue |
| L3.2 Circular Queue | Wraparound indices and fixed-capacity array |
| L4 Sorting Algorithms | Bubble and Selection Sort |
| L5 Sorting Algorithms-II | Insertion and Merge Sort |
| L6 Trees; L6.1 DFS | Binary tree and preorder/inorder/postorder |
| L7 Iteration and Recursion | Recursive factorial and base case |
| L7 Algorithmic Analysis; L8 Complexity | Big O growth and comparison |

**Scope note:** This is a learning visualization, not a verbatim reproduction of lecture slides. Quick Sort is an optional extra. Tree demonstrations use a fixed sample tree. The factorial module illustrates recursion rather than an animated call stack. The Big O chart uses theoretical relative growth, **not** measured CPU time. The original sorting/searching elapsed-time counter tracks animation time, not an algorithm benchmark.

## Run locally (VS Code)

1. Download and extract this project, or clone the repository.
2. In VS Code choose **File → Open Folder** and select the project folder.
3. Open `index.html` in your browser. Alternatively install **Live Server**, right-click `index.html`, then choose **Open with Live Server**.
4. Select an algorithm in the **Visualization Studio** or a module in the **Data Structures Studio**.

No dependencies, server, account, API key or build step are required.

## Project files

```text
AlgoVerse-DSA-Lecture-Edition/
├── index.html
├── style.css
├── script.js       # Sorting and searching
├── modules.js      # Stacks, queues, trees, recursion and complexity
├── README.md
├── LICENSE
└── .gitignore
```

## Publish to GitHub

1. Create a public GitHub repository named `algoverse-dsa-visualizer`.
2. Upload the **contents** of this folder to the repository root and commit.
3. Go to **Settings → Pages → Build and deployment**.
4. Select **Deploy from a branch**, choose `main` and `/(root)`, and save.
5. Once deployment completes, the URL follows `https://YOUR_USERNAME.github.io/algoverse-dsa-visualizer/`.

Alternatively, in the project directory after creating an empty repository:

```bash
git init
git add .
git commit -m "Add lecture-aligned DSA visualizer"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/algoverse-dsa-visualizer.git
git push -u origin main
```

## Complexity quick reference

| Algorithm | Average time | Worst time |
|---|---|---|
| Linear Search | O(n) | O(n) |
| Binary Search | O(log n) | O(log n) |
| Bubble Sort | O(n²) | O(n²) |
| Selection Sort | O(n²) | O(n²) |
| Insertion Sort | O(n²) | O(n²) |
| Merge Sort | O(n log n) | O(n log n) |
| Quick Sort (extra) | O(n log n) | O(n²) |

## Credits

Lecture topic alignment: user-provided NSBM Green University Data Structures & Algorithms lecture materials (L1–L8). No slide images or lecture content files are redistributed in this repository.

## License

MIT — see [LICENSE](LICENSE).
