import ScrollArea from './reactScrollbar/scrollArea.jsx'
import React from 'react'


class ScrollbarContent extends React.Component{
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.state = {
      needCustomScroll: true
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
  onResize(){
    // hide nav on small and medium
		if (window.innerWidth < 993) {
			this.setState({ needCustomScroll: false });
		} else {
			this.setState({ needCustomScroll: true });
		}
  }
  render(){
    if (this.state.needCustomScroll == true) {
      return (
      <ScrollArea horizontal={false} className="content">
        {this.props.children}
      </ScrollArea>);
    } else {
        return (<div className="content">{ this.props.children }</div>);
    }
  }

}

export default ScrollbarContent
