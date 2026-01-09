import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei';
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

// 1. Procedural Diffuser (Main Display)
// Since the GLB file is missing, this procedural generation acts as the primary visual.
// It creates a photorealistic glass bottle with reeds using standard Three.js primitives.
const ProceduralDiffuser = (props: any) => {
  const reeds = useMemo(() => {
     return Array.from({ length: 8 }).map((_, i) => {
        const spread = 0.12;
        const x = (Math.random() - 0.5) * spread;
        const z = (Math.random() - 0.5) * spread;
        const leanX = (Math.random() - 0.5) * 0.2;
        const leanZ = (Math.random() - 0.5) * 0.2;
        const height = 3.8 + Math.random() * 0.6;
        
        return (
            <mesh key={i} position={[x, 1.8, z]} rotation={[leanX, 0, leanZ]} castShadow>
                <cylinderGeometry args={[0.012, 0.012, height, 8]} />
                <meshStandardMaterial color="#050505" roughness={0.8} />
            </mesh>
        )
     });
  }, []);

  return (
    <group {...props}>
        {/* Glass Bottle Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.4, 2.0, 1.4]} />
            <meshPhysicalMaterial 
                transmission={0.99} 
                roughness={0.02} 
                thickness={2} 
                envMapIntensity={2.0} 
                clearcoat={1} 
                color="#ffffff" 
                ior={1.5}
                attenuationColor="#ffffff"
                attenuationDistance={0.5}
            />
        </mesh>
        {/* Liquid Inside - Dark Amber/Red */}
        <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[1.25, 1.6, 1.25]} />
            <meshStandardMaterial color="#2a0a0a" roughness={0.2} transparent opacity={0.9} />
        </mesh>
        {/* Bottle Neck */}
        <mesh position={[0, 1.05, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.35, 32]} />
            <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Label */}
        <mesh position={[0, -0.2, 0.71]}>
            <planeGeometry args={[0.9, 1.2]} />
            <meshStandardMaterial color="#f4f4f5" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Label Graphics */}
        <group position={[0, -0.2, 0.72]}>
             <mesh position={[0, 0.35, 0]}>
                <planeGeometry args={[0.4, 0.06]} />
                <meshStandardMaterial color="#050505" />
            </mesh>
             <mesh position={[0, 0.25, 0]}>
                <planeGeometry args={[0.2, 0.01]} />
                <meshStandardMaterial color="#050505" />
            </mesh>
            <mesh position={[0, -0.4, 0]}>
                <planeGeometry args={[0.1, 0.1]} />
                <meshStandardMaterial color="#FF3333" />
            </mesh>
        </group>
        {/* Reeds */}
        {reeds}
    </group>
  );
};

// 2. Real Model Loader
// NOTE: Set ATTEMPT_LOAD_GLB to true only if you have 'diffuser.glb' in your public folder.
const ATTEMPT_LOAD_GLB = false;

const Model = (props: any) => {
  if (!ATTEMPT_LOAD_GLB) return null;
  const { scene } = useGLTF('/diffuser.glb');
  
  React.useLayoutEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        
        if(obj.material) {
             obj.material.envMapIntensity = 1.5;
             obj.material.roughness = 0.2; 
             obj.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
};

// 3. Mouse Interaction Rig
const Rig = ({ children }: { children: React.ReactNode }) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            const targetY = state.pointer.x * 0.3; 
            const targetX = -state.pointer.y * 0.15; 
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
        }
    });
    return <group ref={group}>{children}</group>;
}

// 4. Silent Error Boundary
class ModelErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    // Intentionally empty to suppress console warnings
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// 5. Loading Spinner
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

const Hero3D: React.FC = () => {
  const modelProps = {
    scale: 4.5,
    position: [2.5, 0.2, 0],
    rotation: [0.3, -0.2, 0.2]
  };

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
            <ambientLight intensity={0.5} />
            <spotLight 
                position={[10, 10, 10]} 
                angle={0.25} 
                penumbra={1} 
                intensity={4} 
                castShadow 
                shadow-bias={-0.0001}
            />
            <pointLight position={[-5, 2, -5]} intensity={2} color="#FF3333" distance={15} />
            <pointLight position={[5, -2, 5]} intensity={1} color="#4444ff" distance={15} />

            <Environment preset="city" blur={1} background={false} />

            <Suspense fallback={<LoadingFallback />}>
                <Rig>
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2} floatingRange={[-0.1, 0.1]}>
                        
                        {ATTEMPT_LOAD_GLB ? (
                             <ModelErrorBoundary fallback={<ProceduralDiffuser {...modelProps} />}>
                                 <Model {...modelProps} />
                             </ModelErrorBoundary>
                        ) : (
                             <ProceduralDiffuser {...modelProps} />
                        )}

                    </Float>
                </Rig>
            </Suspense>

            <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.5} far={10} color="#000000" />
            
        </Canvas>

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