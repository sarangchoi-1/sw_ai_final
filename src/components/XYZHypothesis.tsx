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
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            X
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              만약 다음을 실행하면:
            </h4>
            <p className="text-gray-800 dark:text-gray-200 mb-3 leading-relaxed">
              {x.action}
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-md p-3 border border-blue-200 dark:border-blue-600">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatValue(x.value, x.unit)}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {x.metric}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Y Hypothesis */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border-2 border-green-200 dark:border-green-700 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            Y
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">
              누구에게:
            </h4>
            <p className="text-gray-800 dark:text-gray-200 mb-3 leading-relaxed">
              {y.target}
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-md p-3 border border-green-200 dark:border-green-600">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatValue(y.value, y.unit)}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {y.metric}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Z Hypothesis */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            Z
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">
              그러면:
            </h4>
            <p className="text-gray-800 dark:text-gray-200 mb-3 leading-relaxed">
              {z.outcome}
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-md p-3 border border-purple-200 dark:border-purple-600">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatValue(z.value, z.unit)}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {z.metric}
                </span>
              </div>
              {z.timeframe && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
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

