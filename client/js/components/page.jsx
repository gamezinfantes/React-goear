import React from 'react'
import request from 'superagent'

export default class Page extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'isLoading': true,
			'page': ""
		}
		this.fechPage(this.props.params.page);
	}
	fechPage(page){
		this.setState({isLoading:true});
		request
		.get(`page/`)
		//.set('Accept', 'application/json')
		.end( (error, res) => {
		  window.response = res;
		  this.setState({page: response.text, isLoading: false});
		});
	}
	render() {
		if (this.state.isLoading) {
			return (<div className="icon-spinner"></div>)
		} else {
			return(<div dangerouslySetInnerHTML={{__html: this.state.page}} />)
		}
	}
}