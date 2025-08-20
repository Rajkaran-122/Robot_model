import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import { Group, AnimationMixer } from 'three';

interface RobotProps {
  currentAnimation: string;
}

interface AnnotationProps {
  position: [number, number, number];
  title: string;
  description: string;
}

const Annotation: React.FC<AnnotationProps> = ({ position, title, description }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Html position={position} center>
      <div className="annotation-hotspot" onClick={() => setVisible(!visible)}>
        <div className="hotspot-dot" />
        {visible && (
          <div className="annotation-popup">
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={() => setVisible(false)}>×</button>
          </div>
        )}
      </div>
    </Html>
  );
};

export const Robot: React.FC<RobotProps> = ({ currentAnimation }) => {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF('/RobotExpressive.glb');
  const { actions, mixer } = useAnimations(animations, group);
  const [previousAnimation, setPreviousAnimation] = useState<string>('');

  // Handle animation transitions with smooth cross-fading
  useEffect(() => {
    if (actions && currentAnimation && actions[currentAnimation]) {
      const newAction = actions[currentAnimation];
      
      if (previousAnimation && actions[previousAnimation] && previousAnimation !== currentAnimation) {
        const prevAction = actions[previousAnimation];
        
        // Cross-fade from previous to new animation
        newAction.reset().fadeIn(0.5).play();
        prevAction.fadeOut(0.5);
        
        // Clean up the previous action after fade out
        setTimeout(() => {
          prevAction.stop();
        }, 500);
      } else {
        // First animation or same animation
        newAction.reset().fadeIn(0.2).play();
      }
      
      setPreviousAnimation(currentAnimation);
    }
  }, [currentAnimation, actions, previousAnimation]);

  // Ensure the model casts and receives shadows
  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  // Update animation mixer
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={1} position={[0, -1, 0]} />
      
      {/* Annotation Hotspots */}
      <Annotation
        position={[0, 1.2, 0]}
        title="Head Unit"
        description="Contains primary sensors and processing unit for environmental awareness and decision making."
      />
      <Annotation
        position={[0, 0.3, 0.2]}
        title="Power Core"
        description="Central energy source providing power to all robotic systems and actuators."
      />
    </group>
  );
};

// Preload the model
useGLTF.preload('/RobotExpressive.glb');