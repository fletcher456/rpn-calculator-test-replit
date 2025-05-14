# HP 29C Calculator Test Plan

This document outlines a comprehensive test plan for the HP 29C RPN calculator's basic (non-programming, non-statistical) functions. Each test includes steps, expected results, and both pass/fail outcomes (commented). Uncomment the actual result as observed during testing.

## Basic Number Entry and Display

### Test 1: Number Entry
1. Turn calculator on
2. Press `5`
3. Observe display

**Expected**: X register displays "5"  
<!-- PASS: X register displays "5" -->  
<!-- FAIL: X register does not display "5" or displays an incorrect value -->

### Test 2: Multi-digit Numbers
1. Turn calculator on
2. Press `1` `2` `3` `.` `4` `5`
3. Observe display

**Expected**: X register displays "123.45"  
<!-- PASS: X register displays "123.45" -->  
<!-- FAIL: X register does not display "123.45" correctly -->

### Test 3: Negative Numbers (CHS)
1. Turn calculator on
2. Press `7` `8` `9`
3. Press `CHS`
4. Observe display

**Expected**: X register displays "-789"  
<!-- PASS: X register displays "-789" -->  
<!-- FAIL: X register does not display "-789" or sign doesn't change -->

### Test 4: Scientific Notation (EEX)
1. Turn calculator on
2. Press `5` `EEX` `3`
3. Observe display

**Expected**: X register displays "5.0000e3" or equivalent (5000)  
<!-- PASS: X register displays "5.0000e3" or "5000" -->  
<!-- FAIL: X register does not display "5.0000e3" or "5000" correctly -->

## Stack Operations

### Test 5: ENTER Operation
1. Turn calculator on
2. Press `4` `2`
3. Press `ENTER↑`
4. Observe Y and X registers

**Expected**: X = 42, Y = 42  
<!-- PASS: X = 42, Y = 42 -->  
<!-- FAIL: Values are not duplicated correctly -->

### Test 6: Stack Lift
1. Turn calculator on
2. Press `5` `ENTER↑` `3` `ENTER↑` `1`
3. Observe stack (all registers)

**Expected**: X = 1, Y = 3, Z = 5, T = 0  
<!-- PASS: X = 1, Y = 3, Z = 5, T = 0 -->  
<!-- FAIL: Stack doesn't lift correctly -->

### Test 7: x⇄y (Swap X and Y)
1. Turn calculator on
2. Press `7` `ENTER↑` `3`
3. Press `x⇄y`
4. Observe X and Y registers

**Expected**: X = 7, Y = 3  
<!-- PASS: X = 7, Y = 3 -->  
<!-- FAIL: X and Y values don't swap correctly -->

### Test 8: R↓ (Roll Down)
1. Turn calculator on
2. Press `1` `ENTER↑` `2` `ENTER↑` `3` `ENTER↑` `4`
3. Press `R↓`
4. Observe stack

**Expected**: X = 1, Y = 4, Z = 3, T = 2  
<!-- PASS: X = 1, Y = 4, Z = 3, T = 2 -->  
<!-- FAIL: Stack doesn't roll down correctly -->

### Test 9: CLx (Clear X)
1. Turn calculator on
2. Press `7` `ENTER↑` `9`
3. Press `CLx`
4. Observe X register

**Expected**: X = 0, Y = 7  
<!-- PASS: X = 0, Y = 7 -->  
<!-- FAIL: X register not cleared or Y value changed -->

## Basic Arithmetic Operations

### Test 10: Addition
1. Turn calculator on
2. Press `5` `ENTER↑` `3` `+`
3. Observe result

**Expected**: X = 8  
<!-- PASS: X = 8 -->  
<!-- FAIL: Addition gives incorrect result -->

### Test 11: Subtraction
1. Turn calculator on
2. Press `9` `ENTER↑` `4` `-`
3. Observe result

**Expected**: X = 5  
<!-- PASS: X = 5 -->  
<!-- FAIL: Subtraction gives incorrect result -->

### Test 12: Multiplication
1. Turn calculator on
2. Press `6` `ENTER↑` `7` `×`
3. Observe result

**Expected**: X = 42  
<!-- PASS: X = 42 -->  
<!-- FAIL: Multiplication gives incorrect result -->

### Test 13: Division
1. Turn calculator on
2. Press `1` `0` `ENTER↑` `2` `÷`
3. Observe result

