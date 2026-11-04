import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createBeveledSlabGeometry, createFlatRoundedGeometry } from '../geometries/BeveledSlabGeometry';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface TabletItemProps {
  position: [number, number, number];
  rotY?: number;
}

export const TabletItem: React.FC<TabletItemProps> = ({ position, rotY = 0 }) => {
  const isHovered = useDeskStore((s) => s.hover === 'tablet');

  const width = 1.6;
  const depth = 2.3;
  const thickness = 0.035;

  const pomodoroCanvasTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1460;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background gradient: fantasy deep violet
    const grad = ctx.createRadialGradient(512, 450, 50, 512, 730, 900);
    grad.addColorStop(0, '#2d1454');
    grad.addColorStop(0.5, '#120824');
    grad.addColorStop(1, '#07020e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1460);

    // Top Header Bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, 1024, 110);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 110);
    ctx.lineTo(1024, 110);
    ctx.stroke();

    // Brand Dot & Text
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(60, 55, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('Pomodoro Timer', 95, 68);

    // Streak Pill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(870, 30, 100, 50, 25);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('🔥 1', 890, 65);

    // Mode tabs
    const tabY = 220;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(162, tabY, 700, 80, 40);
    ctx.fill();

    // Active tab (Focus)
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.roundRect(170, tabY + 8, 220, 64, 32);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Focus', 280, tabY + 50);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('Short Break', 512, tabY + 50);
    ctx.fillText('Long Break', 744, tabY + 50);

    // Dial Ring
    const centerX = 512;
    const centerY = 680;
    const radius = 280;

    // Track
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 26;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Progress Arc (75% completed arc)
    ctx.strokeStyle = '#a855f7';
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 30;
    ctx.lineWidth = 26;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, Math.PI * 0.9);
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // Time text
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 130px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('25:00', centerX, centerY + 45);

    // Status Pill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(centerX - 140, centerY + 90, 280, 52, 26);
    ctx.fill();

    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(centerX - 80, centerY + 116, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('Focus session', centerX + 15, centerY + 125);

    // Quote
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = 'italic 30px sans-serif';
    ctx.fillText('“Stay focused, stay present.”', centerX, 1080);

    // Big Start Button
    ctx.fillStyle = '#a855f7';
    ctx.shadowColor = 'rgba(168, 85, 247, 0.6)';
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.roundRect(centerX - 180, 1200, 360, 100, 50);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('▶  START', centerX, 1262);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const bodyGeom = useMemo(() => {
    return createBeveledSlabGeometry(width, depth, thickness, 0.06, 0.008);
  }, [width, depth, thickness]);

  const screenGeom = useMemo(() => {
    return createFlatRoundedGeometry(width * 0.94, depth * 0.94, 0.04);
  }, [width, depth]);

  const aluminumMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#4A4C50',
      metalness: 0.8,
      roughness: 0.35,
    });
  }, []);

  const screenMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: pomodoroCanvasTexture,
      toneMapped: false,
    });
  }, [pomodoroCanvasTexture]);

  return (
    <group
      name="tablet"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('tablet');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        deskStore.open('tablet');
      }}
    >
      {/* Tablet Body */}
      <mesh
        geometry={bodyGeom}
        material={aluminumMaterial}
        castShadow
        receiveShadow
        position={[0, thickness, 0]}
      />

      {/* Screen Face */}
      <mesh
        geometry={screenGeom}
        material={screenMaterial}
        position={[0, thickness + 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      {/* Hover glow */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width + 0.25, depth + 0.25]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
};
