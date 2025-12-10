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

export default function MarketSizeChart({ marketSize }: MarketSizeChartProps) {
  return (
    <div className="w-full">
      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TAM Card */}
        <div className="bg-black rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-white mb-2">
            TAM: {formatNumber(marketSize.tam.value)}
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
            SAM: {formatNumber(marketSize.sam.value)}
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
            SOM: {formatNumber(marketSize.som.value)}
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

