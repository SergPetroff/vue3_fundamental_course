<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>
<script>


export default {
    name:'my-button'
}
</script>

<style scoped>
.btn {
  
  padding: 10px 15px;
  background: none;
  color: blue;
  border: blue 1px solid;
  cursor: pointer;
}
</style>