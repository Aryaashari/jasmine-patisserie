<script setup lang="ts">
import { computed } from 'vue';
import StepIndicator from './StepIndicator.vue';
import StepBaseShape from './steps/StepBaseShape.vue';
import StepDecorations from './steps/StepDecorations.vue';
import StepFrosting from './steps/StepFrosting.vue';
import StepPackaging from './steps/StepPackaging.vue';
import StepReview from './steps/StepReview.vue';

const props = defineProps<{
    currentStep: number;
    totalSteps: number;
    
    // State Props
    baseShape: number;
    frostingStyle: string;
    frostingColor: string;
    interactionMode: 'place_deco' | 'transform_translate' | 'transform_rotate' | 'draw_piping';
    selectedDecoType: string;
    decoColor: string;
    decoScale: number;
    pipingThickness: number;
    customText: string;
    packaging: string;
}>();

const emit = defineEmits<{
    (e: 'update:currentStep', val: number): void;
    (e: 'update:baseShape', val: number): void;
    (e: 'update:frostingStyle', val: string): void;
    (e: 'update:frostingColor', val: string): void;
    (e: 'update:interactionMode', val: 'place_deco' | 'transform_translate' | 'transform_rotate' | 'draw_piping'): void;
    (e: 'update:selectedDecoType', val: string): void;
    (e: 'update:decoColor', val: string): void;
    (e: 'update:decoScale', val: number): void;
    (e: 'update:pipingThickness', val: number): void;
    (e: 'update:customText', val: string): void;
    (e: 'update:packaging', val: string): void;
    (e: 'undo'): void;
    (e: 'clear'): void;
    (e: 'export-png'): void;
    (e: 'export-glb'): void;
}>();

const isFirstStep = computed(() => props.currentStep === 1);
const isLastStep = computed(() => props.currentStep === props.totalSteps);

const nextStep = () => {
    if (!isLastStep.value) {
emit('update:currentStep', props.currentStep + 1);
}
};

const prevStep = () => {
    if (!isFirstStep.value) {
emit('update:currentStep', props.currentStep - 1);
}
};
</script>

<template>
    <div class="flex h-full flex-col bg-[#fff8f7] md:border-r md:border-outline-variant/30 relative">
        <!-- Header -->
        <div class="flex items-center gap-3 border-b border-outline-variant/20 px-6 py-4">
            <span class="text-2xl">👩‍🍳</span>
            <div>
                <h1 class="font-display text-lg font-bold text-on-surface">Studio Kue</h1>
                <p class="font-body text-on-surface-variant text-xs">Desain kue impianmu dalam 3D</p>
            </div>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto px-6 py-6">
            <StepIndicator 
                :currentStep="currentStep" 
                :totalSteps="totalSteps" 
                @navigate="(s) => emit('update:currentStep', s)"
            />

            <!-- Step Contents (using v-show or v-if depending on transition needs) -->
            <transition name="fade-slide" mode="out-in">
                <div :key="currentStep">
                    <StepBaseShape 
                        v-if="currentStep === 1"
                        :modelValue="baseShape"
                        @update:modelValue="(v) => emit('update:baseShape', v)"
                    />

                    <StepFrosting 
                        v-else-if="currentStep === 2"
                        :style="frostingStyle"
                        :color="frostingColor"
                        @update:style="(v) => emit('update:frostingStyle', v)"
                        @update:color="(v) => emit('update:frostingColor', v)"
                    />

                    <StepDecorations 
                        v-else-if="currentStep === 3"
                        :mode="interactionMode"
                        :selectedDeco="selectedDecoType"
                        :decoColor="decoColor"
                        :decoScale="decoScale"
                        :pipingThickness="pipingThickness"
                        :customText="customText"
                        @update:mode="(v) => emit('update:interactionMode', v)"
                        @update:selectedDeco="(v) => emit('update:selectedDecoType', v)"
                        @update:decoColor="(v) => emit('update:decoColor', v)"
                        @update:decoScale="(v) => emit('update:decoScale', v)"
                        @update:pipingThickness="(v) => emit('update:pipingThickness', v)"
                        @update:customText="(v) => emit('update:customText', v)"
                        @undo="emit('undo')"
                        @clear="emit('clear')"
                    />

                    <StepPackaging 
                        v-else-if="currentStep === 4"
                        :modelValue="packaging"
                        @update:modelValue="(v) => emit('update:packaging', v)"
                    />

                    <StepReview 
                        v-else-if="currentStep === 5"
                        :baseShape="baseShape"
                        :frostingStyle="frostingStyle"
                        :packaging="packaging"
                        @export-png="emit('export-png')"
                        @export-glb="emit('export-glb')"
                    />
                </div>
            </transition>
        </div>

        <!-- Footer Navigation -->
        <div class="glass border-t border-outline-variant/30 px-6 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.02)] z-10 sticky bottom-0">
            <div class="flex items-center justify-between">
                <button 
                    @click="prevStep"
                    :disabled="isFirstStep"
                    class="font-body text-sm font-semibold text-[#ac2471] transition-all hover:text-[#8b008b] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    &larr; Kembali
                </button>
                
                <button 
                    v-if="!isLastStep"
                    @click="nextStep"
                    class="gradient-button rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                >
                    Langkah Berikutnya &rarr;
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
