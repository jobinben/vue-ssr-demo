<!-- author: 大冰 -->
<template>
    <div id="app">
        <div class="demo" @click="handleClicked">这是一段内容</div>
    </div>
</template>

<script>
export default {
    methods: {
        handleClicked() {
            console.log(' you clicked me!!!')
        },
    },
}
</script>
<style scoped>
.demo {
    width: 300px;
    height: 300px;
    background-color: skyblue;
}
</style>