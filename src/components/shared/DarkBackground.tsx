import type { BgVariant } from '../../contexts/useTheme';

type MorphLine = { from: string; to: string; width: number; opacity: number; dur: string };
type FlowLine  = { d: string; width: number; dur: string; delay: string };

const wavesH: MorphLine[] = [
  { from: 'M-40,120 C120,60 280,200 440,140 C560,95 620,160 720,130',   to: 'M-40,120 C120,180 280,80 440,160 C560,200 620,110 720,150',   width: 1.0, opacity: 0.10, dur: '9s'  },
  { from: 'M-40,200 C100,140 260,280 420,210 C560,150 630,230 720,200', to: 'M-40,200 C100,260 260,160 420,240 C560,290 630,180 720,220', width: 1.2, opacity: 0.13, dur: '13s' },
  { from: 'M-40,290 C80,220 240,360 420,290 C570,230 640,300 720,270',  to: 'M-40,290 C80,350 240,240 420,310 C570,370 640,250 720,290',  width: 1.5, opacity: 0.16, dur: '11s' },
  { from: 'M-40,370 C120,300 300,430 460,360 C580,305 650,370 720,345', to: 'M-40,370 C120,430 300,310 460,390 C580,435 650,320 720,365', width: 2.0, opacity: 0.20, dur: '10s' },
  { from: 'M-40,60 C140,10 320,130 500,70 C610,30 670,90 720,65',       to: 'M-40,60 C140,110 320,20 500,100 C610,130 670,50 720,80',       width: 1.8, opacity: 0.14, dur: '15s' },
  { from: 'M-40,440 C100,380 280,490 460,420 C590,365 660,430 720,410', to: 'M-40,440 C100,490 280,390 460,450 C590,490 660,390 720,430', width: 2.4, opacity: 0.22, dur: '8s'  },
  { from: 'M-40,160 C160,100 340,220 500,155 C610,110 670,170 720,145', to: 'M-40,160 C160,220 340,110 500,185 C610,220 670,130 720,165', width: 2.8, opacity: 0.28, dur: '12s' },
  { from: 'M-40,330 C110,265 290,390 470,320 C600,265 660,335 720,310', to: 'M-40,330 C110,390 290,265 470,355 C600,395 660,290 720,330', width: 3.4, opacity: 0.34, dur: '14s' },
];

const wavesD: MorphLine[] = [
  { from: 'M160,-20 C260,140 320,300 480,440', to: 'M160,-20 C340,120 280,320 480,440', width: 1.0, opacity: 0.10, dur: '9s'  },
  { from: 'M220,-20 C320,140 380,300 540,440', to: 'M220,-20 C400,120 340,320 540,440', width: 1.2, opacity: 0.13, dur: '13s' },
  { from: 'M280,-20 C380,140 440,300 600,440', to: 'M280,-20 C460,120 400,320 600,440', width: 1.5, opacity: 0.16, dur: '11s' },
  { from: 'M340,-20 C440,140 500,300 660,440', to: 'M340,-20 C520,120 460,320 660,440', width: 2.0, opacity: 0.20, dur: '10s' },
  { from: 'M400,-20 C500,140 560,300 720,440', to: 'M400,-20 C580,120 520,320 720,440', width: 2.4, opacity: 0.25, dur: '15s' },
  { from: 'M460,-20 C560,140 620,300 780,440', to: 'M460,-20 C640,120 580,320 780,440', width: 3.0, opacity: 0.30, dur: '8s'  },
  { from: 'M520,-20 C620,140 680,300 840,440', to: 'M520,-20 C700,120 640,320 840,440', width: 3.8, opacity: 0.38, dur: '12s' },
];

// Lines radiating outward from a bottom-right source, fanning across the screen
const radialLines: MorphLine[] = [
  { from: 'M730,470 C580,350 200,100 -20,-20',  to: 'M750,450 C600,330 180,120 -20,-20',  width: 1.0, opacity: 0.10, dur: '11s' },
  { from: 'M730,470 C650,300 350,50 150,-20',   to: 'M750,450 C670,280 330,70 150,-20',   width: 1.3, opacity: 0.13, dur: '9s'  },
  { from: 'M730,470 C700,280 500,60 320,-20',   to: 'M750,450 C720,260 480,80 320,-20',   width: 1.6, opacity: 0.16, dur: '13s' },
  { from: 'M730,470 C600,380 200,200 -20,80',   to: 'M750,450 C620,360 180,220 -20,80',   width: 2.0, opacity: 0.20, dur: '8s'  },
  { from: 'M730,470 C600,430 300,320 -20,240',  to: 'M750,450 C620,410 280,340 -20,240',  width: 2.5, opacity: 0.25, dur: '14s' },
  { from: 'M730,470 C580,460 200,440 -20,400',  to: 'M750,450 C600,445 180,450 -20,400',  width: 3.0, opacity: 0.30, dur: '10s' },
  { from: 'M730,470 C550,472 250,472 30,470',   to: 'M750,450 C570,460 270,462 30,470',   width: 3.6, opacity: 0.36, dur: '12s' },
];

