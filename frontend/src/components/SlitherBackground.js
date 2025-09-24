import React, { useEffect, useRef } from 'react';

const SlitherBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const snakesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configuration des serpents
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7',
      '#a29bfe', '#fd79a8', '#00b894', '#e17055', '#81ecec'
    ];

    // Créer les serpents
    const createSnakes = () => {
      snakesRef.current = [];
      for (let i = 0; i < 8; i++) {
        const snake = {
          segments: [],
          color: colors[i % colors.length],
          speed: Math.random() * 2 + 1,
          direction: Math.random() * Math.PI * 2,
          turnSpeed: (Math.random() - 0.5) * 0.02,
          size: Math.random() * 8 + 4,
          alpha: 0.6 + Math.random() * 0.4
        };

        // Initialiser les segments du serpent
        for (let j = 0; j < 15; j++) {
          snake.segments.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
          });
        }

        snakesRef.current.push(snake);
      }
    };

    createSnakes();

    // Animation des serpents
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 20, 25, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      snakesRef.current.forEach(snake => {
        // Mettre à jour la direction
        snake.direction += snake.turnSpeed;
        
        // Calculer la nouvelle position de la tête
        const head = snake.segments[0];
        const newX = head.x + Math.cos(snake.direction) * snake.speed;
        const newY = head.y + Math.sin(snake.direction) * snake.speed;

        // Gérer les bordures (téléportation)
        let wrappedX = newX;
        let wrappedY = newY;
        
        if (newX < 0) wrappedX = canvas.width;
        if (newX > canvas.width) wrappedX = 0;
        if (newY < 0) wrappedY = canvas.height;
        if (newY > canvas.height) wrappedY = 0;

        // Ajouter la nouvelle position en tête
        snake.segments.unshift({ x: wrappedX, y: wrappedY });
        
        // Supprimer le dernier segment
        if (snake.segments.length > 15) {
          snake.segments.pop();
        }

        // Dessiner le serpent
        ctx.globalAlpha = snake.alpha;
        
        for (let i = 0; i < snake.segments.length - 1; i++) {
          const segment = snake.segments[i];
          const nextSegment = snake.segments[i + 1];
          
          // Gradiant de taille et d'opacité
          const segmentSize = snake.size * (1 - i / snake.segments.length);
          const segmentAlpha = 1 - (i / snake.segments.length) * 0.8;
          
          ctx.globalAlpha = snake.alpha * segmentAlpha;
          
          // Créer un gradient pour chaque segment
          const gradient = ctx.createLinearGradient(
            segment.x, segment.y, nextSegment.x, nextSegment.y
          );
          gradient.addColorStop(0, snake.color);
          gradient.addColorStop(1, snake.color + '88');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = segmentSize;
          ctx.lineCap = 'round';
          
          ctx.beginPath();
          ctx.moveTo(segment.x, segment.y);
          ctx.lineTo(nextSegment.x, nextSegment.y);
          ctx.stroke();
        }

        // Dessiner la tête avec un effet de lueur
        const headSegment = snake.segments[0];
        ctx.globalAlpha = snake.alpha;
        
        // Effet de lueur
        ctx.shadowColor = snake.color;
        ctx.shadowBlur = 15;
        
        ctx.fillStyle = snake.color;
        ctx.beginPath();
        ctx.arc(headSegment.x, headSegment.y, snake.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;

        // Changement de direction aléatoire
        if (Math.random() < 0.01) {
          snake.turnSpeed = (Math.random() - 0.5) * 0.03;
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        background: 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #0f1419 100%)',
        zIndex: 1
      }}
    />
  );
};

export default SlitherBackground;