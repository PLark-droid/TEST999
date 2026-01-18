'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Plus, ExternalLink, GitPullRequest, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

interface Issue {
  number: number;
  title: string;
  state: string;
  html_url: string;
  created_at: string;
}

export default function Issues() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    // TODO: Fetch issues from GitHub API
    // For now, show placeholder
    setLoading(false);
    setIssues([]);
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Issue管理</h1>
          <p className="text-gray-600 mt-1">
            作成したIssueの確認とPRステータスの管理
          </p>
        </div>
        <Link
          href="/issues/new"
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          <Plus size={20} />
          <span>Issue作成</span>
        </Link>
      </div>

      {/* Issue List */}
      {issues.length > 0 ? (
        <div className="space-y-4">
          {issues.map((issue) => (
            <div
              key={issue.number}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-500">#{issue.number}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        issue.state === 'open'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {issue.state}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{issue.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    作成日: {new Date(issue.created_at).toLocaleDateString('ja-JP')}
                  </p>
                </div>
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            まだIssueがありません
          </h2>
          <p className="text-gray-600 mb-6">
            最初のIssueを作成して、AI駆動開発を始めましょう！
          </p>
          <Link
            href="/issues/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            <Plus size={20} />
            <span>最初のIssueを作成</span>
          </Link>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 Issue作成のコツ</h3>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• 「何を作りたいか」を明確に書く</li>
          <li>• 曖昧な表現（「いい感じに」など）は避ける</li>
          <li>• 制約があれば明記する</li>
          <li>• 1つのIssueに1つの機能</li>
        </ul>
      </div>
    </div>
  );
}
