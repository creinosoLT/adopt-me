import React from 'react'
import pet from '@frontendmasters/pet'
import Carousel from './Carousel.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import ThemeContext from './ThemeContext.jsx'
import { navigate } from '@reach/router'
import Modal from './Modal.jsx'

class Details extends React.Component {
	state = {
		loading: true,
		showModal: false
	}
	constructor(props) {
		super(props)

		this.state = {
			loading: true
		}
	}

	componentDidMount() {
		pet.animal(this.props.id).then(({animal}) => {
			this.setState({
				url: animal.url,
				name: animal.name,
				animal: animal.type,
				location: `${animal.contact.address.city} , ${animal.contact.address.state}`,
				description: animal.description,
				media: animal.photos,
				breed: animal.breeds.primary,
				loading: false
			})
		})
	}

	toggleModal = () => this.setState({showModal: !this.state.showModal})

	adopt = () => navigate(this.state.url)

	render() {
		if (this.state.loading) {
			return <h1>LOADING...</h1>
		}

		const {animal, breed, location, description, name, media, showModal} = this.state

		return (
			<div className='details'>
				<Carousel media={media} />
				<div>
					<h1> {name} </h1>
					<h2> {`${animal} - ${breed} - ${location}`} </h2>
					<ThemeContext.Consumer>
						{(themeHook) => (
							<button
								style={{backgroundColor: themeHook[0]}}
								onClick={this.toggleModal}>
								Adopt {name}
							</button>
						)}
					</ThemeContext.Consumer>
					<p> {description} </p>
					{
						showModal ? (
							<Modal>
								<h1>Wold you like to adopt {name}?</h1>
								<div className='buttons'>
									<button onClick={this.adopt}>Yes</button>
									<button onClick={this.toggleModal}>No I am a monster!</button>
								</div>
							</Modal>
						) : null
					}
				</div>
			</div>
		)
	}
}
const DetailsWithErrorBoundary = props => {
	return (
		<ErrorBoundary>
			<Details {...props} />
		</ErrorBoundary>
	)
}

export default DetailsWithErrorBoundary
