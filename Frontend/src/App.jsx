import { Home } from './sections/Home'
import { SectionAB } from './sections/SectionAB'
import { SectionCD } from './sections/SectionCD'
import { Register } from './sections/Register'
import { Login } from './sections/Login'
import { UserDashboard } from './sections/Dashboard';
import { DroneShop } from './sections/shop'
import { ShopCart } from './sections/cart'
import { StripePayment } from './sections/Payment'
import { StripePaymentConfirmation } from './sections/Confirmation'

export function Lobby() {
  return (
    <>
    <Home />
    <SectionAB />
    <SectionCD />
    </>
  )
}

export function Registration() {
  return <Register />
}

export function Access() {
  return (
    <Login />
  )
}

export function Dashboard() {
  return (
    <UserDashboard />
  )
}

export function Shop() {
  return (
    <DroneShop />
  )
}

export function Cart() {
  return (
    <ShopCart />
  )
}

export function Payment() {
  return (
    <StripePayment />
  )
}

export function Confirmation() {
  return (
    <StripePaymentConfirmation />
  )
}