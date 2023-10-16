function getMinMax(str) {
  return {
    min: Math.min(...str.split(' ').map(item => Number(item)).filter(item => !isNaN(item))),
    max: Math.max(...str.split(' ').map(item => Number(item)).filter(item => !isNaN(item))),
  };
}