**Expected**: X = 5  
<!-- PASS: X = 5 -->  
<!-- FAIL: Division gives incorrect result -->

### Test 14: Division by Zero
1. Turn calculator on
2. Press `5` `ENTER↑` `0` `÷`
3. Observe result

**Expected**: Error display or infinity  
<!-- PASS: Displays error message or shows infinity -->  
<!-- FAIL: Calculator crashes or gives numeric result -->

## Power and Root Functions

### Test 15: Square Root (√x)
1. Turn calculator on
2. Press `1` `6` `√x`
3. Observe result

**Expected**: X = 4  
<!-- PASS: X = 4 -->  
<!-- FAIL: Square root gives incorrect result -->

### Test 16: Square (x²)
1. Turn calculator on
2. Press `9` `x²` (Note: This is usually a shifted function)
3. Observe result

**Expected**: X = 81  
<!-- PASS: X = 81 -->  
<!-- FAIL: Square gives incorrect result -->

### Test 17: Power (y^x)
1. Turn calculator on
2. Press `2` `ENTER↑` `3` `y^x`
3. Observe result

**Expected**: X = 8  
<!-- PASS: X = 8 -->  
<!-- FAIL: Power function gives incorrect result -->

### Test 18: Reciprocal (1/x)
1. Turn calculator on
2. Press `4` `1/x`
3. Observe result

**Expected**: X = 0.25  
<!-- PASS: X = 0.25 -->  
<!-- FAIL: Reciprocal gives incorrect result -->

## Logarithmic and Exponential Functions

### Test 19: Natural Logarithm (ln)
1. Turn calculator on
2. Press `2` `0` `ln`
3. Observe result

**Expected**: X ≈ 2.9957 (approximately)  
<!-- PASS: X ≈ 2.9957 (or close approximation) -->  
<!-- FAIL: Natural logarithm gives incorrect result -->

### Test 20: Exponential Function (e^x)
1. Turn calculator on
2. Press `2` `e^x`
3. Observe result

**Expected**: X ≈ 7.3891 (approximately)  
<!-- PASS: X ≈ 7.3891 (or close approximation) -->  
<!-- FAIL: Exponential function gives incorrect result -->

### Test 21: Common Logarithm (log)
1. Turn calculator on
2. Press `1` `0` `0` `log`
3. Observe result

**Expected**: X = 2  
<!-- PASS: X = 2 -->  
<!-- FAIL: Common logarithm gives incorrect result -->

### Test 22: Power of 10 (10^x)
1. Turn calculator on
2. Press `3` `10^x`
3. Observe result

**Expected**: X = 1000  
<!-- PASS: X = 1000 -->  
<!-- FAIL: Power of 10 gives incorrect result -->

## Trigonometric Functions

### Test 23: Sine (sin)
1. Turn calculator on
2. Press `3` `0` `sin`
3. Observe result

**Expected**: X = 0.5 (assuming degrees mode)  
<!-- PASS: X = 0.5 -->  
<!-- FAIL: Sine gives incorrect result -->

### Test 24: Cosine (cos)
1. Turn calculator on
2. Press `6` `0` `cos`
3. Observe result

**Expected**: X = 0.5 (assuming degrees mode)  
<!-- PASS: X = 0.5 -->  
<!-- FAIL: Cosine gives incorrect result -->

### Test 25: Tangent (tan)
1. Turn calculator on
2. Press `4` `5` `tan`
3. Observe result

**Expected**: X = 1 (assuming degrees mode)  
<!-- PASS: X = 1 -->  
<!-- FAIL: Tangent gives incorrect result -->

### Test 26: Arcsine (sin^-1)
1. Turn calculator on
2. Press `0` `.` `5` `sin^-1` (Note: This is usually a shifted function)
3. Observe result

**Expected**: X = 30 (assuming degrees mode)  
<!-- PASS: X = 30 -->  
<!-- FAIL: Arcsine gives incorrect result -->

### Test 27: Arccosine (cos^-1)
1. Turn calculator on
2. Press `0` `.` `5` `cos^-1` (Note: This is usually a shifted function)
3. Observe result

**Expected**: X = 60 (assuming degrees mode)  
<!-- PASS: X = 60 -->  
<!-- FAIL: Arccosine gives incorrect result -->

