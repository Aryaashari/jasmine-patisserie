<script setup lang="ts">
import { ref } from 'vue';
import CakeCard from './CakeCard.vue';
import SectionHeading from './SectionHeading.vue';

const scrollContainer = ref<HTMLElement | null>(null);

const props = defineProps<{
    cakes: {
        name: string;
        image: string;
        price: string;
        tags: string[];
        slug?: string;
    }[]
}>();

function scrollLeft() {
    scrollContainer.value?.scrollBy({ left: -260, behavior: 'smooth' });
}

function scrollRight() {
    scrollContainer.value?.scrollBy({ left: 260, behavior: 'smooth' });
}
</script>

<template>
    <section id="gallery" class="bg-[#fcf7f6] py-16 md:py-20">
        <div class="mx-auto max-w-7xl px-4 md:px-16">
            <!-- Header with Arrows -->
            <div class="flex items-start justify-between">
                <SectionHeading
                    title="Pilihan Signature"
                    subtitle="Spesial mingguan yang dibuat tangan oleh ahli pastry kami."
                    align="left"
                    titleClass="text-[#785109]"
                />
                <!-- Navigation Arrows -->
                <div class="hidden gap-2 md:flex">
                    <button
                        @click="scrollLeft"
                        class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-800 transition-all duration-200 hover:border-gray-400 hover:bg-black/5"
                        aria-label="Geser kiri"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>
                    <button
                        @click="scrollRight"
                        class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-800 transition-all duration-200 hover:border-gray-400 hover:bg-black/5"
                        aria-label="Geser kanan"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Cards -->
            <div
                ref="scrollContainer"
                class="hide-scrollbar -mx-4 flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 md:mx-0 md:px-0"
            >
                <CakeCard
                    v-for="cake in cakes"
                    :key="cake.name"
                    :image="cake.image"
                    :name="cake.name"
                    :price="cake.price"
                    :tags="cake.tags"
                />
            </div>
        </div>
    </section>
</template>
