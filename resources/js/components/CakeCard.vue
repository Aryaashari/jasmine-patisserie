<script setup lang="ts">
defineProps<{
    image: string;
    name: string;
    price: string;
    tags: string[];
}>();
</script>

<template>
    <div
        class="shadow-card group relative flex w-60 shrink-0 flex-col overflow-hidden rounded-[20px] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-sm snap-start"
        style="width: 240px; min-width: 240px; max-width: 240px;"
    >
        <!-- Image -->
        <div class="relative aspect-[4/5] overflow-hidden w-full">
            <img
                :src="image"
                :alt="name"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            >

            <!-- Minimalist Footer Overlay -->
            <div class="absolute right-3 bottom-3 left-3 rounded-[16px] bg-white/95 p-3 backdrop-blur-md shadow-sm">
                <!-- Name & Price -->
                <div class="flex items-center justify-between gap-2">
                    <h3 class="font-display text-[15px] font-bold text-gray-900 leading-tight truncate">
                        {{ name }}
                    </h3>
                    <span class="text-[14px] font-bold text-[#ac2471] whitespace-nowrap">
                        {{ price }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
