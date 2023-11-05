import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render(){
    this.elem = createElement(
      `<div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>`
    );

    this.renderCards(this.products);
  }

  renderCards(products){
    const inner = this.elem.querySelector('.products-grid__inner');
    inner.innerHTML = '';
    for(let product of products){
      inner.append(new ProductCard(product).elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    let products = this.products.filter(product => {
      if(this.filters.noNuts && product.nuts) return false;
      if(this.filters.vegeterianOnly && !product.vegeterian) return false;
      if(this.filters.maxSpiciness < product.spiciness) return false;
      if(this.filters.category != product.category && this.filters.category) return false;
      return true;
    });

    this.renderCards(products);
  }
}
