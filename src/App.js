import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const findCartItem = cartList.find(cart => cart.id === product.id)
    if (findCartItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState({
        cartList: cartList.map(eachCart =>
          eachCart.id === product.id
            ? {...eachCart, quantity: eachCart.quantity + 1}
            : eachCart,
        ),
      })
    }
    // this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const updatedCartList = cartList
      .map(eachCart => {
        if (eachCart.id === id) {
          if (eachCart.quantity > 1) {
            return {...eachCart, quantity: eachCart.quantity - 1}
          } else {
            return null
          }
        }
        return eachCart
      })
      .filter(item => item !== null)

    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    // console.log('provider on increase')
    const {cartList} = this.state

    const updatedCartList = cartList.map(eachCart => {
      if (eachCart.id === id) {
        return {...eachCart, quantity: eachCart.quantity + 1}
      }
      return eachCart
    })

    this.setState({cartList: updatedCartList})
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const updatedCartList = cartList.filter(eachCart => eachCart.id !== id)

    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
