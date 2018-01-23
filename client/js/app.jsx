import React from 'react'

// Components
import BottomPlayerContainer from './components/player/bottomPlayerContainer.jsx'
import CookieMessage from './components/cookieMessage.jsx'
import Header from './components/header.jsx'
import LoginRegister from './components/loginRegister'
import Nav from './components/nav'
import PlayerContainer from './components/player'
import SearchAside from './components/searchAside'
import ScrollbarContent from './components/scrollbarContent.jsx'

import '../stylus/app.styl'

export default class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			showSearch: false,
			isLoged: true,
		}
	}

	render() {
		return (
	<div>
		{ !this.state.isLoged && (
			<LoginRegister />
		)}
		<CookieMessage />
		<Header />
		<Nav isLoged={this.state.isLoged} />
		<SearchAside show={this.state.showSearch} />
		<PlayerContainer canControlled={true}/>
		{/*<BottomPlayerContainer />*/}
		<ScrollbarContent>
			{this.props.children}
		</ScrollbarContent>
		{/*<footer>
			<ul>
				<li><a href="#">Soporte</a></li>
				<li><a href="#">Legal</a></li>
				<li><a href="#">Privacidad</a></li>
			</ul>
		</footer>*/}
	</div>
		)
	}
}
