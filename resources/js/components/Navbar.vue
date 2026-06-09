<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';

const isMenuOpen = ref(false);

const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Galeri', href: '/gallery' },
    { label: 'Desain Kustom', href: '/custom-designer' },
];

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
    <header
        id="navbar"
        class="glass-dark fixed top-0 right-0 left-0 z-50 transition-all duration-300"
    >
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-16">
            <!-- Logo -->
            <Link href="/" class="flex items-center">
                <img src="/images/main-logo.png" alt="Jasmine Patisserie" class="h-16 md:h-20 w-auto" />
            </Link>

            <!-- Desktop Navigation -->
            <nav class="hidden items-center gap-8 md:flex">
                <Link
                    v-for="link in navLinks"
                    :key="link.label"
                    :href="link.href"
                    class="text-on-surface-variant hover:text-primary font-body text-sm font-medium transition-colors duration-200"
                >
                    {{ link.label }}
                </Link>
            </nav>

            <!-- Desktop CTA -->
            <Link
                href="/#order"
                class="gradient-button text-on-primary hidden rounded-lg border border-[#d4af37] px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg md:inline-flex"
            >
                Pesan Sekarang
            </Link>

            <!-- Mobile Hamburger -->
            <button
                class="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
                @click="toggleMenu"
                :aria-label="isMenuOpen ? 'Tutup menu' : 'Buka menu'"
            >
                <span
                    class="bg-on-surface h-0.5 w-6 rounded-full transition-all duration-300"
                    :class="isMenuOpen ? 'translate-y-2 rotate-45' : ''"
                ></span>
                <span
                    class="bg-on-surface h-0.5 w-6 rounded-full transition-all duration-300"
                    :class="isMenuOpen ? 'opacity-0' : ''"
                ></span>
                <span
                    class="bg-on-surface h-0.5 w-6 rounded-full transition-all duration-300"
                    :class="isMenuOpen ? '-translate-y-2 -rotate-45' : ''"
                ></span>
            </button>
        </div>

        <!-- Mobile Menu Overlay -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4"
        >
            <div
                v-if="isMenuOpen"
                class="glass absolute right-0 top-full left-0 border-t border-[#d4af37]/20 px-4 pb-6 pt-4 md:hidden"
            >
                <nav class="flex flex-col gap-4">
                    <Link
                        v-for="link in navLinks"
                        :key="link.label"
                        :href="link.href"
                        class="text-on-surface font-body text-base font-medium transition-colors duration-200 hover:text-[#ac2471]"
                        @click="isMenuOpen = false"
                    >
                        {{ link.label }}
                    </Link>
                    <Link
                        href="/#order"
                        class="gradient-button mt-2 inline-block rounded-lg border border-[#d4af37] px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300"
                        @click="isMenuOpen = false"
                    >
                        Pesan Sekarang
                    </Link>
                </nav>
            </div>
        </Transition>
    </header>
</template>
