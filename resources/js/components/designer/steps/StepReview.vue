<script setup lang="ts">
defineProps<{
    baseShape: number;
    frostingStyle: string;
    packaging: string;
}>();

const emit = defineEmits<{
    (e: 'export-png'): void;
    (e: 'export-glb'): void;
}>();

const shapeMap: Record<number, string> = {
    0: 'Bulat 1 Tingkat', 1: 'Bulat 2 Tingkat', 2: 'Bulat 3 Tingkat',
    3: 'Kotak 1 Tingkat', 4: 'Kotak 2 Tingkat', 5: 'Bentuk Hati',
    6: 'Bento Mini', 7: 'Kue Lembaran'
};

const styleMap: Record<string, string> = {
    'smooth_buttercream': 'Buttercream Halus',
    'whipped_cream': 'Whipped Cream',
    'korean_minimalist': 'Minimalis Korea',
    'vintage_lambeth': 'Vintage Lambeth',
    'drip_chocolate': 'Cokelat Meleleh'
};

const packMap: Record<string, string> = {
    'none': 'Tanpa Kemasan',
    'box_base': 'Alas Kotak Karton',
    'dome_cover': 'Tutup Dome Transparan'
};
</script>

<template>
    <div class="space-y-6">
        <div>
            <h2 class="font-display text-on-surface text-2xl font-bold">Tinjauan & Ekspor</h2>
            <p class="text-on-surface-variant text-sm">Tinjau mahakarya Anda dan simpan.</p>
        </div>

        <div class="bg-surface-variant rounded-xl p-5 shadow-inner">
            <h3 class="font-body text-on-surface mb-3 text-xs font-semibold uppercase tracking-wider">Ringkasan Desain</h3>
            
            <ul class="space-y-3 text-sm">
                <li class="flex items-start justify-between border-b border-outline-variant/20 pb-2">
                    <span class="text-on-surface-variant font-medium">Bentuk Dasar</span>
                    <span class="text-on-surface font-semibold text-right">{{ shapeMap[baseShape] }}</span>
                </li>
                <li class="flex items-start justify-between border-b border-outline-variant/20 pb-2">
                    <span class="text-on-surface-variant font-medium">Gaya Frosting</span>
                    <span class="text-on-surface font-semibold text-right">{{ styleMap[frostingStyle] }}</span>
                </li>
                <li class="flex items-start justify-between border-b border-outline-variant/20 pb-2">
                    <span class="text-on-surface-variant font-medium">Kemasan</span>
                    <span class="text-on-surface font-semibold text-right">{{ packMap[packaging] }}</span>
                </li>
                <li class="flex items-start justify-between pt-1">
                    <span class="text-on-surface-variant font-medium">Dekorasi</span>
                    <span class="text-[#ac2471] font-semibold text-right">Kustom</span>
                </li>
            </ul>
        </div>

        <div class="space-y-3 pt-4">
            <button 
                @click="emit('export-png')"
                class="gradient-button w-full cursor-pointer rounded-lg px-6 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
            >
                📸 Ambil Screenshot (PNG)
            </button>
            <button 
                @click="emit('export-glb')"
                class="glass hover:bg-surface border-outline-variant/50 w-full cursor-pointer rounded-lg border px-6 py-3 font-semibold text-[#ac2471] transition-all duration-300 hover:shadow-sm"
            >
                📥 Ekspor Model 3D (GLB)
            </button>
            
            <button 
                class="bg-[#25D366] hover:bg-[#128C7E] w-full cursor-pointer rounded-lg px-6 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md mt-4"
            >
                🛒 Pesan Kue Kustom Ini
            </button>
        </div>
    </div>
</template>
