import React from 'react';




const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-amber-500"></div>
    </div>
  );
};

export default LoadingSpinner;
