import React from 'react'
import './modal.styl'
export default class Modal extends React.Component {
  render () {
    let modalCNs = this.props.className==='undefined' ? "modal" : "modal "+this.props.className;
    return (
      <div className={modalCNs}>
        <span className="vr-al-helper"></span>
        <div className="modal-content">{ this.props.children }</div>
      </div>
    )
  }
}
