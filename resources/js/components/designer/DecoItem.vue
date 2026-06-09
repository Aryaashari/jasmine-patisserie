<script setup lang="ts">
defineProps<{
    label: string;
    value: string;
    icon: string;
    isSelected: boolean;
}>();

const emit = defineEmits<{
    (e: 'select', value: string): void;
}>();
</script>

<template>
    <button
        @click="emit('select', value)"
        class="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 text-center transition-all duration-200"
        :class="[
            isSelected
                ? 'border-transparent bg-primary-container/20 shadow-md ring-2 ring-[#ac2471] ring-offset-1'
                : 'border-outline-variant hover:border-[#d4af37]/50 hover:bg-surface-variant hover:shadow-sm'
        ]"
    >
        <span class="text-2xl" aria-hidden="true">{{ icon }}</span>
        <span class="font-body text-on-surface text-xs font-semibold" :class="{ 'text-[#ac2471]': isSelected }">
            {{ label }}
        </span>
    </button>
</template>
