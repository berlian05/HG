import Image from 'next/image';

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 20px 12px 20px',
      background: 'rgba(14,19,48,0.98)',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      zIndex: 3000,
      boxShadow: '0 2px 16px 0 #0e1330cc',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxSizing: 'border-box',
    }}>
      {/* Логотип */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
        <Image src="/images/Top bar/Logotype.svg" alt="BetBanger" width={210} height={60} />
      </div>
      {/* Иконки справа с разделительной чертой между ними */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, paddingRight: 8 }}>
        <Image src="/images/Top bar/Fill-1.svg" alt="Notifications" width={28} height={28} />
        <div style={{
          width: 2,
          height: 28,
          background: 'rgba(163,163,209,0.18)',
          borderRadius: 2,
        }} />
        <Image src="/images/Top bar/Menu.svg" alt="Menu" width={28} height={28} />
      </div>
    </header>
  );
} 