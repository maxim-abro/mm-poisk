<template>
    <div class="container">
        <button @click="$router.go(-1)" class="btn">назад</button>
        <h1 class="mt-5 mb-5">{{ filmData.title }}</h1>
        <div class="row">
            <div class="col-3"><img :src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/'+ filmData.poster_path" alt="aaa" class="img-thumbnail"></div>
            <div class="col-9">
                <ul class="list-group">
                    <li class="list-group-item" v-if="filmData.release_date">Год выпуска: {{ filmData.release_date }}</li>
                    <li class="list-group-item" v-if="filmData.budget">Бюджет: {{ filmData.budget }}$</li>
                    <li class="list-group-item" v-if="filmData.tagline">Цитата: {{ filmData.tagline }}</li>
                    <li class="list-group-item" v-if="filmData.homepage">
                        <a :href="filmData.homepage" class="link">домашняя страница</a>
                    </li>
                    <li class="list-group-item" v-if="filmData.genres">Жанр: <span v-for="item of filmData.genres" :key="item.id">{{item.name}}&nbsp;</span></li>
                    <li class="list-group-item">Время: {{ this.minutesToHours }} </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- <button class="btn btn-prime" @click="check">проверка</button> -->
</template>

<script>


export default {
    data() {
        return {
            filmId: this.$route.params.filmId,
            filmData: {},
            genres: {}
        }
    },
    methods: {
        getFilm() {
            fetch(`https://api.themoviedb.org/3/movie/${this.filmId}?api_key=a96acef3a4614294c766596d68f05358&language=ru-RU`)
                .then(response=> response.json())
                .then(data => {
                    this.filmData = data
                    if(data.genres) {
                        this.genres = data.genres
                    }
                })
        },
        addZero(x) {
            return x < 10 ? `0${x}` : x 
        }
    },
    mounted() {
        this.getFilm()
    },
    computed: {
        minutesToHours() {
            let time = this.filmData.runtime
            let hours = Math.floor(time / 60)
            let minutes = time - (60 * hours)
            return `${this.addZero(hours)}:${this.addZero(minutes)}:00`
        }
    }
}
</script>