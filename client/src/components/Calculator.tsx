import { useState, useEffect } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorButton from "./CalculatorButton";
import { useCalculator } from "@/lib/calculator";

export default function Calculator() {
  const {
    stack,
    currentEntry,
    isEnteringNumber,
    shiftState,
    memory,
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
          {/* Row 1: Special functions / Top row */}
          <CalculatorButton color="special" onClick={() => handleShift('f')}>
            <span className="key-label font-buttons font-bold">f</span>
          </CalculatorButton>
          <CalculatorButton color="special" onClick={() => handleShift('g')}>
            <span className="key-label font-buttons font-bold">g</span>
          </CalculatorButton>
          <CalculatorButton color="special" onClick={handleStore}>
            <span className="key-label font-buttons">STO</span>
          </CalculatorButton>
          <CalculatorButton color="special" onClick={handleRecall}>
            <span className="key-label font-buttons">RCL</span>
          </CalculatorButton>
          <CalculatorButton color="operation" onClick={handleEnter}>
            <span className="key-label font-buttons">ENTER↑</span>
          </CalculatorButton>
          
          {/* Row 2: Scientific functions */}
          <CalculatorButton color="function" onClick={shiftState === 'g' ? handleArcSin : handleSin}>
            <span className="key-label font-buttons">sin</span>
            <span className="key-sublabel text-gray-300">sin⁻¹</span>
          </CalculatorButton>
          <CalculatorButton color="function" onClick={shiftState === 'g' ? handleArcCos : handleCos}>
            <span className="key-label font-buttons">cos</span>
            <span className="key-sublabel text-gray-300">cos⁻¹</span>
          </CalculatorButton>
          <CalculatorButton color="function" onClick={shiftState === 'g' ? handleArcTan : handleTan}>
            <span className="key-label font-buttons">tan</span>
            <span className="key-sublabel text-gray-300">tan⁻¹</span>
          </CalculatorButton>
          <CalculatorButton color="function" onClick={shiftState === 'g' ? handleSquare : handleSquareRoot}>
            <span className="key-label font-buttons">√x</span>
            <span className="key-sublabel text-gray-300">x²</span>
          </CalculatorButton>
          <CalculatorButton color="operation" onClick={shiftState === 'g' ? handleClearX : handleChangeSign}>
            <span className="key-label font-buttons">CHS</span>
            <span className="key-sublabel text-gray-300">CLx</span>
          </CalculatorButton>
          
          {/* Row 3: More scientific functions */}
          <CalculatorButton color="function" onClick={shiftState === 'g' ? handleLn : handleExp}>
            <span className="key-label font-buttons">eˣ</span>
            <span className="key-sublabel text-gray-300">ln</span>
          </CalculatorButton>
          <CalculatorButton color="function" onClick={shiftState === 'g' ? handleLog : handlePower10}>
            <span className="key-label font-buttons">10ˣ</span>
            <span className="key-sublabel text-gray-300">log</span>
          </CalculatorButton>
          <CalculatorButton color="function" onClick={shiftState === 'g' ? handleRollUp : handleRollDown}>
            <span className="key-label font-buttons">R↓</span>
            <span className="key-sublabel text-gray-300">R↑</span>
          </CalculatorButton>
          <CalculatorButton color="function" onClick={shiftState === 'g' ? handlePi : handleSwapXY}>
            <span className="key-label font-buttons">x⇄y</span>
            <span className="key-sublabel text-gray-300">π</span>
          </CalculatorButton>
          <CalculatorButton color="operation" onClick={() => handleOperation('divide')}>
            <span className="key-label font-buttons">÷</span>
          </CalculatorButton>
          
          {/* Row 4: Numeric keys and operations */}
          <CalculatorButton color="numeric" onClick={() => handleNumber('7')}>
            <span className="key-label font-buttons font-bold">7</span>
          </CalculatorButton>
          <CalculatorButton color="numeric" onClick={() => handleNumber('8')}>
            <span className="key-label font-buttons font-bold">8</span>
          </CalculatorButton>
          <CalculatorButton color="numeric" onClick={() => handleNumber('9')}>
            <span className="key-label font-buttons font-bold">9</span>
          </CalculatorButton>
          <CalculatorButton color="function" onClick={shiftState === 'g' ? handlePercentage : handleReciprocal}>
            <span className="key-label font-buttons">1/x</span>
            <span className="key-sublabel text-gray-300">%</span>
          </CalculatorButton>
          <CalculatorButton color="operation" onClick={() => handleOperation('multiply')}>
            <span className="key-label font-buttons">×</span>
          </CalculatorButton>
          
          {/* Row 5: More numeric keys and operations */}
          <CalculatorButton color="numeric" onClick={() => handleNumber('4')}>
            <span className="key-label font-buttons font-bold">4</span>
          </CalculatorButton>
          <CalculatorButton color="numeric" onClick={() => handleNumber('5')}>
            <span className="key-label font-buttons font-bold">5</span>
          </CalculatorButton>
          <CalculatorButton color="numeric" onClick={() => handleNumber('6')}>
            <span className="key-label font-buttons font-bold">6</span>
          </CalculatorButton>
          <CalculatorButton color="function" onClick={shiftState === 'g' ? () => {} : handleYtoX}>
            <span className="key-label font-buttons">yˣ</span>
            <span className="key-sublabel text-gray-300">Δ%</span>
          </CalculatorButton>
          <CalculatorButton color="operation" onClick={() => handleOperation('subtract')}>
            <span className="key-label font-buttons">−</span>
          </CalculatorButton>
          
          {/* Row 6: Bottom row */}
          <CalculatorButton color="numeric" onClick={() => handleNumber('1')}>
            <span className="key-label font-buttons font-bold">1</span>
          </CalculatorButton>
          <CalculatorButton color="numeric" onClick={() => handleNumber('2')}>
            <span className="key-label font-buttons font-bold">2</span>
          </CalculatorButton>
          <CalculatorButton color="numeric" onClick={() => handleNumber('3')}>
            <span className="key-label font-buttons font-bold">3</span>
          </CalculatorButton>
          <CalculatorButton color="function" onClick={handleEEX}>
            <span className="key-label font-buttons">EEX</span>
            <span className="key-sublabel text-gray-300">P/R</span>
          </CalculatorButton>
          <CalculatorButton color="operation" onClick={() => handleOperation('add')}>
            <span className="key-label font-buttons">+</span>
          </CalculatorButton>
          
          {/* Row 7: Bottom row */}
          <CalculatorButton color="numeric" onClick={() => handleNumber('0')} className="col-span-2">
            <span className="key-label font-buttons font-bold">0</span>
          </CalculatorButton>
          <CalculatorButton color="numeric" onClick={() => handleNumber('.')}>
            <span className="key-label font-buttons font-bold">.</span>
          </CalculatorButton>
          <CalculatorButton color="function" onClick={() => {}}>
            <span className="key-label font-buttons">SST</span>
            <span className="key-sublabel text-gray-300">BST</span>
          </CalculatorButton>
          <CalculatorButton color="operation" onClick={() => {}}>
            <span className="key-label font-buttons">GTO</span>
          </CalculatorButton>
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
