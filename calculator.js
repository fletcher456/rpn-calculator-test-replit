// Calculator state
const calculatorState = {
  stack: {
    x: 0,
    y: 0,
    z: 0,
    t: 0
  },
  currentEntry: "",
  isEnteringNumber: false,
  shiftState: null, // null, "f", or "g"
  memory: 0,
  error: null,
  eeMode: false,
  isOn: true
};

// Format numbers for display
function formatNumber(num) {
  if (!isFinite(num)) {
    return num === Infinity ? "Infinity" : "-Infinity";
  }
  
  if (isNaN(num)) {
    return "Error";
  }
  
  // Handle special case for zero
  if (num === 0) return "0";
  
  // Format with appropriate precision
  const absNum = Math.abs(num);
  
  if (absNum < 0.0001 || absNum >= 10000000) {
    // Scientific notation for very small or very large numbers
    return num.toExponential(7);
  } else {
    // Regular notation with appropriate decimal places
    const str = num.toString();
    // Limit to 10 characters total
    if (str.length > 10) {
      if (str.includes('.')) {
        // If it has a decimal point, truncate the decimal part
        const intPart = Math.floor(Math.abs(num)) * Math.sign(num);
        const intStr = intPart.toString();
        const maxDecimalPlaces = Math.max(0, 9 - intStr.length - (intStr.includes('-') ? 0 : 1));
        return num.toFixed(maxDecimalPlaces);
      } else {
        // For large integers, use scientific notation
        return num.toExponential(7);
      }
    }
    return str;
  }
}

// Update display function
function updateDisplay() {
  // Update stack display
  document.getElementById('t-register').textContent = formatNumber(calculatorState.stack.t);
  document.getElementById('z-register').textContent = formatNumber(calculatorState.stack.z);
  document.getElementById('y-register').textContent = formatNumber(calculatorState.stack.y);
  
  // Update X register
  let displayX;
  if (calculatorState.isEnteringNumber && calculatorState.currentEntry) {
    displayX = calculatorState.currentEntry;
  } else {
    displayX = formatNumber(calculatorState.stack.x);
  }
  document.getElementById('x-register').textContent = displayX;
  
  // Handle power state
  const displayElements = document.querySelectorAll('.calculator-display .register-value');
  displayElements.forEach(el => {
    el.style.opacity = calculatorState.isOn ? "1" : "0";
  });
  
  const keypad = document.getElementById('keypad');
  keypad.style.opacity = calculatorState.isOn ? "1" : "0.5";
  keypad.style.pointerEvents = calculatorState.isOn ? "auto" : "none";
}

// Push value onto the stack
function push(value) {
  calculatorState.stack = {
    t: calculatorState.stack.z,
    z: calculatorState.stack.y,
    y: calculatorState.stack.x,
    x: value
  };
}

// Handle number input
function handleNumber(num) {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null; // Clear shift state when entering a number
  
  if (!calculatorState.isEnteringNumber) {
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = true;
  }
  
  // Handle decimal point
  if (num === ".") {
    if (calculatorState.currentEntry.includes(".")) return;
    calculatorState.currentEntry = calculatorState.currentEntry === "" ? "0." : calculatorState.currentEntry + ".";
  } else if (calculatorState.eeMode) {
    // Handle EE input
    if (calculatorState.currentEntry.includes("e")) {
      // We're already in EE mode, update the exponent
      const [mantissa, exponent] = calculatorState.currentEntry.split("e");
      const newExponent = exponent + num;
      calculatorState.currentEntry = `${mantissa}e${newExponent}`;
    } else {
      // Start EE mode
      calculatorState.currentEntry = `${calculatorState.currentEntry || "1"}e${num}`;
    }
  } else {
    // Normal number input
    calculatorState.currentEntry = calculatorState.currentEntry + num;
  }
  
  // Update X register with the parsed number
  try {
    const parsedNumber = parseFloat(
      calculatorState.eeMode && !calculatorState.currentEntry.includes("e")
        ? `${calculatorState.currentEntry || "1"}e${num}`
        : calculatorState.currentEntry
    );
    calculatorState.stack.x = parsedNumber;
  } catch (err) {
    calculatorState.error = "Invalid number";
  }
  
  updateDisplay();
}

