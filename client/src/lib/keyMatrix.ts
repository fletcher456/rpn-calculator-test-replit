// Define key types for better type safety
export type KeyType = "numeric" | "function" | "operation" | "special";

// Define the structure of a calculator key
export interface CalculatorKey {
  label: string; // Main label
  superLabel?: string; // Label above the main label (typically f-shifted)
  subLabel?: string; // Label below the main label (typically g-shifted)
  color: KeyType; // Key color/type
  action: string; // Action identifier
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
    },
    {
      superLabel: "SCI",
      label: "GSB",
      subLabel: "RTN",
      color: "function",
      action: "gsb",
    },
    {
      superLabel: "ENG",
      label: "GTO",
      subLabel: "LBL",
      color: "function",
      action: "gto",
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
    },
    {
      label: "R↓",
      superLabel: "s",
      subLabel: "i",
      color: "function",
      action: "roll-down",
    },
    { label: "STO", subLabel: "DSZ", color: "function", action: "store" },
    { label: "RCL", subLabel: "ISZ", color: "function", action: "recall" },
    {
      label: "Σ+",
      superLabel: "Σ-",
      subLabel: "DEL",
      color: "function",
      action: "sigma-plus",
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
      width: 2
    },
    {
      label: "CHS",
      superLabel: "PRGM",
      subLabel: "GRD",
      color: "operation",
      action: "chs",
    },
    {
      label: "EEX",
      superLabel: "REG",
      subLabel: "RAD",
      color: "function",
      action: "eex",
    },
    {
      label: "CLx",
      superLabel: "Σ",
      subLabel: "DEG",
      color: "operation",
      action: "clear-x",
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
      width: 1.25
    },
    {
      label: "7",
      superLabel: "ln",
      subLabel: "eˣ",
      color: "numeric",
      action: "number-7",
      width: 1.25
    },
    {
      label: "8",
      superLabel: "log",
      subLabel: "10ˣ",
      color: "numeric",
      action: "number-8",
      width: 1.25
    },
    {
      label: "9",
      superLabel: "→R",
      subLabel: "→P",
      color: "numeric",
      action: "number-9",
      width: 1.25
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
      width: 1.25
    },
    {
      label: "4",
      superLabel: "sin",
      subLabel: "sin⁻¹",
      color: "numeric",
      action: "number-4",
      width: 1.25
    },
    {
      label: "5",
      superLabel: "cos",
      subLabel: "cos⁻¹",
      color: "numeric",
      action: "number-5",
      width: 1.25
    },
    {
      label: "6",
      superLabel: "tan",
      subLabel: "tan⁻¹",
      color: "numeric",
      action: "number-6",
      width: 1.25
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
      width: 1.25
    },
    {
      label: "1",
      superLabel: "INT",
      subLabel: "FRAC",
      color: "numeric",
      action: "number-1",
      width: 1.25
    },
    {
      label: "2",
      superLabel: "√x",
      subLabel: "x²",
      color: "numeric",
      action: "number-2",
      width: 1.25
    },
    {
      label: "3",
      superLabel: "yˣ",
      subLabel: "ABS",
      color: "numeric",
      action: "number-3",
      width: 1.25
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
      width: 1.25
    },
    {
      label: "0",
      superLabel: "→H.MS",
      subLabel: "→H",
      color: "numeric",
      action: "number-0",
      width: 1.25
    },
    {
      label: ".",
      superLabel: "LASTx",
      subLabel: "π",
      color: "numeric",
      action: "decimal-point",
      width: 1.25
    },
    {
      label: "R/S",
      superLabel: "PAUSE",
      subLabel: "1/x",
      color: "function",
      action: "run-stop",
      width: 1.25
    },
  ],
];

// Helper function to get key action based on shift state
export function getKeyAction(
  key: CalculatorKey,
  shiftState: null | "f" | "g",
): string {
  // Define shifted actions
  if (shiftState === "f") {
    // f-shifted actions (typically corresponding to superLabel)
    switch (key.action) {
      // Row 1
      case "fix":
        return "fix";
      case "sci":
        return "sci";
      case "eng":
        return "eng";

      // Row 2
      case "swap-xy":
        return "mean";
      case "roll-down":
        return "std-dev";
      case "sigma-plus":
        return "sigma-minus";

      // Row 3
      case "enter":
        return "prefix";
      case "chs":
        return "program";
      case "eex":
        return "register";
      case "clear-x":
        return "sigma";

      // Row 4
      case "subtract":
        return "x-leq-y";
      case "number-7":
        return "ln";
      case "number-8":
        return "log";
      case "number-9":
        return "to-rectangular";

      // Row 5
      case "add":
        return "x-gt-y";
      case "number-4":
        return "sin";
      case "number-5":
        return "cos";
      case "number-6":
        return "tan";

      // Row 6
      case "multiply":
        return "x-neq-y";
      case "number-1":
        return "int";
      case "number-2":
        return "sqrt";
      case "number-3":
        return "y-to-x";

      // Row 7
      case "divide":
        return "x-eq-y";
      case "number-0":
        return "to-hms";
      case "decimal-point":
        return "last-x";
      case "run-stop":
        return "pause";

      default:
        return key.action;
    }
  } else if (shiftState === "g") {
    // g-shifted actions (typically corresponding to subLabel)
    switch (key.action) {
      // Row 1
      case "fix":
        return "sst";
      case "sci":
        return "gsb";
      case "eng":
        return "gto";

      // Row 2
      case "swap-xy":
        return "percentage";
      case "roll-down":
        return "i";
      case "store":
        return "dsz";
      case "recall":
        return "isz";
      case "sigma-plus":
        return "delete";

      // Row 3
      case "chs":
        return "grad";
      case "eex":
        return "rad";
      case "clear-x":
        return "deg";

      // Row 4
      case "subtract":
        return "x-lt-0";
      case "number-7":
        return "exp";
      case "number-8":
        return "power10";
      case "number-9":
        return "to-polar";

      // Row 5
      case "add":
        return "x-gt-0";
      case "number-4":
        return "arcsin";
      case "number-5":
        return "arccos";
      case "number-6":
        return "arctan";

      // Row 6
      case "multiply":
        return "x-neq-0";
      case "number-1":
        return "frac";
      case "number-2":
        return "square";
      case "number-3":
        return "abs";

      // Row 7
      case "divide":
        return "x-eq-0";
      case "number-0":
        return "to-hours";
      case "decimal-point":
        return "pi";
      case "run-stop":
        return "reciprocal";

      default:
        return key.action;
    }
  }

  // Otherwise return the default action
  return key.action;
}
