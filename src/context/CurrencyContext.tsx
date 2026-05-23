import React, { createContext, useContext, useState } from 'react';

export type Currency = 'USD' | 'NGN';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('maink-currency');
    return (saved === 'NGN' ? 'NGN' : 'USD') as Currency;
  });

  const exchangeRate = 1500; // 1 USD = 1500 NGN exchange rate for Katsina MAINK Tech Group

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('maink-currency', newCurrency);
  };

  const formatPrice = (priceInUSD: number) => {
    if (currency === 'NGN') {
      const ngnAmount = Math.round(priceInUSD * exchangeRate);
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(ngnAmount);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(priceInUSD);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, exchangeRate }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
