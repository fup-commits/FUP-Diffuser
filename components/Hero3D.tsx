import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

// TypeScript Fix for R3F Elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: any;
      group: any;
      mesh: any;
      cylinderGeometry: any;
      boxGeometry: any;
      planeGeometry: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      primitive: any;
      group: any;
      mesh: any;
      cylinderGeometry: any;
      boxGeometry: any;
      planeGeometry: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

// 1. Procedural Diffuser Model (Replaces missing GLB)
const ProceduralDiffuser = (props: any) => {
  
  // Generate random reeds once
  const reeds = useMemo(() => {
     return Array.from({ length: 8 }).map((_, i) => {
        const spread = 0.15;
        // Random spread logic
        const x = (Math.random() - 0.5) * spread;
        const z = (Math.random() - 0.5) * spread;
        const leanX = (Math.random() - 0.5) * 0.25;
        const leanZ = (Math.random() - 0.5) * 0.25;
        const height = 4.0 + Math.random() * 0.5;
        
        return (
            <mesh key={i} position={[x, 1.8, z]} rotation={[leanX, 0, leanZ]} castShadow>
                <cylinderGeometry args={[0.015, 0.015, height, 8]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
            </mesh>
        )
     });
  }, []);

  return (
    <group {...props}>
        {/* Glass Bottle Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 2.2, 1.5]} />
            <meshPhysicalMaterial 
                transmission={0.98} 
                roughness={0.05} 
                thickness={2} 
                envMapIntensity={2.5} 
                clearcoat={1}
                color="#ffffff"
                ior={1.5}
            />
        </mesh>

        {/* Liquid Inside - Dark Amber/Red/Black */}
        <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[1.35, 1.7, 1.35]} />
            <meshStandardMaterial color="#3a0505" roughness={0.2} />
        </mesh>

        {/* Bottle Neck/Collar */}
        <mesh position={[0, 1.15, 0]} castShadow>
            <cylinderGeometry args={[0.28, 0.28, 0.4, 32]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Minimalist Front Label */}
        <mesh position={[0, 0, 0.76]}>
            <planeGeometry args={[1, 1.4]} />
            <meshStandardMaterial color="#f4f4f5" roughness={0.9} />
        </mesh>
        
        {/* Label Graphics (Simulated with simple geometry) */}
        <group position={[0, 0, 0.77]}>
            {/* Title Bar */}
            <mesh position={[0, 0.3, 0]}>
                <planeGeometry args={[0.6, 0.08]} />
                <meshStandardMaterial color="#000" />
            </mesh>
             {/* Subtitle Line */}
             <mesh position={[0, 0.15, 0]}>
                <planeGeometry args={[0.4, 0.01]} />
                <meshStandardMaterial color="#000" />
            </mesh>
             {/* Red Accent at bottom */}
             <mesh position={[0, -0.5, 0]}>
                <planeGeometry args={[0.15, 0.15]} />
                <meshStandardMaterial color="#FF3333" />
            </mesh>
        </group>

        {/* The Reeds */}
        {reeds}
    </group>
  );
};

// 2. Mouse Interaction Rig
const Rig = ({ children }: { children: React.ReactNode }) => {
    const group = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (group.current) {
            const targetY = state.pointer.x * 0.4; 
            const targetX = -state.pointer.y * 0.2; 
            
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
        }
    });

    return <group ref={group}>{children}</group>;
}

// 3. Minimal Loading Spinner
const LoadingFallback = () => {
    return (
        <group>
             <mesh rotation={[0.5, 0.5, 0]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#FF3333" wireframe />
             </mesh>
        </group>
    )
};

// 4. Error Boundary
class SceneErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.error("3D Scene Error:", error);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const Hero3D: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden">
      
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 16], fov: 25 }} 
            gl={{ preserveDrawingBuffer: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
            className="w-full h-full"
        >
            {/* Dramatic Studio Lighting */}
            <ambientLight intensity={0.4} />
            <spotLight 
                position={[10, 10, 10]} 
                angle={0.2} 
                penumbra={1} 
                intensity={3} 
                castShadow 
                shadow-bias={-0.0001}
            />
            <pointLight position={[-5, 2, -5]} intensity={2} color="#FF3333" distance={15} />
            <pointLight position={[5, -2, 5]} intensity={1} color="#4444ff" distance={15} />

            <Environment preset="city" blur={1} />

            {/* Scene Content */}
            <Suspense fallback={<LoadingFallback />}>
                <SceneErrorBoundary fallback={<LoadingFallback />}>
                     {/* Mouse Interaction Rig */}
                     <Rig>
                        <Float 
                            speed={1.5} 
                            rotationIntensity={0.2} 
                            floatIntensity={0.2} 
                            floatingRange={[-0.1, 0.1]}
                        >
                            {/* 
                                Model Configuration:
                                - Scale: 4.5 (Maintained)
                                - Position X: 2.5 (Maintained)
                                - Position Y: 0.2 (Maintained)
                                - Rotation: Tilted diagonally
                            */}
                            <ProceduralDiffuser 
                                scale={4.5} 
                                position={[2.5, 0.2, 0]} 
                                rotation={[0.3, -0.2, 0.2]} 
                            />
                        </Float>
                     </Rig>
                </SceneErrorBoundary>
            </Suspense>

            <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.6} far={10} color="#000000" />
            
        </Canvas>

        {/* Cinematic Vignette/Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none h-32 bottom-0"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 pointer-events-none">
         
         <div className="mb-12 mt-16">
            <div className="w-2 h-2 bg-[#FF3333] mb-8 shadow-[0_0_10px_#FF3333]"></div>
            <h1 className="text-6xl md:text-[7vw] lg:text-[8vw] font-display font-bold text-white leading-[1.1] tracking-tighter break-words drop-shadow-2xl">
                SCULPTURAL<br/>
                REED<br/>
                <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>DIFFUSERS</span>
            </h1>
         </div>
         
         <div className="space-y-8 max-w-lg pointer-events-auto">
             <p className="font-serif text-xl md:text-2xl text-neutral-300 italic leading-relaxed text-shadow-sm border-l-2 border-[#FF3333] pl-6 mix-blend-difference">
                 "Transform your home into a sanctuary with architectural scent objects."
             </p>
             <button className="group relative px-10 py-4 border border-white/30 bg-black/20 backdrop-blur-sm overflow-hidden transition-all hover:border-white">
                 <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                 <span className="relative font-bold uppercase tracking-[0.2em] text-xs text-white group-hover:text-black transition-colors">Shop Diffusers</span>
             </button>
         </div>
      </div>

      <div className="absolute top-28 right-8 z-20 flex flex-col items-end gap-2 pointer-events-none">
            <span className="text-[9px] bg-[#FF3333] text-white px-2 py-1 font-bold uppercase tracking-widest shadow-lg">Vol. 25</span>
            <span className="text-[9px] border border-white/30 text-white/80 px-2 py-1 font-bold uppercase tracking-widest backdrop-blur-sm">Est. 2024</span>
      </div>
      
    </div>
  );
};

export default Hero3D;