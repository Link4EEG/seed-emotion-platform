/**
 * Static SVG training curve based on the real metrics observed during the
 * CNN-LSTM run on the SEED extracted-features 1-second dataset.
 */
import { useLang } from "@/contexts/LangContext";
import { I18N, pick } from "@/lib/i18n";

const data: { ep: number; train: number; val: number }[] = [
  { ep: 1,  train: 0.625, val: 0.700 },
  { ep: 2,  train: 0.789, val: 0.821 },
  { ep: 3,  train: 0.847, val: 0.842 },
  { ep: 4,  train: 0.886, val: 0.910 },
  { ep: 5,  train: 0.910, val: 0.905 },
  { ep: 6,  train: 0.928, val: 0.937 },
  { ep: 7,  train: 0.934, val: 0.945 },
  { ep: 8,  train: 0.946, val: 0.945 },
  { ep: 9,  train: 0.957, val: 0.958 },
  { ep: 10, train: 0.961, val: 0.970 },
];

const W = 720, H = 280, PAD = 40;
const xMin = 1, xMax = 10;
const yMin = 0.55, yMax = 1.0;

function px(x: number) { return PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2); }
function py(y: number) { return H - PAD - ((y - yMin) / (yMax - yMin)) * (H - PAD * 2); }

function pathOf(key: "train" | "val") {
  return data.map((d, i) => `${i === 0 ? "M" : "L"} ${px(d.ep).toFixed(1)} ${py(d[key]).toFixed(1)}`).join(" ");
}

export default function TrainingChart() {
  const { lang } = useLang();
  const t = I18N.intro.sec_results;
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* y-axis labels + gridlines */}
        {[0.6, 0.7, 0.8, 0.9, 1.0].map(y => (
          <g key={y}>
            <line x1={PAD} x2={W - PAD} y1={py(y)} y2={py(y)}
                  stroke="currentColor" strokeOpacity={0.1} />
            <text x={PAD - 8} y={py(y) + 3} textAnchor="end"
                  fontFamily="var(--font-mono)" fontSize="10" fill="currentColor"
                  fillOpacity={0.55}>{y.toFixed(1)}</text>
          </g>
        ))}
        {/* x-axis labels */}
        {data.map(d => (
          <text key={d.ep} x={px(d.ep)} y={H - PAD + 16} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="10" fill="currentColor"
                fillOpacity={0.55}>{d.ep}</text>
        ))}
        {/* 90% target line */}
        <line x1={PAD} x2={W - PAD} y1={py(0.9)} y2={py(0.9)}
              stroke="var(--pos)" strokeDasharray="4 4" strokeOpacity={0.7} />
        <text x={W - PAD} y={py(0.9) - 4} textAnchor="end"
              fontFamily="var(--font-mono)" fontSize="10" fill="var(--pos)">
          {pick(lang, t.legend.target)}
        </text>

        {/* curves */}
        <path d={pathOf("train")} fill="none" stroke="var(--neu)" strokeWidth={1.8} />
        <path d={pathOf("val")}   fill="none" stroke="var(--neg)" strokeWidth={2}   />
        {data.map(d => (
          <g key={d.ep}>
            <circle cx={px(d.ep)} cy={py(d.train)} r={3} fill="var(--background)" stroke="var(--neu)" strokeWidth={1.4} />
            <circle cx={px(d.ep)} cy={py(d.val)}   r={3} fill="var(--background)" stroke="var(--neg)" strokeWidth={1.6} />
          </g>
        ))}
        {/* annotation */}
        <g transform={`translate(${px(10) - 130}, ${py(0.97) - 22})`}>
          <rect width="124" height="34" fill="var(--background)" stroke="currentColor" strokeOpacity={0.2} />
          <text x="8" y="14" fontFamily="var(--font-mono)" fontSize="10"
                fill="currentColor" fillOpacity={0.55}>EPOCH 10</text>
          <text x="8" y="28" fontFamily="var(--font-mono)" fontSize="11"
                fill="var(--neg)">val = 0.9698</text>
        </g>
      </svg>
      <figcaption className="meta mt-2">{pick(lang, t.table_caption)}</figcaption>
    </figure>
  );
}
