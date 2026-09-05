<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue';
import Keyboard from './components/Keyboard.vue';

const STACK = ref(0);
const root = ref<HTMLElement | null>(null);

function getStack() {
  return STACK;
}

let observer: ResizeObserver | null = null;

onMounted(() => {
  if (!root.value) return;

  observer = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    window.api.resizeWindow(width, height);
  });

  observer.observe(root.value);
});

onUnmounted(() => {
  observer?.disconnect();
});

</script>

<template>
  <main ref="root">
    <input type="text" :value="STACK" />
    <div class="">
      <Keyboard />
    </div>
  </main>
</template>
