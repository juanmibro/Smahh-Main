import axios from 'axios'
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  LIST_TICKETS,
  UPDATE_TICKET,
  DELETE_TICKET,
  CREATE_TICKET,
  GET_USER_PROFILE,
} from './types'

const ROOT_URL = process.env.API_URI || 'http://localhost:8000'

axios.defaults.baseURL = ROOT_URL
if (localStorage.getItem('auth_jwt_token')) {
  axios.defaults.headers.common['Authorization'] =
    localStorage.getItem('auth_jwt_token')
}
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

export function signUserIn(data) {
  return function (dispatch) {
    // Submit email/password to server
    axios
      .post(`/signin`, data)
      .then((res) => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('auth_jwt_token', res.data.token)
        window.location = '/#/account'
        axios.defaults.headers.common['Authorization'] =
          localStorage.getItem('auth_jwt_token')
        dispatch(getProfile())
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: AUTH_ERROR, payload: 'Server Error, try later.' })
      })
  }
}

export function signUserUp(userObj) {
  return function (dispatch) {
    // Submit email/password to server
    axios
      .post(`/signup`, userObj)
      .then((res) => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('auth_jwt_token', res.data.token)
        window.location = '/#account'
        axios.defaults.headers.common['Authorization'] =
          localStorage.getItem('auth_jwt_token')
        dispatch(getProfile())
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: AUTH_ERROR, payload: 'Server Error, try later.' })
      })
  }
}

export function signUserOut() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER })
    localStorage.removeItem('auth_jwt_token')
    dispatch({ type: GET_USER_PROFILE, payload: null })
  }
}

export function listTickets(url, userEmail) {
  return function (dispatch) {
    console.log('url:::', url)

    axios
      .put(`/${url}`, {
        userEmail: userEmail,
      })
      .then((res) => {
        dispatch({ type: LIST_TICKETS, payload: res?.data?.data })
      })
      .catch((error) => {
        console.log(error)
        // Handle error here or dispatch an error action
      })
  }
}

export function listAllTickets() {
  return function (dispatch) {
    axios
      .get(`/ticketsStaff/all`)
      .then((res) => {
        dispatch({ type: LIST_TICKETS, payload: res?.data?.data })
      })
      .catch((error) => {
        console.log(error)
        // Handle error here or dispatch an error action
      })
  }
}

export function updateTicket(url, ticketId, ticketData) {
  return function (dispatch) {
    axios
      .put(`/${url}/${ticketId}`, ticketData)
      .then((res) => {
        dispatch({ type: UPDATE_TICKET, payload: res.data })
      })
      .catch((error) => {
        console.log(error)
        // Handle error here or dispatch an error action
      })
  }
}

export function deleteTicket(url, ticketId) {
  return function (dispatch) {
    axios
      .delete(`/${url}/${ticketId}`)
      .then((res) => {
        console.log('id to delete:::', ticketId)
        if (res.status === 204) {
          console.log('deleted')
          dispatch({ type: DELETE_TICKET, payload: ticketId })
        }
      })
      .catch((error) => {
        console.log(error)
        // Handle error here or dispatch an error action
      })
  }
}

export function createTicket(url, ticketData) {
  return function (dispatch) {
    axios
      .post(`/${url}/createTicket`, ticketData)
      .then((res) => {
        dispatch({ type: CREATE_TICKET, payload: res.data })
      })
      .catch((error) => {
        console.log(error)
        // Handle error here or dispatch an error action
      })
  }
}

export function getProfile() {
  return function (dispatch) {
    axios
      .get(`/user/profile`)
      .then((res) => {
        console.log('profile???:::', res.data)
        dispatch({ type: GET_USER_PROFILE, payload: res.data })
      })
      .catch((error) => {
        console.log(error)
        // Handle error here or dispatch an error action
      })
  }
}

const request = axios
export { request }
