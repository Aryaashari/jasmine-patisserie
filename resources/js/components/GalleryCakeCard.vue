<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type {Cake} from '../data/cakes';

defineProps<{
    cake: Cake;
}>();
</script>

<template>
    <Link
        :href="'/gallery/' + cake.slug"
        class="shadow-card group relative flex flex-col overflow-hidden rounded-[24px] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-elevated"
    >
        <!-- Image Container -->
        <div class="relative aspect-[4/5] overflow-hidden w-full">
            <img
                :src="cake.image"
                :alt="cake.name"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
            >

            <!-- Glassmorphic Footer Overlay -->
            <div class="absolute right-4 bottom-4 left-4 rounded-[20px] bg-white/85 p-4 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:bg-white/90">
                <!-- Category Badge -->
                <div class="mb-2">
                    <span
                        :class="[
                            'rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                            cake.category === 'Birthday' || cake.category === 'Anniversary' || cake.category === 'Baby Shower'
                                ? 'bg-[#ffe8a1] text-[#735c00]'
                                : cake.category === 'Wedding'
                                ? 'bg-[#ffe4f2] text-[#ac2471]'
                                : cake.category === 'Custom'
                                ? 'bg-[#e8f5e9] text-[#2e7d32]'
                                : 'bg-[#e3f2fd] text-[#1565c0]'
                        ]"
                    >
                        {{ cake.category }}
                    </span>
                </div>

                <!-- Name & Price -->
                <div class="mb-3 flex items-start justify-between gap-2">
                    <h3 class="font-display text-[16px] font-bold text-gray-900 leading-tight">
                        {{ cake.name }}
                    </h3>
                    <span class="text-[14px] font-bold text-[#ac2471] shrink-0">
                        {{ cake.priceFormatted }}
                    </span>
                </div>


            </div>
        </div>
    </Link>
</template>
