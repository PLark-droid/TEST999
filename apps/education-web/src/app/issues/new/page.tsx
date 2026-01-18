'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Send, Eye } from 'lucide-react';
import Link from 'next/link';

export default function NewIssue() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [issueType, setIssueType] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [constraints, setConstraints] = useState('');
  const [showPreview, setShowPreview] = useState(false);

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

  const issueTypes = [
    { id: 'feature', label: '✨ 新機能', prefix: '機能:' },
    { id: 'bug', label: '🐛 バグ修正', prefix: 'バグ修正:' },
    { id: 'refactor', label: '♻️ リファクタリング', prefix: 'リファクタリング:' },
    { id: 'docs', label: '📚 ドキュメント', prefix: 'ドキュメント:' },
  ];

  const selectedType = issueTypes.find(t => t.id === issueType);

  const generateIssueBody = () => {
    let body = `## 概要\n${description}\n`;

    if (requirements) {
      body += `\n## やりたいこと\n`;
      requirements.split('\n').forEach(req => {
        if (req.trim()) {
          body += `- ${req.trim()}\n`;
        }
      });
    }

    if (constraints) {
      body += `\n## 制約\n`;
      constraints.split('\n').forEach(c => {
        if (c.trim()) {
          body += `- ${c.trim()}\n`;
        }
      });
    }

    return body;
  };

  const generateTitle = () => {
    if (selectedType && title) {
      return `${selectedType.prefix} ${title}`;
    }
    return title;
  };

  const handleSubmit = async () => {
    // TODO: Create issue via GitHub API
    alert(`Issue作成機能は準備中です。\n\n以下の内容でIssueを作成してください：\n\nタイトル: ${generateTitle()}\n\n${generateIssueBody()}`);
    router.push('/issues');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/issues"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          <span>戻る</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Issue作成</h1>
        <p className="text-gray-600 mt-1">
          穴埋め式で簡単にIssueを作成できます
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                step >= s
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-1 mx-2 ${
                  step > s ? 'bg-purple-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Issue Type */}
      {step === 1 && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">どんなIssueですか？</h2>
          <div className="grid grid-cols-2 gap-4">
            {issueTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setIssueType(type.id);
                  setStep(2);
                }}
                className={`p-4 rounded-xl border-2 text-left transition ${
                  issueType === type.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="text-2xl mb-2">{type.label.split(' ')[0]}</div>
                <div className="font-medium">{type.label.split(' ')[1]}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">詳細を教えてください</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                タイトル（何を作りたい？）
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{selectedType?.prefix}</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例: ユーザー認証機能"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                概要（もう少し詳しく）
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="例: メールアドレスとパスワードでログインできるようにしたい"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                やりたいこと（1行ずつ）
              </label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="ログインができる&#10;ログアウトができる&#10;パスワードを忘れた場合のリセット"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                制約（あれば・1行ずつ）
              </label>
              <textarea
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="JWTを使用&#10;セッションは24時間で切れる"
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              戻る
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!title || !description}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              プレビュー
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Preview & Submit */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">プレビュー</h2>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {generateTitle()}
              </h3>
              <div className="prose prose-sm">
                <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded text-sm">
                  {generateIssueBody()}
                </pre>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              修正する
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              <Send size={20} />
              <span>Issue作成</span>
            </button>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
            💡 Issue作成後、Claude Codeで「Issue #番号 を処理して」と言うと、自動でコード生成が始まります。
          </div>
        </div>
      )}
    </div>
  );
}
