<template>
  <div class="spinner-border" role="status" v-if="loading">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="container pt-5" v-else>
    <h1 class="pb-5">Страница №{{page}}</h1>
    <div class="row row-cols-4">
      <div class="col" v-for='item in filmData' :key='item.id'>
        <div class="card mt-3">
          <img :src='"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + item.backdrop_path' :alt="item.title" class="card-img-top">
          <div class="card-body">
            <div class="card-title">
                <h3>{{ item.title }}</h3>
            </div>
            <div class="card-text">
              <span class="badge rounded-pill bg-light text-dark" v-if="item.release_date">дата выхода: {{ item.release_date }}</span>
            </div>
            <router-link :to="`/film/${item.id}`">подробнее</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-sm-3"><button class="btn btn-primary" @click="backPage" v-if="page !== 1">назад</button></div>
      <div class="col sm-6"></div>
      <div class="col-sm-3"><button class="btn btn-primary" @click="nextPage">Далее</button></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return{
      loading: false,
      filmData: [],
      page: 1,
    }
  },
  mounted() {
    this.loadFilms()
  },
  methods:{
    async loadFilms() {
      this.loading = true
      const {data} = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=a96acef3a4614294c766596d68f05358&language=ru-RU&page=${this.page}`)
      this.loading = false
      this.filmData = data.results
    },
    nextPage() {
      this.page++
      this.loadFilms()
      window.scrollY = 0
    },
    backPage() {
      this.page--
      this.loadFIlms()
      windiw,scrillY = 0
    }
  }
}
</script>
