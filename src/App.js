import axios from 'axios';
import React from 'react';
import { PokeList } from './components/PokeList.jsx'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      sprite: "",
      height: "",
      weight: "",
      type: "",
    }
  }

  componentDidMount = () => {
    axios("https://pokeapi.co/api/v2/pokemon/494").then((resultat) => {
      // console.log(resultat)
      let pokemon = resultat.data

      let name = pokemon.forms[0].name
      name = name[0].toUpperCase() + name.substring(1)

      let sprite = pokemon.sprites.other.dream_world.front_default

      let type = pokemon.types[0].type.name
      type = type[0].toUpperCase() + type.substring(1)

      let height = pokemon.height
      height = height.toString()
      if (height.length < 2) {
        height = "0," + height + "m"
      } else {
        height = height[0] + "," + height.substring(1) + "m"
      }

      let weight = pokemon.weight
      weight = weight.toString()
      weight = weight.substring(0, weight.length - 1) + "," + weight[weight.length - 1] + "kg"

      this.setState({ name })
      this.setState({ sprite })
      this.setState({ height })
      this.setState({ weight })

      let test = pokemon.types[1]
      if (test !== undefined) {
        let type2 = pokemon.types[1].type.name
        type2 = type2[0].toUpperCase() + type2.substring(1)
        this.setState({ type: type + " " + type2 })
      } else {
        this.setState({ type })
      }
      console.log(this.state)
    })
  }

  mainPokemon = (idPokemon) => {
    axios("https://pokeapi.co/api/v2/pokemon/" + idPokemon).then((resultat) => {
      // console.log(resultat)
      let pokemon = resultat.data

      let name = pokemon.forms[0].name
      name = name[0].toUpperCase() + name.substring(1)

      let sprite = pokemon.sprites.other.dream_world.front_default

      let type = pokemon.types[0].type.name
      type = type[0].toUpperCase() + type.substring(1)

      let height = pokemon.height
      height = height.toString()
      if (height.length < 2) {
        height = "0," + height + "m"
      } else {
        height = height[0] + "," + height.substring(1) + "m"
      }

      let weight = pokemon.weight
      weight = weight.toString()
      weight = weight.substring(0, weight.length - 1) + "," + weight[weight.length - 1] + "kg"

      this.setState({ name })
      this.setState({ sprite })
      this.setState({ height })
      this.setState({ weight })

      let test = pokemon.types[1]
      if (test !== undefined) {
        let type2 = pokemon.types[1].type.name
        type2 = type2[0].toUpperCase() + type2.substring(1)
        this.setState({ type: type + " " + type2 })
      } else {
        this.setState({ type })
      }
      console.log(this.state)
    })
  }

  changePokemon = (id) => {
    id += 494
    this.mainPokemon(id)
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  }

  render() {
    return (
      <div>
        <header id='header'>
          <div class="my-mask">
            <img id="mainPokemon" src={this.state.sprite}></img>
            <div id='text-header'>
              <h1>{this.state.name}</h1>
              <p>Taille : {this.state.height}</p>
              <p>Poids : {this.state.weight}</p>
              <p>Type : {this.state.type} {this.state.type2}</p>
            </div>
          </div>
        </header>
        <section>
          <PokeList sprite={this.state.sprite} name={this.state.name} change={this.changePokemon} />
        </section>
      </div>
    )
  }
}




export default App;
