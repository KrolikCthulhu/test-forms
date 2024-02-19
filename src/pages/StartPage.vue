<template>
    <Card>
        <template #title>Веб-версия Findmykids</template>
        <template #content>
            <p>
                Мы&nbsp;заметили, что вы&nbsp;активно пользуетесь веб-версией Findmykids помимо
                приложения на телефоне. Расскажите, что вам в&nbsp;ней нравится и&nbsp;как
                мы&nbsp;можем ее&nbsp;улучшить. Это поможет сделать Findmykids удобнее для вас.
            </p>
        </template>
        <template #footer>
            <div>
                <Button @click="startSurvey">Начать опрос</Button>
            </div>
        </template>
    </Card>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startSurvey = () => {
    router.push({ name: 'question', params: { id: 1 } })
}
</script>
<style lang="scss"></style>
