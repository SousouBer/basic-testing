// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 2, b: 1, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 1, b: '2', action: Action.Add, expected: null },
  { a: '1', b: '2', action: Action.Add, expected: null },
  { a: 1, b: 2, action: 'unknown action', expected: null },
  { a: '1', b: 2, action: 'unknown action', expected: null },
  { a: 1, b: '2', action: 'unknown action', expected: null },
  { a: '1', b: '2', action: 'unknown action', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('calculate cases', (testCase) => {
    const { a, b, action, expected } = testCase;

    const dataToCalculate = { a, b, action };

    expect(simpleCalculator(dataToCalculate)).toEqual(expected);
  });
});
