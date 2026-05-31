'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Torus, Sphere, Cone, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Individual 3D Icons ─── */
function TrackIcon() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <Float speed={2} floatIntensity={0.4}>
      <group ref={groupRef}>
        <Torus args={[0.7, 0.15, 16, 32, Math.PI * 1.5]} rotation={[0, 0, Math.PI / 4]}>
          <meshPhysicalMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} metalness={0.7} roughness={0.2} />
        </Torus>
        <Sphere args={[0.12, 16, 16]} position={[0.5, 0.5, 0]}>
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
        </Sphere>
      </group>
    </Float>
  );
}

function SplitIcon() {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (leftRef.current) {
      leftRef.current.position.x = -0.3 - Math.sin(t * 1.2) * 0.15;
      leftRef.current.rotation.y = t * 0.8;
    }
    if (rightRef.current) {
      rightRef.current.position.x = 0.3 + Math.sin(t * 1.2) * 0.15;
      rightRef.current.rotation.y = -t * 0.8;
    }
  });
  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <group>
        <mesh ref={leftRef} position={[-0.3, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 32]} />
          <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.1} emissive="#d4af37" emissiveIntensity={0.2} />
        </mesh>
        <mesh ref={rightRef} position={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 32]} />
          <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.1} emissive="#d4af37" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function SaveIcon() {
  const shieldRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (shieldRef.current) {
      shieldRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });
  return (
    <Float speed={2} floatIntensity={0.5}>
      <group ref={shieldRef}>
        <RoundedBox args={[0.8, 1, 0.15]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} metalness={0.5} roughness={0.3} clearcoat={0.8} />
        </RoundedBox>
        <Cone args={[0.4, 0.4, 4]} position={[0, -0.7, 0]}>
          <meshPhysicalMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} metalness={0.5} roughness={0.3} />
        </Cone>
      </group>
    </Float>
  );
}

function DiscoverIcon() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });
  return (
    <Float speed={1.8} floatIntensity={0.4}>
      <group ref={groupRef}>
        <Sphere args={[0.5, 32, 32]}>
          <meshPhysicalMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.4}
            transparent
            opacity={0.6}
            wireframe
          />
        </Sphere>
        <Sphere args={[0.12, 16, 16]} position={[0.35, 0.2, 0.3]}>
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
        </Sphere>
      </group>
    </Float>
  );
}

/* ─── Mini Canvas Wrapper ─── */
function Feature3DIcon({ type }: { type: 'track' | 'split' | 'save' | 'discover' }) {
  const icons = {
    track: <TrackIcon />,
    split: <SplitIcon />,
    save: <SaveIcon />,
    discover: <DiscoverIcon />,
  };

  return (
    <div style={{ width: 120, height: 120 }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        frameloop="always"
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[-3, -2, 2]} intensity={0.5} color="#06b6d4" />
        {icons[type]}
      </Canvas>
    </div>
  );
}

export default Feature3DIcon;
