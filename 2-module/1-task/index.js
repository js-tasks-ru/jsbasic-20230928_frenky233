function sumSalary(salaries) {
  let val = 0;
  for(let key in salaries){
    if(typeof salaries[key] == 'number' && !isNaN(salaries[key]) && isFinite(salaries[key])){ 
      val += salaries[key];
    }
  }
  return val;
}
