import React from 'react';

interface ResultProps {
  resultText: string;
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ resultText, onReset }) => {
  return (
    <div className="py-8 text-base leading-6 space-y-4">
      <h2 className="text-xl font-semibold">Résultat</h2>
      
      <p>{resultText}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onReset}
      >
        Refaire le test
      </button>
    </div>
  );
};

export default Result;