// Static paths with a glowing segment travelling along each line
const flowLines: FlowLine[] = [
  { d: 'M260,470 C310,300 450,140 600,-20', width: 1.0, dur: '4s',   delay: '0s'    },
  { d: 'M295,470 C345,290 485,130 640,-20', width: 1.2, dur: '5s',   delay: '-0.7s' },
  { d: 'M330,470 C380,280 520,120 680,-20', width: 1.5, dur: '6s',   delay: '-1.4s' },
  { d: 'M365,470 C415,270 555,110 720,-20', width: 2.0, dur: '4.5s', delay: '-2.1s' },
  { d: 'M400,470 C450,260 590,100 758,-20', width: 2.4, dur: '5.5s', delay: '-2.8s' },
  { d: 'M435,470 C485,250 625,90 796,-20',  width: 3.0, dur: '7s',   delay: '-3.5s' },
  { d: 'M470,470 C520,240 660,80 834,-20',  width: 3.8, dur: '5s',   delay: '-4.2s' },
];

function MorphBackground({ lines }: { lines: MorphLine[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <path
          key={i}
          fill="none"
          stroke="rgb(192, 132, 252)"
          strokeWidth={l.width}
          strokeOpacity={l.opacity}
          strokeLinecap="round"
          d={l.from}
        >
          <animate
            attributeName="d"
            values={`${l.from};${l.to};${l.from}`}
            dur={l.dur}
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          />
        </path>
      ))}
    </>
  );
}

function FlowBackground({ lines }: { lines: FlowLine[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <path
          key={i}
          fill="none"
          stroke="rgb(192, 132, 252)"
          strokeWidth={l.width}
          strokeLinecap="round"
          strokeDasharray="55 900"
          strokeDashoffset="955"
          d={l.d}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="955"
            to="0"
            dur={l.dur}
            begin={l.delay}
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0;0.5;0.5;0"
            keyTimes="0;0.1;0.85;1"
            dur={l.dur}
            begin={l.delay}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </>
  );
}

type CircleRing = { cx: number; cy: number; maxR: number; dur: string; delay: string };

// Three source points, each emitting expanding rings in sequence
const circleRings: CircleRing[] = [
  { cx: 150, cy: 140, maxR: 230, dur: '18s', delay: '0s'     },
  { cx: 150, cy: 140, maxR: 230, dur: '18s', delay: '-6s'    },
  { cx: 150, cy: 140, maxR: 230, dur: '18s', delay: '-12s'   },

  { cx: 540, cy: 320, maxR: 250, dur: '22s', delay: '-2.5s'  },
  { cx: 540, cy: 320, maxR: 250, dur: '22s', delay: '-9.8s'  },
  { cx: 540, cy: 320, maxR: 250, dur: '22s', delay: '-17s'   },

  { cx: 420, cy: 50,  maxR: 210, dur: '20s', delay: '-4.5s'  },
  { cx: 420, cy: 50,  maxR: 210, dur: '20s', delay: '-11.2s' },
  { cx: 420, cy: 50,  maxR: 210, dur: '20s', delay: '-17.8s' },
];

function CircleBackground() {
  return (
    <>
      {circleRings.map((ring, i) => (
        <circle
          key={i}
          cx={ring.cx}
          cy={ring.cy}
          r="10"
          fill="none"
          stroke="rgb(192, 132, 252)"
          strokeWidth="1"
        >
          <animate
            attributeName="r"
            from="10"
            to={ring.maxR}
            dur={ring.dur}
            begin={ring.delay}
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.3;0.3;0"
            keyTimes="0;0.2;1"
            dur={ring.dur}
            begin={ring.delay}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </>
  );
}

export function DarkBackground({ variant }: { variant: Exclude<BgVariant, 'none'> }) {
  return (
    <svg
      viewBox="0 0 680 450"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {variant === 'waves-h' && <MorphBackground lines={wavesH} />}
      {variant === 'waves-d' && <MorphBackground lines={wavesD} />}
      {variant === 'flow'    && <FlowBackground  lines={flowLines} />}
      {variant === 'radial'  && <MorphBackground lines={radialLines} />}
      {variant === 'circles' && <CircleBackground />}
    </svg>
  );
}
