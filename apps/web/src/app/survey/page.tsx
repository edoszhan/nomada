'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type Question = {
  id: number;
  text: string;
  options: string[];
  placeholder: string;
};

const questions: Question[] = [
  {
    id: 1,
    text: "Do you prefer quiet or lively work environment?",
    options: ["quiet", "lively", "flexible"],
    placeholder: "Want to say something more on that?..."
  },
  {
    id: 2,
    text: "Do you have any food preferences?",
    options: ["Halal", "vegetarian", "anything"],
    placeholder: "Any specific dietary requirements?..."
  },
  {
    id: 3,
    text: "How often do you like to change locations?",
    options: ["weekly", "every month", "every 3 month"],
    placeholder: "Any specific preferences about locations?..."
  }
];

export default function SurveyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, { option: string; details: string }>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOptionSelect = (questionId: number, option: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], option }
    }));

    if (questionId < questions.length) {
      setCurrentQuestion(questionId + 1);
    } else {
      setIsLoading(true);
      // Simulate loading animation
      setTimeout(() => {
        router.push('/panel');
      }, 3000); // Adjust timing based on your animation
    }
  };

  const handleDetailsChange = (questionId: number, details: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], details }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-4xl font-bold"
          >
            <LoadingAnimation />
          </motion.div>
        ) : (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl space-y-8"
          >
            {questions.map((question) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: currentQuestion >= question.id ? 1 : 0,
                  y: currentQuestion >= question.id ? 0 : 20
                }}
                transition={{ duration: 0.5 }}
                className={`space-y-4 ${currentQuestion >= question.id ? 'block' : 'hidden'}`}
              >
                <h2 className="text-2xl font-semibold">{question.text}</h2>
                <div className="grid grid-cols-3 gap-4">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(question.id, option)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        answers[question.id]?.option === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder={question.placeholder}
                  value={answers[question.id]?.details || ''}
                  onChange={(e) => handleDetailsChange(question.id, e.target.value)}
                  className="w-full p-3 border rounded-lg text-gray-500"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoadingAnimation() {
  const [text, setText] = useState('N');
  const letters = ['N', 'No', 'Nom', 'Noma', 'Nomad', 'Nomadi', 'Nomadin', 'Nomading'];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(letters[index]);
      index++;
      if (index >= letters.length) {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <span className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        {text}
      </span>
    </motion.div>
  );
} 