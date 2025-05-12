import React from "react";

interface CalculatorButtonProps {
  color: "numeric" | "function" | "operation" | "special";
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function CalculatorButton({
  color,
  onClick,
  children,
  className = "",
}: CalculatorButtonProps) {
  const colorClasses = {
    numeric: "bg-[hsl(var(--numeric-keys))] text-gray-800",
    function: "bg-[hsl(var(--function-keys))] text-white",
    operation: "bg-[hsl(var(--operation-keys))] text-white",
    special: "bg-[hsl(var(--special-keys))] text-white",
  };

  return (
    <button
      className={`calculator-button ${colorClasses[color]} rounded-md py-3 flex flex-col items-center justify-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
