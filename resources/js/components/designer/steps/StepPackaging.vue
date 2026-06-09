<script setup lang="ts">
defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const options = [
    { value: 'none', label: 'Tanpa Kemasan', desc: 'Kue ditampilkan apa adanya', icon: '🎂' },
    { value: 'box_base', label: 'Kotak Karton', labelSecondary: 'Alas Saja', desc: 'Alas kotak bakery putih klasik', icon: '📦' },
    { value: 'dome_cover', label: 'Dome Transparan', labelSecondary: 'Dengan Pegangan', desc: 'Tutup dome plastik yang elegan', icon: '🪩' },
];
</script>

<template>
    <div class="space-y-6">
        <div>
            <h2 class="font-display text-on-surface text-2xl font-bold">Pilihan Kemasan</h2>
            <p class="text-on-surface-variant text-sm">Pilih bagaimana kue Anda ingin dikemas.</p>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            <button
                v-for="opt in options"
                :key="opt.value"
                @click="emit('update:modelValue', opt.value)"
                class="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200"
                :class="[
                    modelValue === opt.value
                        ? 'border-transparent bg-primary-container/10 shadow-lg ring-2 ring-[#ac2471] ring-offset-2'
                        : 'border-outline-variant hover:-translate-y-1 hover:border-[#d4af37]/40 hover:shadow-md'
                ]"
            >
                <span class="text-4xl" aria-hidden="true">{{ opt.icon }}</span>
                <div class="mt-2 flex flex-col">
                    <span class="font-body text-on-surface text-sm font-bold" :class="{ 'text-[#ac2471]': modelValue === opt.value }">
                        {{ opt.label }}
                    </span>
                    <span v-if="opt.labelSecondary" class="text-on-surface-variant text-xs">{{ opt.labelSecondary }}</span>
                </div>
            </button>
        </div>
    </div>
</template>
