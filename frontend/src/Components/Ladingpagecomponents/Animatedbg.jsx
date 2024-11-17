import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    // Set renderer size and append it to the DOM
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Ensure high-quality rendering
    mountRef.current.appendChild(renderer.domElement);

    // Set background color to black (dark space)
    scene.background = new THREE.Color(0x000000);

    // Create star geometry and material
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0x800080, size: 0.2 }); // Purple stars

    // Generate random star positions
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    // Create the stars using Points
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Camera initial position
    camera.position.z = 5;

    // Scroll event to simulate stars moving toward the user
    const handleScroll = () => {
      const scrollY = window.scrollY;
      camera.position.z = scrollY * 0.02 + 5; // Adjust camera z position based on scroll
    };

    window.addEventListener('scroll', handleScroll);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Add slight rotation to the stars
      stars.rotation.x += 0.001;
      stars.rotation.y += 0.001;

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default AnimatedBackground;
