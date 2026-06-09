<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import GalleryCakeCard from '@/components/GalleryCakeCard.vue';
import MainLayout from '@/layouts/MainLayout.vue';

const props = defineProps<{
    cake: any;
    relatedCakes: any[];
}>();

const cake = computed(() => props.cake);
const relatedCakes = computed(() => props.relatedCakes || []);

// Construct WhatsApp order link
const whatsappLink = computed(() => {
    if (!cake.value) {
        return '#';
    }

    const phoneNumber = '628123456789'; // Dummy premium WA number
    const text = encodeURIComponent(
        `Halo Jasmine Patisserie, saya ingin memesan kue berikut:\n\n*Nama Kue:* ${cake.value.name}\n*Harga:* ${cake.value.priceFormatted}\n*Ukuran/Porsi:* ${cake.value.servings}\n\nApakah kue ini tersedia untuk dipesan? Terima kasih!`
    );

    return `https://wa.me/${phoneNumber}?text=${text}`;
});
</script>

<template>
    <div v-if="!cake">
        <Head title="Kue Tidak Ditemukan - Jasmine Patisserie" />
        <MainLayout>
            <div class="mx-auto max-w-7xl px-4 py-32 text-center md:px-16">
                <div class="bg-surface-container rounded-full p-6 mx-auto w-fit mb-6">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ba1a1a" stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <h1 class="font-display text-2xl md:text-3xl font-bold text-on-surface mb-4">Halaman Tidak Ditemukan</h1>
                <p class="text-on-surface-variant font-body mb-8 max-w-[448px] mx-auto">
                    Maaf, koleksi kue yang Anda cari tidak tersedia atau telah dihapus dari galeri kami.
                </p>
                <Link
                    href="/gallery"
                    class="gradient-button text-on-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold shadow-sm transition-all duration-300 hover:scale-105"
                >
                    Kembali ke Galeri
                </Link>
            </div>
        </MainLayout>
    </div>

    <div v-else>
        <Head :title="`${cake.name} — Detail Kue Premium`" />

        <MainLayout>
            <!-- Breadcrumb Navigation -->
            <nav class="bg-surface pt-24 md:pt-28 pb-4">
                <div class="mx-auto max-w-7xl px-4 md:px-16">
                    <ol class="flex flex-wrap items-center gap-1.5 text-sm font-medium text-on-surface-variant font-body">
                        <li>
                            <Link href="/" class="hover:text-[#ac2471] transition-colors duration-200">Beranda</Link>
                        </li>
                        <li class="text-[#outline] font-normal">/</li>
                        <li>
                            <Link href="/gallery" class="hover:text-[#ac2471] transition-colors duration-200">Galeri</Link>
                        </li>
                        <li class="text-[#outline] font-normal">/</li>
                        <li class="text-on-surface font-semibold truncate">{{ cake.name }}</li>
                    </ol>
                </div>
            </nav>

            <!-- Product Main Section -->
            <main class="bg-surface py-8 pb-16 md:pb-24">
                <div class="mx-auto max-w-7xl px-4 md:px-16">
                    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                        <!-- Left Column: Product Image -->
                        <div class="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-card border border-primary-container/10 bg-white group">
                            <img
                                :src="cake.image"
                                :alt="cake.name"
                                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            >
                        </div>

                        <!-- Right Column: Product Info -->
                        <div class="flex flex-col justify-start">
                            <!-- Category Badge -->
                            <div>
                                <span
                                    :class="[
                                        'rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider',
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

                            <!-- Title & Price -->
                            <h1 class="font-display text-[32px] font-bold text-on-surface leading-tight mt-4 md:text-[40px]">
                                {{ cake.name }}
                            </h1>
                            <div class="text-[28px] font-bold text-[#ac2471] mt-2 md:text-[32px]">
                                {{ cake.priceFormatted }}
                            </div>

                            <!-- Long Description -->
                            <p class="text-on-surface-variant font-body text-base leading-relaxed mt-6 whitespace-pre-wrap">
                                {{ cake.longDescription }}
                            </p>





                            <!-- Call to Actions -->
                            <div class="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a
                                    :href="whatsappLink"
                                    target="_blank"
                                    class="gradient-button text-on-primary inline-flex items-center justify-center gap-2.5 rounded-full border border-transparent px-8 py-4 text-base font-semibold shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg flex-1 sm:flex-initial"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="shrink-0">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    Pesan via WhatsApp
                                </a>
                                <Link
                                    href="/gallery"
                                    class="glass inline-flex items-center justify-center gap-2 rounded-full border border-[#ac2471]/50 bg-white/50 px-8 py-4 text-base font-semibold text-[#ac2471] transition-all duration-300 hover:scale-105 hover:bg-white/90 text-center"
                                >
                                    Kembali ke Galeri
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Related Cakes Section -->
            <section class="bg-surface-container py-16 md:py-24 border-t border-primary-container/10" v-if="relatedCakes.length > 0">
                <div class="mx-auto max-w-7xl px-4 md:px-16">
                    <h2 class="font-display text-center text-[28px] font-bold text-on-surface mb-10 md:text-[32px]">
                        Rekomendasi Kue Lainnya
                    </h2>

                    <!-- Grid Layout for related cakes -->
                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <GalleryCakeCard
                            v-for="relatedCake in relatedCakes"
                            :key="relatedCake.id"
                            :cake="relatedCake"
                        />
                    </div>
                </div>
            </section>
        </MainLayout>
    </div>
</template>
