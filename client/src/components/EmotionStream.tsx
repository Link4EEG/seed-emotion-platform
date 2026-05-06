import { useEffect, useState } from "react";

/**
 * Mini animated emotion stream — three smoothed probability lines (neg / neu /
 * pos) drawn over an off-white panel, plus a coloured argmax band beneath.
 *
 * The series is generated client-side using a deterministic seed but with
 * smooth random-walk noise so it feels alive without requiring a backend.
 */
type Sample = { neg: number; neu: number; pos: number };

const N = 96;        // visible samples
const W = 760;       // svg viewBox width
const H = 220;       // svg viewBox height
const PAD = 12;

function softmax(a: number, b: number, c: number) {
  const m = Math.max(a, b, c);
  const ea = Math.exp(a - m), eb = Math.exp(b - m), ec = Math.exp(c - m);
  const s = ea + eb + ec;
  return { neg: ea / s, neu: eb / s, pos: ec / s };
}

function smoothPath(values: number[]): string {
  const dx = (W - PAD * 2) / (values.length - 1);
  const points = values.map((v, i) => [PAD + i * dx, H - PAD - v * (H - PAD * 2)]);
  if (points.length < 2) return "";
  let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const cx = (p0[0] + p1[0]) / 2;
    d += ` Q ${cx.toFixed(2)} ${p0[1].toFixed(2)}, ${cx.toFixed(2)} ${((p0[1] + p1[1]) / 2).toFixed(2)}`;
    d += ` T ${p1[0].toFixed(2)} ${p1[1].toFixed(2)}`;
  }
  return d;
}

const COLORS = {
  neg: "var(--neg)",
  neu: "var(--neu)",
  pos: "var(--pos)",
};

export default function EmotionStream() {
  const [series, setSeries] = useState<Sample[]>(() => {
    // seed initial walk
    let a = -0.2, b = 0.4, c = -0.1;
    return Array.from({ length: N }, () => {
      a += (Math.random() - 0.5) * 0.4;
      b += (Math.random() - 0.5) * 0.3;
      c += (Math.random() - 0.5) * 0.4;
      return softmax(a, b, c);
    });
  });

  useEffect(() => {
    const id = setInterval(() => {
      setSeries(prev => {
        const last = prev[prev.length - 1];
        // continue the walk in logit space
        const a = Math.log(last.neg + 1e-6) + (Math.random() - 0.5) * 0.6;
        const b = Math.log(last.neu + 1e-6) + (Math.random() - 0.5) * 0.4;
        const c = Math.log(last.pos + 1e-6) + (Math.random() - 0.5) * 0.6;
        const next = softmax(a, b, c);
        return [...prev.slice(1), next];
      });
    }, 700);
    return () => clearInterval(id);
  }, []);

  const negPath = smoothPath(series.map(s => s.neg));
  const neuPath = smoothPath(series.map(s => s.neu));
  const posPath = smoothPath(series.map(s => s.pos));

  const last = series[series.length - 1];
  const labels: ("neg" | "neu" | "pos")[] = series.map(s =>
    s.neg >= s.neu && s.neg >= s.pos ? "neg" : s.pos >= s.neu ? "pos" : "neu"
  );

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* hairline grid */}
        {[0.25, 0.5, 0.75].map(y => (
          <line key={y} x1={PAD} x2={W - PAD}
                y1={PAD + y * (H - PAD * 2)} y2={PAD + y * (H - PAD * 2)}
                stroke="currentColor" strokeOpacity={0.08} strokeWidth={1} />
        ))}
        {/* paths */}
        <path d={negPath} fill="none" stroke={COLORS.neg} strokeWidth={1.6} strokeLinecap="round" />
        <path d={neuPath} fill="none" stroke={COLORS.neu} strokeWidth={1.4} strokeLinecap="round" strokeOpacity={0.85} />
        <path d={posPath} fill="none" stroke={COLORS.pos} strokeWidth={1.6} strokeLinecap="round" />
      </svg>

      {/* argmax label band */}
      <div className="mt-2 flex h-2 overflow-hidden rounded-sm border border-foreground/10">
        {labels.map((l, i) => (
          <div key={i} style={{ width: `${100 / labels.length}%`, background: COLORS[l] }} />
        ))}
      </div>

      {/* live readout */}
      <div className="mt-3 grid grid-cols-3 gap-3 text-[12px]" style={{ fontFamily: "var(--font-mono)" }}>
        <Stat label="P(neg)" v={last.neg} color={COLORS.neg} />
        <Stat label="P(neu)" v={last.neu} color={COLORS.neu} />
        <Stat label="P(pos)" v={last.pos} color={COLORS.pos} />
      </div>
    </div>
  );
}

function Stat({ label, v, color }: { label: string; v: number; color: string }) {
  return (
    <div className="flex items-baseline justify-between border-t border-foreground/15 pt-1">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground" style={{ color }}>{v.toFixed(3)}</span>
    </div>
  );
}
