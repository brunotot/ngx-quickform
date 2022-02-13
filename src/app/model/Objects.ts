class Objects {
  private constructor() { }

  static requireModel(model: any) {
    if (!model) {
      throw new Error("Model must be initialized");
    }
  }

  static requireValidMinMaxLength(minLength: number, maxLength: number) {
    if (minLength > maxLength || maxLength < 0) {
      throw new Error(`\nParameters minLength and maxLength must be in [0 >= minLength <= maxLength] interval\n`
        + `Provided: minLength = ${minLength}, maxLength = ${maxLength}`)
    }
  }

  static requireMetadataKey(metadataKey: string) {
    if (!metadataKey) {
      throw new Error("Parameter metadataKey not provided!");
    }
  }
}

export default Objects;