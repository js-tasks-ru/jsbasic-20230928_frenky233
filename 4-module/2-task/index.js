function makeDiagonalRed(table) {
  for (let i = 0;i < table.rows.length; i++){
      table.rows[i].cells[i].setAttribute('style', 'background-color: red');
  };
}