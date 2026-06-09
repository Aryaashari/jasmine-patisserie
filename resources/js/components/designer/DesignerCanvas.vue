<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{
    isReady: boolean;
}>();

const emit = defineEmits<{
    (e: 'ready', canvasEl: HTMLElement): void;
}>();

const canvasContainer = ref<HTMLElement | null>(null);

onMounted(() => {
    if (canvasContainer.value) {
        emit('ready', canvasContainer.value);
    }
});
</script>

<template>
    <div class="relative h-full w-full bg-[#f5eae8] overflow-hidden">
        <!-- Canvas Container -->
        <div ref="canvasContainer" class="h-full w-full outline-none" tabindex="0"></div>
        
        <!-- Loading Overlay -->
        <div 
            v-if="!isReady" 
            class="absolute inset-0 flex items-center justify-center bg-[#f5eae8]/80 backdrop-blur-sm z-10 transition-opacity duration-300"
        >
            <div class="flex flex-col items-center gap-4">
                <div class="h-10 w-10 animate-spin rounded-full border-4 border-outline-variant/30 border-t-[#ac2471]"></div>
                <span class="font-display font-bold text-[#ac2471] tracking-wider animate-pulse">Memuat Studio...</span>
            </div>
        </div>

        <!-- Floating Helpers -->
        <div class="glass absolute right-4 top-4 rounded-lg px-3 py-1.5 shadow-sm hidden md:block">
            <span class="label-uppercase text-on-surface">🔄 Geser untuk Memutar</span>
        </div>
    </div>
</template>
