export class Vec2 extends Float32Array {
  static readonly byteLength = 2 * 4;

  constructor(...args: [] | [Vec2] | [number, number]) {
    if (args.length === 0) {
      super(2);
    } else if (args.length === 1) {
      super(args[0]);
    } else if (args.length === 2) {
      super(args);
    } else {
      throw new Error("Invalid number of arguments");
    }
  }

  equals(other: Vec2): boolean {
    return this[0] === other[0] && this[1] === other[1];
  }

  add(other: Vec2): Vec2 {
    return new Vec2(this[0] + other[0], this[1] + other[1]);
  }

  subtract(other: Vec2): Vec2 {
    return new Vec2(this[0] - other[0], this[1] - other[1]);
  }

  scale(other: number): Vec2 {
    return new Vec2(this[0] * other, this[1] * other);
  }

  multiply(other: Vec2): Vec2 {
    return new Vec2(this[0] * other[0], this[1] * other[1]);
  }

  dot(other: Vec2): number {
    return this[0] * other[0] + this[1] * other[1];
  }
}

export class Vec3 extends Float32Array {
  static readonly byteLength = 3 * 4;

  constructor(...args: [] | [Vec3] | [number, number, number]) {
    if (args.length === 0) {
      super(3);
    } else if (args.length === 1) {
      super(args[0]);
    } else if (args.length === 3) {
      super(args);
    } else {
      throw new Error("Invalid number of arguments");
    }
  }

  equals(other: Vec3): boolean {
    return this[0] === other[0] && this[1] === other[1] && this[2] === other[2];
  }

  add(other: Vec3): Vec3 {
    return new Vec3(this[0] + other[0], this[1] + other[1], this[2] + other[2]);
  }

  subtract(other: Vec3): Vec3 {
    return new Vec3(this[0] - other[0], this[1] - other[1], this[2] - other[2]);
  }

  scale(other: number): Vec3 {
    return new Vec3(this[0] * other, this[1] * other, this[2] * other);
  }

  multiply(other: Vec3): Vec3 {
    return new Vec3(this[0] * other[0], this[1] * other[1], this[2] * other[2]);
  }

  cross(other: Vec3): Vec3 {
    return new Vec3(
      this[1] * other[2] - this[2] * other[1],
      this[2] * other[0] - this[0] * other[2],
      this[0] * other[1] - this[1] * other[0]
    );
  }

  dot(other: Vec3): number {
    return this[0] * other[0] + this[1] * other[1] + this[2] * other[2];
  }
}

export class Vec4 extends Float32Array {
  static readonly byteLength = 4 * 4;

  constructor(...args: [] | [Vec4] | [number, number, number, number]) {
    if (args.length === 0) {
      super(4);
    } else if (args.length === 1) {
      super(args[0]);
    } else if (args.length === 4) {
      super(args);
    } else {
      throw new Error("Invalid number of arguments");
    }
  }

  equals(other: Vec4): boolean {
    return this[0] === other[0] && this[1] === other[1] && this[2] === other[2] && this[3] === other[3];
  }

  add(other: Vec4): Vec4 {
    return new Vec4(this[0] + other[0], this[1] + other[1], this[2] + other[2], this[3] + other[3]);
  }

  subtract(other: Vec4): Vec4 {
    return new Vec4(this[0] - other[0], this[1] - other[1], this[2] - other[2], this[3] - other[3]);
  }

  scale(other: number): Vec4 {
    return new Vec4(this[0] * other, this[1] * other, this[2] * other, this[3] * other);
  }

  multiply(other: Vec4): Vec4 {
    return new Vec4(this[0] * other[0], this[1] * other[1], this[2] * other[2], this[3] * other[3]);
  }

  dot(other: Vec4): number {
    return this[0] * other[0] + this[1] * other[1] + this[2] * other[2] + this[3] * other[3];
  }
}

/**
 * linearly interpolate between two values
 * @param u the start of the range in which to interpolate
 * @param v the end of the range in which to interpolate
 * @param s value ued to interpolate between u and v
 * @returns the interpolated value
 */
export function mix<T extends number | Vec2 | Vec3 | Vec4>(u: T, v: T, s: number): T {
  const s_ = 1 - s;
  if (typeof u == "number" && typeof v == "number") {
    return (s_ * u + s * v) as T;
  } else if (u instanceof Vec2 && v instanceof Vec2) {
    return new Vec2(s_ * u[0] + s * v[0], s_ * u[1] + s * v[1]) as T;
  } else if (u instanceof Vec3 && v instanceof Vec3) {
    return new Vec3(s_ * u[0] + s * v[0], s_ * u[1] + s * v[1], s_ * u[2] + s * v[2]) as T;
  } else if (u instanceof Vec4 && v instanceof Vec4) {
    return new Vec4(s_ * u[0] + s * v[0], s_ * u[1] + s * v[1], s_ * u[2] + s * v[2], s_ * u[3] + s * v[3]) as T;
  } else {
    throw new Error("Invalid arguments");
  }
}

export function flatten(list: Float32Array[]) {
  const size = list[0].length;
  const array = new Float32Array(list.length * size);
  for (let i = 0; i < list.length; i++) {
    array.set(list[i], i * size);
  }
  return array;
}
