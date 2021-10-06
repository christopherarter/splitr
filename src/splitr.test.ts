import Splitr from "./Splitr";
import SplitOption from "./types/SplitOption";

describe("splitr Tests", () => {
  test("splitr accurate splits 10,000 runs", () => {
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
    let [weightOf10, weightOf20, weightOf70] = [
      results.filter((item: SplitOption) => item.weight === 10),
      results.filter((item: SplitOption) => item.weight === 20),
      results.filter((item: SplitOption) => item.weight === 70),
    ];
    expect(weightOf10.length).toBeCloseTo(1000, 0.01);
    expect(weightOf20.length).toBeCloseTo(2000, 0.01);
    expect(weightOf70.length).toBeCloseTo(7000, 0.01);
  });

  test("Throws error with invalid weight sum", () => {
    const options: SplitOption[] = [
      {
        weight: 30,
        value: "30% of the time",
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
    const createInstance = () => {
      new Splitr(options);
    };
    expect(createInstance).toThrowError();
  });
});
