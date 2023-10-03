function factorial(n) {
  let val = 1;
  for(let  i = 1; i < n; i++){
    val += val * i;
  }
  return val;
}
