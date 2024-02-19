import { defineStore } from 'pinia'

export const useQuestionsStore = defineStore('questions', () => {
    const questions = [
        {
            id: 1,
            question: 'Для чего вы используете Findmykids?',
            answers: [
                'Присматриваю за своим ребенком',
                'Присматриваю за внуками/племянниками',
                'Присматриваю за младшим братом/сестрой'
            ],
            questionType: 'single',
            allowCustomAnswer: true
        },
        {
            id: 2,
            question: 'Почему вы используете веб-версию Findmykids?',
            answers: ['Удобнее смотреть с компьютера', 'Телефон не всегда под рукой'],
            questionType: 'multiple',
            allowCustomAnswer: true
        },
        {
            id: 3,
            question: ' Если бы вы могли внести любое изменение в Findmykids, что бы это было?',
            answers: [],
            questionType: 'open',
            allowCustomAnswer: false
        }
    ]

    function getQuestionByIndex(index) {
        return questions[index]
    }

    function getTotalQuestionsNumber() {
        return questions.length
    }

    return { questions, getQuestionByIndex, getTotalQuestionsNumber }
})