### Test 28: Arctangent (tan^-1)
1. Turn calculator on
2. Press `1` `tan^-1` (Note: This is usually a shifted function)
3. Observe result

**Expected**: X = 45 (assuming degrees mode)  
<!-- PASS: X = 45 -->  
<!-- FAIL: Arctangent gives incorrect result -->

## Constants and Special Functions

### Test 29: Pi (π)
1. Turn calculator on
2. Access pi (Note: This is usually a shifted function)
3. Observe result

**Expected**: X ≈ 3.1416 (approximately)  
<!-- PASS: X ≈ 3.1416 (or close approximation) -->  
<!-- FAIL: Pi constant gives incorrect value -->

### Test 30: Absolute Value (|x|)
1. Turn calculator on
2. Press `5` `CHS` to get -5
3. Calculate absolute value (Note: This is usually a shifted function)
4. Observe result

**Expected**: X = 5  
<!-- PASS: X = 5 -->  
<!-- FAIL: Absolute value gives incorrect result -->

### Test 31: Integer Part (INT)
1. Turn calculator on
2. Press `7` `.` `8` `9`
3. Calculate integer part (Note: This is usually a shifted function)
4. Observe result

**Expected**: X = 7  
<!-- PASS: X = 7 -->  
<!-- FAIL: Integer part gives incorrect result -->

### Test 32: Fractional Part (FRAC)
1. Turn calculator on
2. Press `7` `.` `8` `9`
3. Calculate fractional part (Note: This is usually a shifted function)
4. Observe result

**Expected**: X = 0.89  
<!-- PASS: X = 0.89 -->  
<!-- FAIL: Fractional part gives incorrect result -->

## Complex Operations

### Test 33: Chain Calculation
1. Turn calculator on
2. Calculate: (5 + 3) × 2
   - Press `5` `ENTER↑` `3` `+` `2` `×`
3. Observe result

**Expected**: X = 16  
<!-- PASS: X = 16 -->  
<!-- FAIL: Chain calculation gives incorrect result -->

### Test 34: Mixed Operations
1. Turn calculator on
2. Calculate: √(3² + 4²)
   - Press `3` `ENTER↑` `x²` `4` `ENTER↑` `x²` `+` `√x`
3. Observe result

**Expected**: X = 5  
<!-- PASS: X = 5 -->  
<!-- FAIL: Mixed operation gives incorrect result -->

### Test 35: Multiple Stack Operations
1. Turn calculator on
2. Press `1` `ENTER↑` `2` `ENTER↑` `3` `ENTER↑` `4`
3. Press `×` (multiplies 3×4)
4. Press `x⇄y` (swaps result with 2)
5. Press `+` (adds result to 2)
6. Press `x⇄y` (swaps result with 1)
7. Press `-` (subtracts 1 from result)
8. Observe final result

**Expected**: X = 13  
<!-- PASS: X = 13 -->  
<!-- FAIL: Complex stack operation gives incorrect result -->

## Error Handling and Edge Cases

### Test 36: Overflow
1. Turn calculator on
2. Press `9` `EEX` `9` `9`
3. Press `ENTER↑` 
4. Press `×`
5. Observe result

**Expected**: X = overflow indication or very large number  
<!-- PASS: X shows overflow indication or very large number -->  
<!-- FAIL: Calculator crashes or gives incorrect result -->

### Test 37: Underflow
1. Turn calculator on
2. Press `1` `EEX` `CHS` `9` `9`
3. Press `ENTER↑` 
4. Press `×`
5. Observe result

**Expected**: X = underflow indication or very small number  
<!-- PASS: X shows underflow indication or very small number -->  
<!-- FAIL: Calculator crashes or gives incorrect result -->

### Test 38: Invalid Operation (e.g., log of negative)
1. Turn calculator on
2. Press `5` `CHS` (to get -5)
3. Press `log`
4. Observe result

**Expected**: Error message or NaN  
<!-- PASS: Shows error or NaN -->  
<!-- FAIL: Calculator crashes or gives numeric result -->

---

## Summary

Complete this section after testing to summarize findings.

### Passed Tests
- List of test numbers that passed

### Failed Tests
- List of test numbers that failed, with brief description of issues

### Not Tested
- List of test numbers that weren't tested, with reasons

### Notes
- Any additional observations or issues discovered during testing