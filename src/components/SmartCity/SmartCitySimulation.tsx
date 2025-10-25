import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Cylinder, Plane } from "@react-three/drei";
import * as THREE from "three";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Simple Street Light Component
const StreetLight = ({ 
  position, 
  brightness = 25 
}: { 
  position: [number, number, number]; 
  brightness?: number; 
}) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const poleRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      const targetIntensity = (brightness / 100) * 2;
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetIntensity, 0.05);
    }
    
    // Subtle sway in the wind
    if (poleRef.current) {
      poleRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.008;
    }
  });
  
  return (
    <group position={position}>
      {/* Pole Base */}
      <Cylinder
        args={[0.12, 0.12, 0.15]}
        position={[0, 0.075, 0]}
        material-color="#444444"
      />
      
      {/* Light Pole */}
      <Cylinder
        ref={poleRef}
        args={[0.06, 0.08, 3.5]}
        position={[0, 1.75, 0]}
        material-color="#666666"
      />
      
      {/* Light Fixture */}
      <Box
        args={[0.4, 0.2, 0.3]}
        position={[0, 3.6, 0]}
        material-color="#333333"
      />
      
      {/* LED Light */}
      <Box
        args={[0.35, 0.03, 0.25]}
        position={[0, 3.45, 0]}
        material-color="#FFFFFF"
        material-emissive="#FFFFFF"
        material-emissiveIntensity={brightness / 300}
      />
      
      {/* Point Light */}
      <pointLight
        ref={lightRef}
        position={[0, 3.5, 0]}
        color="#FFFFFF"
        intensity={(brightness / 100) * 2}
        distance={10}
        decay={2}
      />
    </group>
  );
};

// Simple Street Environment
const CityStreet = () => {
  return (
    <group>
      {/* Main Asphalt Road - 4 Lanes */}
      <Plane
        args={[25, 10]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        material-color="#1a1a1a"
      />
      
      {/* Yellow Center Lane Divider - Dashed */}
      {Array.from({ length: 12 }, (_, i) => (
        <Box
          key={`center-dash-${i}`}
          args={[1.5, 0.01, 0.15]}
          position={[i * 2.2 - 12, 0.005, 0]}
          material-color="#FFD700"
        />
      ))}
      
      {/* White Lane Markings */}
      {Array.from({ length: 12 }, (_, i) => (
        <Box
          key={`lane-white-1-${i}`}
          args={[1.5, 0.01, 0.1]}
          position={[i * 2.2 - 12, 0.005, -2.5]}
          material-color="#FFFFFF"
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <Box
          key={`lane-white-2-${i}`}
          args={[1.5, 0.01, 0.1]}
          position={[i * 2.2 - 12, 0.005, 2.5]}
          material-color="#FFFFFF"
        />
      ))}
      
      {/* Road Edges */}
      <Box
        args={[25, 0.01, 0.15]}
        position={[0, 0.005, 5]}
        material-color="#FFFFFF"
      />
      <Box
        args={[25, 0.01, 0.15]}
        position={[0, 0.005, -5]}
        material-color="#FFFFFF"
      />
      
      {/* Grey Concrete Sidewalks */}
      <Plane
        args={[25, 2.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.05, 6.25]}
        material-color="#5a5a5a"
      />
      <Plane
        args={[25, 2.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.05, -6.25]}
        material-color="#5a5a5a"
      />
      
      {/* Sidewalk Curbs */}
      <Box
        args={[25, 0.15, 0.2]}
        position={[0, 0.075, 5.1]}
        material-color="#808080"
      />
      <Box
        args={[25, 0.15, 0.2]}
        position={[0, 0.075, -5.1]}
        material-color="#808080"
      />
      
      {/* Simple Trees */}
      {Array.from({ length: 4 }, (_, i) => (
        <group key={`tree-${i}`} position={[i * 6 - 9, 0, 7]}>
          <Cylinder
            args={[0.1, 0.15, 2.5]}
            position={[0, 1.25, 0]}
            material-color="#4A4A4A"
          />
          <Cylinder
            args={[1.2, 0.8, 2]}
            position={[0, 3.5, 0]}
            material-color="#1B4332"
          />
        </group>
      ))}
      
      {/* Simple Bus Stop */}
      <group position={[6, 0, 7]}>
        <Box
          args={[0.08, 2.5, 1.5]}
          position={[0, 1.25, 0]}
          material-color="#4A4A4A"
        />
        <Box
          args={[1.2, 0.08, 1.5]}
          position={[0.6, 2.4, 0]}
          material-color="#4A4A4A"
        />
        <Box
          args={[1, 0.08, 0.3]}
          position={[0.5, 0.4, 0]}
          material-color="#654321"
        />
      </group>
      
      {/* Ground Extension */}
      <Plane
        args={[40, 40]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        material-color="#0a0a0a"
      />
    </group>
  );
};

const SmartCitySimulation = () => {
  // Sample brightness values - can be controlled externally by AI
  const streetLightBrightness = [30, 45, 70, 85, 60, 40];
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Smart Street Lighting Simulation</CardTitle>
        <CardDescription>3D Interactive Night City Environment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 bg-gradient-to-b from-slate-900 via-slate-800 to-black rounded-lg overflow-hidden border">
          <Canvas 
            camera={{ position: [12, 8, 12], fov: 50 }}
            gl={{ antialias: true }}
            style={{ background: 'linear-gradient(to bottom, #0f0f23, #000000)' }}
          >
            {/* Night Sky Lighting */}
            <ambientLight intensity={0.05} color="#1a1a2e" />
            <directionalLight 
              position={[10, 20, 5]} 
              intensity={0.1} 
              color="#4a4a8a"
            />
            
            {/* Street Environment */}
            <CityStreet />
            
            {/* Street Lights - Evenly Spaced */}
            {Array.from({ length: 6 }, (_, i) => (
              <StreetLight 
                key={`left-light-${i}`}
                position={[-8, 0, i * 4 - 10]} 
                brightness={streetLightBrightness[i]}
              />
            ))}
            {Array.from({ length: 6 }, (_, i) => (
              <StreetLight 
                key={`right-light-${i}`}
                position={[8, 0, i * 4 - 10]} 
                brightness={streetLightBrightness[i]}
              />
            ))}
            
            {/* Camera Controls */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={8}
              maxDistance={25}
              maxPolarAngle={Math.PI / 2.2}
              minPolarAngle={0.3}
            />
          </Canvas>
        </div>
        
        {/* Simple Status Display */}
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="text-sm font-medium mb-2">Street Light Status</div>
          <div className="grid grid-cols-6 gap-2">
            {streetLightBrightness.map((brightness, i) => (
              <div key={i} className="text-center">
                <div 
                  className="w-full h-2 bg-white rounded-full mb-1" 
                  style={{ opacity: brightness / 100 }}
                />
                <span className="text-xs text-muted-foreground">{brightness}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartCitySimulation;