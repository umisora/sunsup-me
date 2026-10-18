import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'/ ";

function mountClock(): void {
  const clock = document.querySelector("[data-clock]");
  if (!(clock instanceof HTMLTimeElement)) return;
  const format = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const paint = () => {
    const now = new Date();
    const text = format.format(now);
    clock.textContent = text;
    clock.dateTime = now.toISOString();
  };
  paint();
  window.setInterval(paint, 1000);
}

function mountGlitch(): void {
  const title = document.querySelector("[data-glitch]");
  if (!(title instanceof HTMLElement)) return;
  const finalText = title.dataset.glitch ?? "";
  if (!finalText) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    title.textContent = finalText;
    return;
  }

  title.classList.add("is-glitching");
  const state = { count: 0 };
  gsap.to(state, {
    count: finalText.length,
    duration: 1.2,
    ease: "none",
    onUpdate: () => {
      const locked = Math.floor(state.count);
      let next = "";
      for (let index = 0; index < finalText.length; index += 1) {
        const glyph = finalText[index] ?? " ";
        if (index < locked || glyph === " ") next += glyph;
        else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "X";
      }
      title.textContent = next;
    },
    onComplete: () => {
      title.textContent = finalText;
      title.classList.remove("is-glitching");
    },
  });
}

function mountTypedLine(): void {
  const line = document.querySelector("[data-typed]");
  if (!(line instanceof HTMLElement)) return;
  const finalText = line.dataset.typed ?? "";
  if (!finalText) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    line.textContent = finalText;
    return;
  }

  const state = { count: 0 };
  line.textContent = "";
  gsap.to(state, {
    count: finalText.length,
    duration: Math.min(2.2, finalText.length * 0.04),
    delay: 0.25,
    ease: "none",
    onUpdate: () => {
      line.textContent = finalText.slice(0, Math.floor(state.count));
    },
    onComplete: () => {
      line.textContent = finalText;
    },
  });
}

function mountReveals(): void {
  const motion = gsap.matchMedia();
  motion.add("(prefers-reduced-motion: no-preference)", () => {
    const items = gsap.utils.toArray<HTMLElement>(".reveal");
    if (items.length === 0) return;
    gsap.set(items, { y: 22, autoAlpha: 0 });
    ScrollTrigger.batch(items, {
      start: "top 90%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });
  });
}

function mountTilt(): void {
  const motion = gsap.matchMedia();
  motion.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
    const cleanups: Array<() => void> = [];
    document.querySelectorAll(".card").forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const rotateX = gsap.quickTo(node, "rotationX", { duration: 0.35, ease: "power3" });
      const rotateY = gsap.quickTo(node, "rotationY", { duration: 0.35, ease: "power3" });
      const move = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY(px * 7);
        rotateX(py * -6);
      };
      const leave = () => {
        rotateX(0);
        rotateY(0);
      };
      node.addEventListener("pointermove", move);
      node.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        node.removeEventListener("pointermove", move);
        node.removeEventListener("pointerleave", leave);
        gsap.set(node, { rotationX: 0, rotationY: 0 });
      });
    });
    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  });
}

function mountCursorGrid(): void {
  const canvas = document.querySelector("[data-cursor]");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const motion = gsap.matchMedia();
  motion.add(
    "(hover: hover) and (pointer: fine) and (min-width: 1040px) and (prefers-reduced-motion: no-preference)",
    () => {
      const context = canvas.getContext("2d");
      if (!context) return () => undefined;
      let width = 0;
      let height = 0;
      let targetX = -400;
      let targetY = -400;
      let currentX = -400;
      let currentY = -400;
      let frame = 0;
      let running = false;

      const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      const draw = () => {
        running = false;
        currentX += (targetX - currentX) * 0.16;
        currentY += (targetY - currentY) * 0.16;
        context.clearRect(0, 0, width, height);
        const gap = 64;
        context.lineWidth = 1;
        for (let x = gap; x < width; x += gap) {
          const near = Math.max(0, 1 - Math.abs(x - currentX) / 360);
          context.strokeStyle = `rgba(15, 110, 134, ${0.08 + near * 0.28})`;
          context.beginPath();
          context.moveTo(x, 0);
          context.lineTo(x, height);
          context.stroke();
        }
        for (let y = gap; y < height; y += gap) {
          const near = Math.max(0, 1 - Math.abs(y - currentY) / 280);
          context.strokeStyle = `rgba(194, 65, 12, ${0.07 + near * 0.22})`;
          context.beginPath();
          context.moveTo(0, y);
          context.lineTo(width, y);
          context.stroke();
        }
        context.strokeStyle = "rgba(194, 65, 12, 0.85)";
        context.strokeRect(currentX - 7, currentY - 7, 14, 14);
        if (Math.hypot(targetX - currentX, targetY - currentY) > 0.6) {
          running = true;
          frame = requestAnimationFrame(draw);
        }
      };

      const queue = () => {
        if (running) return;
        running = true;
        frame = requestAnimationFrame(draw);
      };

      const onMove = (event: PointerEvent) => {
        targetX = event.clientX;
        targetY = event.clientY;
        queue();
      };

      resize();
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("resize", resize);
      return () => {
        cancelAnimationFrame(frame);
        running = false;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", resize);
        context.clearRect(0, 0, width, height);
      };
    },
  );
}

export function mountMotion(): void {
  mountClock();
  mountGlitch();
  mountTypedLine();
  mountReveals();
  mountTilt();
  mountCursorGrid();
}
