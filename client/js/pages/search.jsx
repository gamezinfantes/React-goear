import React from 'react'
import classNames from 'classnames'

import Tracklist from '../components/tracklist'
import SearchPageStore from '../stores/searchPageStore'
import SearchPageActions from '../actions/searchPageActions'


export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = SearchPageStore.getState();
		this.onChange = this.onChange.bind(this);

	}
	componentDidMount() {
		SearchPageStore.listen(this.onChange);
		SearchPageActions.fechSongs(this.props.params.q);
	}

	componentWillUnmount() {
		SearchPageStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}


	render() {
		return (
		<div className="search-page" >
			{this.state.isLoading && (<div className="spinner-wraper"><i className="icon-spinner"></i></div>)}
			{ this.props.params.q && (
				<h1>{this.props.params.q}</h1>
			)}
			<Tracklist songs={this.state.songs} />
		</div>

		)
	}
}
