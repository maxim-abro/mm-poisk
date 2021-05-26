<template>
    <div class="bg-light bg-gradient border">
        <div class="container">
            <h1 class="mb-5 mt-2">Поиск фильма</h1>
            <div class="row">
                <div class="col">        
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Название фильма</span>
                        <input type="text" class="form-control" placeholder="брат" aria-label="movie name" :value="nameFilm" @input="changeFilmName">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1" aria-label="year">Год выпуска фильма</span>
                        <input type="text" class="form-control" placeholder="1997" :value="yearFilm" @input="changeYearFilm">
                    </div>
                </div>
            </div>

            <button class="btn btn-success mb-5 mt-3" @click="getSearch">найти</button>
        </div>
    </div>
    <div class="container mt-5" v-if="!isFinde">
        <h2>найдется всё</h2>
    </div>

    <div class="container" v-else>
        <div class="spinner-border" role="status" v-if="loading">
            <span class="sr-only">Loading...</span>
        </div>
        <h3 class="pt-5"> найдено: {{ searchData.total_results }} результатов. </h3>
        <h4> страница {{ page }} из {{ totalPages }}</h4>
        <div class="row row-cols-2">
            <div class="col d-flex" v-for='item in searchData.results' :key="item.id"> 
                <div class="m-2 row border p-1 " style="width: 100%">
                    <div class="col-3">
                        <img :src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/'+ item.poster_path" class="card-img-top" alt="..." v-if="item.poster_path">
                    </div>
                    <div class="col-9 d-flex justify-content-between flex-column">
                        <div class="card-body">
                            <h5 class="card-title">{{  item.title  }}</h5>
                            <p class="card-text">{{ item.overview }}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" v-if="item.release_date">премьера: {{ item.release_date }}</li>
                        </ul>
                        <div class="card-body">
                            <router-link :to="'/film/'+item.id">
                                <button class="btn btn-primary" :key="item.id">подробнее</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5 mb-5">
            <div class="col-3">
                <button class="btn btn-primary" v-if="page>1" @click="prevPage">назад</button>
            </div>
            <div class="col-6"></div>
            <div class="col-3">
                <button class="btn btn-primary" v-if="totalPages !== page" @click="nextPage">вперёд</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            nameFilm:'мстители',
            yearFilm:'',
            searchData:[],
            page:1,
            isFinde: false,
            loading: false,
            totalPages: 0,
        }
    },
    methods:{
        getSearch() {
            this.loading = true
            fetch('https://api.themoviedb.org/3/search/movie?api_key=a96acef3a4614294c766596d68f05358&language=ru-RU&query=' + this.nameFilm + '&page=' + this.page + '&include_adult=true&region=ru&primary_release_year=' + this.yearFilm)
                .then(response => response.json())
                .then(data => {
                    this.searchData = data
                    this.totalPages = data.total_pages
                })
            this.isFinde = true
            this.loading = false
        },
        changeFilmName(e) {
            this.nameFilm = e.target.value
        },
        changeYearFilm(e) {
            this.yearFilm = e.target.value
        },
        nextPage() {
            this.page++
            window.scrollY = 0
            this.getSearch()
        },
        prevPage() {
            this.page--
            window.scrollY = 0
            this.getSearch()
        }
    },
    computed: {
    }
}
</script>


<style scoped>

</style>