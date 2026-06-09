<script setup lang="ts">
defineProps<{
    currentStep: number;
    totalSteps: number;
}>();

const emit = defineEmits<{
    (e: 'navigate', step: number): void;
}>();
</script>

<template>
    <div class="mb-6 flex w-full items-center justify-between">
        <div class="flex items-center gap-2">
            <template v-for="step in totalSteps" :key="step">
                <button
                    @click="step < currentStep ? emit('navigate', step) : null"
                    class="h-2.5 rounded-full transition-all duration-300"
                    :class="[
                        step === currentStep ? 'w-8 bg-gradient-to-r from-secondary to-primary-container' : 
                        step < currentStep ? 'w-4 bg-primary/40 cursor-pointer hover:bg-primary/60' : 'w-2 bg-surface-variant'
                    ]"
                    :aria-label="`Step ${step}`"
                ></button>
            </template>
        </div>
        <div class="text-on-surface-variant font-body text-xs font-semibold uppercase tracking-wider">
            Step {{ currentStep }} of {{ totalSteps }}
        </div>
    </div>
</template>
