import React from 'react';

const Favorites = ( {favorites}) => {

  // const removeFavorite = () => {
    
  // }

    return (
      <div id='pokemon-container'>
      {favorites &&
        favorites.map((pokemon) => (
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
              {/* <button className="btn btn-danger m-2" onClick={() => addToFavorites(pokemon)}>Like</button> */}
              <a href="#" className="btn btn-primary">
                Go Somewhere
              </a>
            </div>
          </div>
        ))}
    </div>
    );
}

export default Favorites;