// Handle ENTER key
function handleEnter() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  if (calculatorState.isEnteringNumber) {
    const value = parseFloat(calculatorState.currentEntry || "0");
    push(value);
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    // Duplicate X if not entering a number (traditional HP behavior)
    push(calculatorState.stack.x);
  }
  
  updateDisplay();
}

// Handle binary operations (add, subtract, multiply, divide)
function handleOperation(operation) {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  if (calculatorState.isEnteringNumber) {
    calculatorState.stack.x = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  }
  
  let result;
  switch (operation) {
    case "add":
      result = calculatorState.stack.y + calculatorState.stack.x;
      break;
    case "subtract":
      result = calculatorState.stack.y - calculatorState.stack.x;
      break;
    case "multiply":
      result = calculatorState.stack.y * calculatorState.stack.x;
      break;
    case "divide":
      if (calculatorState.stack.x === 0) {
        calculatorState.error = "Division by zero";
        result = NaN;
      } else {
        result = calculatorState.stack.y / calculatorState.stack.x;
      }
      break;
    default:
      return;
  }
  
  calculatorState.stack = {
    x: result,
    y: calculatorState.stack.z,
    z: calculatorState.stack.t,
    t: calculatorState.stack.t
  };
  
  updateDisplay();
}

// Handle shift keys (f and g)
function handleShift(shift) {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = calculatorState.shiftState === shift ? null : shift;
  
  // Update UI to show shift state
  document.querySelectorAll('.calculator-button').forEach(button => {
    button.classList.remove('shifted-f', 'shifted-g');
    if (calculatorState.shiftState === 'f') {
      button.classList.add('shifted-f');
    } else if (calculatorState.shiftState === 'g') {
      button.classList.add('shifted-g');
    }
  });
  
  updateDisplay();
}

// Clear X register
function handleClearX() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.stack.x = 0;
  calculatorState.currentEntry = "";
  calculatorState.isEnteringNumber = false;
  calculatorState.eeMode = false;
  
  updateDisplay();
}

// Clear entire stack
function handleClearStack() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.stack = {
    x: 0,
    y: 0,
    z: 0,
    t: 0
  };
  calculatorState.currentEntry = "";
  calculatorState.isEnteringNumber = false;
  calculatorState.eeMode = false;
  
  updateDisplay();
}

// Change sign of X
function handleChangeSign() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  
  if (calculatorState.isEnteringNumber) {
    if (calculatorState.currentEntry.startsWith("-")) {
      calculatorState.currentEntry = calculatorState.currentEntry.substring(1);
    } else {
      calculatorState.currentEntry = "-" + calculatorState.currentEntry;
    }
    calculatorState.stack.x = -calculatorState.stack.x;
  } else {
    calculatorState.stack.x = -calculatorState.stack.x;
  }
  
  updateDisplay();
}

// Swap X and Y registers
function handleSwapXY() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  if (calculatorState.isEnteringNumber) {
    const xValue = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.stack.y = [calculatorState.stack.x, calculatorState.stack.x = calculatorState.stack.y][0];
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    calculatorState.stack.y = [calculatorState.stack.x, calculatorState.stack.x = calculatorState.stack.y][0];
  }
  
  updateDisplay();
}

// Roll stack down
function handleRollDown() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  if (calculatorState.isEnteringNumber) {
    const xValue = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.stack = {
      x: calculatorState.stack.y,
      y: calculatorState.stack.z,
      z: calculatorState.stack.t,
      t: xValue
    };
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    calculatorState.stack = {
      x: calculatorState.stack.y,
      y: calculatorState.stack.z,
      z: calculatorState.stack.t,
      t: calculatorState.stack.x
    };
  }
  
  updateDisplay();
}

