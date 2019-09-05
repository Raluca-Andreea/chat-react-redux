import axios from 'axios'

export default class authServices {
  constructor () {
    this.service = axios.create({
      // baseURL: 'http://localhost:5000/api/',
      baseURL: 'http://192.168.100.192:5000/api/',
      withCredentials: true
    })
  }
  

  signup = (username, email, password) => this.service.post('signup', {username, email, password})
  login = (username, password) => this.service.post('login', {username, password})
  logout = () => this.service.post('logout')

  loggedin = (tokenFromStorage) => {
    
   return this.service.get(`loggedin`, {
      headers: {
        Authorization: 'Bearer ' + tokenFromStorage
      }
    })
  }


}