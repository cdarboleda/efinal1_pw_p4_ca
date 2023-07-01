<template>

    <div class = "contenedorImg" v-for="(pokemon, index) in arregloPokemon" :key="index">
        <img :src="pokemon.img" alt="No se puede mostrar">
        <h1>{{ pokemon.name }}</h1>
    </div>
  
</template>

<script>
export default {

    props:{
        arregloPokemon : {
            type: Array,
            required: true
        }
    }

}
</script>

<style>


.contenedorImg{
    border: 1px black solid;
    margin: 25px;
}
img{
    width: 200px;
    height: 200px;
}

</style>