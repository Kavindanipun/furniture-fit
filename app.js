(() => {
  "use strict";

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("fitForm");
  if (!form) return;

  let unit = "in";
  const $ = id => document.getElementById(id);
  const fields = ["fw", "fh", "fd", "dw", "dh", "clearance", "rl", "rw"];

  const presetsInches = {
    sofa: [84, 34, 38],
    loveseat: [60, 34, 36],
    armchair: [36, 38, 36],
    dresser: [60, 36, 20],
    mattress: [80, 10, 60]
  };

  const placeholdersInches = {
    fw: 84, fh: 34, fd: 38, dw: 36, dh: 80, clearance: 1, rl: 144, rw: 120
  };

  const factorFor = target => target === "cm" ? 2.54 : (1 / 2.54);
  const format = value => Math.round(value * 10) / 10;

  function setUnit(target) {
    if (target === unit) return;
    const factor = factorFor(target);
    fields.forEach(id => {
      const el = $(id);
      if (!el) return;
      if (el.value !== "") el.value = format(parseFloat(el.value) * factor);
      const base = placeholdersInches[id];
      el.placeholder = target === "cm" ? String(format(base * 2.54)) : String(base);
    });
    unit = target;
    document.querySelectorAll(".unit").forEach(btn => {
      const active = btn.dataset.unit === unit;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  document.querySelectorAll(".unit").forEach(btn => {
    btn.addEventListener("click", () => setUnit(btn.dataset.unit));
  });

  document.querySelectorAll(".preset").forEach(btn => {
    btn.addEventListener("click", () => {
      const p = presetsInches[btn.dataset.preset];
      if (!p) return;
      const multiplier = unit === "cm" ? 2.54 : 1;
      ["fw", "fh", "fd"].forEach((id, i) => { $(id).value = format(p[i] * multiplier); });
      $("fw").focus();
    });
  });

  function validPositive(id, required = true) {
    const el = $(id);
    const raw = el.value.trim();
    if (!raw && !required) return null;
    const value = Number(raw);
    if (!Number.isFinite(value) || value <= 0) return NaN;
    return value;
  }

  // Tests whether a rectangular face a×b can fit in an opening by rotating
  // the face in the doorway plane. Sampling 0°..90° at 0.25° keeps the tool
  // small and deterministic while providing a useful screening estimate.
  function findRotatedFit(a, b, openingW, openingH, margin) {
    const usableW = openingW - margin;
    const usableH = openingH - margin;
    if (usableW <= 0 || usableH <= 0) return null;
    let best = null;
    for (let angle = 0; angle <= 90.0001; angle += 0.25) {
      const r = angle * Math.PI / 180;
      const w = Math.abs(a * Math.cos(r)) + Math.abs(b * Math.sin(r));
      const h = Math.abs(a * Math.sin(r)) + Math.abs(b * Math.cos(r));
      if (w <= usableW + 1e-9 && h <= usableH + 1e-9) {
        const spare = Math.min(usableW - w, usableH - h);
        if (!best || spare > best.spare) best = { angle, w, h, spare };
      }
    }
    return best;
  }

  function doorwayCheck(fw, fh, fd, dw, dh, margin) {
    const faces = [
      { label: "width × height face", a: fw, b: fh, travel: "depth" },
      { label: "depth × height face", a: fd, b: fh, travel: "width / length" },
      { label: "width × depth face", a: fw, b: fd, travel: "height" }
    ];
    let best = null;
    faces.forEach(face => {
      const fit = findRotatedFit(face.a, face.b, dw, dh, margin);
      if (fit && (!best || fit.spare > best.fit.spare)) best = { face, fit };
    });
    return best;
  }

  function roomCheck(fw, fd, rl, rw) {
    if (rl == null && rw == null) return { status: "not-entered" };
    if (rl == null || rw == null || Number.isNaN(rl) || Number.isNaN(rw)) return { status: "invalid" };
    const normal = fw <= rl && fd <= rw;
    const rotated = fd <= rl && fw <= rw;
    return { status: normal || rotated ? "fit" : "no-fit", orientation: normal ? "normal" : (rotated ? "rotated" : null) };
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const fw = validPositive("fw"), fh = validPositive("fh"), fd = validPositive("fd");
    const dw = validPositive("dw"), dh = validPositive("dh");
    const cRaw = $("clearance").value.trim();
    const margin = cRaw === "" ? 0 : Number(cRaw);
    const rl = validPositive("rl", false), rw = validPositive("rw", false);
    const result = $("result");

    if ([fw, fh, fd, dw, dh].some(Number.isNaN) || !Number.isFinite(margin) || margin < 0 || Number.isNaN(rl) || Number.isNaN(rw)) {
      result.hidden = false;
      result.className = "result bad";
      result.innerHTML = "<h3>Check the measurements</h3><p>Enter positive numbers for the required furniture and doorway fields. The safety margin can be zero or greater.</p>";
      return;
    }

    const door = doorwayCheck(fw, fh, fd, dw, dh, margin);
    const room = roomCheck(fw, fd, rl, rw);
    result.hidden = false;

    let title, intro, cls;
    if (!door) {
      cls = "bad";
      title = "✕ No tested doorway orientation clears the opening";
      intro = "None of the three rectangular furniture faces fits within the doorway across the tested 0°–90° rotations after your safety margin. Recheck measurements and confirm the real delivery route before assuming the move is impossible.";
    } else if (room.status === "no-fit") {
      cls = "warn";
      title = "⚠ The doorway looks possible, but the room footprint does not";
      intro = "The calculator found a doorway orientation, but the furniture width-by-depth footprint does not fit inside the room dimensions you entered in either normal or rotated orientation.";
    } else {
      cls = door.fit.spare < (unit === "in" ? 1 : 2.5) ? "warn" : "good";
      title = cls === "good" ? "✓ The basic measurements look promising" : "⚠ The doorway fit looks tight";
      intro = "The calculator found at least one rectangular doorway orientation that clears your entered opening. You still need to check hallways, corners, stairs, packaging and the space needed to create the angle.";
    }

    result.className = `result ${cls}`;
    const unitLabel = unit === "in" ? "in" : "cm";
    const angleText = door ? `${format(door.fit.angle)}°` : "—";
    const doorText = door ? `Possible using the ${door.face.label}; best sampled angle ${angleText}.` : "No tested rectangular face clears the opening.";
    let roomText = "Not checked — room dimensions were left blank.";
    if (room.status === "fit") roomText = `Footprint fits in ${room.orientation} orientation.`;
    if (room.status === "no-fit") roomText = "Entered footprint does not fit in normal or rotated orientation.";
    if (room.status === "invalid") roomText = "Enter both room length and room width, or leave both blank.";

    result.innerHTML = `
      <h3>${title}</h3>
      <p>${intro}</p>
      <div class="result-grid">
        <div class="result-card"><strong>Doorway check</strong><span>${doorText}</span></div>
        <div class="result-card"><strong>Room check</strong><span>${roomText}</span></div>
      </div>
      <p><strong>Your measurements:</strong> furniture ${fw} × ${fh} × ${fd} ${unitLabel}; doorway ${dw} × ${dh} ${unitLabel}; safety margin ${margin} ${unitLabel}.</p>
      <p class="micro-note">Screening estimate only. A real move can fail because of 3D turns, stairs, opening depth, rigid frames, packaging or insufficient maneuvering space.</p>`;

    result.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  });
})();
