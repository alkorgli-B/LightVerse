import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Soul as SoulType, useUniverseStore } from '../store/universeStore';

interface SoulProps {
  soul: SoulType;
}

export default function Soul({ soul }: SoulProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const setSelectedSoul = useUniverseStore((state) => state.setSelectedSoul);
  const mode = useUniverseStore((state) => state.mode);

  // Animation based on mode
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const baseSpeed = soul.speed * 0.1;

    switch (mode) {
      case 'ocean':
        // Swimming motion
        meshRef.current.position.y = soul.position[1] + Math.sin(time * baseSpeed + soul.position[0]) * 0.5;
        meshRef.current.position.x = soul.position[0] + Math.cos(time * baseSpeed * 0.5) * 0.3;
        break;
      
      case 'galaxy':
        // Spiral motion
        const radius = Math.sqrt(soul.position[0] ** 2 + soul.position[2] ** 2);
        const angle = Math.atan2(soul.position[2], soul.position[0]) + baseSpeed * 0.01;
        meshRef.current.position.x = Math.cos(angle) * radius;
        meshRef.current.position.z = Math.sin(angle) * radius;
        break;
      
      case 'meditation':
        // Slow breathing
        const scale = 1 + Math.sin(time * 0.5) * 0.05;
        meshRef.current.scale.setScalar(scale);
        break;
      
      case 'festival':
        // Bouncing
        meshRef.current.position.y = soul.position[1] + Math.abs(Math.sin(time * 2 + soul.position[0])) * 2;
        break;
      
      default:
        // Normal floating
        meshRef.current.position.y = soul.position[1] + Math.sin(time * baseSpeed) * 0.2;
    }

    // Pulsing glow
    if (glowRef.current) {
      const glowIntensity = 0.5 + Math.sin(time * 2) * 0.2;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowIntensity;
    }

    // Rotation
    meshRef.current.rotation.y += 0.001;
    meshRef.current.rotation.x += 0.0005;
  });

  return (
    <group position={soul.position}>
      {/* Main sphere */}
      <Sphere
        ref={meshRef}
        args={[soul.size, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setSelectedSoul(soul)}
      >
        <meshStandardMaterial
          color={soul.color}
          emissive={soul.color}
          emissiveIntensity={soul.isStarred ? 2 : hovered ? 1.5 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Glow effect */}
      <Sphere ref={glowRef} args={[soul.size * 1.5, 32, 32]}>
        <meshBasicMaterial
          color={soul.color}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Particle trail */}
      {soul.isStarred && (
        <Sphere args={[soul.size * 2, 16, 16]}>
          <meshBasicMaterial
            color={soul.color}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>
      )}

      {/* Message tooltip on hover */}
      {hovered && soul.message && (
        <Html distanceFactor={10} position={[0, soul.size + 0.5, 0]}>
          <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-sm max-w-xs backdrop-blur-sm border border-white/20">
            <p className="mb-1 text-xs text-gray-400">
              {new Date(soul.createdAt).toLocaleDateString('ar')}
            </p>
            <p className="font-arabic">{soul.message}</p>
            {soul.energy > 0 && (
              <p className="mt-1 text-xs text-yellow-400">
                ⚡ {soul.energy} طاقة
              </p>
            )}
          </div>
        </Html>
      )}

      {/* Energy indicator */}
      {soul.energy > 50 && (
        <Sphere args={[soul.size * 0.3, 8, 8]} position={[0, soul.size + 0.3, 0]}>
          <meshBasicMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
        </Sphere>
      )}
    </group>
  );
}
