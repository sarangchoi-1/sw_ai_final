interface XYZHypothesis {
  x: {
    action: string;
    metric: string;
    value: number | string;
    unit?: string;
  };
  y: {
    target: string;
    metric: string;
    value: number | string;
    unit?: string;
  };
  z: {
    outcome: string;
    metric: string;
    value: number | string;
    unit?: string;
    timeframe?: string;
  };
}

interface XYZHypothesisProps {
  hypothesis: XYZHypothesis | string;
}

function formatValue(value: number | string, unit?: string): string {
  if (typeof value === 'number') {
    if (unit === 'KRW' || unit === '원') {
      if (value >= 1000000000000) {
        return `₩${(value / 1000000000000).toFixed(2)}조`;
      } else if (value >= 100000000) {
        return `₩${(value / 100000000).toFixed(1)}억`;
      } else if (value >= 10000) {
        return `₩${(value / 10000).toFixed(1)}만`;
      }
      return `₩${value.toLocaleString()}`;
    } else if (unit === '%') {
      return `${value}%`;
    } else if (unit === '명' || unit === 'users' || unit === 'people') {
      if (value >= 10000) {
        return `${(value / 10000).toFixed(1)}만명`;
      }
      return `${value.toLocaleString()}명`;
    } else if (unit === 'times' || unit === '회') {
      return `${value}회`;
    }
    return `${value.toLocaleString()}${unit ? ` ${unit}` : ''}`;
  }
  return value;
}

export default function XYZHypothesis({ hypothesis }: XYZHypothesisProps) {
  // Handle both old string format and new object format
  if (typeof hypothesis === 'string') {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {hypothesis}
        </p>
      </div>
    );
  }

  const { x, y, z } = hypothesis;

  return (
    <div className="space-y-4">
      {/* X Hypothesis */}
      <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
            X
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#111] mb-2">
              만약 다음을 실행하면:
            </h4>
            <p className="text-[#111] mb-3 leading-relaxed">
              {x.action}
            </p>
            <div className="bg-black rounded-lg p-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                  {formatValue(x.value, x.unit)}
                </span>
                <span className="text-sm text-white/80">
                  {x.metric}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Y Hypothesis */}
      <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
            Y
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#111] mb-2">
              누구에게:
            </h4>
            <p className="text-[#111] mb-3 leading-relaxed">
              {y.target}
            </p>
            <div className="bg-black rounded-lg p-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                  {formatValue(y.value, y.unit)}
                </span>
                <span className="text-sm text-white/80">
                  {y.metric}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Z Hypothesis */}
      <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
            Z
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#111] mb-2">
              그러면:
            </h4>
            <p className="text-[#111] mb-3 leading-relaxed">
              {z.outcome}
            </p>
            <div className="bg-black rounded-lg p-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                  {formatValue(z.value, z.unit)}
                </span>
                <span className="text-sm text-white/80">
                  {z.metric}
                </span>
              </div>
              {z.timeframe && (
                <p className="text-xs text-white/70 mt-2">
                  Timeframe: {z.timeframe}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

