export default function SectionTag({ label }: { label: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
      <div style={{ width: '20px', height: '1px', background: '#C9973A' }} />
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#C9973A',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}
