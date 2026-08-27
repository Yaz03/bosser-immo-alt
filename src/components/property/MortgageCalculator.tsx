"use client";

import React, { useState, useEffect } from 'react';
import { Property } from '@/data/properties';

interface MortgageCalculatorProps {
  priceStr: string;
  financials: Property['financials'];
}

export default function MortgageCalculator({ priceStr, financials }: MortgageCalculatorProps) {
  // Extract numeric price from string (e.g. "€ 4,250,000" -> 4250000)
  const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;

  const [homePrice, setHomePrice] = useState(numericPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const principal = homePrice - (homePrice * (downPaymentPercent / 100));
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numPayments);
    } else {
      const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      // Add monthly taxes and HOA if available
      const monthlyTaxes = (financials?.propertyTax || 0) / 12;
      const monthlyHOA = financials?.hoaFees || 0;
      
      setMonthlyPayment(payment + monthlyTaxes + monthlyHOA);
    }
  }, [homePrice, downPaymentPercent, interestRate, loanTerm, financials]);

  return (
    <div className="mortgage-calculator-widget">
      <h3 className="widget-title">Mortgage Calculator</h3>
      
      <div className="calc-form">
        <div className="calc-field">
          <label>Home Price (€)</label>
          <input 
            type="number" 
            value={homePrice} 
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="calc-input"
          />
        </div>
        
        <div className="calc-field">
          <label>Down Payment (%)</label>
          <div className="slider-container">
            <input 
              type="range" 
              min="0" max="100" 
              value={downPaymentPercent} 
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="calc-slider"
            />
            <span className="slider-val">{downPaymentPercent}%</span>
          </div>
        </div>

        <div className="calc-row">
          <div className="calc-field half">
            <label>Interest Rate (%)</label>
            <input 
              type="number" step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="calc-input"
            />
          </div>
          
          <div className="calc-field half">
            <label>Loan Term (Years)</label>
            <select 
              value={loanTerm} 
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="calc-input"
            >
              <option value={15}>15 Years</option>
              <option value={20}>20 Years</option>
              <option value={30}>30 Years</option>
            </select>
          </div>
        </div>

        {(financials?.propertyTax || financials?.hoaFees) && (
          <div className="calc-financials-summary">
            <p>Includes Est. Taxes: €{(financials.propertyTax || 0) / 12 | 0}/mo</p>
            <p>Includes HOA: €{financials.hoaFees || 0}/mo</p>
          </div>
        )}

        <div className="calc-result">
          <div className="result-label">Estimated Monthly Payment</div>
          <div className="result-value">€ {Math.round(monthlyPayment).toLocaleString('de-DE')}</div>
        </div>
      </div>
    </div>
  );
}
