'use client';
import { useEffect, useRef } from 'react';

export default function AleutianAsh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {x: number, y: number, r: number, d: number, a: number}[] = [];
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const mp = 75; // max particles
    for(let i = 0; i < mp; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2 + 1, // radius
            d: Math.random() * mp, // density
            a: Math.random() * 0.5 + 0.1 // alpha (fade level)
        });
    }

    let angle = 0;
    
    function draw() {
        ctx!.clearRect(0, 0, W, H);
        ctx!.fillStyle = "rgba(255, 255, 255, 0.4)";
        for(let i = 0; i < mp; i++) {
            let p = particles[i];
            ctx!.beginPath();
            ctx!.fillStyle = `rgba(180, 180, 180, ${p.a})`;
            ctx!.moveTo(p.x, p.y);
            ctx!.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
            ctx!.fill();
        }
        update();
    }

    function update() {
        angle += 0.01;
        for(let i = 0; i < mp; i++) {
            let p = particles[i];
            // Drifting slowly downwards and swaying
            p.y += Math.cos(angle + p.d) + 1 + p.r/2;
            p.x += Math.sin(angle) * 1;
            
            // Sending back to top when it exits screen
            if(p.x > W + 5 || p.x < -5 || p.y > H) {
                if(i%3 > 0) { // 66.67% of the flakes
                    particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d, a: p.a};
                } else {
                    if(Math.sin(angle) > 0) { // Enter from right
                        particles[i] = {x: -5, y: Math.random() * H, r: p.r, d: p.d, a: p.a};
                    } else { // Enter from left
                        particles[i] = {x: W + 5, y: Math.random() * H, r: p.r, d: p.d, a: p.a};
                    }
                }
            }
        }
    }

    let animationId: number;
    function loop() {
        draw();
        animationId = requestAnimationFrame(loop);
    }
    loop();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1] pointer-events-none opacity-40 mix-blend-screen"
    />
  );
}
