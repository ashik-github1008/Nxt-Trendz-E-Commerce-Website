// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => {
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        // console.log(cartList)
        const totalPriceList = cartList.map(
          eachCart => eachCart.quantity * eachCart.price,
        )
        // console.log(totalPriceList)
        const totalPrice = totalPriceList.reduce((sum, price) => sum + price, 0)

        return (
          <div className="cart-summary-container">
            <div className="order-total-price-container">
              <h1 className="order-total-text">Order Total:</h1>
              <h1 className="total-price-cart">Rs {totalPrice}/-</h1>
            </div>
            <p className="no-of-items-in-cart">
              {cartList.length} Items in cart
            </p>
            <button className="checkout-btn">checkout</button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
