'use client';

import { useState } from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';

interface Option {
  id: string;
  label: string;
  description?: string;
}

interface TutorialStepProps {
  step: number;
  title: string;
  content: string;
  options?: Option[];
  onSelect?: (optionId: string) => void;
  onNext?: () => void;
  isCompleted?: boolean;
}

export default function TutorialStep({
  step,
  title,
  content,
  options,
  onSelect,
  onNext,
  isCompleted,
}: TutorialStepProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
    onSelect?.(optionId);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${isCompleted ? 'border-2 border-green-500' : ''}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
          isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-pink-500 to-purple-600'
        }`}>
          {isCompleted ? <CheckCircle size={24} /> : step}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>

      <div className="prose prose-gray mb-6">
        <p className="whitespace-pre-wrap">{content}</p>
      </div>

      {options && options.length > 0 && (
        <div className="space-y-3 mb-6">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition ${
                selectedOption === option.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="font-medium text-gray-900">{option.label}</div>
              {option.description && (
                <div className="text-sm text-gray-600 mt-1">{option.description}</div>
              )}
            </button>
          ))}
        </div>
      )}

      {onNext && (
        <button
          onClick={onNext}
          disabled={options && !selectedOption}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>次へ進む</span>
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
