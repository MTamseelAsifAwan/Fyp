import React from 'react';
import Particles from 'react-tsparticles';

const ParticleBackground = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: '#ffffff',
        },
        particles: {
          number: {
            value: 50,
          },
          size: {
            value: 3,
          },
          move: {
            direction: 'bottom',
            enable: true,
            speed: 2,
          },
        },
      }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
};

export default ParticleBackground;
