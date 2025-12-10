'use client';

import { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: () => void;
}

export default function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('이메일을 입력해주세요.');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    if (!feedback.trim()) {
      setError('피드백을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          feedback: feedback.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit feedback');
      }

      setSuccess(true);
      onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-center gap-3">
          <svg
            className="w-6 h-6 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        <p className="text-green-700 dark:text-green-400 font-medium">
          피드백 감사합니다! 더 나은 서비스를 제공하는 데 도움이 됩니다.
        </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
      <h3 className="text-xl font-semibold text-[#111] mb-4">
        피드백 남기기
      </h3>
      <p className="text-sm text-[#111] mb-6">
        생성된 스타트업 팩에 대한 의견을 편하게 알려주세요.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#111] mb-2"
          >
            이메일 주소
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="w-full px-4 py-3 bg-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#111] outline-none transition-all"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-[#111] mb-2"
          >
            피드백 내용
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="생성된 스타트업 팩에 대한 의견을 자유롭게 작성해주세요!"
            rows={5}
            className="w-full px-4 py-3 bg-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#111] outline-none transition-all resize-none"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-black hover:bg-neutral-900 disabled:bg-neutral-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            제출 중...
            </>
          ) : (
          '피드백 제출'
          )}
        </button>
      </form>
    </div>
  );
}

