import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Robot } from './components/Robot';
import { Loader } from './components/Loader';
import { UI } from './components/UI';
import './styles/App.css';

function App() {
  const [currentAnimation, setCurrentAnimation] = useState('Idle');
  const [cameraReset, setCameraReset] = useState(0);

  const handleAnimationChange = (animationName: string) => {
    setCurrentAnimation(animationName);
  };

  const handleCameraReset = () => {
    setCameraReset(prev => prev + 1);
  };

  return (
    <div className="app">
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 1.5, 3], fov: 50 }}
          shadows
          gl={{ antialias: true, alpha: false }}
        >
          {/* Lighting Setup */}
          <ambientLight intensity={0.3} />
          <hemisphereLight intensity={0.4} groundColor="#444444" />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

          {/* Environment */}
          <Environment preset="city" background />

          {/* Ground with reflections */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.1} />
          </mesh>

          {/* Contact shadows for better grounding */}
          <ContactShadows
            position={[0, -0.99, 0]}
            opacity={0.4}
            scale={10}
            blur={1.5}
            far={4}
          />

          {/* Robot Model */}
          <Suspense fallback={null}>
            <Robot currentAnimation={currentAnimation} />
          </Suspense>

          {/* Camera Controls */}
          <OrbitControls
            key={cameraReset}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={8}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            target={[0, 0.5, 0]}
          />
        </Canvas>

        {/* Loading Screen */}
        <Suspense fallback={<Loader />}>
          <div style={{ display: 'none' }} />
        </Suspense>
      </div>

      {/* User Interface */}
      <UI
        currentAnimation={currentAnimation}
        onAnimationChange={handleAnimationChange}
        onCameraReset={handleCameraReset}
      />
    </div>
  );
}

export default App;