<script setup lang="ts">
import { computed } from 'vue';
import ColorPalette from '../ColorPalette.vue';
import DecoItem from '../DecoItem.vue';

const props = defineProps<{
    mode: 'place_deco' | 'transform_translate' | 'transform_rotate' | 'draw_piping';
    selectedDeco: string;
    decoColor: string;
    decoScale: number;
    pipingThickness: number;
    customText: string;
}>();

const emit = defineEmits<{
    (e: 'update:mode', value: 'place_deco' | 'transform_translate' | 'transform_rotate' | 'draw_piping'): void;
    (e: 'update:selectedDeco', value: string): void;
    (e: 'update:decoColor', value: string): void;
    (e: 'update:decoScale', value: number): void;
    (e: 'update:pipingThickness', value: number): void;
    (e: 'update:customText', value: string): void;
    (e: 'undo'): void;
    (e: 'clear'): void;
}>();

const decorationItems = [
    { value: 'none', label: 'Tidak Ada', icon: '🚫', category: 'General' },
    { value: 'rose', label: 'Mawar', icon: '🌹', category: 'Decorations' },
    { value: 'leaf', label: 'Daun', icon: '🍃', category: 'Decorations' },
    { value: 'heart', label: 'Hati', icon: '❤️', category: 'Decorations' },
    { value: 'mini_bow', label: 'Pita Mini', icon: '🎀', category: 'Decorations' },
    { value: 'choco_shard', label: 'Cokelat', icon: '🍫', category: 'Decorations' },
    { value: 'candle_1', label: 'Lilin (1)', icon: '🕯️', category: 'Toppers' },
    { value: 'candle_3', label: 'Lilin (3)', icon: '🕯️', category: 'Toppers' },
    { value: 'love_text', label: '"LOVE"', icon: '💕', category: 'Toppers' },
    { value: 'custom_text', label: 'Teks 3D', icon: '✏️', category: 'Custom' },
];

const helpText = computed(() => {
    switch (props.mode) {
        case 'place_deco': return "Pilih item, lalu klik di mana saja pada kue untuk menempatkannya!";
        case 'transform_translate': return "Klik pada dekorasi untuk menggesernya.";
        case 'transform_rotate': return "Klik pada dekorasi untuk memutarnya.";
        case 'draw_piping': return "Klik dan seret pada kue untuk menggambar frosting!";
        default: return "";
    }
});
</script>

<template>
    <div class="space-y-6">
        <div>
            <h2 class="font-display text-on-surface text-2xl font-bold">Dekorasi</h2>
            <p class="text-on-surface-variant text-sm">Tambahkan topping, lilin, dan pesan kustom.</p>
        </div>

        <!-- Interaction Mode Tabs -->
        <div class="bg-surface-variant flex rounded-xl p-1">
            <button 
                @click="emit('update:mode', 'place_deco')"
                class="flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200"
                :class="mode === 'place_deco' ? 'bg-white shadow text-[#ac2471]' : 'text-on-surface-variant hover:text-on-surface'"
            >🎂 Letakkan</button>
            <button 
                @click="emit('update:mode', 'transform_translate')"
                class="flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200"
                :class="mode === 'transform_translate' ? 'bg-white shadow text-[#ac2471]' : 'text-on-surface-variant hover:text-on-surface'"
            >↔️ Geser</button>
            <button 
                @click="emit('update:mode', 'transform_rotate')"
                class="flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200"
                :class="mode === 'transform_rotate' ? 'bg-white shadow text-[#ac2471]' : 'text-on-surface-variant hover:text-on-surface'"
            >🔄 Putar</button>
            <button 
                @click="emit('update:mode', 'draw_piping')"
                class="flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200"
                :class="mode === 'draw_piping' ? 'bg-white shadow text-[#ac2471]' : 'text-on-surface-variant hover:text-on-surface'"
            >✍️ Gambar</button>
        </div>

        <div class="bg-secondary/10 border-secondary-container/50 rounded-lg border-l-4 p-3 text-sm font-medium text-[#ac2471]">
            {{ helpText }}
        </div>

        <!-- Place Deco Panel -->
        <div v-if="mode === 'place_deco'" class="space-y-4">
            <div class="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5">
                <DecoItem
                    v-for="item in decorationItems"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :icon="item.icon"
                    :isSelected="selectedDeco === item.value"
                    @select="(val) => emit('update:selectedDeco', val)"
                />
            </div>

            <div v-if="selectedDeco === 'custom_text'" class="mt-2 animate-in fade-in slide-in-from-top-2">
                <label class="font-body text-on-surface text-xs font-semibold uppercase tracking-wider">Masukkan Teks Kustom</label>
                <input 
                    type="text" 
                    :value="customText"
                    @input="(e) => emit('update:customText', (e.target as HTMLInputElement).value)"
                    placeholder="Masukkan teks (cth: Selamat Ultah)"
                    class="border-outline-variant focus:border-primary focus:ring-primary/20 mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none"
                >
            </div>
        </div>

        <!-- Piping Size Panel -->
        <div v-if="mode === 'draw_piping'" class="space-y-2">
            <div class="flex items-center justify-between">
                <label class="font-body text-on-surface text-xs font-semibold uppercase tracking-wider">Ketebalan Piping</label>
                <span class="text-[#ac2471] text-xs font-bold">{{ Math.round(pipingThickness * 1000) }}mm</span>
            </div>
            <input 
                type="range" 
                min="0.005" max="0.04" step="0.005" 
                :value="pipingThickness"
                @input="(e) => emit('update:pipingThickness', parseFloat((e.target as HTMLInputElement).value))"
                class="accent-primary w-full"
            >
        </div>

        <hr class="border-outline-variant/30" />

        <!-- Shared Size and Color Options -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div class="space-y-3">
                <h3 class="font-body text-on-surface text-sm font-semibold uppercase tracking-wider">Warna Item</h3>
                <ColorPalette 
                    :modelValue="decoColor"
                    @update:modelValue="(val) => emit('update:decoColor', val)"
                />
            </div>
            <div class="space-y-2">
                <div class="flex items-center justify-between">
                    <h3 class="font-body text-on-surface text-sm font-semibold uppercase tracking-wider">Ukuran Item</h3>
                    <span class="text-xs font-bold text-[#ac2471]">{{ decoScale.toFixed(1) }}x</span>
                </div>
                <input 
                    type="range" 
                    min="0.5" max="2.0" step="0.1" 
                    :value="decoScale"
                    @input="(e) => emit('update:decoScale', parseFloat((e.target as HTMLInputElement).value))"
                    class="accent-primary w-full"
                >
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4">
            <button 
                @click="emit('undo')"
                class="glass hover:bg-surface border-outline-variant/50 flex-1 rounded-lg border py-2 text-sm font-semibold text-[#d4af37] transition-all hover:shadow-sm"
            >
                ↩ Batalkan
            </button>
            <button 
                @click="emit('clear')"
                class="bg-error/10 hover:bg-error/20 text-error flex-1 rounded-lg py-2 text-sm font-semibold transition-all"
            >
                🗑️ Hapus Semua
            </button>
        </div>
    </div>
</template>
