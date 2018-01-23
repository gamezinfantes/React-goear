import React from 'react'

import ContextMenu from './contextMenu.jsx'
import Tracklist from './tracklist'


export class PlaylistMore extends React.Component {
  getItems(){
    return [
      {
        name: "Cambiar Nombre",
        action: () => {}
      },
      {
        name: "Compartir",
        action: () => {}
      },
      {
        name: "Eliminar",
        action: () => {}
      },
    ]
  }
  render(){
    return (
      <ContextMenu
				items={this.getItems()} active={this.props.active}
				posX={this.props.posX} posY={this.props.posY}
				onCloseAction={this.props.onCloseAction} />
    )
  }
}

export default class Playlist extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        playlistMore: {
          active: false,
          posX: 0,
          posY: 0,
        }
      }
  }

  getPlaylistLen(){
    let len = this.props.tracks.length;
    let s = len == 1 ? "cancion" : "canciones";
    return `${len} ${s}`;
  }

  onClickMore(event) {
    this.setState({
      playlistMore: {
        active: true,
        posX: event.clientX,
        posY: event.clientY,
      }
    });
  }

  onCloseAction(){
    this.setState({
      playlistMore: {
        active: false,
        posX: 0,
        posY: 0
      }
    });
  }

  render() {
    let moreState = this.state.playlistMore;
    return (
      <section className="playlist">
        <header className="header-playlist">
          <h1>Fiesta Tranquila</h1>
          <div>Creada por <a>{this.props.username}</a> <span>{this.getPlaylistLen()}</span>, <span>0 min</span></div>
          <div className="h-buttons">
            <span className="btn">Reproducir</span>
            <span className="btn">Seguir</span>
            <span className="piker icon-more" onClick={this.onClickMore.bind(this)}></span>
          </div>
          <PlaylistMore active={moreState.active} posX={moreState.posX} posY={moreState.posY}  onCloseAction={this.onCloseAction.bind(this)}/>
        </header>
        <Tracklist songs={this.props.tracks} />
      </section>
    )
  }
}
