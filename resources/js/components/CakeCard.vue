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
        class="shadow-card group relative flex flex-col overflow-hidden rounded-[24px] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg snap-start"
        style="min-width: 320px;"
    >
        <!-- Image -->
        <div class="relative aspect-[4/5] overflow-hidden w-full">
            <img
                :src="image"
                :alt="name"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            >

            <!-- Glassmorphic Footer Overlay -->
            <div class="absolute right-4 bottom-4 left-4 rounded-[20px] bg-white/85 p-5 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <!-- Name & Price -->
                <div class="mb-3 flex items-start justify-between gap-2">
                    <h3 class="font-display text-[18px] font-bold text-gray-900 leading-tight">
                        {{ name }}
                    </h3>
                    <span class="text-[15px] font-bold text-[#ac2471]">
                        {{ price }}
                    </span>
                </div>


            </div>
        </div>
    </div>
</template>
