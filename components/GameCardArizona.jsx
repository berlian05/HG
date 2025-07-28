import { useState, useRef } from 'react';
import Image from 'next/image';
import QuestionIcon from './QuestionIcon';
import HGPIcon from './HGPIcon';
import EyeIcon from './EyeIcon';
import JoinGame from './JoinGame';
import TimerIcon from './TimerIcon';

export default function GameCardArizona() {
  const commonBlockStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(44,44,88,0.32)',
    borderRadius: 16,
    padding: '12px 16px',
    border: '1.5px solid rgba(255,255,255,0.08)',
  };

  const NumberWithHGP = ({ number }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{
        background: 'linear-gradient(180deg, #FFB800 0%, #FF8A00 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        fontFamily: 'Ranchers, cursive',
        fontSize: '32px',
        transform: 'rotate(-6deg)',
        display: 'inline-block',
        marginRight: 4,
      }}>
        {number}
      </span>
      <span style={{
        background: 'linear-gradient(180deg, #FFB800 0%, #FF8A00 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        fontFamily: 'Ranchers, cursive',
        fontSize: '20px',
        transform: 'rotate(-6deg)',
        display: 'inline-block',
      }}>
        HGP
      </span>
    </div>
  );

  return (
    <div style={{
      background: 'linear-gradient(180deg, #192054 0%, #060C2C 100%)',
      borderRadius: 40,
      padding: '48px 16px 28px 16px',
      margin: '32px auto',
      width: '94%',
      maxWidth: 380,
      position: 'relative',
      overflow: 'visible',
    }}>
      <div style={{
        position: 'absolute',
        top: -28,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        minWidth: 180,
        width: 240,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <Image src="/images/Menubar/Mobile/Surface.svg" alt="surface" fill style={{objectFit:'cover',zIndex:1,borderRadius:20,opacity:0.92}} />
        <span style={{
          position: 'relative',
          zIndex: 2,
          color: '#fff',
          fontWeight: 700,
          fontSize: 24,
          fontFamily: 'Poppins, Arial, sans-serif',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}>
          <Image src="/images/Arizona/Mobile/Lock.svg" alt="lock" width={24} height={24} style={{verticalAlign:'middle'}} />
          Arizona
        </span>
      </div>
      <div style={{ height: 28 }} />
      <div style={{ margin: '24px 0' }}>
        <div style={{
          ...commonBlockStyle,
          height: 'auto',
          flexDirection: 'column',
          gap: 4,
          padding: '20px 16px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <NumberWithHGP number="45" />
            <NumberWithHGP number="250" />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 12,
            marginTop: 8,
          }}>
            <div style={{ color: '#a3a3d1', fontSize: 14 }}>Total Prizes</div>
            <div style={{ width: 2, height: 20, background: 'rgba(163,163,209,0.18)', borderRadius: 2 }} />
            <div style={{ color: '#a3a3d1', fontSize: 14 }}>Jackpot</div>
          </div>
        </div>
      </div>
      <div style={{
        ...commonBlockStyle,
        margin: '24px 0 0 0',
      }}>
        <Image src="/images/Random game/Mobile/Profile.svg" alt="profile" width={20} height={20} />
        <div style={{ width: 2, height: 28, background: 'rgba(163,163,209,0.18)', borderRadius: 2 }} />
        <div style={{ color: '#b3b3e6', fontSize: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TimerIcon />
          </div>
          Instantly
        </div>
        <div style={{ width: 2, height: 28, background: 'rgba(163,163,209,0.18)', borderRadius: 2 }} />
        <div style={{ color: '#b3b3e6', fontSize: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Image src="/images/Random game/Mobile/Iconly/Bulk/Time-Circle.svg" alt="sec" width={20} height={20} />
          10 sec
        </div>
      </div>
      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
        <div style={{ 
          position: 'absolute', 
          left: -4, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: 40, 
          height: 40,
          zIndex: 2,
          transform: 'translateY(4px)'
        }}>
          <EyeIcon />
        </div>
        <div style={{ flex: '1 1 auto', maxWidth: 334, height: 140, marginLeft: 24, position: 'relative' }}>
          <JoinGame />
          <button 
            style={{
              position: 'absolute',
              top: 48,
              left: 48,
              width: 238,
              height: 40,
              background: 'transparent',
              border: 'none',
              borderRadius: 20,
              cursor: 'pointer',
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
} 