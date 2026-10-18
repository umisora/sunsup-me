const AMBER = "255, 176, 32";
const CYAN = "94, 230, 196";

function paint(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reduce: boolean,
): void {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#07090d";
  ctx.fillRect(0, 0, width, height);

  const horizon = height * 0.64;
  const radius = Math.min(width, height) * 0.3;
  const cx = width * 0.5;
  const cy = horizon - radius * 0.42;

  const glow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 2.1);
  glow.addColorStop(0, "rgba(255, 140, 24, 0.28)");
  glow.addColorStop(0.45, "rgba(255, 90, 0, 0.05)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, width, horizon);
  ctx.clip();

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 120, 16, 0.08)";
  ctx.fill();

  const rotation = reduce ? 0.6 : time * 0.00022;
  const project = (lat: number, lon: number) => {
    const x3 = Math.cos(lat) * Math.sin(lon + rotation);
    const y3 = Math.sin(lat);
    const z3 = Math.cos(lat) * Math.cos(lon + rotation);
    const scale = 0.78 / (1.55 - z3 * 0.45);
    return {
      x: cx + x3 * radius * scale * 1.28,
      y: cy - y3 * radius * scale * 1.28,
      z: z3,
    };
  };

  const strokeLoop = (points: { x: number; y: number; z: number }[]) => {
    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const current = points[index];
      if (!previous || !current) continue;
      const depth = (previous.z + current.z) / 2;
      ctx.beginPath();
      ctx.moveTo(previous.x, previous.y);
      ctx.lineTo(current.x, current.y);
      ctx.strokeStyle = `rgba(${AMBER}, ${0.18 + Math.max(0, depth) * 0.82})`;
      ctx.stroke();
    }
  };

  ctx.lineWidth = 1.15;
  for (let band = 1; band <= 6; band += 1) {
    const lat = -Math.PI / 2 + (band * Math.PI) / 7;
    const points = [];
    for (let step = 0; step <= 72; step += 1) {
      points.push(project(lat, (step / 72) * Math.PI * 2));
    }
    strokeLoop(points);
  }
  for (let meridian = 0; meridian < 10; meridian += 1) {
    const lon = (meridian / 10) * Math.PI;
    const points = [];
    for (let step = 0; step <= 56; step += 1) {
      points.push(project(-Math.PI / 2 + (step / 56) * Math.PI, lon));
    }
    strokeLoop(points);
  }

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${AMBER}, 0.95)`;
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, horizon, width, height - horizon);
  ctx.clip();
  ctx.strokeStyle = `rgba(${CYAN}, 0.38)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let row = 0; row < 16; row += 1) {
    const y = horizon + (row / 15) ** 1.7 * (height - horizon);
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  const columns = 14;
  for (let column = 0; column <= columns; column += 1) {
    const x = (column / columns) * width;
    ctx.moveTo(cx, horizon);
    ctx.lineTo(x, height);
  }
  ctx.stroke();
  ctx.restore();

  ctx.beginPath();
  ctx.moveTo(12, horizon);
  ctx.lineTo(width - 12, horizon);
  ctx.strokeStyle = `rgba(${AMBER}, 0.9)`;
  ctx.lineWidth = 1.25;
  ctx.stroke();

  ctx.strokeStyle = `rgba(${CYAN}, 0.7)`;
  ctx.lineWidth = 1;
  const tick = 10;
  ctx.strokeRect(cx - tick, cy - tick, tick * 2, tick * 2);

  ctx.font = "500 12px 'IBM Plex Mono', ui-monospace, monospace";
  ctx.fillStyle = `rgba(${CYAN}, 0.86)`;
  ctx.fillText("SUNFIELD", 16, 26);
  ctx.textAlign = "right";
  ctx.fillStyle = `rgba(${AMBER}, 0.8)`;
  ctx.fillText("WIRE", width - 16, height - 16);
  ctx.textAlign = "left";
}

export function mountSunfield(root: HTMLElement): void {
  if (root.dataset.mounted === "true") return;
  const canvas = root.querySelector("canvas");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  root.dataset.mounted = "true";
  const ctx = context;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;
  let running = false;
  let visible = true;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nextWidth = Math.max(1, Math.round(rect.width * dpr));
    const nextHeight = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (time: number) => {
    paint(ctx, canvas.clientWidth, canvas.clientHeight, time, reduce);
  };

  const tick = (time: number) => {
    if (!running) return;
    draw(time);
    if (!reduce) frame = window.requestAnimationFrame(tick);
  };

  const start = () => {
    if (running || !visible || document.hidden) return;
    running = true;
    frame = window.requestAnimationFrame(tick);
  };

  const stop = () => {
    running = false;
    window.cancelAnimationFrame(frame);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) start();
      else stop();
    },
    { rootMargin: "200px" },
  );
  observer.observe(root);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  const resizeObserver = new ResizeObserver(() => {
    resize();
    draw(performance.now());
  });
  resizeObserver.observe(canvas);
  resize();
  start();
  void document.fonts.ready.then(() => {
    draw(performance.now());
  });
}
