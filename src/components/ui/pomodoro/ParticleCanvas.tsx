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
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ effect, accentColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || effect === 'none') return;

    const ctx = canvas.getContext('2d');
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

    // Initialize particles based on selected effect
    const count = effect === 'rain' ? 60 : effect === 'stars' ? 70 : 45;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: effect === 'bubbles' ? Math.random() * 6 + 2 : Math.random() * 2.2 + 0.8,
        speedX: effect === 'rain' ? 0.3 : (Math.random() - 0.5) * 0.4,
        speedY: effect === 'rain' ? Math.random() * 3 + 2.5 : effect === 'stars' ? 0 : -(Math.random() * 0.6 + 0.2),
        alpha: Math.random() * 0.7 + 0.2,
        alphaSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        length: Math.random() * 14 + 8,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;

        // Twinkle
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.alphaSpeed *= -1;
        }

        // Wrap around boundaries
        if (effect === 'rain') {
          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }
        } else {
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));

        if (effect === 'rain') {
          ctx.strokeStyle = accentColor;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + (p.length || 10));
          ctx.stroke();
        } else if (effect === 'bubbles') {
          ctx.strokeStyle = accentColor;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Motes or Stars
          ctx.fillStyle = accentColor;
          ctx.shadowBlur = effect === 'stars' ? 8 : 4;
          ctx.shadowColor = accentColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

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
      className="absolute inset-0 pointer-events-none z-0 opacity-60"
    />
  );
};
