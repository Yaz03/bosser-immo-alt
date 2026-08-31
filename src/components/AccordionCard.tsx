import React from 'react';
import Link from 'next/link';

interface AccordionCardProps {
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  linkText: string;
  bgImage: string;
  className?: string;
  href?: string;
}

export default function AccordionCard({ number, category, title, subtitle, description, linkText, bgImage, className = "", href = "#" }: AccordionCardProps) {
  return (
    <div className={`accordion-card ${className}`}>
      <div className="accordion-bg" style={{ backgroundImage: `url('${bgImage}')` }}></div>
      <div className="card-overlay"></div>
      <div className="card-top">
        <span>{number}</span>
        <span>{category}</span>
      </div>
      <div className="card-watermark">{number}</div>
      <div className="card-bottom">
        <h3 className="card-title">{title}</h3>
        <p className="card-subtitle">{subtitle}</p>
        <div className="card-desc-wrapper">
          <p className="card-desc">{description}</p>
        </div>
        <Link href={href} className="card-link">{linkText} &rarr;</Link>
      </div>
    </div>
  );
}
