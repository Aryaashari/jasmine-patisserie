<script setup lang="ts">
import CustomDesignSection from '@/components/CustomDesignSection.vue';
import HeroSection from '@/components/HeroSection.vue';
import SignatureSection from '@/components/SignatureSection.vue';
import MainLayout from '@/layouts/MainLayout.vue';
</script>

<template>
    <MainLayout>
        <HeroSection />
        <SignatureSection />
        <CustomDesignSection />
    </MainLayout>
</template>
