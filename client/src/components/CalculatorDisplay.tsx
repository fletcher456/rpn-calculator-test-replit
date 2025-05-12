import { Stack } from "@/lib/calculator";

interface CalculatorDisplayProps {
  stack: Stack;
  currentEntry: string;
  isEnteringNumber: boolean;
  isOn: boolean;
}

export default function CalculatorDisplay({
  stack,
  currentEntry,
  isEnteringNumber,
  isOn,
}: CalculatorDisplayProps) {
  // Format a number for display
  const formatNumber = (num: number): string => {
    if (!isFinite(num)) return num.toString();
    
    // Convert to string and check if it has more than 10 digits
    const strNum = Math.abs(num).toString();
    
    // For small numbers, use fixed notation with at most 10 digits total
    if (num === 0) return "0.0000";
    
    if (Math.abs(num) < 0.0001 || Math.abs(num) >= 10000000) {
      // Scientific notation for very small or very large numbers
      return num.toExponential(4);
    }
    
    // For regular numbers, show up to 10 digits with 4 decimal places
    return num.toFixed(4);
  };

  const displayX = isEnteringNumber ? currentEntry || "0" : formatNumber(stack.x);

  return (
    <div className="calculator-display bg-[hsl(var(--display-bg))] p-3 rounded-md mb-6 font-display text-right">
      {/* Stack Display */}
      <div className={`stack-display mb-2 space-y-1 ${!isOn ? 'opacity-0' : ''}`}>
        <div className="text-[hsl(var(--display-text))] text-xs opacity-70 led-glow">
          <span className="float-left text-xs opacity-50">T:</span>
          <span>{formatNumber(stack.t)}</span>
        </div>
        <div className="text-[hsl(var(--display-text))] text-xs opacity-70 led-glow">
          <span className="float-left text-xs opacity-50">Z:</span>
          <span>{formatNumber(stack.z)}</span>
        </div>
        <div className="text-[hsl(var(--display-text))] text-xs opacity-70 led-glow">
          <span className="float-left text-xs opacity-50">Y:</span>
          <span>{formatNumber(stack.y)}</span>
        </div>
      </div>
      
      {/* Current Entry / X Register */}
      <div className="x-register">
        <div className={`text-[hsl(var(--display-text))] text-xl led-glow ${!isOn ? 'opacity-0' : ''}`}>
          <span className="float-left text-xs opacity-50 mt-1">X:</span>
          <span>{displayX}</span>
        </div>
      </div>
    </div>
  );
}
