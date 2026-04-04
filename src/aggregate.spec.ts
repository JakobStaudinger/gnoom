import { aggregate } from './aggregate';

describe('AggregateBuilder', () => {
  it('should produce an array as output', () => {
    expect(aggregate().finalize()).toEqual([]);
  });

  it('should add stages for each function call', () => {
    const output = aggregate().$match!({}).$match!({}).$match!({}).finalize();
    expect(output).toEqual([{ $match: {} }, { $match: {} }, { $match: {} }]);
  });

  it('should work with pipeline stages that have not been typed (yet)', () => {
    const output = aggregate().$foo!({ mySpec: 42 }).finalize();
    expect(output).toEqual([{ $foo: { mySpec: 42 } }]);
  });
});
