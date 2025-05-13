# HP 29C RPN Calculator

A faithful web-based recreation of the HP 29C RPN calculator with scientific functions and stack operations.

![HP 29C Calculator](https://upload.wikimedia.org/wikipedia/commons/7/7d/HP-29C_Calculator.jpg)

## About the HP-29C

The HP-29C was a programmable scientific calculator introduced by Hewlett-Packard in 1977. It used Reverse Polish Notation (RPN) for calculations, which eliminates the need for parentheses when entering complex expressions.

## Features

- Authentic RPN (Reverse Polish Notation) operation
- Four-level stack (X, Y, Z, T registers)
- Scientific functions (trigonometric, logarithmic, exponential)
- Memory operations
- Shift keys for alternate functions
- Realistic styling matching the original HP 29C

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- npm (included with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hp-29c-calculator.git
   cd hp-29c-calculator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Using the Calculator

### RPN Basics

The HP 29C uses Reverse Polish Notation (RPN), which works differently from algebraic calculators:

1. Enter the first number
2. Press ENTER
3. Enter the second number
4. Press the operation key

For example, to calculate 5 + 3:
- Press `5`
- Press `ENTER`
- Press `3`
- Press `+`

### Stack Operations

The calculator maintains a 4-level stack (X, Y, Z, T):
- X: Currently displayed value
- Y: Value automatically pushed when you press ENTER or an operation
- Z: Third value in the stack
- T: Fourth value in the stack

Stack manipulation keys:
- `x⇄y`: Swaps the X and Y registers
- `R↓`: Rolls the stack down (T→Z→Y→X→T)
- `R↑`: Rolls the stack up (T←Z←Y←X←T)

### Scientific Functions

The calculator includes various scientific functions:
- Trigonometric functions: `sin`, `cos`, `tan` and their inverses
- Logarithmic functions: `ln`, `log`
- Exponential functions: `e^x`, `10^x`, `y^x`
- Other functions: `√x`, `x²`, `1/x`, `%`

### Shift Keys

Two shift keys provide access to alternate functions:
- `f`: Orange/gold functions (primary alternate functions)
- `g`: Blue functions (secondary alternate functions)

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── lib/              # Utility functions
│   │   ├── pages/            # Application pages
│   │   ├── App.tsx           # Main application component
│   │   └── main.tsx          # Application entry point
│   └── index.html            # HTML template
├── server/                   # Backend server code
└── shared/                   # Shared code between client and server
```

## Key Files

- `client/src/lib/calculator.ts`: Core calculator logic
- `client/src/lib/keyMatrix.ts`: Calculator key definitions and layout
- `client/src/components/Calculator.tsx`: Main calculator component
- `client/src/components/CalculatorDisplay.tsx`: Display component
- `client/src/components/CalculatorButton.tsx`: Button component

## Customizing the Calculator

To modify the calculator keys or functionality:

1. Edit `client/src/lib/keyMatrix.ts` to change key labels, colors, or actions
2. Modify `client/src/lib/calculator.ts` to alter calculator behavior
3. Update CSS variables in `client/src/index.css` to change the visual style

## Built With

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Express](https://expressjs.com/) - Backend server
- [Vite](https://vitejs.dev/) - Frontend build tool

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Hewlett-Packard for the original HP-29C calculator
- The RPN calculator community for inspiration and technical details