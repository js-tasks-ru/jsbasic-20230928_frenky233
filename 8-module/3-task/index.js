export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.cartItems = [];
  }

  addProduct(product) {
    if(product && typeof product == 'object'){
      let cartItem  = this.cartItems.find(cartItem => cartItem.product == product);

      if(cartItem){
        cartItem.count++;
      }
      else{
        this.cartItems.push({product: product, count: 1});
      }

      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem  = this.cartItems.find(cartItem => cartItem.product.id == productId);

    if(cartItem){
      cartItem.count += amount;

      if(!cartItem.count){
        this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
      }

      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    let totalAmount = 0;

    this.cartItems.forEach(item => totalAmount += item.count);

    return totalAmount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    this.cartItems.forEach(item => totalPrice += item.product.price * item.count)
    
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

