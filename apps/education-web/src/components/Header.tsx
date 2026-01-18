'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { BookOpen, LayoutDashboard, FileText, LogOut, Github } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-3xl">🌸</span>
            <span>miyabi Learning</span>
          </Link>

          {session ? (
            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded-lg transition"
                >
                  <LayoutDashboard size={20} />
                  <span>ダッシュボード</span>
                </Link>
                <Link
                  href="/learn"
                  className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded-lg transition"
                >
                  <BookOpen size={20} />
                  <span>学習</span>
                </Link>
                <Link
                  href="/issues"
                  className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded-lg transition"
                >
                  <FileText size={20} />
                  <span>Issue</span>
                </Link>
              </nav>

              <div className="flex items-center gap-3 border-l border-white/30 pl-6">
                <img
                  src={session.user?.image || ''}
                  alt={session.user?.name || ''}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => signIn('github')}
              className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              <Github size={20} />
              <span>GitHubでログイン</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
