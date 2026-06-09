<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <section id="custom-design" class="bg-surface-container-high py-16 md:py-24">
        <div class="mx-auto max-w-3xl px-4 text-center md:px-16">
            <!-- Headline -->
            <h2 class="font-display text-on-surface mb-5 text-[28px] leading-[34px] font-bold tracking-tight md:text-[36px] md:leading-[44px]">
                Punya Desain Kue<br>Impian?
            </h2>

            <!-- Body Text -->
            <p class="text-on-surface-variant font-body mx-auto mb-10 w-full text-base leading-relaxed md:text-lg">
                Tim pastry chef ahli kami siap mewujudkan imajinasi Anda. Dari profil
                rasa kustom hingga desain yang menakjubkan.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                    href="/custom-designer"
                    class="gradient-button inline-flex w-full items-center justify-center rounded-lg border border-[#d4af37] px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg sm:w-auto"
                >
                    Mulai Desain<br class="sm:hidden"> Anda
                </Link>
                <Link
                    href="/gallery"
                    class="glass inline-flex w-full items-center justify-center rounded-lg border-[#ac2471]/30 px-8 py-4 text-sm font-semibold text-[#ac2471] transition-all duration-300 hover:scale-105 hover:bg-white/90 sm:w-auto"
                >
                    Lihat Karya<br class="sm:hidden"> Kami
                </Link>
            </div>
        </div>
    </section>
</template>
