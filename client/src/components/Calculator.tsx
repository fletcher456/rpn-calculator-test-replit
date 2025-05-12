import { useState } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorButton from "./CalculatorButton";
import { useCalculator } from "@/lib/calculator";
import { keyMatrix, getKeyAction } from "@/lib/keyMatrix";

export default function Calculator() {
  const {
    stack,
    currentEntry,
    isEnteringNumber,
    shiftState,
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
  } = useCalculator();

  const [isOn, setIsOn] = useState(true);

  // Toggle calculator power
  const togglePower = () => {
    setIsOn(!isOn);
  };

  // Handle key actions based on the action string
  const handleKeyAction = (action: string) => {
    if (action.startsWith("number-")) {
      const digit = action.split("-")[1];
      handleNumber(digit);
    } else if (action === "decimal-point") {
      handleNumber(".");
    } else {
      // Handle all other actions
      switch (action) {
        case "shift-f": handleShift("f"); break;
        case "shift-g": handleShift("g"); break;
        case "enter": handleEnter(); break;
        case "store": handleStore(); break;
        case "recall": handleRecall(); break;
        case "sin": handleSin(); break;
        case "arcsin": handleArcSin(); break;
        case "cos": handleCos(); break;
        case "arccos": handleArcCos(); break;
        case "tan": handleTan(); break;
        case "arctan": handleArcTan(); break;
        case "sqrt": handleSquareRoot(); break;
        case "square": handleSquare(); break;
        case "chs": handleChangeSign(); break;
        case "clear-x": handleClearX(); break;
        case "exp": handleExp(); break;
        case "ln": handleLn(); break;
        case "power10": handlePower10(); break;
        case "log": handleLog(); break;
        case "roll-down": handleRollDown(); break;
        case "roll-up": handleRollUp(); break;
        case "swap-xy": handleSwapXY(); break;
        case "pi": handlePi(); break;
        case "divide": handleOperation("divide"); break;
        case "multiply": handleOperation("multiply"); break;
        case "subtract": handleOperation("subtract"); break;
        case "add": handleOperation("add"); break;
        case "reciprocal": handleReciprocal(); break;
        case "percentage": handlePercentage(); break;
        case "y-to-x": handleYtoX(); break;
        case "eex": handleEEX(); break;
        case "sst":
        case "gto":
          // These are placeholder actions for now
          break;
      }
    }
  };

  return (
    <div className="calculator-wrapper max-w-md w-full mx-auto">
      <div className="calculator-body bg-[hsl(var(--calculator-body))] rounded-xl shadow-2xl p-4 pb-6">
        {/* Calculator Header with branding */}
        <div className="calculator-header flex justify-between items-center mb-4">
          <div className="calculator-branding">
            <h1 className="text-[hsl(var(--special-keys))] font-brand font-bold text-xl">HP-29C</h1>
            <p className="text-gray-400 text-xs font-brand">Programmable Scientific</p>
          </div>
          <div className="power-switch flex items-center">
            <span className="text-gray-400 text-xs mr-2">OFF</span>
            <div 
              className="w-10 h-4 bg-gray-700 rounded-full relative cursor-pointer"
              onClick={togglePower}
            >
              <div 
                className={`absolute top-0 w-4 h-4 bg-[hsl(var(--special-keys))] rounded-full transform transition-transform ${isOn ? 'right-0' : 'left-0'}`}
              ></div>
            </div>
            <span className="text-gray-400 text-xs ml-2">ON</span>
          </div>
        </div>
        
        {/* Calculator Display */}
        <CalculatorDisplay 
          stack={stack} 
          currentEntry={currentEntry} 
          isEnteringNumber={isEnteringNumber}
          isOn={isOn}
        />
        
        {/* Calculator Keypad */}
        <div className={`calculator-keypad grid grid-cols-5 gap-2 sm:gap-3 ${!isOn ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Render keys from the keyMatrix */}
          {keyMatrix.map((row, rowIndex) => (
            // Map each row
            row.map((key, keyIndex) => (
              <CalculatorButton
                key={`${rowIndex}-${keyIndex}`}
                color={key.color}
                onClick={() => handleKeyAction(getKeyAction(key, shiftState))}
                className={key.width ? `col-span-${key.width}` : ""}
              >
                <span className="key-label font-buttons font-bold">{key.label}</span>
                {key.subLabel && (
                  <span className="key-sublabel text-gray-300">{key.subLabel}</span>
                )}
              </CalculatorButton>
            ))
          ))}
        </div>
      </div>
      
      {/* Calculator Footer with model info */}
      <div className="calculator-footer text-center mt-4">
        <p className="text-gray-500 text-xs">Hewlett-Packard 29C RPN Calculator</p>
        <p className="text-gray-400 text-xs">Vintage Programmable Scientific - Digital Recreation</p>
      </div>
    </div>
  );
}
