//imports
import { useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
//components
import Nav from './components/Nav';
//context
import UserContext from './contexts/UserContext';
//pages
import Login from './pages/Login';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import PokemonList from './pages/PokemonList';

//css
import './App.css';

const App = () => {
	// In able for us to use our context, we import first, then we can use the useContext hook to access our context
	// const user = useContext(UserContext)
	// console.log(user)

	// We will pass on our user to all of App's children via the Provider value prop
	const [user, setUser] = useState('');
	const [pokeList, setPokeList] = useState([]);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		fetchPokemon();

		//Dependancy array: if empty. it will call useEffect only once when DOM Component loads
	}, []);

	const fetchPokemon = async () => {
		try {
			const response = await axios.get(
				'https://pokeapi.co/api/v2/pokemon?limit=1118'
			);
			setPokeList(response.data.results);
		} catch (error) {
			console.log(error);
		}
	};

	const addToFavorites = (pokemon) => {
		console.log('we added', pokemon)
		setFavorites([...favorites, pokemon])
	}
	//always console log outside your usestate to verifying the setting of data

	return (
		<div className="App">
			{/* All context comes with the Provider Component. This allows us to use this as a wrapper and share information to all of its children. We need the value prop inside our provider. */}
			<UserContext.Provider value={user}>
				<Nav />
				{/* We need to wrap all of our routes insde react router routes component */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="pokemon/list"
						element={<PokemonList addToFavorites={addToFavorites} pokeList={pokeList} itemsPerPage={8} />}
					/>
					<Route path="login" element={<Login setUser={setUser} />} />
					<Route path="favorites" element={<Favorites favorites={favorites} />} />
				</Routes>
			</UserContext.Provider>
		</div>
	);
};

export default App;
