import SplitOption from "./types/splitOption";
class Splitr {
  protected queue: SplitOption[];
  protected splits: SplitOption[];
  protected currentIndex: number;
  constructor(splits: SplitOption[]) {
    this.validate(splits);
    this.splits = splits;
    this.queue = [];
    this.currentIndex = 0;
    this.fillQueue();
    this.shuffleQueue();
  }

  protected fillQueue() {
    this.splits.forEach((split: SplitOption) => {
      for (let i = 0; i < split.weight; i++) {
        this.queue.push(split);
      }
    });
  }

  protected shuffleQueue() {
    for (let i = this.queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
    }
  }

  public run(): SplitOption {
    const result = this.queue[this.currentIndex];
    this.currentIndex++;
    if (this.currentIndex == this.queue.length) {
      this.currentIndex = 0;
    }
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
export default Splitr;
