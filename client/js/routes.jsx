
import React from 'react'
import { Route } from 'react-router'

import App from './app.jsx'
import Categories from'./pages/categories'
import Live from'./pages/live.jsx'
import Page from'./components/page.jsx'
import Playlist from'./pages/playlist.jsx'
import Search from'./pages/search.jsx'
import UploadAudio from'./pages/uploadAudio'
import UserProfile from'./pages/userProfile'



export default (
	<Route path="/" component={App}>
		<Route path="search/:q" component={Search} />
		<Route path="upload" component={UploadAudio} />
		<Route path="categories" component={Categories} />
		<Route path="live" component={Live} />
		<Route path="page/:page" component={Page} />
		<Route path="user" component={UserProfile} />
		<Route path="playlist" component={Playlist} />
	{/* TODO:
		<Route path="logout" component={Logout} />*/}
    </Route>
    )
