'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function SpinCoin() {
  const coinRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const prevX = useRef(0);
  const velocity = useRef(0.3);

  useFrame((_, delta) => {
    if (!coinRef.current) return;
    if (!isDragging.current) {
      coinRef.current.rotation.y += velocity.current * delta * 3;
      velocity.current = THREE.MathUtils.lerp(velocity.current, 0.3, 0.01);
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <group
        ref={coinRef}
        onPointerDown={(e) => {
          isDragging.current = true;
          prevX.current = e.clientX;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!isDragging.current || !coinRef.current) return;
          const dx = e.clientX - prevX.current;
          coinRef.current.rotation.y += dx * 0.01;
          velocity.current = dx * 0.05;
          prevX.current = e.clientX;
        }}
        onPointerUp={() => { isDragging.current = false; }}
      >
        {/* Main coin */}
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 0.15, 64]} />
          <meshPhysicalMaterial color="#d4af37" metalness={0.95} roughness={0.05} clearcoat={1} clearcoatRoughness={0.05} emissive="#d4af37" emissiveIntensity={0.1} />
        </mesh>
        {/* Coin edge detail */}
        <mesh>
          <torusGeometry args={[1.2, 0.04, 8, 64]} />
          <meshStandardMaterial color="#b8941f" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Front face - S logo */}
        <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.5, 32]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.4} side={THREE.DoubleSide} />
        </mesh>
        {/* Back face - ₹ indicator ring */}
        <mesh position={[0, 0, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.5, 32]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
}

function Coin3DScene() {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 40 }} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent', cursor: 'grab' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, 3]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[3, -2, 2]} intensity={0.4} color="#d4af37" />
        <SpinCoin />
      </Canvas>
    </div>
  );
}

const DynamicCoin = Coin3DScene;

const savings = [
  { label: 'Netflix Family', original: '₹649', split: '₹162', save: '75%' },
  { label: 'Spotify Premium', original: '₹119', split: '₹30', save: '74%' },
  { label: 'YouTube Premium', original: '₹149', split: '₹38', save: '74%' },
];

export default function SplitSection() {
  return (
    <section id="split" className="section-padding" style={{ position: 'relative' }}>
      <div className="glow-orb glow-orb-violet" style={{ width: 400, height: 400, bottom: '10%', right: '-5%', opacity: 0.15 }} />
      <div className="section-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {/* Left content */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
            <span style={{ display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.2)', fontSize: '0.8rem', color: '#d4af37', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>Split & Save</span>
            <h2 className="heading-section">Split subscriptions,<br /><span className="gradient-text">not friendships</span></h2>
            <p className="text-body" style={{ marginTop: '1rem', maxWidth: 440 }}>Share premium subscriptions with trusted friends. Everyone pays their fair share — automatically, every month.</p>

            {/* Savings table */}
            <div className="glass-card" style={{ marginTop: '2rem', padding: '1.5rem', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.7fr', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <span>Service</span><span>Full Price</span><span>Your Share</span><span>Save</span>
              </div>
              {savings.map((s) => (
                <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.7fr', gap: '0.5rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.9rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{s.label}</span>
                  <span style={{ color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>{s.original}</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{s.split}</span>
                  <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, textAlign: 'center' }}>{s.save}</span>
                </div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="glass-card" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', marginTop: '1.5rem' }}>
              <div className="stat-value" style={{ fontSize: '2rem' }}>₹2,400</div>
              <div><div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Avg. Annual Savings</div><div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>per user on Subspace</div></div>
            </motion.div>
          </motion.div>

          {/* Right 3D Coin */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Suspense fallback={<div style={{ width: '100%', height: 350 }} />}>
              <DynamicCoin />
            </Suspense>
            <p className="text-small" style={{ textAlign: 'center', marginTop: '0.5rem' }}>🖱️ Drag to spin the coin</p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
