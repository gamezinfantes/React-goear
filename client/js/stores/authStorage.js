import alt from '../alt'

class AuthStorage {
  constructor(){
    this.isLoged = true;
    this.user = {};
    this.token = '';
  }

  handleLogout(){
    this.user = {};
    this.isLoged = false;
    this.token = false;
  }

  handleLogin(){
    this.token = token;
    this.user = {};
    this.isLoged = true;
  }

}

export default alt.createStore(AuthStorage, 'AuthStorage');
