import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import './styles.css';

const PokemonList = ({ pokeList, itemsPerPage, addToFavorites }) => {
	// We start with an empty list of pokeList.
	const [currentPokemon, setCurrentPokemon] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		try {
			// Fetch pokeList from another resources.
			const endOffset = itemOffset + itemsPerPage;
			// console.log(`Loading pokeList from ${itemOffset} to ${endOffset}`);
			const pokeURLs = [];

			for (let i = itemOffset; i < endOffset; i++) {
				if(i < 898) {
				pokeURLs.push(`https://pokeapi.co/api/v2/pokemon/${i + 1}`) }
				else {
					pokeURLs.push(`https://pokeapi.co/api/v2/pokemon/${i + 9102}`)
				}
			}
	
			// console.log('urls', pokeURLs)

			currPagePokemon(pokeURLs);
			const length = pokeList.length ? pokeList.length : 1118;
			setPageCount(Math.ceil(length / itemsPerPage));
		} catch (error) {
			console.log(error);
		}
	}, [itemOffset, itemsPerPage]);

	const currPagePokemon = (pokeURLs) => {
		try {
			//axios all() makes all concurrent requests
			//instea of doing individuals req, we can programatically make multiple requests
			//If one of our Promises fails, the entire request fails
			const pokeArr = [];
			axios.all(
				pokeURLs.map(async (url) => {
					const response = await axios.get(url);
					// console.log(response.data);
					pokeArr.push(response.data);
					// setCurrentPokemon([...currentPokemon, response.data])
					setCurrentPokemon(pokeArr.flat());
				})
			);
		} catch (error) {}
	};

	const Pokemon = () => {
		return (
			<div id='pokemon-container'>
				{currentPokemon &&
					currentPokemon.map((pokemon) => (
						<div className="card poke-card" key={pokemon.id}>
							<img
								src={pokemon.sprites.other['official-artwork'].front_default ?
								pokemon.sprites.other['official-artwork'].front_default :
								pokemon.sprites.front_default
							} 

								className="card-img-top"
								alt="..."
							/>
							<div className="card-body">
								<h5 className="card-title">{pokemon.species.name}</h5>
								<p className="card-text">Order: {pokemon.id}</p>
								<button className="btn btn-danger m-2" onClick={() => addToFavorites(pokemon)}>Like</button>
								<a href="#" className="btn btn-primary">
									Go Somewhere
								</a>
							</div>
						</div>
					))}
			</div>
		);
	};

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % pokeList.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};
	// console.log('current pokemon', currentPokemon);

	return (
		<div>
			<Pokemon />
			<ReactPaginate
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				previousLabel="< previous"
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="page-item"
				previousLinkClassName="page-link"
				nextClassName="page-item"
				nextLinkClassName="page-link"
				breakLabel="..."
				breakClassName="page-item"
				breakLinkClassName="page-link"
				containerClassName="pagination"
				activeClassName="active"
				renderOnZeroPageCount={null}
			/>
		</div>
	);
};

export default PokemonList;
