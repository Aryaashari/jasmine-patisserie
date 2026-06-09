<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string;
    colors?: { label: string; value: string }[];
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const defaultColors = [
    { label: 'Vanilla Cream', value: '#FFFBF2' },
    { label: 'Strawberry Pink', value: '#FFD1DC' },
    { label: 'Mint Green', value: '#C1E1C1' },
    { label: 'Lavender Purple', value: '#E6E6FA' },
    { label: 'Sky Blue', value: '#AEC6CF' },
    { label: 'Matcha Yellow', value: '#E8ECC8' },
];

const currentColors = computed(() => props.colors || defaultColors);
</script>

<template>
    <div class="flex flex-wrap gap-3">
        <button
            v-for="color in currentColors"
            :key="color.value"
            @click="emit('update:modelValue', color.value)"
            class="h-10 w-10 cursor-pointer rounded-full border-2 transition-all duration-200"
            :class="[
                modelValue === color.value 
                    ? 'border-primary scale-110 shadow-md ring-2 ring-primary/30 ring-offset-2' 
                    : 'border-outline-variant hover:scale-105'
            ]"
            :style="{ backgroundColor: color.value }"
            :title="color.label"
            type="button"
        ></button>
        
        <!-- Custom Color Picker -->
        <div class="relative flex items-center justify-center">
            <input 
                type="color" 
                :value="modelValue"
                @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
                class="absolute h-full w-full cursor-pointer opacity-0"
                title="Custom Color"
            >
            <div 
                class="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200"
                :class="[
                    !currentColors.find(c => c.value === modelValue)
                        ? 'border-primary scale-110 shadow-md ring-2 ring-primary/30 ring-offset-2'
                        : 'border-outline-variant hover:scale-105'
                ]"
                :style="!currentColors.find(c => c.value === modelValue) ? { backgroundColor: modelValue } : { background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }"
            >
                <span v-if="currentColors.find(c => c.value === modelValue)" class="text-xs">🎨</span>
            </div>
        </div>
    </div>
</template>
