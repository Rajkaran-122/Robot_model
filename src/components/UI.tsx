import React from 'react';

interface UIProps {
  currentAnimation: string;
  onAnimationChange: (animation: string) => void;
  onCameraReset: () => void;
}

const animations = [
  { name: 'Idle', label: 'Idle', icon: '🧍' },
  { name: 'Walking', label: 'Walk', icon: '🚶' },
  { name: 'Running', label: 'Run', icon: '🏃' },
  { name: 'Dance', label: 'Dance', icon: '💃' },
  { name: 'Death', label: 'Power Down', icon: '⚡' },
  { name: 'Sitting', label: 'Sit', icon: '🪑' },
  { name: 'Standing', label: 'Stand', icon: '🕴️' },
];

export const UI: React.FC<UIProps> = ({ 
  currentAnimation, 
  onAnimationChange, 
  onCameraReset 
}) => {
  return (
    <div className="ui-container">
      <div className="ui-header">
        <h1>🤖 Advanced Robot Model Viewer</h1>
        <p>Interactive 3D robot with smooth animations and realistic environment</p>
      </div>

      <div className="controls-section">
        <h3>Animation Controls</h3>
        <div className="animation-buttons">
          {animations.map((anim) => (
            <button
              key={anim.name}
              className={`animation-btn ${currentAnimation === anim.name ? 'active' : ''}`}
              onClick={() => onAnimationChange(anim.name)}
              title={`Play ${anim.label} animation`}
            >
              <span className="btn-icon">{anim.icon}</span>
              <span className="btn-label">{anim.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="controls-section">
        <h3>Camera Controls</h3>
        <button 
          className="camera-reset-btn"
          onClick={onCameraReset}
          title="Reset camera to default position"
        >
          <span className="btn-icon">📷</span>
          <span className="btn-label">Reset Camera</span>
        </button>
      </div>

      <div className="info-section">
        <h3>Instructions</h3>
        <ul>
          <li>🖱️ <strong>Mouse:</strong> Orbit around the robot</li>
          <li>🔍 <strong>Scroll:</strong> Zoom in/out</li>
          <li>📍 <strong>Hotspots:</strong> Click on the robot's head or chest</li>
          <li>🎬 <strong>Animations:</strong> Smooth transitions between all states</li>
        </ul>
      </div>
    </div>
  );
};