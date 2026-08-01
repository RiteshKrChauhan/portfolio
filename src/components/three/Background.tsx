"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks";

/* ─── Suppress THREE.Clock deprecation (triggered internally by r3f) ────── */
if (typeof window !== "undefined") {
  const _warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    _warn(...args);
  };
}

const FIXED_STEP = 1 / 60;

/* ─── Starfield ─────────────────────────────────────────────── */
function Stars() {
  const count = 2200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 18 + Math.random() * 30;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const sizes = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = Math.random() * 1.8 + 0.3;
    return arr;
  }, []);

  const mat = useRef<THREE.ShaderMaterial>(null);
  const elapsed = useRef(0);
  useFrame(() => {
    elapsed.current += FIXED_STEP;
    if (mat.current) mat.current.uniforms.uTime.value = elapsed.current;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          attribute float aSize;
          uniform float uTime;
          varying float vBrightness;
          void main() {
            vBrightness = 0.5 + 0.5 * sin(uTime * 0.8 + position.x * 13.7 + position.y * 7.3);
            gl_PointSize = aSize * (0.7 + 0.3 * vBrightness);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying float vBrightness;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float alpha = (1.0 - d * 2.0) * vBrightness * 0.85;
            vec3 col = mix(vec3(0.95, 0.92, 0.88), vec3(0.75, 0.85, 1.0), vBrightness * 0.4);
            gl_FragColor = vec4(col, alpha);
          }
        `}
      />
    </points>
  );
}

/* ─── Accretion Disk ─────────────────────────────────────────── */
function AccretionDisk() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const elapsed = useRef(0);
  useFrame(() => {
    elapsed.current += FIXED_STEP;
    if (mat.current) mat.current.uniforms.uTime.value = elapsed.current;
  });

  const geo = useMemo(() => {
    const g = new THREE.RingGeometry(1.35, 5.2, 256, 64);
    return g;
  }, []);

  // Nearly horizontal disk — sphere protrudes above AND below.
  // X: ~100deg (just past flat so bright side faces lower-right)
  // Y: slight push so left side recedes
  // Z: -0.32 leans the whole vertical axis to the left
  return (
    <mesh geometry={geo} rotation={[Math.PI * 0.56, 0.15, Math.PI]}>
      <shaderMaterial
        ref={mat}
        side={THREE.DoubleSide}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying float vRadius;
          varying float vAngle;
          void main() {
            vRadius = length(position.xy);
            vAngle = atan(position.y, position.x);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying float vRadius;
          varying float vAngle;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(hash(i), hash(i + vec2(1,0)), f.x),
              mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
              f.y
            );
          }

          void main() {
            float r = vRadius;
            float innerR = 1.35;
            float outerR = 5.2;
            float t = (r - innerR) / (outerR - innerR);

            // Use real angular position + time-driven differential rotation
            float angularSpeed = 0.3 - t * 0.22;
            float swirl = vAngle + uTime * angularSpeed - r * 0.9;

            // Turbulent noise layers
            float n1 = noise(vec2(swirl * 2.8, r * 1.4 + uTime * 0.12));
            float n2 = noise(vec2(swirl * 5.5 + 1.3, r * 2.8 - uTime * 0.08));
            float n3 = noise(vec2(swirl * 11.0 - 0.7, r * 5.5 + uTime * 0.05));
            float turbulence = n1 * 0.55 + n2 * 0.3 + n3 * 0.15;

            // Radial brightness — very bright near inner edge, fades out
            float radialFade = pow(1.0 - t, 1.6) * (0.7 + turbulence * 0.3);
            // Thin bright photon ring at inner edge
            float photonRing = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.06, 0.18, t));
            photonRing *= 2.8;

            float brightness = radialFade + photonRing;

            // Color: white-hot at inner → orange → dark brown at outer
            vec3 innerColor  = vec3(1.0,  0.97, 0.92);   // near-white
            vec3 midColor    = vec3(1.0,  0.55, 0.18);   // orange
            vec3 outerColor  = vec3(0.28, 0.12, 0.04);   // dark brown

            vec3 col;
            if (t < 0.25) {
              col = mix(innerColor, innerColor * 1.1, turbulence);
            } else if (t < 0.55) {
              col = mix(innerColor, midColor, (t - 0.25) / 0.3);
            } else {
              col = mix(midColor, outerColor, (t - 0.55) / 0.45);
            }
            col *= (0.8 + turbulence * 0.4);

            // Outer edge fade
            float edgeFade = 1.0 - smoothstep(0.75, 1.0, t);
            float alpha = brightness * edgeFade * 0.92;

            gl_FragColor = vec4(col * brightness, alpha);
          }
        `}
      />
    </mesh>
  );
}