// Roll stack up
function handleRollUp() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  if (calculatorState.isEnteringNumber) {
    const xValue = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.stack = {
      x: calculatorState.stack.t,
      y: xValue,
      z: calculatorState.stack.y,
      t: calculatorState.stack.z
    };
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    calculatorState.stack = {
      x: calculatorState.stack.t,
      y: calculatorState.stack.x,
      z: calculatorState.stack.y,
      t: calculatorState.stack.z
    };
  }
  
  updateDisplay();
}

// Pi constant
function handlePi() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  calculatorState.stack = {
    t: calculatorState.stack.z,
    z: calculatorState.stack.y,
    y: calculatorState.stack.x,
    x: Math.PI
  };
  calculatorState.currentEntry = "";
  calculatorState.isEnteringNumber = false;
  
  updateDisplay();
}

// Square root
function handleSquareRoot() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  if (value < 0) {
    calculatorState.error = "Invalid input for sqrt";
    updateDisplay();
    return;
  }
  
  calculatorState.stack.x = Math.sqrt(value);
  updateDisplay();
}

// Square
function handleSquare() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  calculatorState.stack.x = value * value;
  updateDisplay();
}

// Reciprocal (1/x)
function handleReciprocal() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  if (value === 0) {
    calculatorState.error = "Division by zero";
    updateDisplay();
    return;
  }
  
  calculatorState.stack.x = 1 / value;
  updateDisplay();
}

// Percentage
function handlePercentage() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  calculatorState.stack.x = (calculatorState.stack.y * value) / 100;
  updateDisplay();
}

// Trigonometric functions
function handleSin() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  // Convert from degrees to radians
  const radians = (value * Math.PI) / 180;
  calculatorState.stack.x = Math.sin(radians);
  
  updateDisplay();
}

function handleCos() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  // Convert from degrees to radians
  const radians = (value * Math.PI) / 180;
  calculatorState.stack.x = Math.cos(radians);
  
  updateDisplay();
}

function handleTan() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  // Convert from degrees to radians
  const radians = (value * Math.PI) / 180;
  calculatorState.stack.x = Math.tan(radians);
  
  updateDisplay();
}

// Inverse trigonometric functions
function handleArcSin() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  if (value < -1 || value > 1) {
    calculatorState.error = "Invalid input for arcsin";
    updateDisplay();
    return;
  }
  
  // Convert from radians to degrees
  const degrees = (Math.asin(value) * 180) / Math.PI;
  calculatorState.stack.x = degrees;
  
  updateDisplay();
}

function handleArcCos() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  if (value < -1 || value > 1) {
    calculatorState.error = "Invalid input for arccos";
    updateDisplay();
    return;
  }
  
  // Convert from radians to degrees
  const degrees = (Math.acos(value) * 180) / Math.PI;
  calculatorState.stack.x = degrees;
  
  updateDisplay();
}

function handleArcTan() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  // Convert from radians to degrees
  const degrees = (Math.atan(value) * 180) / Math.PI;
  calculatorState.stack.x = degrees;
  
  updateDisplay();
}

// Exponential and logarithmic functions
function handleExp() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  calculatorState.stack.x = Math.exp(value);
  updateDisplay();
}

function handleLn() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  if (value <= 0) {
    calculatorState.error = "Invalid input for ln";
    updateDisplay();
    return;
  }
  
  calculatorState.stack.x = Math.log(value);
  updateDisplay();
}

function handlePower10() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  calculatorState.stack.x = Math.pow(10, value);
  updateDisplay();
}

function handleLog() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  if (value <= 0) {
    calculatorState.error = "Invalid input for log";
    updateDisplay();
    return;
  }
  
  calculatorState.stack.x = Math.log10(value);
  updateDisplay();
}

function handleYtoX() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let xValue;
  if (calculatorState.isEnteringNumber) {
    xValue = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    xValue = calculatorState.stack.x;
  }
  
  const yValue = calculatorState.stack.y;
  
  if (yValue < 0 && !Number.isInteger(xValue)) {
    calculatorState.error = "Invalid operation for y^x";
    updateDisplay();
    return;
  }
  
  calculatorState.stack = {
    x: Math.pow(yValue, xValue),
    y: calculatorState.stack.z,
    z: calculatorState.stack.t,
    t: calculatorState.stack.t
  };
  
  updateDisplay();
}

