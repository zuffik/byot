interface Origin {
  originWidth: number;
  originHeight: number;
}

interface TargetWidth extends Origin {
  targetWidth: number;
}

interface TargetHeight extends Origin {
  targetHeight: number;
}

/**
 * I can't remember how to calculate scaling so...
 */
export class Rectangle {
  constructor(public readonly width: number, public readonly height: number) {}

  private static isTargetWidth = (data: TargetWidth | TargetHeight): data is TargetWidth =>
    'targetWidth' in data;

  public static calculateScaled(data: TargetWidth | TargetHeight): Rectangle {
    return this.isTargetWidth(data)
      ? new Rectangle(data.targetWidth, (data.originHeight * data.targetWidth) / data.originWidth)
      : new Rectangle((data.originWidth * data.targetHeight) / data.originHeight, data.targetHeight);
  }
}
