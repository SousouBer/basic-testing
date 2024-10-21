// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/path';
    const expectedData = { id: 1, title: 'Mock data' };

    const expectedBaseUrl = 'https://jsonplaceholder.typicode.com';

    const axiosSpy = jest.spyOn(axios, 'create');
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: expectedData }));

    await throttledGetDataFromApi(relativePath);
    jest.runOnlyPendingTimers();

    expect(axiosSpy).toBeCalledWith({ baseURL: expectedBaseUrl });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/path';
    const expectedData = { id: 1, title: 'Mock data' };

    const axiosSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: expectedData }));

    await throttledGetDataFromApi(relativePath);
    jest.runOnlyPendingTimers();

    expect(axiosSpy).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/path';
    const expectedData = { id: 1, title: 'Mock data' };

    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: expectedData }));

    const result = await throttledGetDataFromApi(relativePath);

    jest.runOnlyPendingTimers();

    expect(result).toEqual(expectedData);
  });
});
