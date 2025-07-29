import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = theme === 'dark' 
          ? `rgba(147, 197, 253, ${this.opacity})` // blue-300
          : `rgba(99, 102, 241, ${this.opacity})`; // indigo-500
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Update color based on theme
        this.color = theme === 'dark' 
          ? `rgba(147, 197, 253, ${this.opacity})`
          : `rgba(99, 102, 241, ${this.opacity})`;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(147, 197, 253, ${0.1 * (1 - distance / 100)})`
              : `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <>
      {/* Canvas for particle system */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />
      
      {/* Static floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden sm:block">
        {/* Floating geometric shapes */}
        <motion.div 
          className="absolute w-20 h-20 border-2 border-blue-300/30 dark:border-blue-500/30 rounded-full"
          style={{ top: '10%', left: '15%' }}
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity }
          }}
        />
        
        <motion.div 
          className="absolute w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg"
          style={{ top: '60%', right: '20%' }}
          animate={{ 
            rotate: [0, 45, 0],
            y: [-10, 10, -10]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute w-12 h-12 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full"
          style={{ bottom: '20%', left: '10%' }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity 
          }}
        />
        
        <motion.div 
          className="absolute w-8 h-8 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rotate-45"
          style={{ top: '30%', right: '10%' }}
          animate={{ 
            rotate: [45, 225, 45],
            x: [-5, 5, -5]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity 
          }}
        />
        
        {/* Floating academic icons */}
        <motion.div 
          className="absolute text-4xl opacity-20"
          style={{ top: '25%', left: '70%' }}
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity 
          }}
        >
          📚
        </motion.div>
        
        <motion.div 
          className="absolute text-3xl opacity-15"
          style={{ bottom: '30%', right: '15%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            scale: { duration: 4, repeat: Infinity },
            rotate: { duration: 10, repeat: Infinity, ease: "linear" }
          }}
        >
          🎓
        </motion.div>
        
        <motion.div 
          className="absolute text-2xl opacity-25"
          style={{ top: '70%', left: '60%' }}
          animate={{ 
            x: [-10, 10, -10],
            opacity: [0.25, 0.5, 0.25]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity 
          }}
        >
          ⭐
        </motion.div>
        
        <motion.div 
          className="absolute text-3xl opacity-20"
          style={{ top: '15%', right: '40%' }}
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity 
          }}
        >
          🔬
        </motion.div>
        
        {/* Gradient orbs */}
        <motion.div 
          className="absolute w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
          style={{ top: '40%', left: '80%' }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity 
          }}
        />
        
        <motion.div 
          className="absolute w-24 h-24 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-xl"
          style={{ bottom: '10%', left: '30%' }}
          animate={{ 
            scale: [1, 1.4, 1],
            x: [-20, 20, -20]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity 
          }}
        />
      </div>
    </>
  );
};

export default FloatingParticles;