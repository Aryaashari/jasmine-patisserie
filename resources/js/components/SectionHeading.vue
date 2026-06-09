<script setup lang="ts">
defineProps<{
    title: string;
    subtitle?: string;
    align?: 'center' | 'left';
    titleClass?: string;
}>();
</script>

<template>
    <div :class="['mb-8 md:mb-12', align === 'left' ? 'text-left' : 'text-center']">
        <h2
            :class="['font-display mb-3 text-[28px] leading-[34px] font-bold tracking-tight md:text-[32px] md:leading-[40px]', titleClass || 'text-on-surface font-semibold']"
        >
            {{ title }}
        </h2>
        <p
            v-if="subtitle"
            :class="['text-[#5c5c5c] font-body text-[16px] leading-[24px]', align === 'center' ? 'mx-auto max-w-xl' : '']"
        >
            {{ subtitle }}
        </p>
    </div>
</template>
