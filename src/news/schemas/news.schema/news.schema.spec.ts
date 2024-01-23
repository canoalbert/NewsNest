import { NewsSchema } from './news.schema';

describe('NewsSchema', () => {
  it('should be defined', () => {
    expect(new NewsSchema()).toBeDefined();
  });
});
