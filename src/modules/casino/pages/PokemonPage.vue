<template>
    <div class="contenedor" v-if="!siguientePantalla">

        <div class="labels">
            <span>Puntaje: {{ puntaje }}</span>
            <span>Intento: {{ intentos }}</span>
        </div>

        <div class="contenedor-imagenes">
            <PokemonImage :arregloPokemon="arregloPokemon" />
        </div>

        <div class="boton">
            <button @:click="jugar">JUGAR</button>
        </div>

    </div>

    <div class="contenedorResultado" v-if="siguientePantalla">
        <div class="mensajePerdio" v-if="!gano">
            <h1>Has utilizado tus 5 intentos</h1>
            <h1>El juego ha terminado, intentalo nuevamente</h1>
        </div>

        <div class="mensajeGano" v-if="gano">
            <h1>Puntaje: {{ puntaje }}</h1>
            <h1>Felicitaciones has ganado un premio de $10.000,00</h1>
        </div>

        <button @click="reiniciar">Nuevo Juego</button>

    </div>
</template>

<script>
import PokemonImage from '../components/PokemonImage.vue';
import getPokemonsFacade from '../helpers/clientePokemonAPI';

export default {
    components: {
        PokemonImage,
    },
    data() {

        const defaultName = 'xxxxxx'
        const defaultImg = 'https://www.blacksquare.io/wp-content/uploads/2021/03/black-square.jpg'

        const defaultPokemon = {
            name: defaultName,
            id: 0,
            img: defaultImg
        }
        return {
            puntaje: 0,
            intentos: 0,
            gano: false,
            siguientePantalla: false,
            defaultImg: defaultImg,
            defaultName: defaultName,
            defaultPokemon: defaultPokemon,
            arregloPokemon: [defaultPokemon, defaultPokemon, defaultPokemon],

        }
    },

    methods: {
        async jugar() {
            this.intentos += 1;
            this.arregloPokemon = await getPokemonsFacade();

            console.log(this.arregloPokemon.length)

            const arregloIds = []
            this.arregloPokemon.forEach(pokemon => {
                arregloIds.push(pokemon.id)
            })

            this.logicaJuego(arregloIds);
            this.logicaIntentos();
        },

        logicaJuego([id1, id2, id3] = []) {
            if (id1 == id2 && id2 == id3) {
                this.puntaje += 5;
            }
            else if (id1 == id2 || id1 == id3 || id2 == id3) {
                this.puntaje += 2;
            }
        },

        // logicaIntentos() {
        //     if (this.intentos <= 5) {
        //         if (this.puntaje >= 5) {
        //             this.gano = true;
        //             this.siguientePantalla = true;
        //         }
        //     } else {
        //         this.gano = false;
        //         this.siguientePantalla = true;
        //     }
        // },

        logicaIntentos() {
            if (this.intentos > 5) {
                this.gano = false;
                this.siguientePantalla = true;
            } else {
                if (this.puntaje >= 10) {
                     this.gano = true;
                     this.siguientePantalla = true;
                 }
            }
        },

        reiniciar() {
            this.puntaje = 0
            this.intentos = 0
            this.gano = false
            this.siguientePantalla = false

            this.arregloPokemon = [this.defaultPokemon, this.defaultPokemon, this.defaultPokemon]


        }


    }

}
</script>

<style>
.contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: aquamarine;

}

.contenedor-imagenes {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: white;
    border: 5px groove saddlebrown;
}

.labels {
    font-size: large;
    display: flex;
    flex-direction: row;
    gap: 100px;
    margin-bottom: 20px;
}

.mensajeGano {
    color: blue;
}

.mensajePerdio {
    color: red;
}

button{
    margin: 50px;
    cursor: pointer;
}
</style>