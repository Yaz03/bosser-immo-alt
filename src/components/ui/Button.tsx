import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  as?: 'button' | 'a';
}

export default function Button({ 
  children, 
  variant = 'light', 
  href, 
  onClick, 
  className = '', 
  style,
  as 
}: ButtonProps) {
  const baseClass = variant === 'dark' ? 'explore-btn explore-btn-dark' : 'explore-btn';
  const finalClassName = `${baseClass} ${className}`;
  
  const innerContent = (
    <>
      {children}
      <div className="explore-icon-wrapper">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </>
  );

  const ComponentType = as || (href ? 'a' : 'button');

  if (href && !href.startsWith('http') && ComponentType === 'a') {
    return (
      <Link href={href} className={finalClassName} style={style} onClick={onClick}>
        {innerContent}
      </Link>
    );
  }

  return React.createElement(
    ComponentType,
    {
      className: finalClassName,
      style,
      onClick,
      href: ComponentType === 'a' ? href : undefined,
    },
    innerContent
  );
}
