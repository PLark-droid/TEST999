'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TutorialStep from '@/components/TutorialStep';

type Experience = '1' | '2' | '3' | null;

export default function Learn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState<Experience>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  const handleExperienceSelect = (id: string) => {
    setExperience(id as Experience);
  };

  const handleNext = () => {
    if (step === 1 && experience) {
      if (experience === '1') {
        router.push('/learn/level-1');
      } else if (experience === '2') {
        router.push('/learn/level-2');
      } else {
        router.push('/learn/level-3');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🌸 miyabi学習モード
        </h1>
        <p className="text-gray-600">
          対話型チュートリアルでmiyabiの使い方を学びましょう
        </p>
      </div>

      <TutorialStep
        step={1}
        title="あなたの経験を教えてください"
        content={`こんにちは！miyabi学習モードへようこそ。

私はmiyabi - AI駆動開発フレームワークです。
これから、あなたがmiyabiを使いこなせるようになるまでお手伝いします。

まず、あなたの経験を教えてください：`}
        options={[
          {
            id: '1',
            label: 'プログラミング初心者',
            description: 'コードを書いたことがほとんどない',
          },
          {
            id: '2',
            label: 'プログラミング経験者',
            description: 'コードは書けるがmiyabiは初めて',
          },
          {
            id: '3',
            label: 'miyabi経験者',
            description: '復習したい・上級テクニックを学びたい',
          },
        ]}
        onSelect={handleExperienceSelect}
        onNext={handleNext}
      />
    </div>
  );
}
