// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the calculator
  initCalculator();
  
  // Set power switch event listener
  const powerSwitch = document.querySelector('.switch-track');
  if (powerSwitch) {
    powerSwitch.addEventListener('click', function() {
      togglePower();
    });
  }
  
  // Update display on initial load
  updateDisplay();
});

// Initialize the calculator layout and event listeners
function initCalculator() {
  const keypad = document.getElementById('keypad');
  if (!keypad) return;
  
  // Clear any existing keypad content
  keypad.innerHTML = '';
  
  // Create keypad rows and buttons
  keyMatrix.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.className = `keypad-row ${rowIndex >= 3 ? 'grid-cols-4' : 'grid-cols-5'}`;
    rowElement.style.display = 'grid';
    rowElement.style.gap = '8px';
    rowElement.style.marginBottom = '8px';
    
    // Create buttons in each row
    row.forEach((key) => {
      const button = document.createElement('button');
      button.className = `calculator-button ${key.color}`;
      
      // Handle special width for ENTER key
      if (key.width === 2) {
        button.style.gridColumn = 'span 2';
      }
      
      // Create button content with super, main, and sub labels
      let buttonContent = '';
      
      if (key.superLabel) {
        buttonContent += `<span class="key-superlabel">${key.superLabel}</span>`;
      }
      
      buttonContent += `<span class="key-label">${key.label}</span>`;
      
      if (key.subLabel) {
        buttonContent += `<span class="key-sublabel">${key.subLabel}</span>`;
      }
      
      button.innerHTML = buttonContent;
      
      // Add click event listener to handle key actions
      button.addEventListener('click', () => {
        const action = getKeyAction(key, calculatorState.shiftState);
        handleKeyAction(action);
      });
      
      rowElement.appendChild(button);
    });
    
    keypad.appendChild(rowElement);
  });
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
  if (!calculatorState.isOn) return;
  
  const key = event.key;
  
  // Prevent default behavior for calculator keys
  if (/^[0-9]$/.test(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === 'Enter') {
    event.preventDefault();
  }
  
  // Map keyboard keys to calculator actions
  switch (key) {
    case '0': handleKeyAction('number-0'); break;
    case '1': handleKeyAction('number-1'); break;
    case '2': handleKeyAction('number-2'); break;
    case '3': handleKeyAction('number-3'); break;
    case '4': handleKeyAction('number-4'); break;
    case '5': handleKeyAction('number-5'); break;
    case '6': handleKeyAction('number-6'); break;
    case '7': handleKeyAction('number-7'); break;
    case '8': handleKeyAction('number-8'); break;
    case '9': handleKeyAction('number-9'); break;
    case '.': handleKeyAction('decimal-point'); break;
    case 'Enter': handleKeyAction('enter'); break;
    case '+': handleKeyAction('add'); break;
    case '-': handleKeyAction('subtract'); break;
    case '*': handleKeyAction('multiply'); break;
    case '/': handleKeyAction('divide'); break;
    case 'f': handleKeyAction('shift-f'); break;
    case 'g': handleKeyAction('shift-g'); break;
    case 'Escape': handleKeyAction('clear-x'); break;
    case 'Delete': handleKeyAction('clear-stack'); break;
    case 'c': 
      if (event.ctrlKey) handleKeyAction('clear-stack');
      break;
    case 'p': handleKeyAction('pi'); break;
    case 's': handleKeyAction('sin'); break;
    case 'r': handleKeyAction('square-root'); break;
    case '²': handleKeyAction('square'); break;
    case 'e': handleKeyAction('eex'); break;
    case 'w': handleKeyAction('swap-xy'); break;
  }
});