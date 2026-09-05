<script setup lang="ts">

import { ref } from 'vue';
import Key from './Key.vue';
import { h, type VNode } from 'vue';
import "./keyboard.css";

const KEYS = [
    ['(',')','%','c'],
    [ 7 , 8 , 9 ,'/'],
    [ 4 , 5 , 6 ,'*'],
    [ 1 , 2 , 3 ,'-'],
    [ 0 ,'.','=','+'],
]

const OPERATORS  = ['/', '*', '-', '+', '%', '='];
const SEPARATORS = ['(', ')', '.'];

const STACK: number[] = [];
const VISOR = ref(0);

function renderVisor() {

    const visor: string[] = [];

    for (let i in STACK) {
        if (OPERATORS.includes(STACK[i+1])) {
            visor.push(` ${i} `)
            continue;
        }

        visor.push(String(i))
    }
}

function identifyType(pressedKey: string | number): () => void {

    if ("number" === typeof pressedKey) { return (
        /* NÚMEROS */ () => {
            STACK.push(pressedKey);
        }
    )}

    return () => void {};
}

function projectKeys() {

    const project: VNode[] = [];

    for (let key of KEYS) {
        let keysof: VNode[] = [];
        
        for (let i of key) {
            let obj: { value: string | number, fun: () => void} = { value:i, fun:identifyType(i) }
            keysof.push(h(Key, obj))
        }

        let row = h("div", { class: "flex flex-row gap-6"} ,keysof)
        project.push(row);
    }

    return project;
}

</script>

<template>
    <input type="text" placeholder="" :value="VISOR">
    <div class="glassmorphism">
        <component :is="projectKeys" />
    </div>
</template>