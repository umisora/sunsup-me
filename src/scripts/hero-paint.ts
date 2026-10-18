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
  const count = width < 700 ? 18 : 36;
  const key = Math.round(width) * 100000 + Math.round(height) * 10 + count;
  if (seededFor === key && particles.length === count) return;
  seededFor = key;
  particles.length = 0;
  for (let index = 0; index < count; index += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.4 + Math.random() * 1.05,
      length: 7 + Math.random() * 16,
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
  stripe: string,
): void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx + shift, cy, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = fill;
  ctx.fillRect(cx - radius + shift, cy - radius, radius * 2, radius * 2);
  ctx.fillStyle = stripe;
  for (let band = 0; band < 7; band += 1) {
    const y = cy - radius * 0.08 + band * radius * 0.13;
    ctx.fillRect(cx - radius + shift, y, radius * 2, 1.1 + band * 0.28);
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
  sky.addColorStop(0, "#e7eef3");
  sky.addColorStop(0.46, "#f4efe6");
  sky.addColorStop(1, "#f3f5f7");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const mobile = width < 720;
  const radius = mobile
    ? Math.min(width * 0.42, height * 0.3, (width - 64) / 2)
    : Math.min(width * 0.145, height * 0.34);
  const cx = mobile
    ? width * 0.5
    : Math.min(Math.max(width * 0.76, radius + 16), width - radius - 20);
  const cy = mobile
    ? Math.min(Math.max(height * 0.56, radius + 36), height - radius - 56)
    : Math.max(Math.min(height * 0.8 - radius * 0.12, height - radius - 10), radius + 8);
  const horizon = mobile
    ? Math.min(height - 48, cy + radius * 0.72)
    : height * 0.8;

  ctx.lineWidth = 1;
  const gap = mobile ? 32 : 48;
  for (let x = gap; x < width; x += gap) {
    ctx.strokeStyle = "rgba(15, 110, 134, 0.16)";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = gap; y < height; y += gap) {
    ctx.strokeStyle = "rgba(194, 65, 12, 0.1)";
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const glow = ctx.createRadialGradient(cx, cy, radius * 0.15, cx, cy, radius * 2.4);
  glow.addColorStop(0, "rgba(255, 122, 42, 0.28)");
  glow.addColorStop(0.45, "rgba(18, 194, 212, 0.08)");
  glow.addColorStop(1, "rgba(243, 245, 247, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const aberr = reduce ? 0 : 1.6 + Math.sin(time * 0.003) * 0.8;
  disc(ctx, cx, cy, radius, -aberr, "rgba(255, 106, 26, 0.28)", "rgba(243, 245, 247, 0.35)");
  disc(ctx, cx, cy, radius, aberr, "rgba(18, 194, 212, 0.22)", "rgba(243, 245, 247, 0.3)");
  disc(ctx, cx, cy, radius, 0, "#ff7a2a", "rgba(255, 236, 214, 0.42)");

  ctx.strokeStyle = "rgba(194, 65, 12, 0.7)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(width, horizon);
  ctx.stroke();

  const phase = reduce ? 12 : (time * 0.03) % 48;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, horizon, width, Math.max(0, height - horizon));
  ctx.clip();
  const floor = ctx.createLinearGradient(0, horizon, 0, height);
  floor.addColorStop(0, "rgba(255, 122, 42, 0.2)");
  floor.addColorStop(0.4, "rgba(18, 194, 212, 0.1)");
  floor.addColorStop(1, "rgba(243, 245, 247, 0)");
  ctx.fillStyle = floor;
  ctx.fillRect(0, horizon, width, height - horizon);
  const vanishX = width * 0.5;
  for (let column = 0; column <= 16; column += 1) {
    const x = (column / 16) * width;
    ctx.strokeStyle = "rgba(15, 110, 134, 0.28)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(vanishX, horizon);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let row = 0; row < 12; row += 1) {
    const progress = (row + phase / 48) / 12;
    const y = horizon + progress ** 1.65 * (height - horizon);
    const alpha = 0.28 + progress * 0.5;
    ctx.strokeStyle = `rgba(194, 65, 12, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
    ctx.strokeStyle = `rgba(15, 110, 134, ${alpha * 0.7})`;
    ctx.beginPath();
    ctx.moveTo(0, y + 1);
    ctx.lineTo(width, y + 1);
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
    ctx.strokeStyle = particle.hot ? "rgba(194, 65, 12, 0.55)" : "rgba(15, 110, 134, 0.55)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y);
    ctx.lineTo(particle.x, particle.y + particle.length);
    ctx.stroke();
  }

  if (!reduce && Math.sin(time * 0.0021) > 0.93) {
    const y = height * (0.18 + (Math.sin(time * 0.01) * 0.5 + 0.5) * 0.55);
    ctx.fillStyle = "rgba(18, 194, 212, 0.28)";
    ctx.fillRect(0, y, width, 2);
    ctx.fillStyle = "rgba(255, 106, 26, 0.22)";
    ctx.fillRect(10, y + 5, width - 20, 1);
  }
}
