import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home'
import SearchFilm from '@/views/SearchFilm'
import NotFound from '@/views/NotFound'
import Film from '@/views/Film'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/search',
        component: SearchFilm
    },
    {
        path: '/film/:filmId',
        component: Film,
        props: true
    },
    { path: '/:notFound(.*)', component: NotFound }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})

export default router