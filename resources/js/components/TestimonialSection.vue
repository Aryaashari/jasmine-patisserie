<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import SectionHeading from './SectionHeading.vue';

defineProps<{
    testimonials: {
        id: number;
        name: string;
        message: string;
        rating: number;
        image: string;
    }[]
}>();

const scrollContainer = ref<HTMLElement | null>(null);
let intervalId: ReturnType<typeof setInterval> | null = null;

const startAutoSlide = () => {
    intervalId = setInterval(() => {
        if (scrollContainer.value) {
            const container = scrollContainer.value;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            
            // If reached the end, loop back to start
            if (container.scrollLeft >= maxScrollLeft - 10) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: 340, behavior: 'smooth' });
            }
        }
    }, 3000); // Slide every 3 seconds
};

const stopAutoSlide = () => {
    if (intervalId) clearInterval(intervalId);
};

const scrollLeft = () => {
    stopAutoSlide();
    scrollContainer.value?.scrollBy({ left: -340, behavior: 'smooth' });
    startAutoSlide();
};

const scrollRight = () => {
    stopAutoSlide();
    scrollContainer.value?.scrollBy({ left: 340, behavior: 'smooth' });
    startAutoSlide();
};

onMounted(() => {
    startAutoSlide();
});

onUnmounted(() => {
    stopAutoSlide();
});
</script>

<template>
    <section class="bg-white py-16 md:py-24">
        <div class="mx-auto max-w-7xl px-4 md:px-16">
            <!-- Header with Arrows -->
            <div class="flex items-start justify-between">
                <SectionHeading
                    title="Apa Kata Mereka"
                    subtitle="Ribuan momen manis telah kami wujudkan. Baca cerita dari para pelanggan kami."
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
                class="hide-scrollbar -mx-4 flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 pb-4 md:mx-0 md:px-0"
                @mouseenter="stopAutoSlide"
                @mouseleave="startAutoSlide"
            >
                <div
                    v-for="testimonial in testimonials"
                    :key="testimonial.id"
                    class="shadow-card relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-[#fcf7f6] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg snap-start shrink-0"
                    style="width: 320px;"
                >
                    <div>
                        <!-- Rating -->
                        <div class="mb-4 flex text-yellow-400">
                            <svg v-for="i in Number(testimonial.rating)" :key="i" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        </div>
                        
                        <!-- Message -->
                        <p class="text-gray-700 italic leading-relaxed mb-6">
                            "{{ testimonial.message }}"
                        </p>
                    </div>

                    <!-- Author Info -->
                    <div class="flex items-center gap-4 mt-auto">
                        <img :src="testimonial.image" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover shadow-sm">
                        <div>
                            <h4 class="font-bold text-gray-900">{{ testimonial.name }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
