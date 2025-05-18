// Define the HP-29C calculator keypad layout
const keyMatrix = [
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
  
  // Row 2
  [
    {
      superLabel: "PRGM",
      label: "R/S",
      subLabel: "PSE",
      color: "function",
      action: "run-stop",
      superAction: "program",
      subAction: "pause",
    },
    {
      superLabel: "REG",
      label: "SST",
      subLabel: "∑+",
      color: "function",
      action: "sst",
      superAction: "registers",
      subAction: "sum-plus",
    },
    {
      superLabel: "PREFIX",
      label: "GTO",
      subLabel: "∑-",
      color: "function",
      action: "gto",
      superAction: "prefix",
      subAction: "sum-minus",
    },
    {
      superLabel: "CL PRGM",
      label: "x≠y",
      subLabel: "x≠0",
      color: "function",
      action: "x-neq-y",
      superAction: "clear-program",
      subAction: "x-neq-0",
    },
    {
      superLabel: "CL REG",
      label: "x≤y",
      subLabel: "x≤0",
      color: "function",
      action: "x-leq-y",
      superAction: "clear-registers",
      subAction: "x-leq-0",
    },
  ],
  
  // Row 3
  [
    {
      superLabel: "yx",
      label: "↑",
      subLabel: "√x",
      color: "function",
      action: "roll-up",
      superAction: "power",
      subAction: "square-root",
    },
    {
      superLabel: "10x",
      label: "x⇄y",
      subLabel: "x²",
      color: "function",
      action: "swap-xy",
      superAction: "power-10",
      subAction: "square",
    },
    {
      superLabel: "e^x",
      label: "R↓",
      subLabel: "→P",
      color: "function",
      action: "roll-down",
      superAction: "exp",
      subAction: "to-polar",
    },
    {
      superLabel: "STO",
      label: "ENTER",
      subLabel: "→R",
      color: "function",
      action: "enter",
      superAction: "store",
      subAction: "to-rectangular",
      width: 2,
    }
  ],
  
  // Row 4
  [
    {
      label: "7",
      superLabel: "sin",
      subLabel: "sin-1",
      color: "numeric",
      action: "number-7",
      superAction: "sin",
      subAction: "arcsin",
    },
    {
      label: "8",
      superLabel: "cos",
      subLabel: "cos-1",
      color: "numeric",
      action: "number-8",
      superAction: "cos",
      subAction: "arccos",
    },
    {
      label: "9",
      superLabel: "tan",
      subLabel: "tan-1",
      color: "numeric",
      action: "number-9",
      superAction: "tan",
      subAction: "arctan",
    },
    {
      label: "÷",
      superLabel: "x≥y",
      subLabel: "x≥0",
      color: "operation",
      action: "divide",
      superAction: "x-geq-y",
      subAction: "x-geq-0",
    },
  ],
  
  // Row 5
  [
    {
      label: "4",
      superLabel: "INT",
      subLabel: "FRAC",
      color: "numeric",
      action: "number-4",
      superAction: "integer-part",
      subAction: "fractional-part",
    },
    {
      label: "5",
      superLabel: "ABS",
      subLabel: "+/-",
      color: "numeric",
      action: "number-5",
      superAction: "absolute-value",
      subAction: "change-sign",
    },
    {
      label: "6",
      superLabel: "%",
      subLabel: "Δ%",
      color: "numeric",
      action: "number-6",
      superAction: "percentage",
      subAction: "delta-percentage",
    },
    {
      label: "×",
      superLabel: "→HMS",
      subLabel: "→H",
      color: "operation",
      action: "multiply",
      superAction: "to-hms",
      subAction: "to-hours",
    },
  ],
  
  // Row 6
  [
    {
      label: "1",
      superLabel: "LN",
      subLabel: "ex",
      color: "numeric",
      action: "number-1",
      superAction: "ln",
      subAction: "e-raised-to-x",
    },
    {
      label: "2",
      superLabel: "LOG",
      subLabel: "10x",
      color: "numeric",
      action: "number-2",
      superAction: "log",
      subAction: "ten-raised-to-x",
    },
    {
      label: "3",
      superLabel: "RCL",
      subLabel: "GTO·",
      color: "numeric",
      action: "number-3",
      superAction: "recall",
      subAction: "go-to-indirect",
    },
    {
      label: "-",
      superLabel: "→DEG",
      subLabel: "→RAD",
      color: "operation",
      action: "subtract",
      superAction: "to-degrees",
      subAction: "to-radians",
    },
  ],
  
  // Row 7: Bottom row
  [
    {
      label: "0",
      superLabel: "→HMS",
      subLabel: "→H",
      color: "numeric",
      action: "number-0",
      superAction: "to-hms",
      subAction: "to-hours",
    },
    {
      label: ".",
      superLabel: "LASTx",
      subLabel: "π",
      color: "numeric",
      action: "decimal-point",
      superAction: "last-x",
      subAction: "pi",
    },
    {
      label: "EEX",
      superLabel: "CHS",
      subLabel: "SF",
      color: "function",
      action: "eex",
      superAction: "change-sign",
      subAction: "set-flag",
    },
    {
      label: "+",
      superLabel: "x=y",
      subLabel: "x=0",
      color: "operation",
      action: "add",
      superAction: "x-eq-y",
      subAction: "x-eq-0",
    },
  ],
];

// Helper function to get key action based on shift state
function getKeyAction(key, shiftState) {
  if (shiftState === "f" && key.superAction) {
    return key.superAction;
  } else if (shiftState === "g" && key.subAction) {
    return key.subAction;
  }
  
  // If no shift state or no specific action for the shift state, return primary action
  return key.action;
}