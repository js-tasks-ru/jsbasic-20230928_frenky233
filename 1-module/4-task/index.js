function checkSpam(str) {
  this.str = str.toLowerCase();
  if(this.str.includes('1xbet') || this.str.includes('xxx')){
    return true;
  }
  return false;
}