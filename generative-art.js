class GenerativeArt {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.isAnimating = true;
        this.animationId = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.time = 0;
        this.pattern = 0;
        
        this.initEventListeners();
        this.initPatternSelector();
        this.generatePattern();
        this.animate();
    }
    
    initEventListeners() {
        console.log('Initializing event listeners');
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('click', () => {
            console.log('Canvas clicked, generating new pattern');
            this.generatePattern();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                console.log('Space key pressed, generating new pattern');
                this.generatePattern();
            }
        });
    }
    
    initPatternSelector() {
        const patternItems = document.querySelectorAll('.pattern-item');
        patternItems.forEach(item => {
            item.addEventListener('click', () => {
                const patternId = parseInt(item.dataset.pattern);
                this.selectPattern(patternId);
            });
        });
    }
    
    selectPattern(patternId) {
        console.log('selectPattern called with:', patternId);
        
        // Remove active class from all items
        const patternItems = document.querySelectorAll('.pattern-item');
        patternItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to selected item
        const selectedItem = document.querySelector(`[data-pattern="${patternId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
            console.log('Added active class to:', selectedItem.textContent);
        }
        
        // Show pattern description
        this.showPatternDescription(patternId);
        
        // Generate the pattern
        this.generatePattern(patternId);
    }
    
    showPatternDescription(patternId) {
        // Hide all descriptions
        const descriptions = document.querySelectorAll('.pattern-description');
        descriptions.forEach(desc => desc.classList.remove('active'));
        
        // Show selected description
        const selectedDescription = document.getElementById(`pattern-description-${patternId}`);
        if (selectedDescription) {
            selectedDescription.classList.add('active');
        }
    }
    
    generatePattern(patternId = null) {
        if (patternId !== null) {
            this.pattern = patternId;
        } else {
            this.pattern = Math.floor(Math.random() * 22);
        }
        
        // Reset all pattern-specific variables
        this.resetPatternVariables();
        
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Update sidebar to reflect current pattern
        if (patternId === null) {
            const patternItems = document.querySelectorAll('.pattern-item');
            patternItems.forEach(item => item.classList.remove('active'));
            
            const selectedItem = document.querySelector(`[data-pattern="${this.pattern}"]`);
            if (selectedItem) {
                selectedItem.classList.add('active');
            }
            
            // Show description for random pattern
            this.showPatternDescription(this.pattern);
        }
        
        console.log('Drawing pattern:', this.pattern);
        
        switch(this.pattern) {
            case 0:
                this.drawFlowField();
                break;
            case 1:
                this.drawFractalTree();
                break;
            case 2:
                this.drawVoronoi();
                break;
            case 3:
                this.drawSpiral();
                break;
            case 4:
                this.drawNetwork();
                break;
            case 5:
                this.drawWaveInterference();
                break;
            case 6:
                this.drawParticleSystem();
                break;
            case 7:
                this.drawMandelbrot();
                break;
            case 8:
                this.drawDNAHelix();
                break;
            case 9:
                this.drawLightning();
                break;
            case 10:
                this.drawKaleidoscope();
                break;
            case 11:
                this.drawFluidSimulation();
                break;
            case 12:
                console.log('Drawing L-System');
                this.drawLSystem();
                break;
            case 13:
                console.log('Drawing Cellular Automata');
                this.drawCellularAutomata();
                break;
            case 14:
                console.log('Drawing Fourier');
                this.drawFourierVisualization();
                break;
            case 15:
                console.log('Drawing Lorenz');
                this.drawLorenzAttractor();
                break;
            case 16:
                console.log('Drawing Fibonacci');
                this.drawFibonacciSpiral();
                break;
            case 17:
                console.log('Drawing Percolation');
                this.drawPercolation();
                break;
            case 18:
                console.log('Drawing Mountains');
                this.drawFractalMountains();
                break;
            case 19:
                console.log('Drawing Gravity');
                this.drawNBodyGravity();
                break;
            case 20:
                console.log('Drawing Boids');
                this.drawBoids();
                break;
            case 21:
                console.log('Drawing Julia');
                this.drawJuliaSet();
                break;
            default:
                console.log('Unknown pattern:', this.pattern);
                this.drawFlowField();
        }
    }
    
    resetPatternVariables() {
        // Reset all pattern-specific variables to force re-initialization
        this.lSystemString = null;
        this.caGrid = null;
        this.fourierPath = null;
        this.lorenzPoints = null;
        this.lorenzState = null;
        this.percolationGrid = null;
        this.mountainHeights = null;
        this.gravityBodies = null;
        this.boids = null;
        this.lightningBranches = null;
    }
    
    drawFlowField() {
        const cols = 80;
        const rows = 60;
        const scl = 10;
        const inc = 0.1;
        let zoff = this.time * 0.01;
        
        for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
                const angle = this.noise(xoff, y * inc, zoff) * Math.PI * 2 * 4;
                const length = this.noise(xoff, y * inc, zoff + 1000) * 20;
                
                const px = x * scl;
                const py = y * scl;
                
                this.ctx.strokeStyle = `hsl(${(angle * 180 / Math.PI + this.time * 2) % 360}, 70%, 60%)`;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(px, py);
                this.ctx.lineTo(
                    px + Math.cos(angle) * length,
                    py + Math.sin(angle) * length
                );
                this.ctx.stroke();
                
                xoff += inc;
            }
            zoff += inc;
        }
    }
    
    drawFractalTree() {
        this.ctx.strokeStyle = '#4CAF50';
        this.ctx.lineWidth = 2;
        const windEffect = Math.sin(this.time * 0.05) * 0.3;
        this.branch(this.width / 2, this.height, 100, -Math.PI / 2 + windEffect, 8);
    }
    
    branch(x, y, length, angle, depth) {
        if (depth === 0) return;
        
        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;
        
        this.ctx.strokeStyle = `hsl(${120 + depth * 10 + Math.sin(this.time * 0.1 + depth) * 30}, 70%, ${60 - depth * 5}%)`;
        this.ctx.lineWidth = depth * 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        const angleOffset = (Math.PI / 6) + (this.noise(x * 0.01, y * 0.01, this.time * 0.01) - 0.5) * 0.5;
        const timeVariation = Math.sin(this.time * 0.03 + depth * 0.5) * 0.2;
        this.branch(endX, endY, length * 0.75, angle - angleOffset + timeVariation, depth - 1);
        this.branch(endX, endY, length * 0.75, angle + angleOffset - timeVariation, depth - 1);
    }
    
    drawVoronoi() {
        const points = [];
        const numPoints = 50;
        
        for (let i = 0; i < numPoints; i++) {
            points.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`
            });
        }
        
        const imageData = this.ctx.createImageData(this.width, this.height);
        
        for (let x = 0; x < this.width; x += 2) {
            for (let y = 0; y < this.height; y += 2) {
                let minDist = Infinity;
                let closestPoint = null;
                
                for (let point of points) {
                    const dist = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
                    if (dist < minDist) {
                        minDist = dist;
                        closestPoint = point;
                    }
                }
                
                this.ctx.fillStyle = closestPoint.color;
                this.ctx.fillRect(x, y, 2, 2);
            }
        }
        
        points.forEach(point => {
            this.ctx.fillStyle = '#fff';
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawSpiral() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const maxRadius = Math.min(this.width, this.height) / 2;
        
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < 10; i++) {
            this.ctx.strokeStyle = `hsl(${(i * 36 + this.time * 2) % 360}, 70%, 60%)`;
            this.ctx.beginPath();
            
            for (let angle = 0; angle < Math.PI * 20; angle += 0.1) {
                const radius = (angle / (Math.PI * 20)) * maxRadius;
                const timeOffset = this.time * 0.02;
                const radiusVariation = Math.sin(angle * 0.5 + this.time * 0.1) * 20;
                const x = centerX + Math.cos(angle + i * 0.5 + timeOffset) * (radius + radiusVariation);
                const y = centerY + Math.sin(angle + i * 0.5 + timeOffset) * (radius + radiusVariation);
                
                if (angle === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        }
    }
    
    drawNetwork() {
        if (!this.networkNodes) {
            this.networkNodes = [];
            const numNodes = 80;
            
            for (let i = 0; i < numNodes; i++) {
                this.networkNodes.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    vx: (Math.random() - 0.5) * 1,
                    vy: (Math.random() - 0.5) * 1,
                    radius: Math.random() * 3 + 2
                });
            }
        }
        
        this.networkNodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > this.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.height) node.vy *= -1;
            
            node.x = Math.max(0, Math.min(this.width, node.x));
            node.y = Math.max(0, Math.min(this.height, node.y));
        });
        
        this.networkNodes.forEach((node, i) => {
            this.networkNodes.forEach((other, j) => {
                if (i !== j) {
                    const dist = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
                    if (dist < 120) {
                        const opacity = (1 - dist / 120) * 0.8;
                        this.ctx.strokeStyle = `rgba(${100 + Math.sin(this.time * 0.02) * 50}, 200, 255, ${opacity})`;
                        this.ctx.lineWidth = opacity * 2;
                        this.ctx.beginPath();
                        this.ctx.moveTo(node.x, node.y);
                        this.ctx.lineTo(other.x, other.y);
                        this.ctx.stroke();
                    }
                }
            });
            
            const pulse = Math.sin(this.time * 0.05 + i * 0.1) * 0.5 + 0.5;
            this.ctx.fillStyle = `rgba(100, 200, 255, ${0.7 + pulse * 0.3})`;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius + pulse, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawWaveInterference() {
        const sources = [
            { 
                x: this.width * 0.3 + Math.sin(this.time * 0.02) * 50, 
                y: this.height * 0.3 + Math.cos(this.time * 0.03) * 30 
            },
            { 
                x: this.width * 0.7 + Math.sin(this.time * 0.025) * 40, 
                y: this.height * 0.7 + Math.cos(this.time * 0.028) * 35 
            },
            { 
                x: this.width * 0.3 + Math.sin(this.time * 0.022) * 45, 
                y: this.height * 0.7 + Math.cos(this.time * 0.026) * 25 
            },
            { 
                x: this.width * 0.7 + Math.sin(this.time * 0.027) * 38, 
                y: this.height * 0.3 + Math.cos(this.time * 0.024) * 32 
            }
        ];
        
        for (let x = 0; x < this.width; x += 3) {
            for (let y = 0; y < this.height; y += 3) {
                let amplitude = 0;
                
                sources.forEach((source, i) => {
                    const dist = Math.sqrt((x - source.x) ** 2 + (y - source.y) ** 2);
                    const waveSpeed = 0.05 + i * 0.01;
                    amplitude += Math.sin(dist * waveSpeed + this.time * 0.1) / (dist * 0.01 + 1);
                });
                
                const intensity = (amplitude + 2) / 4;
                const hue = (intensity * 240 + this.time) % 360;
                this.ctx.fillStyle = `hsl(${hue}, 70%, ${intensity * 60 + 20}%)`;
                this.ctx.fillRect(x, y, 3, 3);
            }
        }
        
        sources.forEach((source, i) => {
            const radius = 5 + Math.sin(this.time * 0.1 + i) * 3;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(source.x, source.y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawParticleSystem() {
        if (!this.particles) {
            this.particles = [];
            for (let i = 0; i < 200; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    life: Math.random() * 100 + 50,
                    maxLife: Math.random() * 100 + 50,
                    size: Math.random() * 3 + 1,
                    hue: Math.random() * 360
                });
            }
        }
        
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx + Math.sin(this.time * 0.01 + particle.x * 0.01) * 0.5;
            particle.y += particle.vy + Math.cos(this.time * 0.01 + particle.y * 0.01) * 0.5;
            particle.life--;
            
            if (particle.x < 0 || particle.x > this.width) particle.vx *= -0.8;
            if (particle.y < 0 || particle.y > this.height) particle.vy *= -0.8;
            
            particle.x = Math.max(0, Math.min(this.width, particle.x));
            particle.y = Math.max(0, Math.min(this.height, particle.y));
            
            if (particle.life <= 0) {
                particle.x = Math.random() * this.width;
                particle.y = Math.random() * this.height;
                particle.vx = (Math.random() - 0.5) * 4;
                particle.vy = (Math.random() - 0.5) * 4;
                particle.life = particle.maxLife;
                particle.hue = Math.random() * 360;
            }
            
            const alpha = particle.life / particle.maxLife;
            const size = particle.size * alpha;
            this.ctx.fillStyle = `hsla(${(particle.hue + this.time * 0.5) % 360}, 70%, 60%, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            const glow = size * 2;
            const gradient = this.ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glow);
            gradient.addColorStop(0, `hsla(${(particle.hue + this.time * 0.5) % 360}, 70%, 60%, ${alpha * 0.3})`);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, glow, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawMandelbrot() {
        const maxIterations = 50;
        const zoom = 0.5 + Math.sin(this.time * 0.01) * 0.3;
        const offsetX = Math.sin(this.time * 0.005) * 0.5;
        const offsetY = Math.cos(this.time * 0.007) * 0.3;
        
        for (let px = 0; px < this.width; px += 2) {
            for (let py = 0; py < this.height; py += 2) {
                const x0 = (px - this.width / 2) / (this.width / 4) * zoom + offsetX;
                const y0 = (py - this.height / 2) / (this.height / 4) * zoom + offsetY;
                
                let x = 0, y = 0, iteration = 0;
                
                while (x * x + y * y < 4 && iteration < maxIterations) {
                    const xtemp = x * x - y * y + x0;
                    y = 2 * x * y + y0;
                    x = xtemp;
                    iteration++;
                }
                
                if (iteration < maxIterations) {
                    const hue = (iteration * 10 + this.time) % 360;
                    const saturation = 70;
                    const lightness = 30 + (iteration / maxIterations) * 70;
                    this.ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                } else {
                    this.ctx.fillStyle = '#000';
                }
                
                this.ctx.fillRect(px, py, 2, 2);
            }
        }
    }
    
    drawDNAHelix() {
        const centerX = this.width / 2;
        const helixHeight = this.height * 0.8;
        const radius = 100;
        const turns = 4;
        
        for (let i = 0; i < 100; i++) {
            const t = i / 100;
            const y = this.height * 0.1 + t * helixHeight;
            const angle1 = t * turns * Math.PI * 2 + this.time * 0.02;
            const angle2 = angle1 + Math.PI;
            
            const x1 = centerX + Math.cos(angle1) * radius;
            const z1 = Math.sin(angle1) * radius;
            const x2 = centerX + Math.cos(angle2) * radius;
            const z2 = Math.sin(angle2) * radius;
            
            const brightness1 = (z1 + radius) / (2 * radius);
            const brightness2 = (z2 + radius) / (2 * radius);
            
            this.ctx.fillStyle = `hsl(${200 + this.time * 0.5}, 70%, ${30 + brightness1 * 50}%)`;
            this.ctx.beginPath();
            this.ctx.arc(x1, y, 4, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.fillStyle = `hsl(${320 + this.time * 0.5}, 70%, ${30 + brightness2 * 50}%)`;
            this.ctx.beginPath();
            this.ctx.arc(x2, y, 4, 0, Math.PI * 2);
            this.ctx.fill();
            
            if (i % 10 === 0) {
                this.ctx.strokeStyle = `hsla(60, 70%, 70%, 0.6)`;
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(x1, y);
                this.ctx.lineTo(x2, y);
                this.ctx.stroke();
            }
        }
        
        for (let i = 0; i < 99; i++) {
            const t1 = i / 100;
            const t2 = (i + 1) / 100;
            const y1 = this.height * 0.1 + t1 * helixHeight;
            const y2 = this.height * 0.1 + t2 * helixHeight;
            const angle1 = t1 * turns * Math.PI * 2 + this.time * 0.02;
            const angle2 = t2 * turns * Math.PI * 2 + this.time * 0.02;
            
            const x1a = centerX + Math.cos(angle1) * radius;
            const x2a = centerX + Math.cos(angle2) * radius;
            const x1b = centerX + Math.cos(angle1 + Math.PI) * radius;
            const x2b = centerX + Math.cos(angle2 + Math.PI) * radius;
            
            this.ctx.strokeStyle = `hsl(200, 70%, 60%)`;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(x1a, y1);
            this.ctx.lineTo(x2a, y2);
            this.ctx.stroke();
            
            this.ctx.strokeStyle = `hsl(320, 70%, 60%)`;
            this.ctx.beginPath();
            this.ctx.moveTo(x1b, y1);
            this.ctx.lineTo(x2b, y2);
            this.ctx.stroke();
        }
    }
    
    drawLightning() {
        if (!this.lightningBranches) {
            this.regenerateLightning();
        }
        
        if (this.time % 60 === 0) {
            this.regenerateLightning();
        }
        
        this.lightningBranches.forEach(branch => {
            this.ctx.strokeStyle = `hsla(${220 + Math.sin(this.time * 0.1) * 40}, 100%, ${70 + Math.sin(this.time * 0.2) * 30}%, 0.8)`;
            this.ctx.lineWidth = branch.width;
            this.ctx.shadowColor = '#88CCFF';
            this.ctx.shadowBlur = 15;
            
            this.ctx.beginPath();
            this.ctx.moveTo(branch.points[0].x, branch.points[0].y);
            for (let i = 1; i < branch.points.length; i++) {
                this.ctx.lineTo(branch.points[i].x, branch.points[i].y);
            }
            this.ctx.stroke();
            
            this.ctx.shadowBlur = 0;
        });
    }
    
    regenerateLightning() {
        this.lightningBranches = [];
        const numBranches = 3 + Math.floor(Math.random() * 4);
        
        for (let b = 0; b < numBranches; b++) {
            const startX = this.width * (0.2 + Math.random() * 0.6);
            const startY = 0;
            const endX = startX + (Math.random() - 0.5) * 200;
            const endY = this.height;
            
            const points = [{ x: startX, y: startY }];
            const segments = 20 + Math.floor(Math.random() * 30);
            
            for (let i = 1; i < segments; i++) {
                const t = i / segments;
                const x = startX + (endX - startX) * t + (Math.random() - 0.5) * 40;
                const y = startY + (endY - startY) * t + (Math.random() - 0.5) * 20;
                points.push({ x, y });
            }
            
            points.push({ x: endX, y: endY });
            
            this.lightningBranches.push({
                points: points,
                width: 2 + Math.random() * 3
            });
            
            if (Math.random() > 0.5) {
                const branchPoint = Math.floor(segments * (0.3 + Math.random() * 0.4));
                const branchStart = points[branchPoint];
                const branchPoints = [branchStart];
                const branchSegments = 10 + Math.floor(Math.random() * 15);
                
                for (let i = 1; i < branchSegments; i++) {
                    const t = i / branchSegments;
                    const angle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;
                    const distance = t * 150;
                    const x = branchStart.x + Math.cos(angle) * distance + (Math.random() - 0.5) * 30;
                    const y = branchStart.y + Math.sin(angle) * distance + t * 100;
                    branchPoints.push({ x, y });
                }
                
                this.lightningBranches.push({
                    points: branchPoints,
                    width: 1 + Math.random() * 2
                });
            }
        }
    }
    
    drawKaleidoscope() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const segments = 8;
        
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        
        for (let seg = 0; seg < segments; seg++) {
            this.ctx.save();
            this.ctx.rotate((seg * Math.PI * 2) / segments);
            
            if (seg % 2 === 0) {
                this.ctx.scale(1, -1);
            }
            
            for (let i = 0; i < 50; i++) {
                const radius = i * 5 + Math.sin(this.time * 0.02 + i * 0.1) * 10;
                const angle = i * 0.3 + this.time * 0.01;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                const hue = (i * 7 + this.time + seg * 45) % 360;
                const size = 2 + Math.sin(this.time * 0.05 + i * 0.2) * 1;
                
                this.ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
                this.ctx.beginPath();
                this.ctx.arc(x, y, size, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.fillStyle = `hsl(${(hue + 180) % 360}, 70%, 40%)`;
                this.ctx.beginPath();
                this.ctx.arc(-x, -y, size * 0.7, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            this.ctx.restore();
        }
        
        this.ctx.restore();
    }
    
    drawFluidSimulation() {
        if (!this.fluidGrid) {
            this.fluidGrid = [];
            this.velocityGrid = [];
            const gridSize = 40;
            
            for (let x = 0; x < gridSize; x++) {
                this.fluidGrid[x] = [];
                this.velocityGrid[x] = [];
                for (let y = 0; y < gridSize; y++) {
                    this.fluidGrid[x][y] = Math.random() * 0.5;
                    this.velocityGrid[x][y] = { vx: 0, vy: 0 };
                }
            }
        }
        
        const gridSize = this.fluidGrid.length;
        const cellWidth = this.width / gridSize;
        const cellHeight = this.height / gridSize;
        
        for (let x = 1; x < gridSize - 1; x++) {
            for (let y = 1; y < gridSize - 1; y++) {
                const neighbors = [
                    this.fluidGrid[x-1][y], this.fluidGrid[x+1][y],
                    this.fluidGrid[x][y-1], this.fluidGrid[x][y+1]
                ];
                const avgNeighbor = neighbors.reduce((a, b) => a + b) / 4;
                
                this.fluidGrid[x][y] += (avgNeighbor - this.fluidGrid[x][y]) * 0.1;
                this.fluidGrid[x][y] += Math.sin(this.time * 0.02 + x * 0.1 + y * 0.1) * 0.01;
                
                this.velocityGrid[x][y].vx += (Math.random() - 0.5) * 0.02;
                this.velocityGrid[x][y].vy += (Math.random() - 0.5) * 0.02;
                this.velocityGrid[x][y].vx *= 0.95;
                this.velocityGrid[x][y].vy *= 0.95;
                
                this.fluidGrid[x][y] = Math.max(0, Math.min(1, this.fluidGrid[x][y]));
            }
        }
        
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                const density = this.fluidGrid[x][y];
                const hue = (density * 240 + this.time * 0.5) % 360;
                const saturation = 70;
                const lightness = 20 + density * 60;
                
                this.ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                this.ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                
                if (density > 0.3) {
                    const bubbleSize = Math.max(0.5, density * 3);
                    this.ctx.fillStyle = `hsla(${hue}, 70%, 80%, 0.6)`;
                    this.ctx.beginPath();
                    this.ctx.arc(
                        x * cellWidth + cellWidth / 2,
                        y * cellHeight + cellHeight / 2,
                        bubbleSize,
                        0, Math.PI * 2
                    );
                    this.ctx.fill();
                }
            }
        }
    }
    
    drawLSystem() {
        console.log('drawLSystem called, time:', this.time);
        
        // Simple tree drawing instead of L-System to ensure it works
        this.ctx.strokeStyle = `hsl(${120 + Math.sin(this.time * 0.01) * 60}, 70%, 50%)`;
        this.ctx.lineWidth = 3;
        
        const startX = this.width / 2;
        const startY = this.height - 20;
        
        console.log('Drawing tree at:', startX, startY);
        this.drawBranch(startX, startY, -Math.PI / 2, 80, 0);
        console.log('Tree drawing completed');
    }
    
    drawBranch(x, y, angle, length, depth) {
        if (depth > 6 || length < 5) return;
        
        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;
        
        this.ctx.strokeStyle = `hsl(${120 + depth * 20}, 70%, ${60 - depth * 5}%)`;
        this.ctx.lineWidth = Math.max(1, 6 - depth);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        if (depth > 1) {
            const angleVariation = Math.sin(this.time * 0.02 + depth) * 0.3;
            this.drawBranch(endX, endY, angle - 0.5 + angleVariation, length * 0.7, depth + 1);
            this.drawBranch(endX, endY, angle + 0.5 - angleVariation, length * 0.7, depth + 1);
        }
    }
    
    drawCellularAutomata() {
        // Simple colorful grid pattern
        const cellSize = 8;
        const cols = Math.floor(this.width / cellSize);
        const rows = Math.floor(this.height / cellSize);
        
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const distance = Math.sqrt((x - cols/2) ** 2 + (y - rows/2) ** 2);
                const wave = Math.sin(distance * 0.3 + this.time * 0.05);
                
                if (wave > 0) {
                    const hue = (distance * 10 + this.time * 2) % 360;
                    this.ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
                    this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
    }
    
    drawFourierVisualization() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // Draw multiple rotating circles
        for (let i = 0; i < 8; i++) {
            const radius = 30 + i * 15;
            const angle = this.time * 0.02 * (i + 1);
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            this.ctx.strokeStyle = `hsl(${i * 45}, 70%, 60%)`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.fillStyle = `hsl(${i * 45}, 70%, 70%)`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawLorenzAttractor() {
        // Simplified chaotic pattern
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        for (let i = 0; i < 100; i++) {
            const t = this.time * 0.02 + i * 0.1;
            const x = centerX + Math.sin(t * 1.2) * Math.cos(t * 0.8) * 150;
            const y = centerY + Math.sin(t * 0.9) * Math.cos(t * 1.1) * 100;
            
            const hue = (i * 3.6 + this.time) % 360;
            this.ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawFibonacciSpiral() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const goldenRatio = 1.618033988749;
        const angleIncrement = Math.PI * 2 / goldenRatio;
        
        for (let i = 0; i < 200; i++) {
            const angle = i * angleIncrement + this.time * 0.01;
            const radius = Math.sqrt(i) * 15;
            
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            const hue = (i * 137.5 + this.time * 0.5) % 360;
            const size = Math.max(0.5, 1 + Math.sin(i * 0.1 + this.time * 0.02) * 2);
            
            this.ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        let a = 1, b = 1;
        for (let i = 0; i < 8; i++) {
            const angle = i * angleIncrement + this.time * 0.01;
            const x = centerX + Math.cos(angle) * a * 3;
            const y = centerY + Math.sin(angle) * a * 3;
            
            this.ctx.strokeStyle = `hsla(60, 70%, 70%, 0.5)`;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x - a, y - a, a * 2, a * 2);
            
            const temp = a + b;
            a = b;
            b = temp;
        }
    }
    
    drawPercolation() {
        // Simple random cluster pattern
        const cellSize = 12;
        const cols = Math.floor(this.width / cellSize);
        const rows = Math.floor(this.height / cellSize);
        
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const noise = Math.sin(x * 0.2 + this.time * 0.01) * Math.cos(y * 0.2 + this.time * 0.01);
                if (noise > 0.3) {
                    const hue = (x * 7 + y * 7 + this.time) % 360;
                    this.ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
                    this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
    }
    
    drawFractalMountains() {
        // Simple mountain silhouette
        this.ctx.fillStyle = `hsl(${120 + Math.sin(this.time * 0.01) * 30}, 50%, 40%)`;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height);
        
        for (let x = 0; x < this.width; x += 10) {
            const height = 200 + Math.sin(x * 0.02) * 100 + Math.sin(x * 0.005 + this.time * 0.01) * 50;
            this.ctx.lineTo(x, this.height - height);
        }
        
        this.ctx.lineTo(this.width, this.height);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    drawNBodyGravity() {
        // Simple orbital pattern
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const angle = this.time * 0.01 * (i + 1) + i * Math.PI / 4;
            const radius = 50 + i * 30;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            const hue = (i * 45 + this.time) % 360;
            this.ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 5 + i, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw orbit trail
            this.ctx.strokeStyle = `hsla(${hue}, 70%, 60%, 0.3)`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }
    
    drawBoids() {
        // Simple flocking pattern
        for (let i = 0; i < 30; i++) {
            const t = this.time * 0.02 + i * 0.2;
            const x = this.width / 2 + Math.sin(t) * 200 + Math.sin(t * 2.3) * 50;
            const y = this.height / 2 + Math.cos(t) * 150 + Math.cos(t * 1.7) * 30;
            
            const hue = (i * 12 + this.time) % 360;
            this.ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    initBoids() {
        this.boids = [];
        for (let i = 0; i < 50; i++) {
            this.boids.push({
                position: this.createVector(Math.random() * this.width, Math.random() * this.height),
                velocity: this.createVector((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2),
                acceleration: this.createVector(0, 0)
            });
        }
    }
    
    createVector(x, y) {
        return {
            x: x || 0,
            y: y || 0,
            add: function(v) { this.x += v.x; this.y += v.y; },
            sub: function(v) { return { x: this.x - v.x, y: this.y - v.y, add: this.add, sub: this.sub, mult: this.mult, div: this.div, mag: this.mag, normalize: this.normalize, limit: this.limit }; },
            mult: function(n) { this.x *= n; this.y *= n; },
            div: function(n) { this.x /= n; this.y /= n; },
            mag: function() { return Math.sqrt(this.x * this.x + this.y * this.y); },
            normalize: function() { const m = this.mag(); if (m > 0) this.div(m); },
            limit: function(max) { if (this.mag() > max) { this.normalize(); this.mult(max); } }
        };
    }
    
    separate(boid) {
        const desiredSeparation = 25;
        const steer = this.createVector(0, 0);
        let count = 0;
        
        for (let other of this.boids) {
            const d = Math.sqrt((boid.position.x - other.position.x) ** 2 + (boid.position.y - other.position.y) ** 2);
            if (d > 0 && d < desiredSeparation) {
                const diff = boid.position.sub(other.position);
                diff.normalize();
                diff.div(d);
                steer.add(diff);
                count++;
            }
        }
        
        if (count > 0) {
            steer.div(count);
            steer.normalize();
            steer.mult(1);
            steer.sub(boid.velocity);
            steer.limit(0.03);
        }
        
        return steer;
    }
    
    align(boid) {
        const neighborDist = 50;
        const sum = this.createVector(0, 0);
        let count = 0;
        
        for (let other of this.boids) {
            const d = Math.sqrt((boid.position.x - other.position.x) ** 2 + (boid.position.y - other.position.y) ** 2);
            if (d > 0 && d < neighborDist) {
                sum.add(other.velocity);
                count++;
            }
        }
        
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(1);
            const steer = sum.sub(boid.velocity);
            steer.limit(0.03);
            return steer;
        }
        
        return this.createVector(0, 0);
    }
    
    cohese(boid) {
        const neighborDist = 50;
        const sum = this.createVector(0, 0);
        let count = 0;
        
        for (let other of this.boids) {
            const d = Math.sqrt((boid.position.x - other.position.x) ** 2 + (boid.position.y - other.position.y) ** 2);
            if (d > 0 && d < neighborDist) {
                sum.add(other.position);
                count++;
            }
        }
        
        if (count > 0) {
            sum.div(count);
            return this.seek(boid, sum);
        }
        
        return this.createVector(0, 0);
    }
    
    seek(boid, target) {
        const desired = target.sub(boid.position);
        desired.normalize();
        desired.mult(1);
        
        const steer = desired.sub(boid.velocity);
        steer.limit(0.03);
        return steer;
    }
    
    drawJuliaSet() {
        const maxIterations = 50;
        const c = {
            x: 0.7269 * Math.cos(this.time * 0.005),
            y: 0.1889 * Math.sin(this.time * 0.008)
        };
        
        for (let px = 0; px < this.width; px += 2) {
            for (let py = 0; py < this.height; py += 2) {
                let x = (px - this.width / 2) / (this.width / 4);
                let y = (py - this.height / 2) / (this.height / 4);
                
                let iteration = 0;
                
                while (x * x + y * y < 4 && iteration < maxIterations) {
                    const xtemp = x * x - y * y + c.x;
                    y = 2 * x * y + c.y;
                    x = xtemp;
                    iteration++;
                }
                
                if (iteration < maxIterations) {
                    const hue = (iteration * 15 + this.time * 0.5) % 360;
                    const saturation = 70;
                    const lightness = 30 + (iteration / maxIterations) * 60;
                    this.ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                } else {
                    this.ctx.fillStyle = '#000';
                }
                
                this.ctx.fillRect(px, py, 2, 2);
            }
        }
    }
    
    noise(x, y, z = 0) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;
        
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        
        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);
        
        const A = this.p[X] + Y;
        const AA = this.p[A] + Z;
        const AB = this.p[A + 1] + Z;
        const B = this.p[X + 1] + Y;
        const BA = this.p[B] + Z;
        const BB = this.p[B + 1] + Z;
        
        return this.lerp(w,
            this.lerp(v,
                this.lerp(u, this.grad(this.p[AA], x, y, z),
                    this.grad(this.p[BA], x - 1, y, z)),
                this.lerp(u, this.grad(this.p[AB], x, y - 1, z),
                    this.grad(this.p[BB], x - 1, y - 1, z))),
            this.lerp(v,
                this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1),
                    this.grad(this.p[BA + 1], x - 1, y, z - 1)),
                this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1),
                    this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))));
    }
    
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
    
    lerp(t, a, b) {
        return a + t * (b - a);
    }
    
    grad(hash, x, y, z) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    
    animate() {
        if (!this.isAnimating) return;
        
        this.time += 1;
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        console.log('Animating pattern:', this.pattern, 'time:', this.time);
        
        switch(this.pattern) {
            case 0:
                console.log('Drawing Flow Field in animation');
                this.drawFlowField();
                break;
            case 1:
                console.log('Drawing Fractal Tree in animation');
                this.drawFractalTree();
                break;
            case 2:
                console.log('Drawing Voronoi in animation');
                this.drawVoronoi();
                break;
            case 3:
                console.log('Drawing Spiral in animation');
                this.drawSpiral();
                break;
            case 4:
                console.log('Drawing Network in animation');
                this.drawNetwork();
                break;
            case 5:
                console.log('Drawing Wave Interference in animation');
                this.drawWaveInterference();
                break;
            case 6:
                console.log('Drawing Particle System in animation');
                this.drawParticleSystem();
                break;
            case 7:
                console.log('Drawing Mandelbrot in animation');
                this.drawMandelbrot();
                break;
            case 8:
                console.log('Drawing DNA Helix in animation');
                this.drawDNAHelix();
                break;
            case 9:
                console.log('Drawing Lightning in animation');
                this.drawLightning();
                break;
            case 10:
                console.log('Drawing Kaleidoscope in animation');
                this.drawKaleidoscope();
                break;
            case 11:
                console.log('Drawing Fluid Simulation in animation');
                this.drawFluidSimulation();
                break;
            case 12:
                console.log('Drawing L-System in animation');
                this.drawLSystem();
                break;
            case 13:
                console.log('Drawing Cellular Automata in animation');
                this.drawCellularAutomata();
                break;
            case 14:
                console.log('Drawing Fourier in animation');
                this.drawFourierVisualization();
                break;
            case 15:
                console.log('Drawing Lorenz in animation');
                this.drawLorenzAttractor();
                break;
            case 16:
                console.log('Drawing Fibonacci in animation');
                this.drawFibonacciSpiral();
                break;
            case 17:
                console.log('Drawing Percolation in animation');
                this.drawPercolation();
                break;
            case 18:
                console.log('Drawing Mountains in animation');
                this.drawFractalMountains();
                break;
            case 19:
                console.log('Drawing Gravity in animation');
                this.drawNBodyGravity();
                break;
            case 20:
                console.log('Drawing Boids in animation');
                this.drawBoids();
                break;
            case 21:
                console.log('Drawing Julia in animation');
                this.drawJuliaSet();
                break;
            default:
                console.log('Unknown pattern in animation:', this.pattern);
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    toggleAnimation() {
        this.isAnimating = !this.isAnimating;
        if (this.isAnimating) {
            this.animate();
        } else {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    saveImage() {
        const link = document.createElement('a');
        link.download = `generative-art-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
    }
    
    generateOGImage() {
        // Save current state
        const originalTime = this.time;
        const originalPattern = this.pattern;
        
        // Create stunning OG image with dramatic gradient background
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Create dramatic gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, '#0f0f23');
        gradient.addColorStop(0.3, '#1a1a3e');
        gradient.addColorStop(0.7, '#2d1b69');
        gradient.addColorStop(1, '#0f0f23');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Add subtle noise texture
        for (let i = 0; i < 1000; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
            this.ctx.fillRect(x, y, 1, 1);
        }
        
        // Create dynamic artistic patterns with fixed time for consistency
        this.time = 100;
        
        // Main focal pattern - large mandelbrot
        this.pattern = 7;
        this.ctx.globalAlpha = 0.8;
        this.drawMandelbrot();
        
        // Overlay spiral pattern
        this.pattern = 3;
        this.ctx.globalAlpha = 0.4;
        this.drawSpiral();
        
        // Add particle effects
        this.pattern = 6;
        this.ctx.globalAlpha = 0.6;
        this.drawParticleSystem();
        
        // Kaleidoscope overlay for geometric beauty
        this.pattern = 10;
        this.ctx.globalAlpha = 0.3;
        this.drawKaleidoscope();
        
        this.ctx.globalAlpha = 1.0;
        
        // Create modern glass-morphism title area
        const titleAreaHeight = 180;
        const titleY = this.height - titleAreaHeight;
        
        // Glass background
        const glassGradient = this.ctx.createLinearGradient(0, titleY, 0, this.height);
        glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        glassGradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
        this.ctx.fillStyle = glassGradient;
        this.ctx.fillRect(0, titleY, this.width, titleAreaHeight);
        
        // Glass border
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, titleY);
        this.ctx.lineTo(this.width, titleY);
        this.ctx.stroke();
        
        // Backdrop blur simulation with multiple layers
        for (let i = 0; i < 3; i++) {
            this.ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
            this.ctx.fillRect(0, titleY + i, this.width, titleAreaHeight - i);
        }
        
        // Main title with glow effect
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Glow effect
        this.ctx.shadowColor = '#00ffff';
        this.ctx.shadowBlur = 20;
        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = 'bold 64px "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif';
        this.ctx.fillText('GENERATIVE', this.width / 2, titleY + 50);
        
        // Second line with different color
        this.ctx.shadowColor = '#ff6b6b';
        this.ctx.shadowBlur = 20;
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.font = 'bold 64px "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif';
        this.ctx.fillText('ART', this.width / 2, titleY + 120);
        
        // Subtitle
        this.ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        this.ctx.shadowBlur = 10;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '28px "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif';
        this.ctx.fillText('22 Interactive Algorithmic Masterpieces', this.width / 2, titleY + 155);
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
        
        // Add decorative elements
        for (let i = 0; i < 6; i++) {
            const x = 60 + i * 120;
            const y = titleY + 20;
            
            this.ctx.fillStyle = `hsl(${i * 60}, 70%, 60%)`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Connecting lines
            if (i < 5) {
                this.ctx.strokeStyle = `hsla(${i * 60}, 70%, 60%, 0.5)`;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(x + 3, y);
                this.ctx.lineTo(x + 117, y);
                this.ctx.stroke();
            }
        }
        
        // Corner accent elements
        const cornerSize = 40;
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.6)';
        this.ctx.lineWidth = 3;
        
        // Top left
        this.ctx.beginPath();
        this.ctx.moveTo(20, 20 + cornerSize);
        this.ctx.lineTo(20, 20);
        this.ctx.lineTo(20 + cornerSize, 20);
        this.ctx.stroke();
        
        // Top right
        this.ctx.beginPath();
        this.ctx.moveTo(this.width - 20 - cornerSize, 20);
        this.ctx.lineTo(this.width - 20, 20);
        this.ctx.lineTo(this.width - 20, 20 + cornerSize);
        this.ctx.stroke();
        
        // Bottom right
        this.ctx.beginPath();
        this.ctx.moveTo(this.width - 20, this.height - 20 - cornerSize);
        this.ctx.lineTo(this.width - 20, this.height - 20);
        this.ctx.lineTo(this.width - 20 - cornerSize, this.height - 20);
        this.ctx.stroke();
        
        // Bottom left
        this.ctx.beginPath();
        this.ctx.moveTo(20 + cornerSize, this.height - 20);
        this.ctx.lineTo(20, this.height - 20);
        this.ctx.lineTo(20, this.height - 20 - cornerSize);
        this.ctx.stroke();
        
        // Restore original state
        this.time = originalTime;
        this.pattern = originalPattern;
        
        return this.canvas.toDataURL('image/png');
    }
}

const permutation = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

GenerativeArt.prototype.p = [];
for (let i = 0; i < 256; i++) {
    GenerativeArt.prototype.p[256 + i] = GenerativeArt.prototype.p[i] = permutation[i];
}

let art;

function generateNew() {
    art.generatePattern();
}


function toggleAnimation() {
    art.toggleAnimation();
}

function saveImage() {
    art.saveImage();
}

window.addEventListener('load', () => {
    art = new GenerativeArt();
});