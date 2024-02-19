import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAnswersStore = defineStore('answers', () => {
    const answers = ref({})

    function setAnswer(questionId, selectedAnswer) {
        if (this.answers && this.answers[questionId]) {
            delete this.answers[questionId]
        }
        this.answers[questionId] = selectedAnswer
    }

    function getAnswer(questionId) {
        if (this.answers && this.answers[questionId]) {
            return this.answers[questionId].value
        }
        return {}
    }

    function getAnswers() {
        return this.answers
    }

    return { answers, setAnswer, getAnswer, getAnswers }
})
