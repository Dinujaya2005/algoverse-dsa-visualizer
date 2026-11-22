"use strict";
(() => {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const cards = document.querySelectorAll(".lecture-card, .info-card, .stat");
  const MAX_DEGREES = 3;
  const reset = card => {
    card.classList.remove("is-tilting");
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
    card.style.removeProperty("--tilt-lift");
  };
  cards.forEach(card => {
    card.addEventListener("pointermove", event => {
      if (motion.matches || !pointer.matches || event.pointerType === "touch") return;
      const rect = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      card.classList.add("is-tilting");
      card.style.setProperty("--tilt-x", `${((0.5 - y) * MAX_DEGREES * 2).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${((x - 0.5) * MAX_DEGREES * 2).toFixed(2)}deg`);
    });
    card.addEventListener("pointerleave", () => reset(card));
    card.addEventListener("pointercancel", () => reset(card));
  });
  const resetAll = () => cards.forEach(reset);
  motion.addEventListener("change", resetAll);
  pointer.addEventListener("change", resetAll);
  window.addEventListener("blur", resetAll);
})();
