import BusinessModelChart from './BusinessModelChart';
import MarketSizeChart from './MarketSizeChart';
import XYZHypothesis from './XYZHypothesis';

interface BusinessModel {
  valueProposition?: string;
  revenueStreams?: string;
  customerSegments?: string;
  channels?: string;
  keyPartners?: string;
  keyActivities?: string;
  keyResources?: string;
  costStructure?: string;
  simple?: string;
}

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

interface Competitor {
  name: string;
  url: string;
  description: string;
}

interface XYZHypothesisData {
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

interface StartupPack {
  bm: BusinessModel | string;
  marketSize?: MarketSize;
  mvp: string;
  competitors: Competitor[] | string[];
  xyz: XYZHypothesisData | string;
  validation?: string;
}

interface StartupPackProps {
  pack: StartupPack;
}

export default function StartupPack({ pack }: StartupPackProps) {
  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-[#111]">
          생성된 스타트업 팩
        </h2>
        <p className="text-sm text-gray-600">
          비즈니스 모델, 시장 규모, 경쟁사, MVP, 가설을 한눈에 확인하세요.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Business Model */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-[#3B82F6]">01</span>
            <h3 className="text-lg font-semibold text-gray-900">비즈니스 모델 캔버스</h3>
          </div>
          <BusinessModelChart data={pack.bm} />
        </div>

        {/* Market Size (TAM/SAM/SOM) */}
        {pack.marketSize && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-[#3B82F6]">02</span>
              <h3 className="text-lg font-semibold text-gray-900">시장 규모 분석 (한국 기준)</h3>
            </div>
            <MarketSizeChart marketSize={pack.marketSize} />
          </div>
        )}

        {/* MVP Plan */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-[#3B82F6]">03</span>
            <h3 className="text-lg font-semibold text-gray-900">MVP 계획 + 목업 구조</h3>
          </div>
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-[#F7F7F8] px-4 py-3">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
              {pack.mvp}
            </pre>
          </div>
        </div>

        {/* Competitors */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-[#3B82F6]">04</span>
            <h3 className="text-lg font-semibold text-gray-900">유사 서비스 / 경쟁사</h3>
          </div>
          <div className="flex flex-col gap-3">
            {pack.competitors.map((competitor, index) => {
              const isObject = typeof competitor === 'object' && competitor !== null;
              const name = isObject ? (competitor as Competitor).name : competitor;
              const url = isObject ? (competitor as Competitor).url : null;
              const description = isObject ? (competitor as Competitor).description : null;

              return (
                <div
                  key={index}
                  className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 hover:border-[#3B82F6]/40 transition"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{name}</span>
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#3B82F6] hover:text-blue-500 transition"
                          onClick={(e) => e.stopPropagation()}
                        >
                          방문하기 ↗
                        </a>
                      )}
                    </div>
                    {description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* XYZ Hypothesis */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-[#3B82F6]">05</span>
            <h3 className="text-lg font-semibold text-gray-900">핵심 가설 (XYZ 가설)</h3>
          </div>
          <XYZHypothesis hypothesis={pack.xyz} />
        </div>

        {/* Validation Plan (Optional) */}
        {pack.validation && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-[#3B82F6]">06</span>
              <h3 className="text-lg font-semibold text-gray-900">리스크 & 검증 계획</h3>
            </div>
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              {pack.validation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

