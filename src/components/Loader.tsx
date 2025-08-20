import React from 'react';
import { useProgress } from '@react-three/drei';

export const Loader: React.FC = () => {
  const { progress, loaded, total } = useProgress();

  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="robot-icon">🤖</div>
        <h2>Loading Robot Model</h2>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-text">
          {progress.toFixed(0)}% ({loaded} / {total} files)
        </div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};