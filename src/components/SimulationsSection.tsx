import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Settings, Zap, Globe, Satellite } from 'lucide-react';
import * as THREE from 'three';

const SimulationsSection = () => {
  const solarFlareRef = useRef<HTMLDivElement>(null);
  const earthImpactRef = useRef<HTMLDivElement>(null);
  const magnetosphereRef = useRef<HTMLDivElement>(null);
  
  const [activeSimulation, setActiveSimulation] = useState('solar-flare');
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  // Solar Flare Simulation
  useEffect(() => {
    if (!solarFlareRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(400, 300);
    renderer.setClearColor(0x000000, 0);
    solarFlareRef.current.appendChild(renderer.domElement);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffaa00,
      transparent: true,
      opacity: 0.9
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Solar flare particles
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Start particles near sun surface
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 2.1 + Math.random() * 0.5;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Particle velocities
      velocities[i3] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 2] = Math.random() * 0.2;

      // Colors (orange to red gradient)
      colors[i3] = 1.0; // R
      colors[i3 + 1] = 0.3 + Math.random() * 0.4; // G
      colors[i3 + 2] = 0.0; // B
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 8;

    let animationId: number;
    const animate = () => {
      if (isPlaying) {
        // Rotate sun
        sun.rotation.y += 0.01 * simulationSpeed;

        // Update particles
        const positions = particleSystem.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          positions[i3] += velocities[i3] * simulationSpeed;
          positions[i3 + 1] += velocities[i3 + 1] * simulationSpeed;
          positions[i3 + 2] += velocities[i3 + 2] * simulationSpeed;

          // Reset particles that go too far
          const distance = Math.sqrt(
            positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2
          );
          if (distance > 15) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 2.1 + Math.random() * 0.5;
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);
          }
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (solarFlareRef.current && renderer.domElement) {
        solarFlareRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying, simulationSpeed]);

  // Earth Impact Simulation
  useEffect(() => {
    if (!earthImpactRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(400, 300);
    renderer.setClearColor(0x000000, 0);
    earthImpactRef.current.appendChild(renderer.domElement);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.8
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(1.7, 32, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x87ceeb,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // CME particles approaching Earth
    const cmeParticleCount = 500;
    const cmeParticles = new THREE.BufferGeometry();
    const cmePositions = new Float32Array(cmeParticleCount * 3);
    const cmeColors = new Float32Array(cmeParticleCount * 3);

    for (let i = 0; i < cmeParticleCount; i++) {
      const i3 = i * 3;
      cmePositions[i3] = -10 + Math.random() * 2; // X (coming from left)
      cmePositions[i3 + 1] = (Math.random() - 0.5) * 4; // Y
      cmePositions[i3 + 2] = (Math.random() - 0.5) * 4; // Z

      cmeColors[i3] = 1.0; // R
      cmeColors[i3 + 1] = 0.5; // G
      cmeColors[i3 + 2] = 0.0; // B
    }

    cmeParticles.setAttribute('position', new THREE.BufferAttribute(cmePositions, 3));
    cmeParticles.setAttribute('color', new THREE.BufferAttribute(cmeColors, 3));

    const cmeParticleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const cmeParticleSystem = new THREE.Points(cmeParticles, cmeParticleMaterial);
    scene.add(cmeParticleSystem);

    camera.position.set(0, 0, 5);

    let animationId: number;
    const animate = () => {
      if (isPlaying) {
        earth.rotation.y += 0.02 * simulationSpeed;
        atmosphere.rotation.y += 0.015 * simulationSpeed;

        // Move CME particles toward Earth
        const positions = cmeParticleSystem.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < cmeParticleCount; i++) {
          const i3 = i * 3;
          positions[i3] += 0.05 * simulationSpeed; // Move right toward Earth

          // Reset particles that pass Earth
          if (positions[i3] > 5) {
            positions[i3] = -10 + Math.random() * 2;
            positions[i3 + 1] = (Math.random() - 0.5) * 4;
            positions[i3 + 2] = (Math.random() - 0.5) * 4;
          }
        }
        cmeParticleSystem.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (earthImpactRef.current && renderer.domElement) {
        earthImpactRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying, simulationSpeed]);

  // Magnetosphere Simulation
  useEffect(() => {
    if (!magnetosphereRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(400, 300);
    renderer.setClearColor(0x000000, 0);
    magnetosphereRef.current.appendChild(renderer.domElement);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x4a90e2 });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Magnetic field lines
    const fieldLines = [];
    for (let i = 0; i < 20; i++) {
      const curve = new THREE.EllipseCurve(
        0, 0,
        1.5 + i * 0.2, 1.2 + i * 0.15,
        0, 2 * Math.PI,
        false,
        0
      );
      
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0x00ff88,
        transparent: true,
        opacity: 0.6
      });
      const line = new THREE.Line(geometry, material);
      line.rotation.x = Math.PI / 2;
      fieldLines.push(line);
      scene.add(line);
    }

    camera.position.set(0, 0, 6);

    let animationId: number;
    const animate = () => {
      if (isPlaying) {
        earth.rotation.y += 0.02 * simulationSpeed;
        
        // Animate field lines
        fieldLines.forEach((line, index) => {
          line.rotation.z += (0.01 + index * 0.001) * simulationSpeed;
        });
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (magnetosphereRef.current && renderer.domElement) {
        magnetosphereRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying, simulationSpeed]);

  const simulations = [
    {
      id: 'solar-flare',
      title: 'Explosão Solar',
      description: 'Visualização 3D de uma erupção solar com ejeção de partículas',
      icon: <Zap className="w-6 h-6" />,
      ref: solarFlareRef
    },
    {
      id: 'earth-impact',
      title: 'Impacto na Terra',
      description: 'CME atingindo a atmosfera terrestre',
      icon: <Globe className="w-6 h-6" />,
      ref: earthImpactRef
    },
    {
      id: 'magnetosphere',
      title: 'Magnetosfera',
      description: 'Campo magnético terrestre e linhas de força',
      icon: <Satellite className="w-6 h-6" />,
      ref: magnetosphereRef
    }
  ];

  return (
    <section id="simulations" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simulações Interativas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore visualizações 3D em tempo real dos fenômenos solares e seus efeitos 
              na Terra através de simulações científicas interativas.
            </p>
          </div>

          {/* Controls */}
          <div className="bg-slate-700/50 rounded-lg p-6 mb-8 border border-orange-500/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pausar' : 'Iniciar'}</span>
                </button>
                
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setTimeout(() => setIsPlaying(true), 100);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reiniciar</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Velocidade:</span>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={simulationSpeed}
                    onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-orange-400 font-medium">{simulationSpeed}x</span>
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Tabs */}
          <div className="flex flex-wrap justify-center mb-8 space-x-2">
            {simulations.map((sim) => (
              <button
                key={sim.id}
                onClick={() => setActiveSimulation(sim.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSimulation === sim.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
                }`}
              >
                {sim.icon}
                <span>{sim.title}</span>
              </button>
            ))}
          </div>

          {/* Simulation Display */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-700/30 rounded-lg p-6 border border-orange-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                {simulations.find(s => s.id === activeSimulation)?.title}
              </h3>
              <p className="text-gray-300 mb-6">
                {simulations.find(s => s.id === activeSimulation)?.description}
              </p>
              
              <div className="bg-black/50 rounded-lg p-4 border border-gray-600">
                <div 
                  ref={solarFlareRef} 
                  className={`mx-auto ${activeSimulation === 'solar-flare' ? 'block' : 'hidden'}`}
                />
                <div 
                  ref={earthImpactRef} 
                  className={`mx-auto ${activeSimulation === 'earth-impact' ? 'block' : 'hidden'}`}
                />
                <div 
                  ref={magnetosphereRef} 
                  className={`mx-auto ${activeSimulation === 'magnetosphere' ? 'block' : 'hidden'}`}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-700/30 rounded-lg p-6 border border-blue-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">Parâmetros da Simulação</h4>
                <div className="space-y-3">
                  {activeSimulation === 'solar-flare' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Partículas:</span>
                        <span className="text-orange-400">1.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Temperatura:</span>
                        <span className="text-orange-400">10⁷ K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Velocidade:</span>
                        <span className="text-orange-400">2×10⁷ m/s</span>
                      </div>
                    </>
                  )}
                  {activeSimulation === 'earth-impact' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Partículas CME:</span>
                        <span className="text-blue-400">500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Velocidade CME:</span>
                        <span className="text-blue-400">1.000 km/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Distância Sol-Terra:</span>
                        <span className="text-blue-400">150M km</span>
                      </div>
                    </>
                  )}
                  {activeSimulation === 'magnetosphere' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Linhas de Campo:</span>
                        <span className="text-green-400">20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Intensidade:</span>
                        <span className="text-green-400">25-65 μT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Rotação Terra:</span>
                        <span className="text-green-400">24h</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-6 border border-purple-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">Explicação Científica</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  {activeSimulation === 'solar-flare' && (
                    <p>
                      A simulação mostra partículas sendo ejetadas da superfície solar durante 
                      uma explosão. As partículas seguem trajetórias balísticas influenciadas 
                      pelo campo magnético solar e pela gravidade.
                    </p>
                  )}
                  {activeSimulation === 'earth-impact' && (
                    <p>
                      Visualização de uma Ejeção de Massa Coronal (CME) viajando pelo espaço 
                      e atingindo a atmosfera terrestre. O impacto causa compressão da 
                      magnetosfera e pode gerar tempestades geomagnéticas.
                    </p>
                  )}
                  {activeSimulation === 'magnetosphere' && (
                    <p>
                      O campo magnético terrestre forma uma barreira protetora contra 
                      partículas carregadas. As linhas de campo se estendem do polo sul 
                      ao norte, criando a magnetosfera que nos protege da radiação solar.
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-6 border border-orange-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">💡 Dica Interativa</h4>
                <p className="text-gray-300 text-sm">
                  Use os controles para ajustar a velocidade da simulação e observe como 
                  diferentes parâmetros afetam o comportamento dos fenômenos solares. 
                  Experimente pausar e reiniciar para analisar momentos específicos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulationsSection;