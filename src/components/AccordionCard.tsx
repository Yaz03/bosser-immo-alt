import React from 'react';

interface AccordionCardProps {
  number: string;
  category: string;
  title: string;
  subtitle: string;
  linkText: string;
  bgImage: string;
}

export default function AccordionCard({ number, category, title, subtitle, linkText, bgImage }: AccordionCardProps) {
  return (
    <div className="accordion-card">
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
        <a href="#" className="card-link">{linkText} &rarr;</a>
      </div>
    </div>
  );
}
