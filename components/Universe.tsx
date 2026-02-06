import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import Soul from './Soul';
import Connection from './Connection';
import { useUniverseStore } from '../store/universeStore';
import * as THREE from 'three';

export default function Universe() {
  const souls = useUniverseStore((state) => state.souls);
  const connections = useUniverseStore((state) => state.connections);
  const mode = useUniverseStore((state) => state.mode);

  return (
    <div className="w-full h-screen">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 5, 15]} />
          
          {/* Lights */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4a90e2" />

          {/* Background stars */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={mode === 'festival' ? 2 : 1}
          />

          {/* Nebula effect */}
          <mesh position={[0, 0, -30]}>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial
              color={mode === 'meditation' ? '#1a0b2e' : '#16213e'}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Render all souls */}
          {souls.map((soul) => (
            <Soul key={soul.id} soul={soul} />
          ))}

          {/* Render all connections */}
          {connections.map((connection) => (
            <Connection key={connection.id} connection={connection} />
          ))}

          {/* Camera controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            autoRotate={mode === 'galaxy'}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}