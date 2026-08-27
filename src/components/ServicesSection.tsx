import React from 'react';
import AccordionCard from './AccordionCard';

export default function ServicesSection() {
  const cards = [
    {
      number: "01",
      category: "FIND",
      title: "Discover",
      subtitle: "Properties worth knowing about",
      description: "Carefully selected across the Rhein-Main region, matched to what matters to you.",
      linkText: "EXPLORE PROPERTIES",
      bgImage: "/card1.jpg"
    },
    {
      number: "02",
      category: "FOR OWNERS",
      title: "Sell",
      subtitle: "A strategy built around your property",
      description: "From valuation to presentation and negotiation — your property, properly positioned.",
      linkText: "SELL YOUR PROPERTY",
      bgImage: "/card2.jpg"
    },
    {
      number: "03",
      category: "VALUATION",
      title: "Value",
      subtitle: "Know the value before you make the move",
      description: "Local market knowledge, current data and three decades of hands-on experience.",
      linkText: "REQUEST A VALUATION",
      bgImage: "/card3.jpg"
    },
    {
      number: "04",
      category: "ADVISORY",
      title: "Advise",
      subtitle: "A local perspective you can rely on",
      description: "Personal guidance from the first conversation to the final handover.",
      linkText: "DISCOVER OUR APPROACH",
      bgImage: "/card4.jpg"
    }
  ];

  return (
    <section className="services-section">
      <div className="services-left">
        <div className="services-subtitle">
          <span className="dot"></span> What We Do
        </div>
        <div className="services-headline">
          <div className="headline-top-s">A MORE CONSIDERED WAY</div>
          <div className="headline-mid-s">to navigate</div>
          <div className="headline-bot-s"><span>real</span> estate.</div>
        </div>
        <div className="services-desc">
          From finding the right property to understanding its value, Bossert brings together local expertise, personal advice and a complete range of real-estate services — from the first conversation to the final handover.
        </div>
        <div className="services-footer">
          Rhein-Main Region • Since 1991
        </div>
      </div>

      <div className="services-right accordion-container">
        {cards.map((card, idx) => (
          <AccordionCard key={idx} {...card} />
        ))}
      </div>
    </section>
  );
}
