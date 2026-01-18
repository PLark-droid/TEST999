'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProgressCard from '@/components/ProgressCard';
import { FileText, GitPullRequest, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  // TODO: Fetch actual progress from localStorage or API
  const progress = {
    level1: { completed: 0, total: 3 },
    level2: { completed: 0, total: 3 },
    level3: { completed: 0, total: 3 },
  };

  const recentActivity = [
    { type: 'issue', title: 'Welcome to miyabi!', status: 'open', number: 1 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          ようこそ、{session?.user?.name}さん！
        </h1>
        <p className="text-gray-600 mt-2">
          miyabiの使い方を学んで、AI駆動開発をマスターしましょう。
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <ProgressCard
          level={1}
          title="基礎"
          description="Issue作成とPRマージの基本を学ぶ"
          completedTasks={progress.level1.completed}
          totalTasks={progress.level1.total}
          isUnlocked={true}
        />
        <ProgressCard
          level={2}
          title="実践"
          description="複雑なIssueとエスカレーション対応"
          completedTasks={progress.level2.completed}
          totalTasks={progress.level2.total}
          isUnlocked={progress.level1.completed === progress.level1.total}
        />
        <ProgressCard
          level={3}
          title="応用"
          description="並列処理とチーム展開"
          completedTasks={progress.level3.completed}
          totalTasks={progress.level3.total}
          isUnlocked={progress.level2.completed === progress.level2.total}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FileText className="text-purple-500" />
            クイックアクション
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/learn')}
              className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-purple-500 transition"
            >
              <div className="font-medium">📚 学習を続ける</div>
              <div className="text-sm text-gray-500">次の課題に進む</div>
            </button>
            <button
              onClick={() => router.push('/issues/new')}
              className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-purple-500 transition"
            >
              <div className="font-medium">✏️ Issueを作成</div>
              <div className="text-sm text-gray-500">穴埋め式で簡単作成</div>
            </button>
            <button
              onClick={() => router.push('/issues')}
              className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-purple-500 transition"
            >
              <div className="font-medium">📋 Issue一覧</div>
              <div className="text-sm text-gray-500">作成したIssueを確認</div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <GitPullRequest className="text-blue-500" />
            最近のアクティビティ
          </h2>
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                >
                  {activity.type === 'issue' ? (
                    <FileText className="text-green-500" size={20} />
                  ) : (
                    <GitPullRequest className="text-blue-500" size={20} />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">#{activity.number} {activity.title}</div>
                    <div className="text-sm text-gray-500">{activity.status}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              まだアクティビティがありません
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">💡 今日のTips</h2>
        <p>
          miyabiでは、コードを書く必要はありません。
          「何を作りたいか」をIssueに書いて、「処理して」と言うだけ。
          AIが自動でコードを生成し、PRを作成します。
        </p>
      </div>
    </div>
  );
}
