
export class Vector {
  x: number;
  y: number;
  constructor(x?: number, y?: number) {
    if (x) {
      this.x = x;
    }

    else {
      this.x = 0;
    }

    if (y) {
      this.y = y;
    }

    else {
      this.y = 0;
    }
  }

  add(other: Vector)
  {
    this.x = this.x + other.x;
    this.y = this.y + other.y;
    return this;
  }

  equals(other: Vector)
  {
    if (this.x === other.x && this.y === other.y)
    {
        return true;
    }
    return false;
  }
}
