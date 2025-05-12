// Define key types for better type safety
export type KeyType = "numeric" | "function" | "operation" | "special";

// Define the structure of a calculator key
export interface CalculatorKey {
  label: string;        // Main label
  subLabel?: string;    // Secondary label (for shifted functions)
  color: KeyType;       // Key color/type
  action: string;       // Action identifier
  className?: string;   // Optional CSS class
  width?: number;       // Optional width (in grid columns)
}

// Define the HP-29C calculator keypad as a 2D array
// Each row is an array of keys, and each key contains its properties
export const keyMatrix: CalculatorKey[][] = [
  // Row 1: Special functions / Top row
  [
    { label: "f", color: "special", action: "shift-f" },
    { label: "g", color: "special", action: "shift-g" },
    { label: "STO", color: "special", action: "store" },
    { label: "RCL", color: "special", action: "recall" },
    { label: "ENTER↑", color: "operation", action: "enter" }
  ],
  
  // Row 2: Scientific functions
  [
    { label: "sin", subLabel: "sin⁻¹", color: "function", action: "sin" },
    { label: "cos", subLabel: "cos⁻¹", color: "function", action: "cos" },
    { label: "tan", subLabel: "tan⁻¹", color: "function", action: "tan" },
    { label: "√x", subLabel: "x²", color: "function", action: "sqrt" },
    { label: "CHS", subLabel: "CLx", color: "operation", action: "chs" }
  ],
  
  // Row 3: More scientific functions
  [
    { label: "eˣ", subLabel: "ln", color: "function", action: "exp" },
    { label: "10ˣ", subLabel: "log", color: "function", action: "power10" },
    { label: "R↓", subLabel: "R↑", color: "function", action: "roll-down" },
    { label: "x⇄y", subLabel: "π", color: "function", action: "swap-xy" },
    { label: "÷", color: "operation", action: "divide" }
  ],
  
  // Row 4: Numeric keys and operations
  [
    { label: "7", color: "numeric", action: "number-7" },
    { label: "8", color: "numeric", action: "number-8" },
    { label: "9", color: "numeric", action: "number-9" },
    { label: "1/x", subLabel: "%", color: "function", action: "reciprocal" },
    { label: "×", color: "operation", action: "multiply" }
  ],
  
  // Row 5: More numeric keys and operations
  [
    { label: "4", color: "numeric", action: "number-4" },
    { label: "5", color: "numeric", action: "number-5" },
    { label: "6", color: "numeric", action: "number-6" },
    { label: "yˣ", subLabel: "Δ%", color: "function", action: "y-to-x" },
    { label: "−", color: "operation", action: "subtract" }
  ],
  
  // Row 6: More numeric keys and operations
  [
    { label: "1", color: "numeric", action: "number-1" },
    { label: "2", color: "numeric", action: "number-2" },
    { label: "3", color: "numeric", action: "number-3" },
    { label: "EEX", subLabel: "P/R", color: "function", action: "eex" },
    { label: "+", color: "operation", action: "add" }
  ],
  
  // Row 7: Bottom row
  [
    { label: "0", color: "numeric", action: "number-0", width: 2 },
    { label: ".", color: "numeric", action: "decimal-point" },
    { label: "SST", subLabel: "BST", color: "function", action: "sst" },
    { label: "GTO", color: "operation", action: "gto" }
  ]
];

// Helper function to get key action based on shift state
export function getKeyAction(key: CalculatorKey, shiftState: null | "f" | "g"): string {
  // For certain keys, return a different action based on shift state
  if (shiftState === "g") {
    switch (key.action) {
      case "sin": return "arcsin";
      case "cos": return "arccos";
      case "tan": return "arctan";
      case "sqrt": return "square";
      case "chs": return "clear-x";
      case "exp": return "ln";
      case "power10": return "log";
      case "roll-down": return "roll-up";
      case "swap-xy": return "pi";
      case "reciprocal": return "percentage";
      // Add other shifted actions as needed
      default: return key.action;
    }
  }
  
  // Otherwise return the default action
  return key.action;
}