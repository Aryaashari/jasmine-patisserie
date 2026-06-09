<script setup lang="ts">
import CelebrationCard from './CelebrationCard.vue';
import SectionHeading from './SectionHeading.vue';

defineProps<{
    categories: {
        id: number;
        name: string;
        slug: string;
        description: string;
        image: string;
    }[]
}>();
</script>

<template>
    <section id="celebrations" class="bg-surface py-16 md:py-24">
        <div class="mx-auto max-w-7xl px-4 md:px-16">
            <SectionHeading
                title="Kategori Pilihan"
                align="center"
            />

            <!-- Standard Grid -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 mt-8">
                <CelebrationCard
                    v-for="category in categories"
                    :key="category.id"
                    :image="category.image"
                    :title="category.name"
                    :description="category.description"
                    size="square"
                />
            </div>
        </div>
    </section>
</template>
