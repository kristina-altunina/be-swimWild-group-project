const { distanceBetweenCoords } = require("../utils");

describe("distanceBetweenCoords", () => {
  test("should return the correct distance", () => {
    expect(distanceBetweenCoords([50.2352, -1.2643], [51.4312, 1.2546])).toBe(
      221.29
    );
    expect(
      distanceBetweenCoords([-132.2352, 53.2643], [212.4312, -41.2546])
    ).toBe(7713.38);
  });
});
