// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const dataToCalculate = {
      a: 1,
      b: 2,
      action: Action.Add,
    };

    expect(simpleCalculator(dataToCalculate)).toEqual(3);
  });

  test('should subtract two numbers', () => {
    const dataToCalculate = {
      a: 10,
      b: 5,
      action: Action.Subtract,
    };

    expect(simpleCalculator(dataToCalculate)).toEqual(5);
  });

  test('should multiply two numbers', () => {
    const dataToCalculate = {
      a: 2,
      b: 5,
      action: Action.Multiply,
    };

    expect(simpleCalculator(dataToCalculate)).toEqual(10);
  });

  test('should divide two numbers', () => {
    const dataToCalculate = {
      a: 10,
      b: 5,
      action: Action.Divide,
    };

    expect(simpleCalculator(dataToCalculate)).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    const dataToCalculate = {
      a: 2,
      b: 4,
      action: Action.Exponentiate,
    };

    expect(simpleCalculator(dataToCalculate)).toEqual(16);
  });

  test('should return null for invalid action', () => {
    const dataToCalculate = {
      a: 2,
      b: 4,
      action: 'unknown action',
    };

    expect(simpleCalculator(dataToCalculate)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const dataToCalculate = {
      a: 2,
      b: '4',
      action: Action.Add,
    };

    expect(simpleCalculator(dataToCalculate)).toBeNull();
  });
});
