import React from 'react'
import classNames from 'classnames'
import SearchActions from '../../actions/searchActions'
import { Link } from 'react-router'

import './nav.styl'

export default class Nav extends React.Component {
	onClickSearch(event){
		event.preventDefault();
		//let searchAside = document.querySelector('.search-aside');
		//searchAside.classList.toggle('show');
		this.onClickLink(event);
		SearchActions.toogleShow();

	}
	onClickLink(event){
		// hide nav on small and medium
		if (window.innerWidth < 993) {
			document.querySelector('nav').classList.toggle('show');
		}
	}
	render() {
		return (
	<nav className="main-nav">
		<a className="logo"></a>
		<ul>
			<li><a href="#" onClick={this.onClickSearch.bind(this)}><i className="icon-search"></i><span>Buscar</span></a></li>
			<li><Link to="/categories" onClick={this.onClickLink}><i className="icon-menu"></i><span>Categorías</span></Link></li>
			<li><a href="#" onClick={this.onClickLink}><i className="icon-sphere"></i><span>Descubrir</span></a></li>
			<li><Link to="/live" onClick={this.onClickLink}><i className="icon-radio"></i><span>Live</span></Link></li>
			<li><Link to="/upload" onClick={this.onClickLink}><i className="icon-cloud-upload"></i><span>Subir</span></Link></li>
			{ !this.props.isLoged && (
				<li><a className="login btn" href="#">Login</a></li>
			)}
			{ this.props.isLoged && (
				<li><Link to="/logout" onClick={this.onClickLink}><i className="icon-cloud-upload"></i><span>Salir</span></Link></li>
			)}
			{ this.props.isLoged && (
				<li className="user-status"><Link to="/user" >
					<span className="no-image-user">L</span>
					<span className="username">Cristian</span>
				</Link></li>
			)}
		</ul>
	</nav>
		)
	}
}
