'use client';

import { CheckCircle, Circle, Lock } from 'lucide-react';
import Link from 'next/link';

interface ProgressCardProps {
  level: number;
  title: string;
  description: string;
  completedTasks: number;
  totalTasks: number;
  isUnlocked: boolean;
}

export default function ProgressCard({
  level,
  title,
  description,
  completedTasks,
  totalTasks,
  isUnlocked,
}: ProgressCardProps) {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const isCompleted = completedTasks === totalTasks && totalTasks > 0;

  return (
    <div
      className={`relative rounded-2xl p-6 shadow-lg transition-all ${
        isUnlocked
          ? 'bg-white hover:shadow-xl cursor-pointer'
          : 'bg-gray-100 opacity-60'
      }`}
    >
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 rounded-2xl">
          <Lock className="text-gray-400" size={40} />
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-sm font-medium text-purple-600">Level {level}</span>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        {isCompleted ? (
          <CheckCircle className="text-green-500" size={28} />
        ) : (
          <Circle className="text-gray-300" size={28} />
        )}
      </div>

      <p className="text-gray-600 mb-4">{description}</p>

      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">進捗</span>
          <span className="font-medium">{completedTasks}/{totalTasks}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {isUnlocked && (
        <Link
          href={`/learn/level-${level}`}
          className="block mt-4 text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          {isCompleted ? '復習する' : '学習を始める'}
        </Link>
      )}
    </div>
  );
}
