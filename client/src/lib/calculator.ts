import { useState, useCallback } from "react";

export interface Stack {
  x: number;
  y: number;
  z: number;
  t: number;
}

type ShiftState = null | "f" | "g";
type Operation = "add" | "subtract" | "multiply" | "divide";

export function useCalculator() {
  const [stack, setStack] = useState<Stack>({
    x: 0,
    y: 0,
    z: 0,
    t: 0,
  });
  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [isEnteringNumber, setIsEnteringNumber] = useState<boolean>(false);
  const [shiftState, setShiftState] = useState<ShiftState>(null);
  const [memory, setMemory] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [eeMode, setEEMode] = useState<boolean>(false);

  // Helper function to push the current value onto the stack
  const push = useCallback((value: number) => {
    setStack((prevStack) => ({
      t: prevStack.z,
      z: prevStack.y,
      y: prevStack.x,
      x: value,
    }));
  }, []);

  // Handle number input
  const handleNumber = useCallback((num: string) => {
    setShiftState(null); // Clear shift state when entering a number
    
    if (!isEnteringNumber) {
      setCurrentEntry("");
      setIsEnteringNumber(true);
    }
    
    // Handle decimal point
    if (num === ".") {
      if (currentEntry.includes(".")) return;
      setCurrentEntry((prev) => (prev === "" ? "0." : prev + "."));
    } else if (eeMode) {
      // Handle EE input
      if (currentEntry.includes("e")) {
        // We're already in EE mode, update the exponent
        const [mantissa, exponent] = currentEntry.split("e");
        const newExponent = exponent + num;
        setCurrentEntry(`${mantissa}e${newExponent}`);
      } else {
        // Start EE mode
        setCurrentEntry((prev) => `${prev || "1"}e${num}`);
      }
    } else {
      // Normal number input
      setCurrentEntry((prev) => prev + num);
    }
    
    // Update X register with the parsed number
    try {
      const parsedNumber = parseFloat(
        eeMode && !currentEntry.includes("e")
          ? `${currentEntry || "1"}e${num}`
          : currentEntry + num
      );
      setStack((prevStack) => ({
        ...prevStack,
        x: parsedNumber,
      }));
    } catch (err) {
      setError("Invalid number");
    }
  }, [currentEntry, isEnteringNumber, eeMode]);

  // Handle ENTER
  const handleEnter = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      push(value);
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      // Duplicate X if not entering a number (traditional HP behavior)
      push(stack.x);
    }
  }, [stack.x, push, currentEntry, isEnteringNumber]);

  // Handle binary operations
  const handleOperation = useCallback((operation: Operation) => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      setStack((prevStack) => ({
        ...prevStack,
        x: parseFloat(currentEntry || "0"),
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    }
    
    let result: number;
    switch (operation) {
      case "add":
        result = stack.y + stack.x;
        break;
      case "subtract":
        result = stack.y - stack.x;
        break;
      case "multiply":
        result = stack.y * stack.x;
        break;
      case "divide":
        if (stack.x === 0) {
          setError("Division by zero");
          result = NaN;
        } else {
          result = stack.y / stack.x;
        }
        break;
      default:
        return;
    }
    
    setStack((prevStack) => ({
      x: result,
      y: prevStack.z,
      z: prevStack.t,
      t: prevStack.t,
    }));
  }, [stack, currentEntry, isEnteringNumber]);

  // Handle shift keys (f and g)
  const handleShift = useCallback((shift: ShiftState) => {
    setShiftState((prevShift) => (prevShift === shift ? null : shift));
  }, []);

  // Clear X register
  const handleClearX = useCallback(() => {
    setShiftState(null);
    setStack((prevStack) => ({
      ...prevStack,
      x: 0,
    }));
    setCurrentEntry("");
    setIsEnteringNumber(false);
    setEEMode(false);
  }, []);

  // Clear entire stack
  const handleClearStack = useCallback(() => {
    setShiftState(null);
    setStack({
      x: 0,
      y: 0,
      z: 0,
      t: 0,
    });
    setCurrentEntry("");
    setIsEnteringNumber(false);
    setEEMode(false);
  }, []);

  // Change sign of X
  const handleChangeSign = useCallback(() => {
    setShiftState(null);
    
    if (isEnteringNumber) {
      if (currentEntry.startsWith("-")) {
        setCurrentEntry(currentEntry.substring(1));
      } else {
        setCurrentEntry("-" + currentEntry);
      }
      setStack((prevStack) => ({
        ...prevStack,
        x: -prevStack.x,
      }));
    } else {
      setStack((prevStack) => ({
        ...prevStack,
        x: -prevStack.x,
      }));
    }
  }, [currentEntry, isEnteringNumber]);

  // Swap X and Y registers
  const handleSwapXY = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const xValue = parseFloat(currentEntry || "0");
      setStack((prevStack) => ({
        ...prevStack,
        x: prevStack.y,
        y: xValue,
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      setStack((prevStack) => ({
        ...prevStack,
        x: prevStack.y,
        y: prevStack.x,
      }));
    }
  }, [currentEntry, isEnteringNumber]);

  // Roll stack down
  const handleRollDown = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const xValue = parseFloat(currentEntry || "0");
      setStack((prevStack) => ({
        x: prevStack.y,
        y: prevStack.z,
        z: prevStack.t,
        t: xValue,
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      setStack((prevStack) => ({
        x: prevStack.y,
        y: prevStack.z,
        z: prevStack.t,
        t: prevStack.x,
      }));
    }
  }, [currentEntry, isEnteringNumber]);

  // Roll stack up
  const handleRollUp = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const xValue = parseFloat(currentEntry || "0");
      setStack((prevStack) => ({
        x: prevStack.t,
        y: xValue,
        z: prevStack.y,
        t: prevStack.z,
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      setStack((prevStack) => ({
        x: prevStack.t,
        y: prevStack.x,
        z: prevStack.y,
        t: prevStack.z,
      }));
    }
  }, [currentEntry, isEnteringNumber]);

  // Pi constant
  const handlePi = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    setStack((prevStack) => ({
      t: prevStack.z,
      z: prevStack.y,
      y: prevStack.x,
      x: Math.PI,
    }));
    setCurrentEntry("");
    setIsEnteringNumber(false);
  }, []);

  // Square root
  const handleSquareRoot = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      if (value < 0) {
        setError("Invalid input for sqrt");
        return;
      }
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.sqrt(value),
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      if (stack.x < 0) {
        setError("Invalid input for sqrt");
        return;
      }
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.sqrt(prevStack.x),
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  // Square
  const handleSquare = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      setStack((prevStack) => ({
        ...prevStack,
        x: value * value,
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      setStack((prevStack) => ({
        ...prevStack,
        x: prevStack.x * prevStack.x,
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  // Reciprocal (1/x)
  const handleReciprocal = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      if (value === 0) {
        setError("Division by zero");
        return;
      }
      setStack((prevStack) => ({
        ...prevStack,
        x: 1 / value,
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      if (stack.x === 0) {
        setError("Division by zero");
        return;
      }
      setStack((prevStack) => ({
        ...prevStack,
        x: 1 / prevStack.x,
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  // Percentage
  const handlePercentage = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      setStack((prevStack) => ({
        ...prevStack,
        x: (prevStack.y * value) / 100,
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      setStack((prevStack) => ({
        ...prevStack,
        x: (prevStack.y * prevStack.x) / 100,
      }));
    }
  }, [currentEntry, isEnteringNumber, stack]);

  // Trigonometric functions
  const handleSin = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      // Convert from degrees to radians
      const radians = (value * Math.PI) / 180;
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.sin(radians),
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      // Convert from degrees to radians
      const radians = (stack.x * Math.PI) / 180;
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.sin(radians),
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  const handleCos = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      // Convert from degrees to radians
      const radians = (value * Math.PI) / 180;
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.cos(radians),
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      // Convert from degrees to radians
      const radians = (stack.x * Math.PI) / 180;
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.cos(radians),
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  const handleTan = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      // Convert from degrees to radians
      const radians = (value * Math.PI) / 180;
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.tan(radians),
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      // Convert from degrees to radians
      const radians = (stack.x * Math.PI) / 180;
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.tan(radians),
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  // Inverse trigonometric functions
  const handleArcSin = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      if (value < -1 || value > 1) {
        setError("Invalid input for arcsin");
        return;
      }
      // Convert from radians to degrees
      const degrees = (Math.asin(value) * 180) / Math.PI;
      setStack((prevStack) => ({
        ...prevStack,
        x: degrees,
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      if (stack.x < -1 || stack.x > 1) {
        setError("Invalid input for arcsin");
        return;
      }
      // Convert from radians to degrees
      const degrees = (Math.asin(stack.x) * 180) / Math.PI;
      setStack((prevStack) => ({
        ...prevStack,
        x: degrees,
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  const handleArcCos = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      if (value < -1 || value > 1) {
        setError("Invalid input for arccos");
        return;
      }
      // Convert from radians to degrees
      const degrees = (Math.acos(value) * 180) / Math.PI;
      setStack((prevStack) => ({
        ...prevStack,
        x: degrees,
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      if (stack.x < -1 || stack.x > 1) {
        setError("Invalid input for arccos");
        return;
      }
      // Convert from radians to degrees
      const degrees = (Math.acos(stack.x) * 180) / Math.PI;
      setStack((prevStack) => ({
        ...prevStack,
        x: degrees,
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  const handleArcTan = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      // Convert from radians to degrees
      const degrees = (Math.atan(value) * 180) / Math.PI;
      setStack((prevStack) => ({
        ...prevStack,
        x: degrees,
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      // Convert from radians to degrees
      const degrees = (Math.atan(stack.x) * 180) / Math.PI;
      setStack((prevStack) => ({
        ...prevStack,
        x: degrees,
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  // Exponential and logarithmic functions
  const handleExp = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.exp(value),
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.exp(prevStack.x),
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  const handleLn = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      if (value <= 0) {
        setError("Invalid input for ln");
        return;
      }
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.log(value),
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      if (stack.x <= 0) {
        setError("Invalid input for ln");
        return;
      }
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.log(prevStack.x),
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  const handlePower10 = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.pow(10, value),
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.pow(10, prevStack.x),
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  const handleLog = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const value = parseFloat(currentEntry || "0");
      if (value <= 0) {
        setError("Invalid input for log");
        return;
      }
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.log10(value),
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      if (stack.x <= 0) {
        setError("Invalid input for log");
        return;
      }
      setStack((prevStack) => ({
        ...prevStack,
        x: Math.log10(prevStack.x),
      }));
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  // Y to the X power
  const handleYtoX = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      const xValue = parseFloat(currentEntry || "0");
      if (stack.y < 0 && !Number.isInteger(xValue)) {
        setError("Invalid operation");
        return;
      }
      setStack((prevStack) => ({
        x: Math.pow(prevStack.y, xValue),
        y: prevStack.z,
        z: prevStack.t,
        t: prevStack.t,
      }));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      if (stack.y < 0 && !Number.isInteger(stack.x)) {
        setError("Invalid operation");
        return;
      }
      setStack((prevStack) => ({
        x: Math.pow(prevStack.y, prevStack.x),
        y: prevStack.z,
        z: prevStack.t,
        t: prevStack.t,
      }));
    }
  }, [currentEntry, isEnteringNumber, stack]);

  // Store in memory
  const handleStore = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    if (isEnteringNumber) {
      setMemory(parseFloat(currentEntry || "0"));
      setCurrentEntry("");
      setIsEnteringNumber(false);
    } else {
      setMemory(stack.x);
    }
  }, [currentEntry, isEnteringNumber, stack.x]);

  // Recall from memory
  const handleRecall = useCallback(() => {
    setShiftState(null);
    setEEMode(false);
    
    push(memory);
    setCurrentEntry("");
    setIsEnteringNumber(false);
  }, [memory, push]);

  // Handle scientific notation (EEX)
  const handleEEX = useCallback(() => {
    setShiftState(null);
    
    if (!isEnteringNumber) {
      // If not entering a number, start with 1
      setCurrentEntry("1e");
      setIsEnteringNumber(true);
    } else if (!currentEntry.includes("e")) {
      // If already entering a number but no exponent yet
      setCurrentEntry((prev) => `${prev || "1"}e`);
    }
    
    setEEMode(true);
  }, [currentEntry, isEnteringNumber]);

  return {
    stack,
    currentEntry,
    isEnteringNumber,
    shiftState,
    memory,
    error,
    handleNumber,
    handleEnter,
    handleOperation,
    handleShift,
    handleClearX,
    handleClearStack,
    handleChangeSign,
    handleSwapXY,
    handleRollDown,
    handleRollUp,
    handlePi,
    handleSquareRoot,
    handleSquare,
    handleReciprocal,
    handlePercentage,
    handleSin,
    handleCos,
    handleTan,
    handleArcSin,
    handleArcCos,
    handleArcTan,
    handleExp,
    handleLn,
    handlePower10,
    handleLog,
    handleYtoX,
    handleStore,
    handleRecall,
    handleEEX,
  };
}
