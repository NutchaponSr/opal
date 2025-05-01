export function getRandomWidth() {
  const widths = ["w-12", "w-16", "w-20", "w-24", "w-28", "w-32"];
  return widths[Math.floor(Math.random() * widths.length)];
}