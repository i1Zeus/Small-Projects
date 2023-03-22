<script setup lang="ts">
interface NameProps {
    name: string;
    index: number;
}
const props = defineProps<NameProps>();
const emit = defineEmits(["remove"]);
const removeName = () => {
    emit("remove", props.index);
};
</script>

<template>
    <div class="card">
        <h4>{{ name }}</h4>
        <p @click="removeName">x</p>
    </div>
</template>

<style scoped>
.card {
    background-color: rgb(27, 77, 138);
    width: 28%;
    color: white;
    border-radius: 1rem;
    padding: 0.1rem;
    margin-right: 0.5rem;
    margin-bottom: 1rem;
    position: relative;
}
.card p {
    position: absolute;
    top: -17%;
    left: 84%;
    cursor: pointer;
    color: rgb(255, 0, 0);
    font-size: 1.6rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    align-items: center;
    border: 1.5px dashed black;
}
.card p:hover {
    background-color: black;
    transition-duration: 250ms;
}
</style>
