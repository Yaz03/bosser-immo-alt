"use client";

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
        backgroundColor: 'var(--navy)', 
        paddingTop: '8rem', 
        paddingBottom: '8rem',
        color: 'var(--white)'
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
                flexDirection: 'column',
                gap: '1rem',
                borderLeft: '1px solid rgba(254, 252, 246, 0.1)',
                paddingLeft: '2rem'
              }}
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
