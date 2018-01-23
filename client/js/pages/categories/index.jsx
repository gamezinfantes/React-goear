import React from 'react'
import CategoriesActions from '../../actions/categoriesActions'

import './categories.styl'

export default class Categories extends React.Component {
	onClickCtegory(category, event){
		CategoriesActions.fetchSongs(category);
	}
	render() {
		this.categories = ["blues", "classical", "contemporary", "country", "electronic", "gospel", "humor", "indie", "jazz", "latin","metal", "pop", "punk", "rythm", "hiphop", "reggae", "reggaeton", "rock", "ska"];
		return (
			<ul className="categories">
				{this.categories.map((category, i) => {
					return (
					<li onClick={this.onClickCtegory.bind(this, category)} style={{ backgroundImage: `url('/img/${category}.jpg')` }} key={category}>
						<div className="cont">{category.toUpperCase()}</div>
					</li>)
				})}
			</ul>

		)
	}
}
