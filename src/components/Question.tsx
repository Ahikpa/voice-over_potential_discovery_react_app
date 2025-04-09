import React from 'react';
import { Club, Diamond, Music } from 'lucide-react';

interface QuestionProps {
  question: {
    text: string;
    answers: { text: string; type: string }[];
  };
  onAnswer: (type: string) => void;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer, questionNumber, totalQuestions, selectedAnswer }) => {
  return (
    <div className="py-8 text-base leading-6 space-y-4">
      <p className="font-semibold">
        Question {questionNumber} / {totalQuestions}
      </p>
      <p>{question.text}</p>
      <div className="grid grid-cols-1 gap-4">
        {question.answers.map((answer, index) => {
          let icons = [];
          let textColor = 'text-gray-700'; // Default text color
          let bgColor = 'bg-blue-50 hover:bg-blue-200'; // Default background color

          if (answer.type.includes('club')) {
            icons.push(<Club className="inline-block mr-1 text-black" key="club" />);
            textColor = 'text-black';
          }
          if (answer.type.includes('music')) {
            icons.push(<Music className="inline-block mr-1 text-blue-500" key="music" />);
            textColor = 'text-blue-500';
          }
          if (answer.type.includes('diamond')) {
            icons.push(<Diamond className="inline-block mr-1 text-yellow-500" key="diamond" />);
            textColor = 'text-yellow-500';
          }

          return (
            <button
              key={index}
              className={`${bgColor} ${textColor} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                selectedAnswer === answer.type ? 'bg-blue-200' : ''
              } flex items-center`}
              onClick={() => onAnswer(answer.type)}
            >
              {icons}
              {answer.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
