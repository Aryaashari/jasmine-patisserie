<script setup lang="ts">
defineProps<{
    image: string;
    title: string;
    description: string;
    size?: 'large' | 'medium' | 'small' | 'wide' | 'tall' | 'square';
}>();
</script>

<template>
    <div
        class="group relative overflow-hidden rounded-[24px] transition-all duration-300 hover:-translate-y-1 w-full"
        :class="{
            'aspect-[4/3] md:aspect-auto': size === 'wide' || size === 'tall',
            'aspect-square': size === 'square' || size === 'medium' || size === 'small',
            'aspect-[4/5]': size === 'large',
            'aspect-[4/3]': !size,
        }"
    >
        <!-- Background Image -->
        <img
            :src="image"
            :alt="title"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
        >

        <!-- Gradient Overlay -->
        <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);"></div>

        <!-- Text Content -->
        <div class="absolute right-0 bottom-0 left-0 p-5 md:p-8">
            <h3 class="font-display mb-1 font-bold text-white drop-shadow-md" :class="[ (size === 'wide' || size === 'tall') ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl' ]">
                {{ title }}
            </h3>
            <p class="font-medium leading-snug text-white/90 drop-shadow-sm" :class="[ (size === 'wide' || size === 'tall') ? 'text-sm md:text-base' : 'text-sm' ]">
                {{ description }}
            </p>
        </div>
    </div>
</template>
