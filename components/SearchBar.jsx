import Image from 'next/image';

export default function SearchBar() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(44,44,88,0.7)',
      borderRadius: 24,
      padding: '10px 18px',
      margin: '0 0 18px 0',
      maxWidth: 420,
      marginLeft: 'auto',
      marginRight: 'auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
    }}>
      <input
        type="text"
        placeholder="Search game"
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: '#b3b3e6',
          fontSize: 18,
          fontWeight: 500,
        }}
      />
      <span style={{ marginLeft: 10, cursor: 'pointer' }}>
        <Image src="/images/Finder/Search.svg" alt="Search" width={22} height={22} />
      </span>
      <span style={{ marginLeft: 10, cursor: 'pointer' }}>
        <Image src="/images/Finder/Filter.svg" alt="Filter" width={22} height={22} />
      </span>
    </div>
  );
} 