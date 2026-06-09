<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { ref, computed, watch } from 'vue';
import GalleryCakeCard from '@/components/GalleryCakeCard.vue';
import MainLayout from '@/layouts/MainLayout.vue';

const props = defineProps<{
    categories: Array<{ value: string, label: string }>;
    cakes: any[];
}>();

// Filter States
const selectedCategory = ref('All');
const minPrice = ref(0);
const maxPrice = ref(5000000);
const maxRangeLimit = 5000000;
// Price slider percentages for the active track styling
const minPercent = computed(() => (minPrice.value / maxRangeLimit) * 100);
const maxPercent = computed(() => (maxPrice.value / maxRangeLimit) * 100);

// Watchers to ensure minPrice doesn't exceed maxPrice
watch(minPrice, (val) => {
    if (val > maxPrice.value) {
        minPrice.value = maxPrice.value;
    }
});

watch(maxPrice, (val) => {
    if (val < minPrice.value) {
        maxPrice.value = minPrice.value;
    }
});

// Filter logic
const filteredCakes = computed(() => {
    return props.cakes.filter((cake) => {
        const categoryMatch =
            selectedCategory.value === 'All' ||
            cake.category === selectedCategory.value;
        const priceMatch =
            cake.price >= minPrice.value && cake.price <= maxPrice.value;

        return categoryMatch && priceMatch;
    });
});