/* ─── Black Hole Sphere (event horizon + lensing) ───────────── */
function BlackHole() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { camera } = useThree();
  const elapsed = useRef(0);

  useFrame(() => {
    elapsed.current += FIXED_STEP;
    if (mat.current) {
      mat.current.uniforms.uTime.value = elapsed.current;
      mat.current.uniforms.uCamPos.value.copy(camera.position);
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[1.28, 128, 128]} />
      <shaderMaterial
        ref={mat}
        side={THREE.FrontSide}
        uniforms={{
          uTime: { value: 0 },
          uCamPos: { value: new THREE.Vector3() },
        }}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vWorldPos;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uCamPos;
          varying vec3 vNormal;
          varying vec3 vWorldPos;

          void main() {
            vec3 viewDir = normalize(uCamPos - vWorldPos);
            float rim = 1.0 - max(dot(vNormal, viewDir), 0.0);
            rim = pow(rim, 3.5);

            // Gravitational lensing glow at limb
            float lensGlow = pow(rim, 1.8) * 1.4;
            vec3 glowColor = mix(
              vec3(1.0, 0.75, 0.45),   // warm orange
              vec3(1.0, 0.97, 0.92),   // white
              pow(rim, 0.5)
            );

            // Event horizon is pure black, only rim glows
            vec3 col = glowColor * lensGlow;
            float alpha = lensGlow * 0.95;

            // Subtle photon ring shimmer
            float shimmer = 0.5 + 0.5 * sin(uTime * 1.2 + rim * 18.0);
            col += glowColor * shimmer * rim * 0.25;

            gl_FragColor = vec4(col, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ─── Event Horizon (solid black core) ──────────────────────── */
function EventHorizon() {
  return (
    <mesh renderOrder={1}>
      <sphereGeometry args={[1.18, 64, 64]} />
      <meshBasicMaterial color="#000000" depthWrite={true} />
    </mesh>
  );
}

/* ─── Outer Glow Halo ────────────────────────────────────────── */
function OuterGlow() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const elapsed = useRef(0);
  useFrame(() => {
    elapsed.current += FIXED_STEP;
    if (mat.current) mat.current.uniforms.uTime.value = elapsed.current;
  });

  return (
    <mesh>
      <sphereGeometry args={[2.1, 64, 64]} />
      <shaderMaterial
        ref={mat}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec3 vNormal;
          void main() {
            float rim = pow(1.0 - abs(vNormal.z), 4.0);
            float pulse = 0.85 + 0.15 * sin(uTime * 0.7);
            vec3 col = mix(vec3(0.9, 0.5, 0.15), vec3(1.0, 0.9, 0.7), rim);
            gl_FragColor = vec4(col * pulse, rim * 0.18);
          }
        `}
      />
    </mesh>
  );
}

/* ─── Scene ──────────────────────────────────────────────────── */
function Scene() {
  // No rotation on the group — position and tilt are fully static
  return (
    <>
      <Stars />
      <group position={[5, 0.0, 0]}
        rotation={[0, -0.35, 0.35]}
      >
        <OuterGlow />
        <AccretionDisk />
        <BlackHole />
        <EventHorizon />
      </group>
    </>
  );
}

/* ─── Canvas wrapper ─────────────────────────────────────────── */
export function Background() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Three.js canvas — fixed full screen */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <Canvas
          camera={{ position: [0, 0.8, 7], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "#02040a" }}
          frameloop={prefersReduced ? "never" : "always"}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Deep space vignette overlay */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(2,4,10,0.55) 100%)",
        }}
      />

      {/* Film grain noise */}
      <div
        className="fixed inset-0 z-[3] pointer-events-none opacity-[0.028]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </>
  );
}
