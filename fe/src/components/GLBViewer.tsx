import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <primitive
      object={scene}
      scale={2}
      rotation={[0, 3 * (Math.PI) / 2, 0]}
    />
  );
}

export default function GLBViewer({ url }: { url: string }) {
  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden flex flex-col items-center justify-center"
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model url={url} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={8}
        />
      </Canvas>
    </div>
  );
}