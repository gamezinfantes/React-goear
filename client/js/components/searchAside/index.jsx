import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import SearchStore from '../../stores/searchStore'
import SearchActions from '../../actions/searchActions'

import './searchAside.styl'

export default class SearchAside extends React.Component {
	constructor(props) {
		super(props);
		this.state = SearchStore.getState();

		this.onChange = this.onChange.bind(this);
		this.onClickRemove = this.onClickRemove.bind(this);
		this.onClickResultItem = this.onClickResultItem.bind(this);
		this.onClickHistoryItem = this.onClickHistoryItem.bind(this);
		this.onClickClearHistory = this.onClickClearHistory.bind(this);
		this.onKeyUpInput = this.onKeyUpInput.bind(this);
	}
	componentDidMount() {
		SearchStore.listen(this.onChange);
	}

	componentWillUnmount() {
		SearchStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	clearResults(){
		this._input.value = "";
		SearchActions.clearResults();
	}
	onChangeInput(event){
		if (event.target.value.length > 0) {
			SearchActions.fetchResults(event.target.value);
		} else {
			this.clearResults();
		}
	}
	onClickResultItem(event) {
		SearchActions.addToHistory( this._input.value );
		SearchActions.toogleShow();

		this.clearResults();
	}
	onClickRemove(event){
		this.clearResults();
	}
	onClickHistoryItem(item, event){
		SearchActions.fetchResults(item);
		this._input.value = item;
	}
	onClickClearHistory(event){
		SearchActions.clearHistory();
	}
	onKeyUpInput(event){
		let key = event.keyCode;
		let ENTER = 13;
		if(key == ENTER){
			let url = '/search/'+this._input.value;
			console.log('/search/'+this._input.value);
			// let url = '/search/'+this._input.getDOMNode().value;
			window.location = url;
			this.onClickResultItem();
		}
	}
	onClickHide(){
		SearchActions.toogleShow();
	}
	render() {
		let searchCNs = classNames({'search-aside': true, 'show': this.state.show})
		return (
		<div className={searchCNs}>
			<div className="search-aside-content">
				<div className="search-input">
					<span className="icon-arrow-left" onClick={this.onClickHide}></span>
					<input type="text" ref={(c) => this._input = c} onKeyUp={this.onKeyUpInput} onChange={this.onChangeInput.bind(this)} />
					<div className="remove" onClick={this.onClickRemove}>&#215;</div>
				</div>
				{ this.state.searching == true && (
					<ul>
					{this.state.results.map( (result, i) => {
						return (<li onClick={this.onClickResultItem} key={i}><Link to={`/search/${result}`}>{result}</Link></li>)
					})}
					</ul>
				)}

				{ this.state.searching == false && this.state.history.length > 0 && (
				 	<div className="search-aside-body">
						<span className="s-history">BUSQUEDAS RECIENTES</span>
						<ul>
						{this.state.history.map( (item, i) => {
							return (<li onClick={this.onClickHistoryItem.bind(this, item)} href="#" key={i}>{item}<i className="icon-arrow-up-left"></i><span className=""></span></li>)
						})}
						</ul>
						{this.state.history.length > 0 &&(
							<span className="s-h-clean" onClick={this.onClickClearHistory}>LIMPIAR HISTORIAL</span>
						)}
					</div>
				)}
			</div>
		</div>
		)
	}
}
