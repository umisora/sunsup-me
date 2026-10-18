import { paintHero } from "./hero-paint";

export function mountHero(canvas: HTMLCanvasElement): void {
  if (canvas.dataset.ready === "1") return;
  canvas.dataset.ready = "1";

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 1;
  let height = 1;
  let frame = 0;
  let running = false;
  let visible = true;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    const cap = width < 800 ? 1.25 : 1.5;
    const dpr = Math.min(window.devicePixelRatio || 1, reduce ? 1 : cap);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (time: number) => {
    paintHero(context, width, height, time, reduce);
  };

  const loop = (time: number) => {
    if (!running) return;
    draw(time);
    frame = requestAnimationFrame(loop);
  };

  const start = () => {
    if (running || reduce || !visible || document.hidden) return;
    running = true;
    frame = requestAnimationFrame(loop);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  resize();
  draw(0);

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) start();
      else stop();
    },
    { threshold: 0.02 },
  );
  observer.observe(canvas);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  const onResize = () => {
    resize();
    if (!running) draw(0);
  };
  window.addEventListener("resize", onResize);

  if (!reduce) start();
}
