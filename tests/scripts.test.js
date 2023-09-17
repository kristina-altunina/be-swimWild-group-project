const { distanceBetweenCoords } = require("../scripts/utils");

describe("distanceBetweenCoords", () => {
  test("should return the correct distance", () => {
    expect(distanceBetweenCoords([0, 0], [3, 4])).toBe(5);
  });
  test("should return correctly in any direction", () => {
    expect(distanceBetweenCoords([3, 4], [0, 0])).toBe(5);
  });
  test("should work with negatives", () => {
    expect(distanceBetweenCoords([0, 0], [-3, 4])).toBe(5);
    expect(distanceBetweenCoords([0, 0], [-3, -4])).toBe(5);
    expect(distanceBetweenCoords([0, 0], [3, -4])).toBe(5);
  });
  test("should work away from the origin", () => {
    expect(distanceBetweenCoords([2, 3], [7, 15])).toBe(13);
  });
});
