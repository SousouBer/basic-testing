// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = ['angular', 'nodejs'];

    const exptectedResult = {
      value: 'angular',
      next: { value: 'nodejs', next: { value: null, next: null } },
    };

    const linkedList = generateLinkedList(elements);

    expect(linkedList).toStrictEqual(exptectedResult);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = ['angular', 'nodejs'];

    const linkedList = generateLinkedList(elements);

    expect(linkedList).toMatchSnapshot();
  });
});
