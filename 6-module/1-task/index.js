/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render();
  }
  
  render(){
    this.elem = document.createElement('TABLE');

    this.elem.insertAdjacentHTML('beforeend',
    `<thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>`
    );
    
    this.elem.insertAdjacentHTML('beforeend',
    this.rows.map((item) =>
    `<tr>
    ${Object.values(item).map((item) => 
      `<td>${item}</td>`).join('')}
    <td><button>X</button></td>
    </tr>`).join('')
    );

    this.elem.addEventListener('click', this.deleteTr);
  }

  deleteTr(event){
    const button = event.target.closest('button');
    if(button){
      event.target.closest('TR').remove();
    }
  }
}
