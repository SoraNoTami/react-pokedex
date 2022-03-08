import React from 'react';
import axios from 'axios';


export class PokeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: [],
            sprites: [],
        }
    }

    fromParent = () => {
        let name = this.props.name;
        this.props.changeName(name);
        // this.props.change()
    }

    componentDidMount = () => {
        axios("https://pokeapi.co/api/v2/pokemon/?offset=493&limit=156").then((resultat) => {
            let pokemons = resultat.data.results
            // console.log("pokemon = ", pokemon)
            pokemons.forEach((pokeNum, index) => {
                let url = pokeNum.url
                let name = pokeNum.name
                axios(url).then((resultat) => {
                    let pokémon = resultat.data
                    let sprite = pokémon.sprites.other.dream_world.front_default
                    let names = [...this.state.names]
                    names[index] = name
                    this.setState({names})
                    let sprites = [...this.state.sprites]
                    sprites[index] = sprite
                    this.setState({sprites})
                    // this.setState({ sprites: [...this.state.sprites, sprite] })
                    // this.setState({ names: [...this.state.names, name ]})
                })
                
            })
            console.log(this.state.sprites)
            console.log(this.state.names)
        })
    }



    render() {

        // return (
        // 	<div>
        // 		<h1>Pokedex</h1>
        // 		<div>
        // 			{this.state.names.map((pokemonName, index) => (
        // 				<div key={index}>
        // 					<img
        // 						src={this.state.sprites[index]}
        // 						alt={`${pokemonName}`}
        // 					/>
        // 					<p>{pokemonName}</p>
        // 				</div>
        // 			))}
        // 		</div>
        // 	</div>
        // );

        return (
            <div>
                <h2>POKEDEX</h2>
                <div id="list">
                {this.state.names.map((name, index) => (
                    <div key={index} onClick={() => this.props.change(index)} className="onePokemon">
                        <img
                            src={this.state.sprites[index]}
                            alt={`${name}`}
                            className="pokemons-from-list"
                        />
                        <p>{name?.toUpperCase()}</p>
                    </div>
                ))}
                </div>
            </div>
        )
    }
}




