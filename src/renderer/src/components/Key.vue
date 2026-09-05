<script setup lang="ts">

import "./key.css";
const { value, fun } = defineProps<{ value: number | string, fun: () => void }>();

</script>

<template>
    <button class="bg-amber-50"
    @click="fun"
    >
    {{ value }}
    </button>
</template>