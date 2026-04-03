export class AggregateBuilder {
  private constructor(
    private parent: AggregateBuilder | undefined,
    private stageDefinition: unknown
  ) {}

  public static new(): AggregateBuilder {
    return new AggregateBuilder(undefined, undefined);
  }

  public compile(): unknown[] {
    return this._compile().toArray();
  }

  private *_compile(): Generator {
    if (!this.stageDefinition) {
      return;
    }

    yield this.stageDefinition;

    if (this.parent) {
      yield* this.parent._compile();
    }
  }
}
