import { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulsePhase: number;
  layer: number;
  connections: number[];
  activation: number;
  targetActivation: number;
  baseX: number;
  baseY: number;
  angle: number;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  dataFlow: {
    progress: number;
    value: number;
    active: boolean;
  }[];
}

const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Pause animation when scrolling for better performance
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        setIsVisible(false);
        isScrolling = true;
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
        isScrolling = false;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let nodes: Node[] = [];
    let connections: Connection[] = [];

    // Set canvas size to match window size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    const createNodes = () => {
      nodes = [];
      const numNodes = 25; // Reduced number of nodes for better performance
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 2;
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;
        
        nodes.push({
          x,
          y,
          vx: 0,
          vy: 0,
          pulsePhase: Math.random() * Math.PI * 2,
          layer: Math.floor(Math.random() * 3),
          connections: [],
          activation: 0,
          targetActivation: 0,
          baseX: x,
          baseY: y,
          angle: angle
        });
      }
    };

    const createConnections = () => {
      connections = [];
      nodes.forEach((node, i) => {
        const numConnections = 2; // Reduced connections
        for (let j = 0; j < numConnections; j++) {
          const targetIndex = (i + 1 + j * 5) % nodes.length;
          connections.push({
            from: i,
            to: targetIndex,
            strength: 0.5 + Math.random() * 0.5,
            dataFlow: Array(1).fill(null).map(() => ({ // Reduced data flow particles
              progress: Math.random(),
              value: Math.random(),
              active: Math.random() > 0.7
            }))
          });
          nodes[i].connections.push(connections.length - 1);
        }
      });
    };

    const updateNodes = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      nodes.forEach((node) => {
        // Slower, more gentle animation
        node.angle = (node.angle + 0.001) % (Math.PI * 2);
        
        // Calculate target position on the circle
        const targetX = centerX + Math.cos(node.angle) * radius;
        const targetY = centerY + Math.sin(node.angle) * radius;
        
        // Smooth movement towards target
        node.x += (targetX - node.x) * 0.02;
        node.y += (targetY - node.y) * 0.02;
        
        // Update pulse more slowly
        node.pulsePhase += 0.02;
        
        // Less frequent activation changes
        if (Math.random() < 0.005) {
          node.targetActivation = Math.random();
        }
        node.activation += (node.targetActivation - node.activation) * 0.05;
      });
    };

    const drawNodes = () => {
      ctx.save();
      nodes.forEach(node => {
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
        const size = 3 + pulse * 1;
        const alpha = 0.2 + pulse * 0.3;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
        ctx.fill();
      });
      ctx.restore();
    };

    const drawConnections = () => {
      ctx.save();
      connections.forEach(conn => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        // Draw static connection line
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw fewer data flow particles
        conn.dataFlow.forEach(flow => {
          if (!flow.active) return;
          
          flow.progress += 0.01; // Slower movement
          if (flow.progress >= 1) {
            flow.progress = 0;
            flow.active = Math.random() > 0.8; // Less frequent activation
          }
          
          const x = fromNode.x + (toNode.x - fromNode.x) * flow.progress;
          const y = fromNode.y + (toNode.y - fromNode.y) * flow.progress;
          
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${0.2 + flow.value * 0.3})`;
          ctx.fill();
        });
      });
      ctx.restore();
    };

    const animate = () => {
      if (!isVisible) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      updateNodes();
      drawConnections();
      drawNodes();
      
      time += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    createNodes();
    createConnections();
    animate();

    // Handle window resize with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        createNodes();
        createConnections();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: isVisible ? 0.6 : 0.2,
        transition: 'opacity 0.3s ease',
        willChange: 'auto',
        transform: 'translateZ(0)',
      }}
    />
  );
};

export default NeuralNetwork;
