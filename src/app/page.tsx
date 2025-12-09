'use client';

import { useState } from 'react';
import IdeaForm from '@/components/IdeaForm';
import StartupPack from '@/components/StartupPack';
import FeedbackForm from '@/components/FeedbackForm';

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

interface StartupPackData {
  bm: BusinessModel | string;
  marketSize?: MarketSize;
  mvp: string;
  competitors: Competitor[] | string[];
  xyz: XYZHypothesisData | string;
  validation?: string;
}

export default function Home() {
  const [startupPack, setStartupPack] = useState<StartupPackData | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F7F8] py-12 px-4">
      <div className="mx-auto max-w-[720px] flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-[#111]">
            스타트업 팩 생성기
          </h1>
          <p className="text-sm text-gray-600">
            아이디어를 구조화된 비즈니스 계획으로 빠르게 만들어보세요.
          </p>
        </header>

        <section className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] shadow-sm p-8">
          <IdeaForm onGenerate={setStartupPack} />
        </section>

        {startupPack && (
          <section className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] shadow-sm p-8">
            <StartupPack pack={startupPack} />
            {!feedbackSubmitted && (
              <div className="mt-8">
                <FeedbackForm onSubmit={() => setFeedbackSubmitted(true)} />
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
