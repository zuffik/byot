import { proxyMock } from './proxy.mock';

describe('ProxyMock', () => {
  it('should create and call mocked function', () => {
    const mock = proxyMock();
    const spyFoo = jest.spyOn(mock, 'foo');
    const spyBar = jest.spyOn(mock, 'bar');
    mock.foo();
    expect(spyFoo).toBeCalled();
    expect(spyBar).not.toBeCalled();
  });
});
