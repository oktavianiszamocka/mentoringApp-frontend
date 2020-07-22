const sum = require("./citest");

test('Adding 1 + 2 = 3', () => {
    expect(sum(1,2)).toBe(3);
});
