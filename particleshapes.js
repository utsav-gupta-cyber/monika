export function heartShape(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);
  return [x, y];
}

export function saturnShape(t) {
  const x = Math.cos(t) * 10;
  const y = Math.sin(t) * 3;
  return [x, y];
}

export function flowerShape(t) {
  const r = Math.sin(6 * t) * 10;
  return [Math.cos(t) * r, Math.sin(t) * r];
}
