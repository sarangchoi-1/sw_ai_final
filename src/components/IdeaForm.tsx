'use client';

import { useState } from 'react';

interface StartupPack {
  bm: string;
  mvp: string;
  competitors: string[];
  xyz: string;
  validation?: string;
}

interface IdeaFormProps {
  onGenerate: (pack: StartupPack) => void;
}

export default function IdeaForm({ onGenerate }: IdeaFormProps) {
  const [idea, setIdea] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!idea.trim() || !description.trim()) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: idea.trim(), description: description.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate startup pack');
      }

      const data = await response.json();
      onGenerate(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-800">입력</span>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="idea" className="text-sm text-gray-700">
              스타트업 아이디어
            </label>
            <input
              type="text"
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="아이디어를 한 문장으로 적어주세요"
              className="w-full rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition"
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm text-gray-700">
              간단한 설명 (1-3문장)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="아이디어를 1-3문장으로 설명해주세요"
              rows={4}
              className="w-full rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition resize-none"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-900 disabled:opacity-70"
      >
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="ml-2">생성 중...</span>
          </>
        ) : (
          '스타트업 팩 생성하기'
        )}
      </button>
    </form>
  );
}

