import React from 'react'

export default class ContextMenu extends React.Component{
	constructor(props){
		super(props);
		this.onResize = this.onResize.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
	}
	componentDidUpdate(){
		if (this.props.active) {
			let windowWidth = window.innerWidth;
			let windowHeight = window.innerHeight;
			let menuWidth = this._dropdown.offsetWidth + 4;
			let menuHeight = this._dropdown.offsetHeight + 4;

			if ( (windowWidth - this.props.posX) < menuWidth ) {
				this._dropdown.style.left = windowWidth - menuWidth +'px';
			}

			if ( (windowHeight - this.props.posY) < menuHeight ) {
				this._dropdown.style.top = windowHeight - menuHeight+'px';
			}
		}

	}
	onClickItem(action, event){
		action();
		this.closeContextMenu();
	}

	onResize(event){
		this.closeContextMenu();
	}
	onMouseDown(){
		this.closeContextMenu();
	}
	closeContextMenu(){
		window.removeEventListener('resize', this.onResize, false);
		document.body.style.overflow = "visible";
		this.props.onCloseAction();
	}
	openConextMenu(){
		window.addEventListener('resize', this.onResize, false);
		document.body.style.overflow = "hidden";
	}

	render() {
		if(this.props.active){this.openConextMenu();}
		let style = {left: this.props.posX, top: this.props.posY};
		if (this.props.active) {
			return (
			<div>
				<ul className="dropdown" style={style} ref={ (c)=> this._dropdown = c }>
					{this.props.items.map((item, i)=>{
						return (<li onClick={this.onClickItem.bind(this, item.action)} key={i}>{item.name}</li>)
					})}
				</ul>
				<div onMouseDown={this.onMouseDown} className={this.props.ClassClose}></div>
			</div>
			)
		}
		return null;
	}
}

ContextMenu.defaultProps = { ClassClose: 'drop-close'};
