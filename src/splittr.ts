import SplitOption from "./types/SplitOption";

class splittr {
  protected queueA: SplitOption[];
  protected queueB: SplitOption[];
  protected splits: SplitOption[];
  constructor(splits: SplitOption[]) {
    this.validate(splits);
    this.splits = splits;
    this.queueA = [];
    this.queueB = [];
    this.fillQueue();
  }
  protected fillQueue() {
    if (this.queueA.length === 0 && this.queueB.length === 0) {
      this.splits.forEach((split: SplitOption) => {
        for (let i = 0; i < split.weight; i++) {
          this.queueA.push(split);
        }
      });
      this.shuffleQueue();
    } else {
      let tempArray: SplitOption[] = [];
      this.queueA = tempArray.concat(this.queueB);
      this.queueB = [];
    }
  }

  protected shuffleQueue() {
    for (let i = this.queueA.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.queueA[i], this.queueA[j]] = [this.queueA[j], this.queueA[i]];
    }
  }

  public run(): SplitOption {
    if (this.queueA.length === 0) {
      this.fillQueue();
    }
    const result = this.queueA[0];
    this.queueA.shift();
    this.queueB.push(result);
    return result;
  }

  protected validate(splits: SplitOption[]) {
    const sum = this.sumOfSplitWeights(splits);
    if (sum !== 100) {
      throw new Error(
        `splittr: Split weights must equal 100, received ${sum}.`
      );
    }
  }

  protected sumOfSplitWeights(splits: SplitOption[]) {
    let total = 0;
    splits.forEach((split: SplitOption) => {
      total = total + split.weight;
    });
    return total;
  }
}
export default splittr;
