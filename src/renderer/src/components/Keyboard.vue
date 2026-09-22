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

const STACK = ref<(number | string)[]>([]);
const VISOR = ref('0');

function renderVisor() {

    if (STACK.value.length === 0) {
        VISOR.value = '0';
        return;
    }

    const visor: string[] = [];

    for (let i in STACK.value) {
        if (OPERATORS.includes(String(STACK.value[Number(i) + 1]))) {
            visor.push(` ${STACK.value[i]} `)
            continue;
        }

        visor.push(String(STACK.value[i]))
    }

    VISOR.value = visor.join('');
}

function clearStack() {
    STACK.value = [];
    renderVisor();
}

function calculate() {
    try {
        const expression = STACK.value.join('').replace(/%/g, '/100*');
        const result = new Function(`return (${expression})`)();
        STACK.value = [result];
        renderVisor();
    } catch {
        STACK.value = [];
        VISOR.value = 'Erro';
    }
}

function identifyType(pressedKey: string | number): () => void {

    if ("number" === typeof pressedKey) { return (
        /* NÚMEROS */ () => {
            STACK.value.push(pressedKey);
            renderVisor();
        }
    )}

    if (pressedKey === 'c') { return (
        /* LIMPAR */ () => clearStack()
    )}

    if (pressedKey === '=') { return (
        /* IGUAL */ () => calculate()
    )}

    if (OPERATORS.includes(pressedKey) || SEPARATORS.includes(pressedKey)) { return (
        /* OPERADORES E SEPARADORES */ () => {
            STACK.value.push(pressedKey);
            renderVisor();
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