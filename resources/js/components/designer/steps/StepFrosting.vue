<script setup lang="ts">
import ColorPalette from '../ColorPalette.vue';

defineProps<{
    style: string;
    color: string;
}>();

const emit = defineEmits<{
    (e: 'update:style', value: string): void;
    (e: 'update:color', value: string): void;
}>();

const styles = [
    { value: 'smooth_buttercream', label: 'Buttercream Halus', desc: 'Klasik, semi-matte, lembut' },
    { value: 'whipped_cream', label: 'Whipped Cream', desc: 'Tekstur bergelombang ringan' },
    { value: 'korean_minimalist', label: 'Minimalis Korea', desc: 'Ultra halus, satin mengkilap' },
    { value: 'vintage_lambeth', label: 'Vintage Lambeth', desc: 'Piping renda klasik di pinggiran atas' },
    { value: 'drip_chocolate', label: 'Cokelat Meleleh', desc: 'Efek tetesan cokelat yang dramatis' },
];
</script>

<template>
    <div class="space-y-6">
        <div>
            <h2 class="font-display text-on-surface text-2xl font-bold">Frosting & Warna</h2>
            <p class="text-on-surface-variant text-sm">Pilih tekstur dan warna lapisan luar kue Anda.</p>
        </div>

        <!-- Frosting Style -->
        <div class="space-y-3">
            <h3 class="font-body text-on-surface text-sm font-semibold uppercase tracking-wider">Gaya Frosting</h3>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                    v-for="s in styles"
                    :key="s.value"
                    @click="emit('update:style', s.value)"
                    class="flex cursor-pointer flex-col items-start gap-1 rounded-xl border-2 p-3 text-left transition-all duration-200"
                    :class="[
                        style === s.value
                            ? 'border-transparent bg-primary-container/10 shadow-md ring-2 ring-[#ac2471] ring-offset-1'
                            : 'border-outline-variant hover:border-[#d4af37]/40 hover:bg-surface-variant'
                    ]"
                >
                    <span class="font-body text-on-surface text-sm font-bold" :class="{ 'text-[#ac2471]': style === s.value }">
                        {{ s.label }}
                    </span>
                    <span class="text-on-surface-variant text-xs">{{ s.desc }}</span>
                </button>
            </div>
        </div>

        <hr class="border-outline-variant/30" />

        <!-- Frosting Color -->
        <div class="space-y-3">
            <h3 class="font-body text-on-surface text-sm font-semibold uppercase tracking-wider">Warna Dasar</h3>
            <ColorPalette 
                :modelValue="color"
                @update:modelValue="(val) => emit('update:color', val)"
            />
        </div>
    </div>
</template>
