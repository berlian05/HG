import React from 'react';
import StatCard from './StatCard';

export default function ProfileStats() {
  return (
    <div style={{ marginTop: '12px' }}>
      {/* Top row - 3 cards */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        marginBottom: '6px',
      }}>
        <StatCard value="1057" label="Players online" />
        <StatCard value="856" label="Total game" />
        <StatCard value="8360" label="Made a bet" />
      </div>

      {/* Bottom row - 2 cards */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
      }}>
        <StatCard value="856" label="Total game" />
        <StatCard value="4.78M WLD" label="Profit" />
      </div>
    </div>
  );
} 