import React, { useEffect, useState } from 'react';

const LoadingConfirmationSpinner: React.FC = () => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 500); // 100 steps * 500ms = 50 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center py-8">
      <div className="relative">
        <div className="animate-spin-slow rounded-full h-20 w-20 border-4 border-t-transparent border-amber-500"></div>
        <div className="absolute inset-0 flex justify-center items-center text-amber-600 font-semibold">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingConfirmationSpinner;
