// Define key types for better type safety
export type KeyType = "numeric" | "function" | "operation" | "special";

// Define the structure of a calculator key
export interface CalculatorKey {
  label: string; // Main label
  superLabel?: string; // Label above the main label (typically f-shifted)
  subLabel?: string; // Label below the main label (typically g-shifted)
  color: KeyType; // Key color/type
  action: string; // Primary action identifier (unshifted)
  superAction?: string; // f-shifted action identifier
  subAction?: string; // g-shifted action identifier
  className?: string; // Optional CSS class
  width?: number; // Optional width (in grid columns)
}

// Define the HP-29C calculator keypad as a 2D array
// Each row is an array of keys, and each key contains its properties
export const keyMatrix: CalculatorKey[][] = [
  // Row 1: Top row
  [
    {
      superLabel: "FIX",
      label: "SST",
      subLabel: "BST",
      color: "function",
      action: "sst",
      superAction: "fix",
      subAction: "bst",
    },
    {
      superLabel: "SCI",
      label: "GSB",
      subLabel: "RTN",
      color: "function",
      action: "gsb",
      superAction: "sci",
      subAction: "rtn",
    },
    {
      superLabel: "ENG",
      label: "GTO",
      subLabel: "LBL",
      color: "function",
      action: "gto",
      superAction: "eng",
      subAction: "lbl",
    },
    { label: "f", color: "special", action: "shift-f" },
    { label: "g", color: "special", action: "shift-g" },
  ],

  // Row 2: Second row
  [
    {
      label: "x⇄y",
      superLabel: "x̄",
      subLabel: "%",
      color: "function",
      action: "swap-xy",
      superAction: "mean",
      subAction: "percentage",
    },
    {
      label: "R↓",
      superLabel: "s",
      subLabel: "i",
      color: "function",
      action: "roll-down",
      superAction: "std-dev",
      subAction: "i",
    },
    { 
      label: "STO", 
      subLabel: "DSZ", 
      color: "function", 
      action: "store",
      subAction: "dsz" 
    },
    { 
      label: "RCL", 
      subLabel: "ISZ", 
      color: "function", 
      action: "recall",
      subAction: "isz" 
    },
    {
      label: "Σ+",
      superLabel: "Σ-",
      subLabel: "DEL",
      color: "function",
      action: "sigma-plus",
      superAction: "sigma-minus",
      subAction: "delete",
    },
  ],

  // Row 3: Third row
  [
    {
      label: "ENTER↑",
      superLabel: "PREFIX",
      subLabel: "",
      color: "operation",
      action: "enter",
      width: 2,
      superAction: "prefix"
    },
    {
      label: "CHS",
      superLabel: "PRGM",
      subLabel: "GRD",
      color: "operation",
      action: "chs",
      superAction: "program",
      subAction: "grad"
    },
    {
      label: "EEX",
      superLabel: "REG",
      subLabel: "RAD",
      color: "function",
      action: "eex",
      superAction: "register",
      subAction: "rad"
    },
    {
      label: "CLx",
      superLabel: "Σ",
      subLabel: "DEG",
      color: "operation",
      action: "clear-x",
      superAction: "sigma",
      subAction: "deg"
    }
  ],

  // Row 4: Fourth row
  [
    {
      label: "-",
      superLabel: "x≤y",
      subLabel: "x<0",
      color: "operation",
      action: "subtract",
      width: 1.25,
      superAction: "x-leq-y",
      subAction: "x-lt-0"
    },
    {
      label: "7",
      superLabel: "ln",
      subLabel: "eˣ",
      color: "numeric",
      action: "number-7",
      width: 1.25,
      superAction: "ln",
      subAction: "exp"
    },
    {
      label: "8",
      superLabel: "log",
      subLabel: "10ˣ",
      color: "numeric",
      action: "number-8",
      width: 1.25,
      superAction: "log",
      subAction: "power10"
    },
    {
      label: "9",
      superLabel: "→R",
      subLabel: "→P",
      color: "numeric",
      action: "number-9",
      width: 1.25,
      superAction: "to-rectangular",
      subAction: "to-polar"
    },
  ],

  // Row 5: Fifth row
  [
    {
      label: "+",
      superLabel: "x>y",
      subLabel: "x>0",
      color: "operation",
      action: "add",
      width: 1.25,
      superAction: "x-gt-y",
      subAction: "x-gt-0"
    },
    {
      label: "4",
      superLabel: "sin",
      subLabel: "sin⁻¹",
      color: "numeric",
      action: "number-4",
      width: 1.25,
      superAction: "sin",
      subAction: "arcsin"
    },
    {
      label: "5",
      superLabel: "cos",
      subLabel: "cos⁻¹",
      color: "numeric",
      action: "number-5",
      width: 1.25,
      superAction: "cos",
      subAction: "arccos"
    },
    {
      label: "6",
      superLabel: "tan",
      subLabel: "tan⁻¹",
      color: "numeric",
      action: "number-6",
      width: 1.25,
      superAction: "tan",
      subAction: "arctan"
    },
  ],

  // Row 6: Sixth row
  [
    {
      label: "×",
      superLabel: "x≠y",
      subLabel: "x≠0",
      color: "operation",
      action: "multiply",
      width: 1.25,
      superAction: "x-neq-y",
      subAction: "x-neq-0"
    },
    {
      label: "1",
      superLabel: "INT",
      subLabel: "FRAC",
      color: "numeric",
      action: "number-1",
      width: 1.25,
      superAction: "int",
      subAction: "frac"
    },
    {
      label: "2",
      superLabel: "√x",
      subLabel: "x²",
      color: "numeric",
      action: "number-2",
      width: 1.25,
      superAction: "sqrt",
      subAction: "square"
    },
    {
      label: "3",
      superLabel: "yˣ",
      subLabel: "ABS",
      color: "numeric",
      action: "number-3",
      width: 1.25,
      superAction: "y-to-x",
      subAction: "abs"
    },
  ],

  // Row 7: Bottom row
  [
    {
      label: "÷",
      superLabel: "x=y",
      subLabel: "x=0",
      color: "operation",
      action: "divide",
      width: 1.25,
      superAction: "x-eq-y",
      subAction: "x-eq-0"
    },
    {
      label: "0",
      superLabel: "→H.MS",
      subLabel: "→H",
      color: "numeric",
      action: "number-0",
      width: 1.25,
      superAction: "to-hms",
      subAction: "to-hours"
    },
    {
      label: ".",
      superLabel: "LASTx",
      subLabel: "π",
      color: "numeric",
      action: "decimal-point",
      width: 1.25,
      superAction: "last-x",
      subAction: "pi"
    },
    {
      label: "R/S",
      superLabel: "PAUSE",
      subLabel: "1/x",
      color: "function",
      action: "run-stop",
      width: 1.25,
      superAction: "pause",
      subAction: "reciprocal"
    },
  ],
];

// Helper function to get key action based on shift state
export function getKeyAction(
  key: CalculatorKey,
  shiftState: null | "f" | "g",
): string {
  if (shiftState === "f" && key.superAction) {
    return key.superAction;
  } else if (shiftState === "g" && key.subAction) {
    return key.subAction;
  }
  
  // If no shift state or no specific action for the shift state, return the default action
  return key.action;
}
