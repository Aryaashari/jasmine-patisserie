<script setup lang="ts">
import CelebrationCard from './CelebrationCard.vue';
import SectionHeading from './SectionHeading.vue';

const celebrations = [
    {
        image: '/images/celeb-birthday.png',
        title: 'Ulang Tahun',
        description: 'Desain menawan untuk segala usia',
        size: 'wide' as const,
    },
    {
        image: '/images/celeb-custom.png',
        title: 'Kue Kustom',
        description: 'Kreasi eksklusif khusus untukmu',
        size: 'square' as const,
    },
    {
        image: '/images/celeb-cupcakes.png',
        title: 'Cupcake',
        description: 'Sajian mini, cita rasa maksimal',
        size: 'square' as const,
    },
    {
        image: '/images/celeb-dessert-box.png',
        title: 'Dessert Box',
        description: 'Pengalaman rasa yang dikurasi',
        size: 'square' as const,
    },
    {
        image: '/images/celeb-wedding.png',
        title: 'Pernikahan',
        description: 'Kesan megah untuk hari besarmu',
        size: 'tall' as const,
    },
];
</script>

<template>
    <section id="celebrations" class="bg-surface py-16 md:py-24">
        <div class="mx-auto max-w-7xl px-4 md:px-16">
            <SectionHeading
                title="Belanja Berdasarkan Perayaan"
                align="center"
            />

            <!-- Asymmetric Grid -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
                <!-- Birthdays: wide (span 2 cols) -->
                <CelebrationCard
                    class="md:col-span-2 md:row-span-1"
                    :image="celebrations[0].image"
                    :title="celebrations[0].title"
                    :description="celebrations[0].description"
                    :size="celebrations[0].size"
                />

                <!-- Custom Cake (col 4, row 1) -->
                <CelebrationCard
                    class="md:col-start-4 md:row-start-1 md:col-span-1 md:row-span-1 hidden md:block"
                    :image="celebrations[1].image"
                    :title="celebrations[1].title"
                    :description="celebrations[1].description"
                    :size="celebrations[1].size"
                />

                <!-- Cupcakes (col 1, row 2) -->
                <CelebrationCard
                    class="md:col-start-1 md:row-start-2 md:col-span-1 md:row-span-1"
                    :image="celebrations[2].image"
                    :title="celebrations[2].title"
                    :description="celebrations[2].description"
                    :size="celebrations[2].size"
                />

                <!-- Dessert Box (col 2, row 2) -->
                <CelebrationCard
                    class="md:col-start-2 md:row-start-2 md:col-span-1 md:row-span-1"
                    :image="celebrations[3].image"
                    :title="celebrations[3].title"
                    :description="celebrations[3].description"
                    :size="celebrations[3].size"
                />

                <!-- Weddings: tall (col 3, row 1 & 2) -->
                <CelebrationCard
                    class="md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-2 hidden md:block"
                    :image="celebrations[4].image"
                    :title="celebrations[4].title"
                    :description="celebrations[4].description"
                    :size="celebrations[4].size"
                />
            </div>

            <!-- Extra cards visible only on mobile (stacked below) -->
            <div class="mt-4 grid grid-cols-2 gap-4 md:hidden">
                <CelebrationCard
                    :image="celebrations[1].image"
                    :title="celebrations[1].title"
                    :description="celebrations[1].description"
                    :size="celebrations[1].size"
                />
                <CelebrationCard
                    :image="celebrations[4].image"
                    :title="celebrations[4].title"
                    :description="celebrations[4].description"
                    :size="celebrations[4].size"
                />
            </div>
        </div>
    </section>
</template>
