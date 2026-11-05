import React, { useEffect, useRef } from 'react';
import { ParticleEffect } from './types';

interface ParticleCanvasProps {
  effect: ParticleEffect;
  accentColor: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  alpha: number;
  alphaSpeed: number;
  length?: number; // for rain
  wobble?: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ effect, accentColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || effect === 'none') return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = effect === 'rain' ? 80 : effect === 'bubbles' ? 30 : effect === 'stars' ? 50 : 40;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: effect === 'bubbles' ? Math.random() * 8 + 4 : Math.random() * 2 + 1,
        speedX: effect === 'rain' ? 1.2 : (Math.random() - 0.5) * 0.3,
        speedY: effect === 'rain' ? Math.random() * 6 + 14 : effect === 'stars' ? 0.04 : -(Math.random() * 0.7 + 0.3),
        alpha: Math.random() * 0.5 + 0.4,
        alphaSpeed: 0.01,
        length: Math.random() * 16 + 24,
        wobble: Math.random() * 6.28,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (effect === 'rain') {
        // High-performance single-pass batched rain
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          const p = particles[i];
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + (p.length || 24));
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.y > height + 30) {
            p.y = -40;
            p.x = Math.random() * width;
          }
        }
        ctx.stroke();
      } else if (effect === 'bubbles') {
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          const p = particles[i];
          p.wobble = (p.wobble || 0) + 0.03;
          const ox = p.x + Math.sin(p.wobble) * 3;
          ctx.moveTo(ox + p.radius, p.y);
          ctx.arc(ox, p.y, p.radius, 0, Math.PI * 2);
          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y < -p.radius - 5) {
            p.y = height + p.radius + 5;
            p.x = Math.random() * width;
          }
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.fill();
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      } else {
        // Stars or Motes: single batched draw call
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          const p = particles[i];
          ctx.moveTo(p.x + p.radius, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }
        ctx.fillStyle = accentColor;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [effect, accentColor]);

  if (effect === 'none') return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 4,
        willChange: 'contents',
        transform: 'translateZ(0)',
      }}
    />
  );
};
