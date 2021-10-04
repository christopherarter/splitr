import Splitr from "./splitr";
import SplitOption from "./types/SplitOption";

describe("splits 10,000 times accurately", () => {
  test("Splitr returns a value", () => {
    const options: SplitOption[] = [
      {
        weight: 10,
        value: "10% of the time",
      },
      {
        weight: 20,
        value: "20% of the time",
      },
      {
        weight: 70,
        value: "70% of the time",
      },
    ];

    const splitr = new Splitr(options);
    const results = [];
    for (let i = 0; i < 10000; i++) {
      results.push(splitr.run());
    }
    let weightOf10 = results.filter((item: SplitOption) => item.weight === 10);
    let weightOf20 = results.filter((item: SplitOption) => item.weight === 20);
    let weightOf70 = results.filter((item: SplitOption) => item.weight === 70);
    expect(weightOf10.length).toBeCloseTo(1000, 0.01);
    expect(weightOf20.length).toBeCloseTo(2000, 0.01);
    expect(weightOf70.length).toBeCloseTo(7000, 0.01);
  });
});
