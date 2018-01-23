import React from 'react'

export default class CookieMessage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showing: !this.checkCookieAdvice()
    };
    this.onClickClose = this.onClickClose.bind(this);
  }
  checkCookieAdvice(){
    if (typeof document !=='undefined'){
      if (document.cookie.indexOf('cookieAdvice=1') >= 0){
        return true;
      }
      return false;
    }
    return true;
  }
  setCookieAdvice(){
    if (typeof document !=='undefined'){
      var d = new Date();
      d.setTime(d.getTime() + (360*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = 'cookieAdvice=1' + "; " + expires;
    }
  }
  onClickClose(event){
    this.setCookieAdvice();
    this.setState({ showing: false });
  }

  render() {
    let message = (
      <div className="message-bar">
        <p className="message">
          Utilizamos cookies propias y de terceros para ofrecer nuestros servicios y publicidad basada en tus intereses. Al usar nuestros servicios, aceptas el uso que hacemos de las cookies.
        </p>
        <div className="close" onClick={this.onClickClose}>x</div>
      </div>
    );

    if (this.state.showing){
        return message;
    } else {
      return null;
    }
  }
}
