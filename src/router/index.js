import { createRouter, createWebHistory } from 'vue-router'
import StartPage from '@/pages/StartPage.vue'
import QuestionPage from '@/pages/QuestionPage.vue'
import ResultPage from '@/pages/ResultPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: StartPage
        },
        {
            path: '/question/:id',
            name: 'question',
            component: QuestionPage
        },
        {
            path: '/result',
            name: 'result',
            component: ResultPage
        }
    ]
})

export default router
