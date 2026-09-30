import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { CategoryPage } from './pages/Category'
import { ProductPage } from './pages/Product'
import { CartPage } from './pages/Cart'
import { WishlistPage } from './pages/Wishlist'
import { CheckoutPage } from './pages/Checkout'
import { OrderConfirmationPage } from './pages/OrderConfirmation'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
