import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/Footer'
import Public from './components/public'

import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Home from './pages/Home'
import Tickets from './pages/Tickets'
import TicketsStaff from './pages/TicketsStaff'

import Account from './components/account'
import Signin from './components/auth/signin'
import Signup from './components/auth/signup'
import Signout from './components/auth/signout'
import AuthComponent from './components/auth/require_auth'
import { AUTH_USER } from './actions/types'
import { store } from './store'
// import '../style/style.scss'
import './tailwind.generated.css'

const token = localStorage.getItem('auth_jwt_token')

// if we have a token, consider the user to be signed in
if (token) {
  store.dispatch({ type: AUTH_USER })
}

console.log('store:::', store)

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/public" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/tickets"
          element={<AuthComponent Component={Tickets} />}
        />
        <Route
          path="/account"
          element={<AuthComponent Component={Account} />}
        />
        <Route
          path="/ticketsStaff"
          element={<AuthComponent Component={TicketsStaff} />}
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signout" element={<Signout />} />
      </Routes>
      <Footer />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
