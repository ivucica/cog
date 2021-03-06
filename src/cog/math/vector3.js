import clamp from "./util";

class Vector3 {
  constructor(x, y, z) {
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.z = z || 0.0;
  }

  add(other) {
    return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  sub(other) {
    return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  scale(s) {
    return new Vector3(this.x*s, this.y*s, this.z*s);
  }

  length() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  }

  distanceTo(other) {
    let
      x = other.x - this.x,
      y = other.y - this.y,
      z = other.z - this.z;
    return Math.sqrt(x*x + y*y + z*z);
  }

  normalize() {
    let l = this.length();
    return new Vector3(this.x/l, this.y/l, this.z/l);
  }

  lerp(dest, t) {
    t = clamp(t, 0.0, 1.0);
    let
      oneminust = 1.0 - t,
      x = this.x * oneminust + dest.x * t,
      y = this.y * oneminust + dest.y * t,
      z = this.z * oneminust + dest.z * t;

    return new Vector3(x, y, z);
  }

  dot(other) {
    return this.x*other.x + this.y*other.y + this.z*other.z;
  }

  cross(other) {
    return new Vector3(
      other.y*this.z - other.z*this.y,
      other.z*this.x - other.x*this.z,
      other.x*this.y - other.y*this.x
    );
  }

  equal(other) {
    return (
      this.x === other.x
      && this.y === other.y
      && this.z === other.z
    );
  }
}

Vector3.Lerp = (src, dst, t) => src.lerp(dst, t);

export default Vector3;
