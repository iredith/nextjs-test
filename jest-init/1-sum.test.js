const sum = require('./sum');
const { describe, expect, test } = require('@jest/globals');

// Global jest for each update
describe("Sum", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

// Normal jest to test
test('Add 2 numbers', () => {
  expect(sum(1, 3)).toBe(4);
});
