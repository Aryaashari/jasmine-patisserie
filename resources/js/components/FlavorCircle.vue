<script setup lang="ts">
defineProps<{
    image: string;
    label: string;
    active?: boolean;
}>();
</script>

<template>
    <button
        class="group flex flex-col items-center gap-2.5 transition-all duration-300"
        :class="{ 'scale-105': active }"
    >
        <!-- Circle Image -->
        <div
            class="relative h-20 w-20 overflow-hidden rounded-full border-3 transition-all duration-300 md:h-24 md:w-24"
            :class="active ? 'border-[#ac2471] shadow-lg' : 'border-transparent hover:border-[#ac2471]/50'"
        >
            <img
                :src="image"
                :alt="label"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
            >
        </div>

        <!-- Label -->
        <span
            class="font-body text-xs font-semibold transition-colors duration-200 md:text-sm"
            :class="active ? 'text-[#ac2471]' : 'text-on-surface-variant group-hover:text-[#ac2471]'"
        >
            {{ label }}
        </span>
    </button>
</template>