function handleStore() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  let value;
  if (calculatorState.isEnteringNumber) {
    value = parseFloat(calculatorState.currentEntry || "0");
    calculatorState.currentEntry = "";
    calculatorState.isEnteringNumber = false;
  } else {
    value = calculatorState.stack.x;
  }
  
  calculatorState.memory = value;
  updateDisplay();
}

function handleRecall() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = false;
  
  calculatorState.stack = {
    t: calculatorState.stack.z,
    z: calculatorState.stack.y,
    y: calculatorState.stack.x,
    x: calculatorState.memory
  };
  calculatorState.currentEntry = "";
  calculatorState.isEnteringNumber = false;
  
  updateDisplay();
}

function handleEEX() {
  if (!calculatorState.isOn) return;
  
  calculatorState.shiftState = null;
  calculatorState.eeMode = true;
  
  if (!calculatorState.isEnteringNumber) {
    calculatorState.currentEntry = calculatorState.stack.x.toString();
    calculatorState.isEnteringNumber = true;
  }
  
  if (!calculatorState.currentEntry.includes("e")) {
    calculatorState.currentEntry = (calculatorState.currentEntry || "1") + "e+";
  }
  
  updateDisplay();
}

// Toggle calculator power
function togglePower() {
  calculatorState.isOn = !calculatorState.isOn;
  
  // Update power switch UI
  const switchThumb = document.querySelector('.switch-thumb');
  if (switchThumb) {
    if (calculatorState.isOn) {
      switchThumb.classList.add('on');
    } else {
      switchThumb.classList.remove('on');
    }
  }
  
  updateDisplay();
}

// Main function to handle key actions
function handleKeyAction(action) {
  if (!calculatorState.isOn && action !== "power") return;
  
  console.log("Action:", action);
  
  switch (action) {
    case "number-0": handleNumber("0"); break;
    case "number-1": handleNumber("1"); break;
    case "number-2": handleNumber("2"); break;
    case "number-3": handleNumber("3"); break;
    case "number-4": handleNumber("4"); break;
    case "number-5": handleNumber("5"); break;
    case "number-6": handleNumber("6"); break;
    case "number-7": handleNumber("7"); break;
    case "number-8": handleNumber("8"); break;
    case "number-9": handleNumber("9"); break;
    case "decimal-point": handleNumber("."); break;
    case "enter": handleEnter(); break;
    case "add": handleOperation("add"); break;
    case "subtract": handleOperation("subtract"); break;
    case "multiply": handleOperation("multiply"); break;
    case "divide": handleOperation("divide"); break;
    case "shift-f": handleShift("f"); break;
    case "shift-g": handleShift("g"); break;
    case "clear-x": handleClearX(); break;
    case "clear-stack": handleClearStack(); break;
    case "change-sign": handleChangeSign(); break;
    case "swap-xy": handleSwapXY(); break;
    case "roll-down": handleRollDown(); break;
    case "roll-up": handleRollUp(); break;
    case "pi": handlePi(); break;
    case "square-root": handleSquareRoot(); break;
    case "square": handleSquare(); break;
    case "reciprocal": handleReciprocal(); break;
    case "percentage": handlePercentage(); break;
    case "sin": handleSin(); break;
    case "cos": handleCos(); break;
    case "tan": handleTan(); break;
    case "arcsin": handleArcSin(); break;
    case "arccos": handleArcCos(); break;
    case "arctan": handleArcTan(); break;
    case "exp": handleExp(); break;
    case "ln": handleLn(); break;
    case "power-10": handlePower10(); break;
    case "log": handleLog(); break;
    case "power": handleYtoX(); break;
    case "store": handleStore(); break;
    case "recall": handleRecall(); break;
    case "eex": handleEEX(); break;
    case "power": togglePower(); break;
    default:
      console.log("Unhandled action:", action);
      // For now, unimplemented actions just update the display
      updateDisplay();
  }
}