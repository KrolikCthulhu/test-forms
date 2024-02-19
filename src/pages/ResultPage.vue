<template>
    <div>
        <Card>
            <template #title>Результаты в формате JSON</template>
            <template #content>
                <pre>{{ JSON.stringify(answers, null, 2) }}</pre>
            </template>
        </Card>
    </div>
</template>
<script setup>
import { useAnswersStore } from '@/stores/AnswersStore'
import { ref, onMounted } from 'vue'

const answersStore = useAnswersStore()
const answers = ref([])

onMounted(() => {
    answers.value = answersStore.getAnswers()
})
</script>
<style lang="scss"></style>
