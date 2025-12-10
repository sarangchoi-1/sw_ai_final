interface BusinessModelData {
  valueProposition?: string;
  revenueStreams?: string;
  customerSegments?: string;
  channels?: string;
  keyPartners?: string;
  keyActivities?: string;
  keyResources?: string;
  costStructure?: string;
  // Fallback for simple string format
  simple?: string;
}

interface BusinessModelChartProps {
  data: BusinessModelData | string;
}

export default function BusinessModelChart({ data }: BusinessModelChartProps) {
  // Handle both structured object and simple string format
  const bmData: BusinessModelData =
    typeof data === 'string' ? { simple: data } : data;

  // If we have structured data, show the chart
  if (bmData.valueProposition || bmData.revenueStreams) {
    return (
      <div className="w-full">
        {/* Business Model Canvas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Value Proposition */}
            <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-[#111] mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                가치 제안
              </h4>
              <p className="text-sm text-[#111] leading-relaxed">
                {bmData.valueProposition || 'N/A'}
              </p>
            </div>

            {/* Customer Segments */}
            <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-[#111] mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                고객 세그먼트
              </h4>
              <p className="text-sm text-[#111] leading-relaxed">
                {bmData.customerSegments || 'N/A'}
              </p>
            </div>

            {/* Channels */}
            <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-[#111] mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                채널
              </h4>
              <p className="text-sm text-[#111] leading-relaxed">
                {bmData.channels || 'N/A'}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Revenue Streams */}
            <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-[#111] mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                수익원
              </h4>
              <p className="text-sm text-[#111] leading-relaxed">
                {bmData.revenueStreams || 'N/A'}
              </p>
            </div>

            {/* Key Partners */}
            <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-[#111] mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                핵심 파트너
              </h4>
              <p className="text-sm text-[#111] leading-relaxed">
                {bmData.keyPartners || 'N/A'}
              </p>
            </div>

            {/* Key Activities */}
            <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-[#111] mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                핵심 활동
              </h4>
              <p className="text-sm text-[#111] leading-relaxed">
                {bmData.keyActivities || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row - Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Key Resources */}
          <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold text-[#111] mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              핵심 자원
            </h4>
            <p className="text-sm text-[#111] leading-relaxed">
              {bmData.keyResources || 'N/A'}
            </p>
          </div>

          {/* Cost Structure */}
          <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold text-[#111] mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              비용 구조
            </h4>
            <p className="text-sm text-[#111] leading-relaxed">
              {bmData.costStructure || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to simple text display
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-4 shadow-sm">
      <p className="text-[#111] leading-relaxed whitespace-pre-line">
        {bmData.simple || 'No business model data available'}
      </p>
    </div>
  );
}

