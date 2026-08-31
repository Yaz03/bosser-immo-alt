"use client";

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import GlassSurface from './GlassSurface';

interface Stat {
  number: string;
  label: string;
}

interface Props {
  stats: Stat[];
}

const AnimatedCounter = ({ targetString, isVisible }: { targetString: string; isVisible: boolean }) => {
  const [count, setCount] = React.useState(0);
  
  const match = targetString.match(/^([^0-9]*)([0-9.,]+)([^0-9]*)$/);
  
  React.useEffect(() => {
    if (!isVisible || !match) return;
    
    const targetNumber = parseFloat(match[2].replace(/,/g, ''));
    let startTimestamp: number;
    const duration = 2500; // 2.5 seconds for dramatic effect
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo for the jackpot slow-down effect
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * targetNumber));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, targetString]);

  if (!match) return <>{targetString}</>;

  return (
    <>
      {match[1]}
      {count}
      {match[3]}
    </>
  );
};

export default function AboutStats({ stats }: Props) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section 
      className="global-padding" 
      ref={ref} 
      style={{ 
        position: 'relative',
        paddingTop: '8rem', 
        paddingBottom: '8rem',
        color: 'var(--white)',
        backgroundImage: 'linear-gradient(rgba(4, 36, 51, 0.7), rgba(4, 36, 51, 0.7)), url("/test_bg_estate.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="inner-page-container">
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '4rem', 
            alignItems: 'center' 
          }}
        >
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}
              style={{ 
                transitionDelay: `${idx * 150}ms`,
                display: 'flex',
              }}
            >
              <GlassSurface 
                width="100%"
                height="100%"
                borderRadius={24}
                displace={0}
                distortionScale={-20}
                redOffset={5}
                greenOffset={15}
                blueOffset={25}
                brightness={70}
                opacity={0.8}
                backgroundOpacity={0}
                mixBlendMode="screen"
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: '2rem',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center'
                }}>
                  <div 
                    className="italic-serif" 
                    style={{ 
                      fontSize: '5rem', 
                      lineHeight: 1, 
                      color: 'var(--cream)' 
                    }}
                  >
                    <AnimatedCounter targetString={stat.number} isVisible={isVisible} />
                  </div>
                  <div 
                    className="services-subtitle" 
                    style={{ 
                      color: 'var(--bronze)', 
                      margin: 0 
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </GlassSurface>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
