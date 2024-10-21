// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fsPromises from 'node:fs/promises';
import fs from 'node:fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 10;

    const timerSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    jest.runAllTimers();

    expect(timerSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 10;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    // jest.advanceTimersByTime(duration);
    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 10;

    const intervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    jest.advanceTimersByTime(timeout);

    expect(intervalSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByInterval(callback, timeout);

    jest.advanceTimersByTime(timeout * 3);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    const pathToFile = 'src/file.txt';

    jest.spyOn(fs, 'existsSync').mockImplementation(jest.fn());
    jest.spyOn(fsPromises, 'readFile').mockImplementation(jest.fn());

    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fsPromises, 'readFile').mockImplementation(jest.fn());

    const pathToFile = 'src/file.txt';

    expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    const pathToFile = 'src/file.txt';
    const fileContent = 'Hello Jest';

    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContent);

    expect(readFileAsynchronously(pathToFile)).resolves.toBe(fileContent);
  });
});
