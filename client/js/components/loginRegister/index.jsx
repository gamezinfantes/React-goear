import React from 'react'
import classNames from 'classnames'
import Modal from '../modal'

import './loginRegister.styl'

export default class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: 'login'
    };
    this.onClickRegister = this.onClickRegister.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }
  onClickRegister(event){
    event.preventDefault();
    this.setState({ showing: 'register' });
  }
  onClickLogin(event){
    event.preventDefault();
    this.setState({ showing: 'login' });
  }
  render(){
    let loginClasses = classNames({
      login: true,
      showing: (this.state.showing == 'login') ? true : false
    });
    let registerClasses = classNames({
      login: true,
      showing: (this.state.showing == 'register') ? true : false
    });
    return (
      <Modal className="login-register-wrap">
        <span className="vr-al-helper"></span>
        <div className="login-register">
          <div className={loginClasses}>
            <div className="btn fb">Iniciar con facebook</div>
            <div className="separator"><span className="text">o</span><hr /></div>
            <div><input type="text" id="username" placeholder="Usuario"/></div>
            <div><input type="password" id="password" placeholder="Contraseña" /></div>
            <div className="btn submit">Iniciar sesión</div>
            <div className="separator"><hr /></div>
            <p>¿No tienes una cuenta? <a onClick={this.onClickRegister}>Regístrate</a></p>
          </div>
          <div className={registerClasses}>
            <div className="btn fb">Registrate con facebook</div>
            <div className="separator"><span className="text">o</span><hr /></div>
            <input type="text" id="username" placeholder="Usuario" />
            <input type="password" id="password" placeholder="Contraseña" />
            <input type="text" id="email" placeholder="Correo" />
            <p className="terms">Al registrarte aceptas los términos y condiciones y la política de privacidad</p>
            <div className="btn submit">Regístrate</div>
            <div className="separator"><hr /></div>
            <p>¿ya eres mienbro? <a onClick={this.onClickLogin}>Acerder</a></p>
          </div>
        </div>
      </Modal>
    );
  }
}
