import React from 'react'
import Playlist from '../components/playlist.jsx'

let tracks = [/*{
  artist: "J Balvin",
  title: "Ginza",
  cover: "http://generourbano.com/wp-content/uploads/2015/05/j-balvin-ginza.jpeg",
  file: "http://goear.com/action/sound/get/c9cc07f",
  duration: "149"
},*/
{
  artist: "Fergie",
  title: " A Little Party Never Killed Nobod",
  cover: "http://www.hitthefloor.com/wp-content/uploads/2013/04/greatgatsby.jpg",
  file: "http://www.goear.com/action/sound/get/b29ce47",
  duration: "240"
},
{
  artist: "Metallica",
  title: "Master of puppets",
  cover: "https://upload.wikimedia.org/wikipedia/en/b/b2/Metallica_-_Master_of_Puppets_cover.jpg",
  file: "http://www.goear.com/action/sound/get/fc1abf0",
  duration: "494"
},
{
  artist: "Romeo Santos",
  title: "Corazon sin cara",
  cover: "https://upload.wikimedia.org/wikipedia/en/b/b7/Prince-royce-album.jpg",
  file: "http://www.goear.com/action/sound/get/7fec88b",
  duration: "211"
},
{
  artist: "Jamsha",
  title: "Flaka si te cojo te palto",
  cover: "http://cdn.blinblineo.net/wp-content/uploads/2014/07/Front.jpg",
  file: "http://www.goear.com/action/sound/get/7130297",
  duration: "188"
},
]

export default class PlaylistPage extends React.Component {
  render(){
    return(
      <Playlist tracks={tracks} username="Lara" />
    )
  }
}
