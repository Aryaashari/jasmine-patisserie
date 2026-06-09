<script setup lang="ts">
import CustomDesignSection from '@/components/CustomDesignSection.vue';
import HeroSection from '@/components/HeroSection.vue';
import SignatureSection from '@/components/SignatureSection.vue';
import CelebrationSection from '@/components/CelebrationSection.vue';
import TestimonialSection from '@/components/TestimonialSection.vue';
import MainLayout from '@/layouts/MainLayout.vue';

defineProps<{
    featuredCakes: {
        name: string;
        image: string;
        price: string;
        tags: string[];
        slug: string;
    }[];
    categories: {
        id: number;
        name: string;
        slug: string;
        description: string;
        image: string;
    }[];
    testimonials: {
        id: number;
        name: string;
        message: string;
        rating: number;
        image: string;
    }[];
}>();
</script>

<template>
    <MainLayout>
        <HeroSection />
        <SignatureSection :cakes="featuredCakes" />
        <CelebrationSection :categories="categories" />
        <TestimonialSection :testimonials="testimonials" />
        <CustomDesignSection />
    </MainLayout>
</template>
