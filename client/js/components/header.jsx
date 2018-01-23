import React from 'react'

export default class Header extends React.Component {
	onClickMenu(event){
		document.querySelector('nav').classList.toggle('show');
	}

	render() {
		return (
		<header className="main-header"><i className="icon-menu" onClick={this.onClickMenu}></i></header>
		)
	}

}
