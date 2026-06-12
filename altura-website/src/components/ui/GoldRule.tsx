export default function GoldRule({ width = 44 }: { width?: number }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: '2px',
        background: 'linear-gradient(90deg, #C9973A 0%, #E8C87A 100%)',
        marginBottom: '20px',
      }}
    />
  );
}
