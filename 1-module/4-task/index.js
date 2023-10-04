function checkSpam(str) {
  strLower = str.toLowerCase();
  if(strLower.includes('1xbet') || strLower.includes('xxx')){
    return true;
  }
  return false;
}