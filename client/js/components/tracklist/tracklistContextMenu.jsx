import React from 'react'
import PlayerActions from '../../actions/playerActions'
import PlContextMenuActions from '../../actions/plContextMenuActions'
import PlContextMenuStore from '../../stores/plContextMenuStore'
import ContextMenu from '../contextMenu.jsx'


export default class TracklistContextMenu extends React.Component {
	constructor(props) {
        super(props);
        this.state = PlContextMenuStore.getState();
        this.onChange = this.onChange.bind(this);
    }
	componentDidMount() {
		PlContextMenuStore.listen(this.onChange);
	}

	componentWillUnmount() {
		PlContextMenuStore.unlisten(this.onChange);
	}
	onChange(state) {
		this.setState(state);
	}

	getItems(){
		return [
		{
		  	name: 'Reproducir',
		  	action: () => { PlContextMenuActions.play(this.state.song); }
		},
		{
		  	name: 'Añadir a cola',
		  	action: () => { PlContextMenuActions.addToQueue(this.state.song); }
		},
		{
		  	name: 'Añadir a mi música',
		  	action: () => {
		  		alert();
		  	}
		},
		{
		  	name: 'Compartir',
		  	action: () => {
		  	}
		},
		{
		  	name: 'Offline',
		  	action: () => {
		  	}
		}];
	}


	render() {
		let items = this.getItems();

		return (
			<ContextMenu
				items={items} active={this.state.isActive}
				posX={this.state.posX} posY={this.state.posY}
				onCloseAction={PlContextMenuActions.close} />
		)
	}
}
