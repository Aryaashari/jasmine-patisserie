<script setup lang="ts">
defineProps<{
    modelValue: number;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
}>();

const shapes = [
    { id: 0, label: 'Bulat 1 Tingkat', icon: '🎂' },
    { id: 1, label: 'Bulat 2 Tingkat', icon: '🍰' },
    { id: 2, label: 'Bulat 3 Tingkat', icon: '🏰' },
    { id: 3, label: 'Kotak 1 Tingkat', icon: '🔲' },
    { id: 4, label: 'Kotak 2 Tingkat', icon: '🍱' },
    { id: 5, label: 'Bentuk Hati', icon: '💖' },
    { id: 6, label: 'Bento Mini', icon: '🥡' },
    { id: 7, label: 'Kue Lembaran', icon: '📜' },
];
</script>

<template>
    <div class="space-y-4">
        <div>
            <h2 class="font-display text-on-surface text-2xl font-bold">Bentuk Dasar</h2>
            <p class="text-on-surface-variant text-sm">Pilih pondasi untuk mahakarya kue Anda.</p>
        </div>

        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
            <button
                v-for="shape in shapes"
                :key="shape.id"
                @click="emit('update:modelValue', shape.id)"
                class="flex flex-col items-center gap-3 rounded-xl border-2 p-4 text-center transition-all duration-200"
                :class="[
                    modelValue === shape.id
                        ? 'border-transparent bg-primary-container/10 shadow-lg ring-2 ring-[#ac2471] ring-offset-2'
                        : 'border-outline-variant hover:-translate-y-1 hover:border-[#d4af37]/40 hover:shadow-md'
                ]"
            >
                <span class="text-4xl" aria-hidden="true">{{ shape.icon }}</span>
                <span class="font-body text-on-surface text-sm font-semibold" :class="{ 'text-[#ac2471]': modelValue === shape.id }">
                    {{ shape.label }}
                </span>
            </button>
        </div>
    </div>
</template>
