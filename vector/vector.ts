export class Vector2D {
  x: f32;
  y: f32;

  constructor(x: f32, y: f32) {
    this.x = x;
    this.y = y;
  }

  Magnitude(): f32 {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
