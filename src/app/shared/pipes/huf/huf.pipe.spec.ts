import { HufPipe } from './huf.pipe';

describe('HufPipe', () => {
  let pipe: HufPipe;

  beforeEach(() => {
    pipe = new HufPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a valid number correctly', () => {
    expect(pipe.transform(1234)).toBe('12 340 Ft');
  });

  it('should format a valid string number correctly', () => {
    expect(pipe.transform('5678')).toBe('56 780 Ft');
  });

  it('should round numbers correctly', () => {
    expect(pipe.transform(1234.56)).toBe('12 346 Ft');
    expect(pipe.transform(1234.44)).toBe('12 344 Ft');
  });

  it('should return an empty string for non-numeric strings', () => {
    expect(pipe.transform('abc')).toBe('');
    expect(pipe.transform('123abc')).toBe('');
  });
});
