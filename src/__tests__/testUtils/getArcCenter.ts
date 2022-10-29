// https://stackoverflow.com/questions/9017100/calculate-center-of-svg-arc
// https://github.com/Ghostkeeper/SVGToolpathReader/blob/a2bbe90da64e6cd9d54fec553f61ba941001e85d/Parser.py#L493
// @TODO Find a more reliable solution
export function getArcCenter(
  x1: number,
  y1: number,
  rx: number,
  ry: number,
  phi: number,
  fA: number,
  fS: number,
  x2: number,
  y2: number
): {
  x: number;
  y: number;
} {
  var cx, cy;

  if (rx < 0) {
    rx = -rx;
  }
  if (ry < 0) {
    ry = -ry;
  }
  if (rx == 0.0 || ry == 0.0) {
    // invalid arguments
    throw Error('rx and ry can not be 0');
  }

  var s_phi = Math.sin(phi);
  var c_phi = Math.cos(phi);
  var hd_x = (x1 - x2) / 2.0; // half diff of x
  var hd_y = (y1 - y2) / 2.0; // half diff of y
  var hs_x = (x1 + x2) / 2.0; // half sum of x
  var hs_y = (y1 + y2) / 2.0; // half sum of y

  // F6.5.1
  var x1_ = c_phi * hd_x + s_phi * hd_y;
  var y1_ = c_phi * hd_y - s_phi * hd_x;

  // F.6.6 Correction of out-of-range radii
  //   Step 3: Ensure radii are large enough
  var lambda = (x1_ * x1_) / (rx * rx) + (y1_ * y1_) / (ry * ry);
  if (lambda > 1) {
    rx = rx * Math.sqrt(lambda);
    ry = ry * Math.sqrt(lambda);
  }

  var rxry = rx * ry;
  var rxy1_ = rx * y1_;
  var ryx1_ = ry * x1_;
  var sum_of_sq = rxy1_ * rxy1_ + ryx1_ * ryx1_; // sum of square
  if (!sum_of_sq) {
    throw Error('start point can not be same as end point');
  }
  var coe = Math.sqrt(Math.abs((rxry * rxry - sum_of_sq) / sum_of_sq));
  if (fA == fS) {
    coe = -coe;
  }

  // F6.5.2
  var cx_ = (coe * rxy1_) / ry;
  var cy_ = (-coe * ryx1_) / rx;

  // F6.5.3
  cx = c_phi * cx_ - s_phi * cy_ + hs_x;
  cy = s_phi * cx_ + c_phi * cy_ + hs_y;

  return {
    x: cx,
    y: cy,
  };
}
