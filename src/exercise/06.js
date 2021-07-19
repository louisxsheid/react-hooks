// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // const [pokemon, setPokemon] = React.useState(null);
  // const [status, setStatus] = React.useState("idle");
  const [state, setState] = React.useState({ status: "idle", pokemon : null, error: null});
  const { status, pokemon, error } = state;
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // React.useEffect(() => {
  //   console.log(status);
  // }, [status])
  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: "pending", pokemon: null, error: null});

    fetchPokemon(pokemonName).then(pokemonData => {
      setState({status: "resolved", pokemon: pokemonData})
    })
    .catch(error => {
      setState({status: "rejected", error: error})
    });
  }, [pokemonName]);
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
   
    if(status === "idle") {
      return 'Submit a pokemon';
    } else if(status === "pending") {
      return <PokemonInfoFallback name={pokemonName} />
    } else if(status === "resolved") {
      return <PokemonDataView pokemon={pokemon} />
    } else if(status === "rejected") {
      return (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
      )      
    }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

class ErrorBoundary extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    }
  }

  render() {
    if(this.state.hasError) {
      return <div>ERROR WITH COMPONENT</div>
    }
    return this.props.children;
  }

}

export default App
