interface LineNumbersProps {
  count: number;
  activeLine?: number;
}

const LineNumbers = ({ count, activeLine = 1 }: LineNumbersProps) => {
  return (
    <div className="flex flex-col items-end pr-4 py-4 text-sm font-mono select-none min-w-[3rem] border-r border-border/50">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i + 1}
          className={`leading-7 ${
            i + 1 === activeLine ? 'text-line-number-active' : 'text-line-number'
          }`}
          style={{
            opacity: Math.max(0.3, 1 - (i / count) * 0.5),
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default LineNumbers;