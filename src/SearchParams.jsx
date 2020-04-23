import React, {useState, useEffect, useContext} from 'react'
import pet, {ANIMALS} from '@frontendmasters/pet'
import Results from './Results.jsx'
import useDropdown from './useDropdown.jsx'
import ThemeContext from './ThemeContext.jsx'

const SearchParams = () => {
	const [location, setLocation] = useState('Seattle, WA')
	const [breeds, setBreeds] = useState([])
	const [animal, AnimalDropdown] = useDropdown('Animal', '', ANIMALS)
	const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)
	const [pets, setPets] = useState([])
	const [theme, setTheme] = useContext(ThemeContext)

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
				<label htmlFor='theme'>
					Theme
					<select
						value={theme}
						onChange={e => setTheme(e.target.value)}
						onBlur={e => setTheme(e.target.value)}
					>
						<option value='blue'>Blue</option>
						<option value='darkblue'>Dark Blue</option>
						<option value='red'>Red</option>
						<option value='peru'>Peru</option>
					</select>
				</label>
				<button style={{backgroundColor: theme}}>Submit</button>
			</form>
			<Results pets={pets} />
		</div>
	)
}

export default SearchParams
