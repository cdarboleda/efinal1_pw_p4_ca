const getPokemons = async () => {
    return await getArrayPokemon(arrayRandomId())
}

const getRandom = (min, max) => {
    max++;
    return Math.floor(Math.random() * (max - min) + min)
}

const arrayRandomId = () => {
    const arreglo = [];

    for (let i = 0; i < 3; i++) {
        arreglo.push(getRandom(1, 5))
    }

    return arreglo;

}

const consumirAPI = async (id) => {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json())

}

const getArrayPokemon = async (arregloIds) =>{

    const arreglo = []
    for(let i= 0; i<arregloIds.length;i++){
        const pokemon = await consumirAPI(arregloIds[i])
        console.log(pokemon.name)
        console.log(pokemon.id)
        console.log(pokemon.img)
        arreglo.push(
            {
                id : pokemon.id,
                name : pokemon.name,
                img : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
            }
        )

    }
    
return arreglo;
}

const getPokemonsFacade = async () => {
    return await getPokemons()
}

export default getPokemonsFacade;