import React from 'react'
import classNames from 'classnames'
import './uploadAudio.styl'

export default class UploadAudio extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			uploading: false,
			progress: 0
		}

		this.onChangeFile = this.onChangeFile.bind(this);
	}

	onChangeFile(){
		this.setState({uploading:true});
		let inter = setInterval( () => {
			this.setState({progress:this.state.progress+1});
			console.log(this.state.progress);
			if(this.state.progress >= 100){
				clearInterval(inter);
			}
		}, 250);

	}
	render() {
		let uploadClasses = classNames({
			'uploading': this.state.uploading
		});
		return (
		<section id="upload" className={uploadClasses}>
			<h1>Subir audio</h1>
			<form>
				<label htmlFor="file" className="file-btn">Click aqui para seleccionar audio</label>
				<input type="file" name="" id="file" className="input-file" onChange={this.onChangeFile} />
			</form>
			<div className="upload-progress">
				<div className="progress" style={{width: this.state.progress+'%'}}></div>
				<span className="progress-display">{this.state.progress}%</span>
			</div>
			<ul className="upload-form">
				<li>
					<label htmlFor="">Titulo</label><input type="text" />
				</li>
				<li>
					<label htmlFor="">Artista</label><input type="text" />
				</li>
				<li>
					<label htmlFor="">Album</label><input type="text" />
				</li>
				<li>
					<label htmlFor="">Categoría</label>
					<select name="" id="">
					{this.props.generes.map( (genere, i) => {
						return (
							<option value="" key={genere}>{genere}</option>
						)
					})}
					</select>
				</li>
				<p>Al hacer click en continuar, aceptas los términos y condiciones y la política de privacidad</p>

			</ul>
		</section>
		)
	}

}

UploadAudio.defaultProps = {generes: ['Blues', 'Pop', 'Rock', 'Clasica']}
