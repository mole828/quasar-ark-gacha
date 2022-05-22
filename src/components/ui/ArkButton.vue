<template>
    <div>
        <label class="button" @click="hook">
            <span>{{text}}</span>
        </label>
    </div>

</template>

<script>
    export default {
        name: "ArkButton",
        props:{
            text: String,
            hook: Function,
        }
    }
</script>

<style scoped>
    label {
        display: block;
        white-space: nowrap;
        height: 1em;
        padding: 0.5em 1.5em;
        box-sizing: content-box;
        min-height: 1em;
        min-width: 4em;
        border-radius: 1em;
        line-height: 1em;
        background-repeat: no-repeat;
        background-size: auto 100%;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: background .3s;
        text-align: center;

        background-color: #158fc5;
    }
    .button:hover {
        background-color: #1174a0;
    }

    span {
        color: #ffffff;
    }
</style>