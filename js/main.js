(() => {
  "use strict";

  const stage = document.getElementById("stage");
  const world = document.getElementById("world");
  const hint = document.getElementById("hint");
  const board = document.getElementById("board");
  const title = document.getElementById("titel");
  const slides = Array.from(board.querySelectorAll(".slide"));

  const PAD = { title: 0.96, board: 0.93, slide: 0.96, detail: 0.92 };
  const LOCK_MS = 380;

  /* ---------------------------------------------------------- Abfolge
     Titel → Übersicht → [Folie 1 → Unterteilung 1 →] Übersicht → Folie 2 → …
     Folien 1 und 4 haben eine Unterteilung (3 Klicks), die übrigen (2 Klicks). */
  const seq = [
    { el: title, kind: "title" },
    { el: board, kind: "board" },
  ];

  slides.forEach((slide) => {
    seq.push({
      el: slide,
      kind: "slide",
      split: slide.classList.contains("slide--split"),
      nr: slide.dataset.nr,
      title: slide.dataset.title,
    });

    if (slide.classList.contains("slide--split")) {
      seq.push({
        el: slide.querySelector(".subpart"),
        kind: "detail",
        owner: slide,
        nr: slide.dataset.nr,
        title: slide.dataset.title,
      });
    }

    seq.push({ el: board, kind: "board" });
  });

  let idx = 0;
  let lastStep = 0;

  /* ---------------------------------------------------------- Kamera */
  function currentCamera() {
    const t = getComputedStyle(world).transform;
    if (!t || t === "none") return { s: 1, x: 0, y: 0 };

    if (typeof DOMMatrixReadOnly === "function") {
      const m = new DOMMatrixReadOnly(t);
      return { s: m.a, x: m.e, y: m.f };
    }

    const n = t.match(/-?[\d.]+/g) || [];
    return { s: parseFloat(n[0]) || 1, x: parseFloat(n[4]) || 0, y: parseFloat(n[5]) || 0 };
  }

  function applyCamera(x, y, s, instant) {
    const value = `translate(${x}px, ${y}px) scale(${s})`;

    if (instant) {
      world.style.transition = "none";
      world.style.transform = value;
      void world.offsetWidth;
      world.style.transition = "";
      return;
    }

    world.style.transform = value;
  }

  function cameraTo(el, pad, instant) {
    const sr = stage.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (!sr.width || !sr.height || !r.width || !r.height) return;

    const cur = currentCamera();
    const cx = (r.left + r.width / 2 - sr.left - cur.x) / cur.s;
    const cy = (r.top + r.height / 2 - sr.top - cur.y) / cur.s;
    const s2 = cur.s * Math.min((sr.width * pad) / r.width, (sr.height * pad) / r.height);

    applyCamera(sr.width / 2 - s2 * cx, sr.height / 2 - s2 * cy, s2, instant);
  }

  /* ---------------------------------------------------------- Hinweise */
  function hintText(v, next) {
    switch (v.kind) {
      case "title":
        return "Klicken, um zu starten";
      case "board":
        return next.kind === "slide"
          ? `Klicken, um Folie ${next.nr} „${next.title}“ zu öffnen`
          : "Klicken für den Neustart";
      case "slide":
        return v.split
          ? `Folie ${v.nr} · Klicken für die Unterteilung`
          : `Folie ${v.nr} · Klicken für die Übersicht`;
      case "detail":
        return `Folie ${v.nr} · Unterteilung · Klicken für die Übersicht`;
      default:
        return "";
    }
  }

  /* ---------------------------------------------------------- Ansicht */
  function render(instant) {
    const v = seq[idx];
    const next = seq[(idx + 1) % seq.length];

    slides.forEach((slide) => {
      const revealed =
        (v.kind === "slide" && v.el === slide) ||
        (v.kind === "detail" && v.owner === slide);
      slide.classList.toggle("is-revealed", revealed);

      const isNext = v.kind === "board" && next.kind === "slide" && next.el === slide;
      slide.classList.toggle("is-next", isNext);
    });

    hint.textContent = hintText(v, next);
    cameraTo(v.el, PAD[v.kind], instant);
  }

  function step(dir) {
    const now = performance.now();
    if (now - lastStep < LOCK_MS) return;
    lastStep = now;

    idx = dir > 0 ? (idx + 1) % seq.length : Math.max(0, idx - 1);
    render(false);
  }

  function goto(newIdx) {
    const now = performance.now();
    if (now - lastStep < LOCK_MS) return;
    lastStep = now;
    idx = newIdx;
    render(false);
  }

  /* ---------------------------------------------------------- Eingabe */
  stage.addEventListener("click", (e) => {
    if (e.button !== 0) return;
    step(1);
  });

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
      case " ":
      case "Enter":
        e.preventDefault();
        step(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
      case "Backspace":
        e.preventDefault();
        step(-1);
        break;
      case "Home":
        e.preventDefault();
        goto(0);
        break;
      case "End":
        e.preventDefault();
        goto(seq.length - 1);
        break;
      case "f":
      case "F":
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
        break;
      default:
        break;
    }
  });

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => render(true), 80);
  });

  document.addEventListener("fullscreenchange", () => render(true));

  /* ---------------------------------------------------------- Start */
  render(true);
  document.body.classList.add("is-ready");
})();
