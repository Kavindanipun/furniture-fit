(() => {
  "use strict";
  const form = document.getElementById("diagForm");
  if (!form) return;
  const height = document.getElementById("diagHeight");
  const depth = document.getElementById("diagDepth");
  const result = document.getElementById("diagResult");
  let unit = "in";

  document.querySelectorAll(".diag-unit").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.diagUnit;
      if (next === unit) return;
      const factor = next === "cm" ? 2.54 : 1 / 2.54;
      [height, depth].forEach(el => {
        if (el.value !== "") el.value = (Number(el.value) * factor).toFixed(1).replace(/\.0$/, "");
      });
      height.placeholder = next === "cm" ? "86.4" : "34";
      depth.placeholder = next === "cm" ? "96.5" : "38";
      unit = next;
      document.querySelectorAll(".diag-unit").forEach(b => {
        const active = b.dataset.diagUnit === unit;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
      if (!result.hidden) form.requestSubmit();
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const h = Number(height.value);
    const d = Number(depth.value);
    if (!Number.isFinite(h) || !Number.isFinite(d) || h <= 0 || d <= 0) {
      result.hidden = false;
      result.className = "result bad";
      result.innerHTML = "<h3>Check the measurements</h3><p>Enter a positive sofa height and depth.</p>";
      return;
    }
    const diagonal = Math.sqrt(h*h + d*d);
    const label = unit === "in" ? "in" : "cm";
    result.hidden = false;
    result.className = "result good";
    result.innerHTML = `<h3>${diagonal.toFixed(1)} ${label}</h3><p><strong>Geometric height × depth diagonal.</strong> Calculation: √(${h}² + ${d}²). This is a reference measurement, not a doorway-fit guarantee.</p><p><a class="text-cta" href="../#calculator">Check the full sofa against your doorway →</a></p>`;
  });
})();
