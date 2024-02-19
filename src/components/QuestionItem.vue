<template>
    <div>
        <Panel>
            <template #header>
                <p>{{ currentQuestionNumber }} из {{ totalQuestions }}</p>
            </template>
            <template #footer>
                <div class="btns">
                    <div class="nav">
                        <Button @click="goToPreviousQuestion" v-if="currentQuestionNumber > 1"
                            >Предыдущий</Button
                        >
                        <Button
                            @click="goToNextQuestion"
                            v-if="currentQuestionNumber < totalQuestions"
                            >Следующий</Button
                        >
                    </div>
                    <Button @click="goToResult" v-if="currentQuestionNumber === totalQuestions">
                        Завершить
                    </Button>
                </div>
            </template>
            <h2 class="title">{{ question.value.question }}</h2>
            <div v-if="question.value.questionType === 'single'" class="list">
                <div v-for="(answer, index) in question.value.answers" :key="index">
                    <label>
                        <RadioButton
                            v-model="selectedAnswer"
                            :name="question.value.question"
                            :value="answer"
                        />
                        {{ answer }}
                    </label>
                </div>
            </div>
            <div v-else-if="question.value.questionType === 'multiple'" class="list">
                <div v-for="(answer, index) in question.value.answers" :key="index">
                    <label>
                        <Checkbox
                            v-model="selectedAnswers"
                            :value="answer"
                            :name="question.value.question"
                        />
                        {{ answer }}
                    </label>
                </div>
            </div>
            <div v-else>
                <InputText type="text" v-model="openAnswer" />
            </div>
            <div v-if="question.value.allowCustomAnswer" class="custom-answer">
                <div v-if="question.value.questionType === 'single'">
                    <label>
                        <RadioButton
                            v-model="selectedAnswer"
                            :name="question.value.question"
                            value="customAnswer"
                        />
                        Другое
                    </label>
                </div>
                <div v-if="question.value.questionType === 'multiple'">
                    <label>
                        <Checkbox
                            :binary="true"
                            v-model="customAnswerChecked"
                            :name="question.value.question"
                            value="customAnswer"
                        />
                        Другое
                    </label>
                </div>
                <div v-if="selectedAnswer === 'customAnswer' || customAnswerChecked">
                    <InputText type="text" v-model="customAnswer" />
                </div>
            </div>
        </Panel>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuestionsStore } from '@/stores/QuestionsStore'
import { useAnswersStore } from '@/stores/AnswersStore'

const route = useRoute()
const router = useRouter()
const questionsStore = useQuestionsStore()
const answersStore = useAnswersStore()
const totalQuestions = ref(questionsStore.getTotalQuestionsNumber())
let currentQuestionNumber = ref(parseInt(route.params.id) || 1)
let question = ref({})

const selectedAnswer = ref('')
const selectedAnswers = ref([])
const openAnswer = ref('')
const customAnswerChecked = ref(false)
const customAnswer = ref('')

function goToPreviousQuestion() {
    saveAnswer()
    clearAnswer()
    currentQuestionNumber.value--
    router.push({ name: 'question', params: { id: currentQuestionNumber.value } })
}

function goToNextQuestion() {
    saveAnswer()
    clearAnswer()
    currentQuestionNumber.value++
    router.push({ name: 'question', params: { id: currentQuestionNumber.value } })
}

function goToResult() {
    saveAnswer()
    clearAnswer()
    router.push({ name: 'result' })
}

watch(
    currentQuestionNumber,
    () => {
        question.value = ref(questionsStore.getQuestionByIndex(currentQuestionNumber.value - 1))
        getAnswer()
    },
    { immediate: true }
)

function saveAnswer() {
    let finalAnswer = []
    if (
        question.value.value.questionType === 'single' &&
        selectedAnswer.value !== '' &&
        selectedAnswer.value !== 'customAnswer'
    ) {
        finalAnswer.push(selectedAnswer.value)
    } else if (
        question.value.value.questionType === 'multiple' &&
        selectedAnswers.value.length > 0
    ) {
        if (selectedAnswers.value.includes('customAnswer')) {
            finalAnswer = selectedAnswers.value.filter((answer) => answer !== 'customAnswer')
        } else {
            finalAnswer = selectedAnswers.value
        }
    }
    if (
        question.value.value.allowCustomAnswer &&
        customAnswer.value !== '' &&
        (selectedAnswer.value === 'customAnswer' || customAnswerChecked)
    ) {
        finalAnswer.push({ 'свой вариант': customAnswer.value })
    }
    if (openAnswer.value !== '') {
        finalAnswer.push(openAnswer.value)
    }

    answersStore.setAnswer(question.value.value.id, finalAnswer)
}

function clearAnswer() {
    selectedAnswer.value = ''
    selectedAnswers.value = []
    openAnswer.value = ''
    customAnswerChecked.value = false
    customAnswer.value = ''
}

function getAnswer() {
    //TODO доделать
}
</script>
<style scoped>
.title {
    padding-bottom: 20px;
}
.btns {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
}
.nav {
    display: flex;
    gap: 10px;
}

.custom-answer {
    display: flex;
    gap: 10px;
    align-items: center;
    padding-top: 10px;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
