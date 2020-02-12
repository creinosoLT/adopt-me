import React, {useState, useEffect} from 'react'
import pet, {ANIMALS} from '@frontendmasters/pet'
import Results from './Results.jsx'
import useDropdown from './useDropdown.jsx'

const SearchParams = () => {
	const [location, setLocation] = useState('Seattle, WA')
	const [breeds, setBreeds] = useState([])
	const [animal, AnimalDropdown] = useDropdown('Animal', '', ANIMALS)
	const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)
	const [pets, setPets] = useState([])

	const requestPets = async () => {
		const {animals} = await pet.animals({
			location,
			breed,
			type: animal
		})

		setPets(animals || [])
	}

	useEffect(() => {
		setBreeds([])
		setBreed('')

		pet.breeds(animal).then(({breeds: apiBreeds}) => {
			const breedStrings = apiBreeds.map(({name}) => name)
			setBreeds(breedStrings)
		})
	}, [animal, setBreed, setBreeds])

	return (
		<div className='search-params'>
			<form
				action=''
				onSubmit={e => {
					e.preventDefault()
					requestPets()
				}}
			>
				<label htmlFor='location'>
					{location}
					<input
						id='location'
						value={location}
						placeholder='Location'
						onChange={e => setLocation(e.target.value)}
					/>
				</label>
				<AnimalDropdown />
				<BreedDropdown />
				<button>Submit</button>
			</form>
			<Results pets={pets} />
		</div>
	)
}

export default SearchParams
