## Splitr

![example workflow](https://github.com/christopherarter/splitr/actions/workflows/CI.yaml/badge.svg)

Splitr is a minimalist, dependency-free, _near 100% precise_ splitting engine. This can be used for traffic splitting, or any other implimentation you need to split an outcome. **Sum of weights must equal 100.**

Example:

```
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

    let result = splitr.run();

    // "70% of the time" (most likely)
```

## Accuracy

Currently, the accuracy has been ~99.95% - 99.97%.

#### Notes:

- To test, run `npm test`
