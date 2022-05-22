<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ArkCard"
    }
</script>

<style scoped>
div {
    min-width: 20em;
    min-height: 8em;
    background-color: hsla(0,0%,100%,.8);
    border-radius: 1.2em;
    box-shadow: 0 2px 10px -5px rgb(9 2 4 );
    padding: 2em;
    box-sizing: border-box;

    width: 97%;
    margin: 1%;
}
</style>