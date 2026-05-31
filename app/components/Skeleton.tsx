import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export default function Skeleton({ className = '', style, width, height, borderRadius }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: width || '100%',
        height: height || '1rem',
        borderRadius: borderRadius || 'var(--radius-sm)',
        ...style
      }}
    />
  );
}
