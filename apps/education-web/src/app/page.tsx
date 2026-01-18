'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Github, Zap, BookOpen, GitPullRequest } from 'lucide-react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-6xl">🌸</span>
          <br />
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            miyabi Learning
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI駆動開発フレームワーク「miyabi」の使い方を
          <br />
          対話型チュートリアルで学びましょう
        </p>
        <button
          onClick={() => signIn('github')}
          className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition shadow-lg"
        >
          <Github size={24} />
          <span>GitHubでログインして始める</span>
        </button>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Zap className="text-pink-500" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">コードを書かない開発</h3>
          <p className="text-gray-600">
            Issueを書くだけ。コード生成からPR作成まで、AIが自動で実行します。
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="text-purple-500" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">段階的な学習</h3>
          <p className="text-gray-600">
            Level 1からスタート。成功体験を積みながら、3週間でマスターへ。
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <GitPullRequest className="text-blue-500" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">実践的な課題</h3>
          <p className="text-gray-600">
            実際にIssueを作成し、PRを受け取る。本物の開発フローを体験。
          </p>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">学習の流れ</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">
              1
            </div>
            <div className="font-medium">基礎</div>
            <div className="text-sm text-gray-500">Issue作成・PRマージ</div>
          </div>
          <div className="text-4xl text-gray-300 hidden md:block">→</div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">
              2
            </div>
            <div className="font-medium">実践</div>
            <div className="text-sm text-gray-500">複雑なIssue・エスカレーション</div>
          </div>
          <div className="text-4xl text-gray-300 hidden md:block">→</div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">
              3
            </div>
            <div className="font-medium">応用</div>
            <div className="text-sm text-gray-500">並列処理・チーム展開</div>
          </div>
          <div className="text-4xl text-gray-300 hidden md:block">→</div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-2">
              🌸
            </div>
            <div className="font-medium">マスター</div>
            <div className="text-sm text-gray-500">雅の境地へ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