// Format pricing helper
function formatRupiah(value: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

// Reset filters
const hasActiveFilters = computed(() => {
    return (
        selectedCategory.value !== 'All' ||
        minPrice.value > 0 ||
        maxPrice.value < maxRangeLimit
    );
});

function resetFilters() {
    selectedCategory.value = 'All';
    minPrice.value = 0;
    maxPrice.value = maxRangeLimit;
}

// Collapsible filters for mobile
const showMobileFilters = ref(false);
</script>

<template>
    <Head title="Gallery Kue — Koleksi Pâtisserie Premium" />

    <MainLayout>
        <!-- Page Header -->
        <header class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#fff8f7]">
            <!-- Decorative background elements -->
            <div class="absolute inset-0 z-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMyMDEhMWEiLz48L3N2Zz4=')]"></div>
            <div class="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] rounded-full bg-gradient-to-r from-[#ac2471]/10 to-[#fd68b3]/10 blur-[100px] z-0 animate-pulse-slow"></div>
            <div class="absolute -bottom-[20%] -right-[10%] w-[50%] h-[60%] rounded-full bg-gradient-to-l from-[#d4af37]/10 to-[#ffe088]/10 blur-[80px] z-0 animate-pulse-slow" style="animation-delay: 2s"></div>

            <div class="relative z-10 mx-auto max-w-5xl px-4 text-center md:px-16">
                <!-- Badge -->
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-[#ac2471]/20 shadow-sm animate-fade-in-up opacity-0" style="animation-fill-mode: forwards;">
                    <span class="w-2 h-2 rounded-full bg-[#ac2471] animate-pulse"></span>
                    <span class="text-xs font-bold text-[#ac2471] tracking-wider uppercase">Koleksi Spesial</span>
                </div>
                
                <!-- Title -->
                <h1 class="font-display text-on-surface mb-6 text-[40px] font-extrabold leading-tight tracking-tight md:text-[56px] lg:text-[64px] animate-fade-in-up opacity-0" style="animation-delay: 150ms; animation-fill-mode: forwards;">
                    Galeri <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#ac2471] to-[#d4af37]">Kue Kami</span>
                </h1>
                
                <!-- Description -->
                <p class="text-on-surface-variant font-body mx-auto w-full max-w-[700px] text-lg leading-relaxed md:text-xl animate-fade-in-up opacity-0" style="animation-delay: 300ms; animation-fill-mode: forwards;">
                    Temukan koleksi kue artisan, cupcake, dan dessert box buatan tangan kami yang dirancang untuk perayaan termanis dalam hidup Anda.
                </p>
            </div>
        </header>

        <!-- Sticky Filter Bar -->
        <div class="glass-dark sticky top-[60px] z-40 border-b border-primary-container/20 py-4 transition-all duration-300">
            <div class="mx-auto max-w-7xl px-4 md:px-16">
                <!-- Mobile Filter Header / Toggle -->
                <div class="flex items-center justify-between md:hidden">
                    <button
                        @click="showMobileFilters = !showMobileFilters"
                        class="flex items-center gap-2 rounded-lg border border-[#ac2471]/30 px-4 py-2 text-sm font-semibold text-[#ac2471] bg-white/50"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 6h16M4 12h16M4 18h7"/>
                        </svg>
                        {{ showMobileFilters ? 'Sembunyikan Filter' : 'Tampilkan Filter' }}
                    </button>

                    <span class="text-on-surface-variant text-sm font-medium">
                        {{ filteredCakes.length }} Kue ditemukan
                    </span>
                </div>

                <!-- Filters Content (always visible on desktop, toggleable on mobile) -->
                <div
                    :class="[
                        'mt-4 md:mt-0 flex-col gap-6 md:flex md:flex-row md:items-center md:justify-between',
                        showMobileFilters ? 'flex' : 'hidden'
                    ]"
                >
                    <!-- Left: Category Chips -->
                    <div class="flex-1">
                        <span class="label-uppercase text-on-surface-variant mb-2 block md:hidden">Kategori</span>
                        <div class="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0 md:pb-0">
                            <button
                                v-for="cat in categories"
                                :key="cat.value"
                                @click="selectedCategory = cat.value"
                                :class="[
                                    'rounded-full px-5 py-2 text-sm font-medium border whitespace-nowrap transition-all duration-200 cursor-pointer',
                                    selectedCategory === cat.value
                                        ? 'bg-gradient-to-r from-[#ac2471] to-[#8b008b] text-white border-transparent shadow-sm'
                                        : 'border-outline-variant text-on-surface-variant bg-transparent hover:border-primary-container hover:text-primary'
                                ]"
                            >
                                {{ cat.label }}
                            </button>
                        </div>
                    </div>

                    <!-- Right: Price Range & Action Buttons -->
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-center md:gap-8 min-w-[280px]">
                        <!-- Price Slider -->
                        <div class="flex-1">
                            <div class="mb-2 flex items-center justify-between gap-4">
                                <span class="label-uppercase text-on-surface-variant">Range Harga</span>
                                <span class="text-xs font-bold text-[#ac2471]">
                                    {{ formatRupiah(minPrice) }} - {{ formatRupiah(maxPrice) }}
                                </span>
                            </div>

                            <div class="dual-slider relative h-6 w-full flex items-center">
                                <!-- Base line -->
                                <div class="relative w-full h-1.5 bg-[#ebe0df] rounded-full">
                                    <!-- Filled range indicator -->
                                    <div
                                        class="absolute h-full rounded-full bg-gradient-to-r from-[#ac2471] to-[#d4af37]"
                                        :style="{ left: minPercent + '%', right: (100 - maxPercent) + '%' }"
                                    ></div>
                                    <!-- Multi-range inputs -->
                                    <input
                                        type="range"
                                        min="0"
                                        :max="maxRangeLimit"
                                        step="50000"
                                        v-model.number="minPrice"
                                        class="absolute pointer-events-none appearance-none bg-transparent w-full h-1.5 top-0 left-0 outline-none cursor-pointer"
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        :max="maxRangeLimit"
                                        step="50000"
                                        v-model.number="maxPrice"
                                        class="absolute pointer-events-none appearance-none bg-transparent w-full h-1.5 top-0 left-0 outline-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Reset Button -->
                        <div class="flex items-center gap-4 justify-between sm:justify-start">
                            <button
                                v-if="hasActiveFilters"
                                @click="resetFilters"
                                class="flex items-center gap-1.5 text-sm font-semibold text-[#ac2471] hover:underline cursor-pointer"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                                Atur Ulang
                            </button>

                            <span class="hidden md:inline text-on-surface-variant text-sm font-semibold whitespace-nowrap">
                                {{ filteredCakes.length }} Kue ditemukan
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Gallery Grid -->
        <main class="mx-auto max-w-7xl px-4 md:px-16 py-12 md:py-16">
            <!-- Stagger entry container -->
            <TransitionGroup
                tag="div"
                name="stagger-grid"
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                v-if="filteredCakes.length > 0"
            >
                <GalleryCakeCard
                    v-for="cake in filteredCakes"
                    :key="cake.id"
                    :cake="cake"
                    class="stagger-item"
                />
            </TransitionGroup>

            <!-- Empty State -->
            <div
                v-else
                class="flex flex-col items-center justify-center text-center py-20 px-4 bg-white/40 rounded-[24px] border border-outline-variant/30"
            >
                <div class="bg-surface-container rounded-full p-6 mb-6">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ac2471" stroke-width="1.5">
                        <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm1-13h-2v6h2zm0 8h-2v2h2z"/>
                    </svg>
                </div>
                <h3 class="font-display text-xl font-bold text-on-surface mb-2">Kue Tidak Ditemukan</h3>
                <p class="text-on-surface-variant font-body max-w-[448px] text-sm leading-relaxed mb-6">
                    Tidak ada koleksi kue yang sesuai dengan filter kategori atau rentang harga yang dipilih. Cobalah untuk mereset filter atau menyesuaikan rentang pencarian Anda.
                </p>
                <button
                    @click="resetFilters"
                    class="gradient-button text-on-primary rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:scale-105"
                >
                    Lihat Semua Koleksi
                </button>
            </div>
        </main>
    </MainLayout>
</template>

<style scoped>
/* Dual Slider thumb overlays styling */
.dual-slider input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
}

.dual-slider input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    border: 2.5px solid #ac2471;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    pointer-events: auto;
    transition: transform 0.1s ease;
}

.dual-slider input[type='range']::-webkit-slider-thumb:hover {
    transform: scale(1.15);
}

.dual-slider input[type='range']::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    border: 2.5px solid #ac2471;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    pointer-events: auto;
    transition: transform 0.1s ease;
}

.dual-slider input[type='range']::-moz-range-thumb:hover {
    transform: scale(1.15);
}

/* Staggered load animation */
.stagger-grid-enter-active {
    transition: all 0.5s ease;
}

.stagger-grid-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.stagger-item {
    transition: all 0.4s ease;
}

/* Hero Animations */
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes pulse-slow {
    0%, 100% {
        opacity: 0.8;
        transform: scale(1);
    }
    50% {
        opacity: 0.4;
        transform: scale(1.05);
    }
}
.animate-fade-in-up {
    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.animate-pulse-slow {
    animation: pulse-slow 8s ease-in-out infinite;
}
</style>
