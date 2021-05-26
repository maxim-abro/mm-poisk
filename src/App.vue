<template>
    <nav class="navbar bg-light navbar-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">ММпоиск</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item"><router-link to="/" class="nav-link">Главная</router-link></li>
          <li class="nav-item"><router-link to="/404" class="nav-link">Топ 250 фильмов</router-link></li>
          <li class="nav-item"><router-link to="/search" class="nav-link">Поиск фильмов</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>
