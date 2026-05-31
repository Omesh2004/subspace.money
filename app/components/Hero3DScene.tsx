'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Floating Credit Card ─── */
function CreditCard() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Gentle mouse follow
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.3,
      2 * delta
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -pointer.y * 0.2,
      2 * delta
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={meshRef} position={[0, 0, 0]}>
        {/* Card body */}
        <RoundedBox args={[3.4, 2.1, 0.08]} radius={0.12} smoothness={4}>
          <meshPhysicalMaterial
            color="#1a103d"
            metalness={0.6}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        {/* Card gradient overlay */}
        <RoundedBox args={[3.38, 2.08, 0.085]} radius={0.12} smoothness={4} position={[0, 0, 0.002]}>
          <meshPhysicalMaterial
            color="#2d1b69"
            metalness={0.4}
            roughness={0.3}
            transparent
            opacity={0.5}
            clearcoat={0.8}
          />
        </RoundedBox>

        {/* Chip */}
        <RoundedBox args={[0.4, 0.3, 0.1]} radius={0.04} smoothness={2} position={[-0.9, 0.3, 0.06]}>
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </RoundedBox>

        {/* Logo circle */}
        <mesh position={[1.2, 0.6, 0.06]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[1.0, 0.6, 0.06]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} transparent opacity={0.7} />
        </mesh>

        {/* Text lines (simulated) */}
        <RoundedBox args={[1.4, 0.06, 0.09]} radius={0.02} smoothness={2} position={[-0.5, -0.3, 0.05]}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.8, 0.06, 0.09]} radius={0.02} smoothness={2} position={[-0.8, -0.5, 0.05]}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.06, 0.09]} radius={0.02} smoothness={2} position={[0.9, -0.5, 0.05]}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.15} />
        </RoundedBox>
      </group>
    </Float>
  );
}

/* ─── Subscription Orb ─── */
function SubscriptionOrb({
  position,
  color,
  label,
  delay,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(delay);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta;
    // Orbital motion around center
    const angle = time.current * 0.4 + delay;
    const radius = Math.sqrt(position[0] ** 2 + position[2] ** 2);
    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius;
    meshRef.current.position.y = position[1] + Math.sin(time.current * 0.8) * 0.2;
  });

  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <Sphere args={[0.3, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.15}
            speed={2}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

/* ─── Particle Field ─── */
function ParticleField() {
  const count = 250;
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const violet = new THREE.Color('#8b5cf6');
    const cyan = new THREE.Color('#06b6d4');
    for (let i = 0; i < count; i++) {
      const c = Math.random() > 0.5 ? violet : cyan;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ─── Glowing Ring ─── */
function GlowRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -1]}>
      <torusGeometry args={[2.8, 0.015, 16, 100]} />
      <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} transparent opacity={0.4} />
    </mesh>
  );
}

/* ─── Main Scene ─── */
export default function Hero3DScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-3, 2, 3]} intensity={0.6} color="#8b5cf6" />
        <pointLight position={[3, -2, 2]} intensity={0.4} color="#06b6d4" />

        <CreditCard />

        <SubscriptionOrb position={[2.5, 1, 1]} color="#e50914" label="N" delay={0} />
        <SubscriptionOrb position={[-2.2, 0.8, 0.5]} color="#1db954" label="S" delay={1.5} />
        <SubscriptionOrb position={[1.8, -1, 1.5]} color="#ff9900" label="A" delay={3} />
        <SubscriptionOrb position={[-2, -0.5, 1]} color="#1da1f2" label="T" delay={4.5} />
        <SubscriptionOrb position={[0.5, 1.5, 2]} color="#ff0050" label="Y" delay={6} />

        <GlowRing />
        <ParticleField />
      </Canvas>
    </div>
  );
}
