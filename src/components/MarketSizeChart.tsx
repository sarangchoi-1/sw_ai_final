interface MarketSize {
  tam: {
    value: number;
    unit: string;
    description: string;
    calculation: string;
  };
  sam: {
    value: number;
    unit: string;
    description: string;
    calculation: string;
  };
  som: {
    value: number;
    unit: string;
    description: string;
    calculation: string;
    timeframe: string;
  };
}

interface MarketSizeChartProps {
  marketSize: MarketSize;
}

function formatNumber(num: number): string {
  if (num >= 1000000000000) {
    return `₩${(num / 1000000000000).toFixed(2)}조`;
  } else if (num >= 100000000) {
    return `₩${(num / 100000000).toFixed(1)}억`;
  } else if (num >= 10000) {
    return `₩${(num / 10000).toFixed(1)}만`;
  }
  return `₩${num.toLocaleString()}`;
}

function getPercentage(value: number, max: number): number {
  return Math.min((value / max) * 100, 100);
}

export default function MarketSizeChart({ marketSize }: MarketSizeChartProps) {
  const maxValue = marketSize.tam.value;
  const tamPercentage = 100;
  const samPercentage = getPercentage(marketSize.sam.value, maxValue);
  const somPercentage = getPercentage(marketSize.som.value, maxValue);
  // Ensure SOM shows at least 0.1% if value exists, and use 2 decimal places for precision
  const somDisplayPercentage = marketSize.som.value > 0 
    ? Math.max(somPercentage, 0.1) 
    : 0;

  return (
    <div className="w-full space-y-6">
      {/* Horizontal Bars */}
      <div className="space-y-4">
        {/* TAM */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#3B82F6]" />
              <span className="font-semibold text-gray-900 dark:text-white">
                TAM (총 시장 규모)
              </span>
            </div>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {formatNumber(marketSize.tam.value)}
            </span>
          </div>
          <div className="w-full bg-gray-200/70 dark:bg-gray-700 rounded-full h-8 relative overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${tamPercentage}%`, backgroundColor: '#3B82F6' }}
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {marketSize.tam.description}
          </p>
        </div>

        {/* SAM */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#10B981]" />
              <span className="font-semibold text-gray-900 dark:text-white">
                SAM (서비스 가능 시장)
              </span>
            </div>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {formatNumber(marketSize.sam.value)}
            </span>
          </div>
          <div className="w-full bg-gray-200/70 dark:bg-gray-700 rounded-full h-8 relative overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${samPercentage}%`, backgroundColor: '#10B981' }}
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {marketSize.sam.description}
          </p>
        </div>

        {/* SOM */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#F97316]" />
              <span className="font-semibold text-gray-900 dark:text-white">
                SOM (실질 취득 가능 시장)
              </span>
            </div>
            <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {formatNumber(marketSize.som.value)}
            </span>
          </div>
          <div className="w-full bg-gray-200/70 dark:bg-gray-700 rounded-full h-8 relative overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${somDisplayPercentage}%`, backgroundColor: '#F97316' }}
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {marketSize.som.description} ({marketSize.som.timeframe})
          </p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {/* TAM Card */}
        <div className="bg-black rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-white mb-2">
            TAM 계산 근거
          </h4>
          <p className="text-sm text-white mb-2 leading-relaxed">
            {marketSize.tam.calculation}
          </p>
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-xs text-white/90">
              한국 전체 시장 규모
            </p>
          </div>
        </div>

        {/* SAM Card */}
        <div className="bg-black rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-white mb-2">
            SAM 계산 근거
          </h4>
          <p className="text-sm text-white mb-2 leading-relaxed">
            {marketSize.sam.calculation}
          </p>
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-xs text-white/90">
              한국 내 서비스 가능 시장
            </p>
          </div>
        </div>

        {/* SOM Card */}
        <div className="bg-black rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-white mb-2">
            SOM 계산 근거
          </h4>
          <p className="text-sm text-white mb-2 leading-relaxed">
            {marketSize.som.calculation}
          </p>
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-xs text-white/90">
              {marketSize.som.timeframe} 목표 시장 점유율
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

