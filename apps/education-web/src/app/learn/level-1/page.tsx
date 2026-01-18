'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function Level1() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1-1',
      title: 'はじめてのIssue',
      description: 'Issueを作成してPRを得る体験をする',
      completed: false,
    },
    {
      id: '1-2',
      title: '機能追加Issue',
      description: '複数の要件を含むIssueを書いてみる',
      completed: false,
    },
    {
      id: '1-3',
      title: 'PRレビューの練習',
      description: 'PRの内容を確認する習慣をつける',
      completed: false,
    },
  ]);
  const [currentTask, setCurrentTask] = useState(0);

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

  const completeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
    if (index < tasks.length - 1) {
      setCurrentTask(index + 1);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const isLevelComplete = completedCount === tasks.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
          <span className="text-sm font-medium">Level 1</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">基礎</h1>
        <p className="text-gray-600">
          コードを書かずにPRを作る体験をしよう
        </p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>進捗</span>
            <span>{completedCount}/{tasks.length}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4 mb-8">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`bg-white rounded-xl p-6 shadow-lg border-2 transition ${
              index === currentTask && !task.completed
                ? 'border-purple-500'
                : task.completed
                ? 'border-green-500'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {task.completed ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : (
                  <Circle className="text-gray-300" size={24} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">
                  課題 {task.id}: {task.title}
                </h3>
                <p className="text-gray-600 mt-1">{task.description}</p>

                {index === currentTask && !task.completed && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    {index === 0 && (
                      <>
                        <p className="mb-4">
                          以下のIssueを作成してみましょう。「Issue作成」ボタンをクリックすると、Issue作成ページに移動します。
                        </p>
                        <div className="bg-white p-4 rounded border mb-4 font-mono text-sm">
                          <div><strong>タイトル:</strong> 機能: Hello Worldを表示する</div>
                          <div className="mt-2">
                            <strong>本文:</strong>
                            <pre className="mt-1 whitespace-pre-wrap">
{`## 概要
コンソールに「Hello World」と表示する機能を作りたい`}
                            </pre>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Link
                            href="/issues/new"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
                          >
                            Issue作成ページへ
                          </Link>
                          <button
                            onClick={() => completeTask(index)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
                          >
                            作成できた！
                          </button>
                        </div>
                      </>
                    )}

                    {index === 1 && (
                      <>
                        <p className="mb-4">
                          もう少し複雑なIssueを書いてみましょう。複数の要件を含むIssueです。
                        </p>
                        <div className="bg-white p-4 rounded border mb-4 font-mono text-sm">
                          <div><strong>タイトル:</strong> 機能: 挨拶関数の追加</div>
                          <div className="mt-2">
                            <strong>本文:</strong>
                            <pre className="mt-1 whitespace-pre-wrap">
{`## 概要
名前を受け取って挨拶を返す関数を作りたい

## やりたいこと
- greet(name) 関数を作成
- 「Hello, {name}!」を返す
- テストも書いてほしい`}
                            </pre>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Link
                            href="/issues/new"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
                          >
                            Issue作成ページへ
                          </Link>
                          <button
                            onClick={() => completeTask(index)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
                          >
                            作成できた！
                          </button>
                        </div>
                      </>
                    )}

                    {index === 2 && (
                      <>
                        <p className="mb-4">
                          PRが来たら、内容を確認する習慣をつけましょう。
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-2">
                          <li>変更されたファイルを確認</li>
                          <li>テストが通っているか確認</li>
                          <li>コードの内容を見る（読めなくてもOK）</li>
                        </ul>
                        <button
                          onClick={() => completeTask(index)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
                        >
                          PRを確認してマージした！
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Level Complete */}
      {isLevelComplete && (
        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">🎉 Level 1 完了！</h2>
          <p className="mb-4">
            おめでとうございます！基礎をマスターしました。
            <br />
            コードを1行も書かずにPRを作成できましたね。これがmiyabiの力です。
          </p>
          <Link
            href="/learn/level-2"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            <span>Level 2へ進む</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
}
