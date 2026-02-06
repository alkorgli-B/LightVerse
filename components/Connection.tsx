import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { Connection as ConnectionType, useUniverseStore } from '../store/universeStore';

interface ConnectionProps {
  connection: ConnectionType;
}

export default function Connection({ connection }: ConnectionProps) {
  const lineRef = useRef<any>(null);
  const souls = useUniverseStore((state) => state.souls);

  const fromSoul = souls.find((s) => s.id === connection.fromId);
  const toSoul = souls.find((s) => s.id === connection.toId);

  // Calculate curve points
  const points = useMemo(() => {
    if (!fromSoul || !toSoul) return [];

    const from = new THREE.Vector3(...fromSoul.position);
    const to = new THREE.Vector3(...toSoul.position);
    const mid = new THREE.Vector3().lerpVectors(from, to, 0.5);
    
    // Add curve height
    const distance = from.distanceTo(to);
    mid.y += distance * 0.2;

    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    return curve.getPoints(50);
  }, [fromSoul, toSoul]);

  // Animate the line
  useFrame((state) => {
    if (!lineRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const material = lineRef.current.material;
    
    if (material) {
      // Pulsing effect
      material.opacity = 0.3 + Math.sin(time * 3) * 0.2;
    }
  });

  if (!fromSoul || !toSoul || points.length === 0) return null;

  // Mix colors
  const color = new THREE.Color(fromSoul.color).lerp(
    new THREE.Color(toSoul.color),
    0.5
  );

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={0.5}
    />
  );
}