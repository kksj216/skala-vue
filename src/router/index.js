import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '../views/WeatherHomeView.vue'
import HomeView from '../views/HomeView.vue'
import WeatherAllTasksView from '../views/WeatherAllTasksView.vue'

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    {
        path: '/weather',
        component: WeatherAllTasksView,
        children: [
            {
                path: '', 
                name: 'WeatherHome', 
                component: WeatherHomeView 
            },
            {
                path: 'about', 
                name: 'WeatherAbout', 
                component: () => import('../views/WeatherAboutView.vue') 
            },
            {
                path: ':cityId', 
                name: 'WeatherDetail', 
                component: () => import('../views/WeatherDetailView.vue') 
            },
        ],
    },
    {
        path: '/about',
        name: 'WeatherAbout',
        component: () => import('../views/WeatherAboutView.vue'),
        meta: { title: '서비스 소개' }
    },
    {
        path: '/weather/:cityId',
        name: 'WeatherDetail',
        component: () => import('../views/WeatherDetailView.vue'),
        meta: { title: '상세 날씨' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFoundView.vue'),
        meta: { title: '페이지 없음' } 
    },
    {   
        path: '/practices/basic', 
        name: 'PracticeBasic', 
        component: () => import('../views/practices/BasicPracticeView.vue')
    },
    { 
        path: '/practices/store', 
        name: 'PracticeStore', 
        component: () => import('../views/practices/StorePracticeView.vue')
    },
    { 
        path: '/practices/composition', 
        name: 'PracticeComposition', 
        component: () => import('../views/practices/CompositionPracticeView.vue') 
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to) => {
    document.title = to.meta.title ? `${to.meta.title} | Weather App` : 'Weather App'
})

export default router