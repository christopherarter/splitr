class Mapper {
  public output: object = {};
  constructor(public user: any, public mutators: Array<Function>) {}
  public results() {
    this.mutators.forEach((func) => {
      this.output = func(this.user, this.output);
    });
    return this.output;
  }
}

export default Mapper;
