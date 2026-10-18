export type PaintContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

type Particle = {
  x: number;
  y: number;
  speed: number;
  length: number;
  hot: boolean;
};

const particles: Particle[] = [];
let seededFor = 0;

function seed(width: number, height: number): void {
  const count = width < 700 ? 22 : 42;
  const key = Math.round(width) * 100000 + Math.round(height) * 10 + count;
  if (seededFor === key && particles.length === count) return;
  seededFor = key;
  particles.length = 0;
  for (let index = 0; index < count; index += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.45 + Math.random() * 1.15,
      length: 8 + Math.random() * 18,
      hot: Math.random() > 0.62,
    });
  }
}

function disc(
  ctx: PaintContext,
  cx: number,
  cy: number,
  radius: number,
  shift: number,
  fill: string,
): void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx + shift, cy, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = fill;
  ctx.fillRect(cx - radius + shift, cy - radius, radius * 2, radius * 2);
  ctx.fillStyle = "#07080c";
  for (let band = 0; band < 8; band += 1) {
    const y = cy - radius * 0.05 + band * radius * 0.11 + band * band * 0.45;
    ctx.fillRect(cx - radius + shift, y, radius * 2, 1.5 + band * 1.05);
  }
  ctx.restore();
}

export function paintHero(
  ctx: PaintContext,
  width: number,
  height: number,
  time: number,
  reduce: boolean,
): void {
  seed(width, height);
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#16041c");
  sky.addColorStop(0.42, "#2a0a22");
  sky.addColorStop(1, "#07080c");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const horizon = height * (width < 700 ? 0.56 : 0.6);
  const radius = Math.min(width, height) * (width < 700 ? 0.34 : 0.26);
  const cx = width * (width < 700 ? 0.78 : 0.66);
  const cy = horizon + radius * 0.08;

  const glow = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 2.6);
  glow.addColorStop(0, "rgba(255, 70, 130, 0.42)");
  glow.addColorStop(0.38, "rgba(255, 150, 40, 0.16)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const aberr = reduce ? 0 : 2.2 + Math.sin(time * 0.003) * 1.4;
  ctx.globalCompositeOperation = "lighter";
  disc(ctx, cx, cy, radius, -aberr, "rgba(255, 40, 96, 0.9)");
  disc(ctx, cx, cy, radius, aberr, "rgba(60, 230, 255, 0.55)");
  ctx.globalCompositeOperation = "source-over";
  disc(ctx, cx, cy, radius, 0, "#ffb020");

  ctx.strokeStyle = "rgba(255, 176, 32, 0.85)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(width, horizon);
  ctx.stroke();

  const phase = reduce ? 12 : (time * 0.035) % 48;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, horizon, width, Math.max(0, height - horizon));
  ctx.clip();
  const vanishX = width * 0.5;
  for (let column = 0; column <= 16; column += 1) {
    const x = (column / 16) * width;
    ctx.strokeStyle = "rgba(255, 176, 32, 0.28)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(vanishX, horizon);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let row = 0; row < 14; row += 1) {
    const progress = (row + phase / 48) / 14;
    const y = horizon + progress ** 1.65 * (height - horizon);
    const alpha = 0.12 + progress * 0.5;
    ctx.strokeStyle = `rgba(255, 45, 120, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
    ctx.strokeStyle = `rgba(125, 255, 225, ${alpha * 0.4})`;
    ctx.beginPath();
    ctx.moveTo(0, y + 1.4);
    ctx.lineTo(width, y + 1.4);
    ctx.stroke();
  }
  ctx.restore();

  for (const particle of particles) {
    if (!reduce) {
      particle.y -= particle.speed;
      if (particle.y < -24) {
        particle.y = height + 8;
        particle.x = Math.random() * width;
      }
    }
    ctx.strokeStyle = particle.hot ? "rgba(255, 176, 32, 0.75)" : "rgba(125, 255, 225, 0.7)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y);
    ctx.lineTo(particle.x, particle.y + particle.length);
    ctx.stroke();
  }

  if (!reduce && Math.sin(time * 0.0021) > 0.93) {
    const y = height * (0.2 + (Math.sin(time * 0.01) * 0.5 + 0.5) * 0.6);
    ctx.fillStyle = "rgba(125, 255, 225, 0.18)";
    ctx.fillRect(0, y, width, 3);
    ctx.fillStyle = "rgba(255, 45, 120, 0.16)";
    ctx.fillRect(12, y + 6, width - 24, 2);
  }
}
