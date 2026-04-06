/**
 * Particle Network Animation
 * Creates animated connecting particles background
 */

class ParticleNetwork {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        // Configuration
        this.config = {
            particleCount: options.particleCount || 60,
            connectionDistance: options.connectionDistance || 150,
            particleSpeed: options.particleSpeed || 0.5,
            particleSize: options.particleSize || 2,
            lineOpacity: options.lineOpacity || 0.15,
            color: options.color || { r: 59, g: 130, b: 246 }, // Blue
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.particleSpeed * 2,
                vy: (Math.random() - 0.5) * this.config.particleSpeed * 2,
                size: Math.random() * this.config.particleSize + 1
            });
        }
    }
    
    drawParticles() {
        const { r, g, b } = this.config.color;
        
        this.particles.forEach(particle => {
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
            this.ctx.fill();
        });
    }
    
    drawConnections() {
        const { r, g, b } = this.config.color;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.connectionDistance) {
                    const opacity = (1 - distance / this.config.connectionDistance) * this.config.lineOpacity;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Keep within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawConnections();
        this.drawParticles();
        this.updateParticles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Home page hero
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        new ParticleNetwork('heroCanvas', {
            particleCount: 80,
            connectionDistance: 180,
            particleSpeed: 0.6,
            particleSize: 2.5,
            lineOpacity: 0.2,
            color: { r: 59, g: 130, b: 246 } // Blue
        });
    }
    
    // Gallery page hero
    const galleryCanvas = document.getElementById('galleryCanvas');
    if (galleryCanvas) {
        new ParticleNetwork('galleryCanvas', {
            particleCount: 60,
            connectionDistance: 150,
            particleSpeed: 0.4,
            particleSize: 2,
            lineOpacity: 0.15,
            color: { r: 234, g: 88, b: 12 } // Orange
        });
    }
});
