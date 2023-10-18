function highlight(table) {
  for(row of table.rows){
    if(row.cells[1].innerHTML < 18){
      row.setAttribute('style', 'text-decoration: line-through');
    };
    if(row.cells[2].innerHTML == 'm'){
      row.classList.add('male');
    }else{
      row.classList.add('female');
    };
    if(row.cells[3].getAttribute('data-available')){
      if(row.cells[3].dataset.available == 'true'){
        row.classList.add('available');
      }
      else{
        row.classList.add('unavailable');
      };
    }else{
      row.setAttribute('hidden', true);
    }
  }
}
