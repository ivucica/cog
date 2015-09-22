import Vector3 from "./vector3";

class Matrix4 {
  constructor(
    a00 = 1.0, a01 = 0.0, a02 = 0.0, a03 = 0.0,
    a10 = 0.0, a11 = 1.0, a12 = 0.0, a13 = 0.0,
    a20 = 0.0, a21 = 0.0, a22 = 1.0, a23 = 0.0,
    a30 = 0.0, a31 = 0.0, a32 = 0.0, a33 = 1.0
  ) {
    this.m = [
      a00, a01, a02, a03,
      a10, a11, a12, a13,
      a20, a21, a22, a23,
      a30, a31, a32, a33
    ];
  }

  transpose() {
    return new Matrix4(
      this.m[0], this.m[4],  this.m[8], this.m[12],
      this.m[1], this.m[5],  this.m[9], this.m[13],
      this.m[2], this.m[6], this.m[10], this.m[14],
      this.m[3], this.m[7], this.m[11], this.m[15]
    );
  }

  inverse() {
    throw new Error("Matrix4.inverse not implemented");
    return new Matrix4();
  }

  mul(other) {
    return new Matrix4(
      this.m[0]* other.m[0] + this.m[4]* other.m[1] + this.m[8] * other.m[2] + this.m[12]* other.m[3],
      this.m[0]* other.m[4] + this.m[4]* other.m[5] + this.m[8] * other.m[6] + this.m[12]* other.m[7],
      this.m[0]* other.m[8] + this.m[4]* other.m[9] + this.m[8] *other.m[10] + this.m[12]*other.m[11],
      this.m[0]*other.m[12] + this.m[4]*other.m[13] + this.m[8] *other.m[14] + this.m[12]*other.m[15],

      this.m[1]* other.m[0] + this.m[5]* other.m[1] + this.m[9] * other.m[2] + this.m[13]* other.m[3],
      this.m[1]* other.m[4] + this.m[5]* other.m[5] + this.m[9] * other.m[6] + this.m[13]* other.m[7],
      this.m[1]* other.m[8] + this.m[5]* other.m[9] + this.m[9] *other.m[10] + this.m[13]*other.m[11],
      this.m[1]*other.m[12] + this.m[5]*other.m[13] + this.m[9] *other.m[14] + this.m[13]*other.m[15],

      this.m[2]* other.m[0] + this.m[6]* other.m[1] + this.m[10]* other.m[2] + this.m[14]* other.m[3],
      this.m[2]* other.m[4] + this.m[6]* other.m[5] + this.m[10]* other.m[6] + this.m[14]* other.m[7],
      this.m[2]* other.m[8] + this.m[6]* other.m[9] + this.m[10]*other.m[10] + this.m[14]*other.m[11],
      this.m[2]*other.m[12] + this.m[6]*other.m[13] + this.m[10]*other.m[14] + this.m[14]*other.m[15],

      this.m[3]* other.m[0] + this.m[7]* other.m[1] + this.m[11]* other.m[2] + this.m[15]* other.m[3],
      this.m[3]* other.m[4] + this.m[7]* other.m[5] + this.m[11]* other.m[6] + this.m[15]* other.m[7],
      this.m[3]* other.m[8] + this.m[7]* other.m[9] + this.m[11]*other.m[10] + this.m[15]*other.m[11],
      this.m[3]*other.m[12] + this.m[7]*other.m[13] + this.m[11]*other.m[14] + this.m[15]*other.m[15]
    );
  }

  translation(vector) {
    return new Matrix4(
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      vector.x, vector.y, vector.z, 1.0
    );
  }

  rotation(axis, angle) {
    let
      c = Math.cos(angle),
      s = Math.sin(angle),
      onec = 1.0 - c,
      u = axis.x,
      v = axis.y,
      w = axis.z;

    return new Matrix4(
      u*u + (1.0 - u*u)*c,  u*v * onec - w*s,      u*w * onec + v*s,    0.0,
      u*v * onec + w*s,     v*v + (1.0 - v*v)*c,   v*w * onec - u*s,    0.0,
      u*w * onec - v*s,     v*w * onec + u*s,      w*w + (1.0 - w*w)*c, 0.0,
      0.0,                  0.0,                   0.0,                 1.0
    );
  }

  scale(s, t, u) {
    return new Matrix4(
      s,   0.0, 0.0, 0.0,
      0.0,   t, 0.0, 0.0,
      0.0, 0.0,   u, 0.0,
      0.0, 0.0, 0.0, 1.0
    );
  }

  ortho(left, right, top, bottom, far, near) {
    return new Matrix4(
      2.0 / (right - left), 0.0, 0.0, 0.0,
      0.0, 2.0 / (top - bottom), 0.0, 0.0,
      0.0, 0.0, 2.0 / (far - near), 0.0,
      (right + left) / (right - left), (top + bottom) / (top - bottom), (far + near) / (far - near), 1.0
    );
  }

  frustum(left, right, top, bottom, far, near) {
    return new Matrix4(
      2.0 * near / (right - left), 0.0, 0.0, 0.0,
      0.0, 2.0 * near / (top - bottom), 0.0, 0.0,
      (right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1.0,
      0.0, 0.0, -2.0 * far * near / (far - near), 0.0
    );
  }

  perspective(fovy, ratio, near, far) {
    let
      scale = Math.tan(fovy / 360.0 * Math.PI) * near,
      r = ratio * scale, 
      l = -r,
      t = scale, 
      b = -t;
    
    return Matrix4.prototype.frustum(l, r, b, t, near, far);
  }

  lookAt(from, to, up) {
    let
      fwd, right, up2;

    fwd = to.sub(from).normalize();
    right = fwd.cross(up).normalize();
    up2 = right.cross(fwd).normalize();

    return new Matrix4(
               right.x,       right.y,        right.z, 0.0,
                 up2.x,         up2.y,          up2.z, 0.0,
                -fwd.x,        -fwd.y,         -fwd.z, 0.0,
       right.dot(from), up2.dot(from), -fwd.dot(from), 1.0
    );
  }

  transform(vector) {
    return new Vector3(
      this.m[0]*vector.x + this.m[4]*vector.y + this.m[8] *vector.z + this.m[12],
      this.m[1]*vector.x + this.m[5]*vector.y + this.m[9] *vector.z + this.m[13],
      this.m[2]*vector.x + this.m[6]*vector.y + this.m[10]*vector.z + this.m[14]
    );
  }
}

Matrix4.Identity = () => { return new Matrix4(); };

Matrix4.Rotation = Matrix4.prototype.rotation;
Matrix4.Translation = Matrix4.prototype.translation;
Matrix4.Scale = Matrix4.prototype.scale;
Matrix4.Ortho = Matrix4.prototype.ortho;
Matrix4.Frustum = Matrix4.prototype.frustum;
Matrix4.Perspective = Matrix4.prototype.perspective;
Matrix4.LookAt = Matrix4.prototype.lookAt;

export default Matrix4;
