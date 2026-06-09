<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

const quickLinks = [
    { label: 'Galeri', href: '/gallery' },
    { label: 'Desain Kustom', href: '/#custom-design' },
    { label: 'Tentang Kami', href: '/#story' },
    { label: 'FAQ', href: '/#faq' },
];

const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/jasminepatisserie_/' },
    { label: 'Kontak WhatsApp', href: 'https://wa.me/6281511196225' },
    { label: 'Kebijakan Privasi', href: '#' },
];
</script>

<template>
    <footer class="bg-inverse-surface text-inverse-on-surface">
        <div class="mx-auto max-w-7xl px-4 pt-16 pb-8 md:px-16">
            <!-- Footer Grid -->
            <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                <!-- Brand -->
                <div class="lg:col-span-1">
                    <img src="/images/main-logo.png" alt="Jasmine Patisserie" class="h-20 w-auto mb-6" />
                    <p class="text-inverse-on-surface/70 font-body text-sm leading-relaxed">
                        Menciptakan mahakarya yang bisa dinikmati dengan bahan-bahan premium dan passion artisan sejak 2018. Setiap perayaan layak mendapatkan yang terbaik.
                    </p>
                </div>

                <!-- Quick Links -->
                <div>
                    <h4 class="label-uppercase text-primary-container mb-4">Tautan Cepat</h4>
                    <ul class="space-y-2.5">
                        <li v-for="link in quickLinks" :key="link.label">
                            <Link
                                :href="link.href"
                                class="text-inverse-on-surface/70 font-body text-sm transition-colors duration-200 hover:text-[#d4af37]"
                            >
                                {{ link.label }}
                            </Link>
                        </li>
                    </ul>
                </div>

                <!-- Social & Legal -->
                <div>
                    <h4 class="label-uppercase text-primary-container mb-4">Hubungi Kami</h4>
                    <ul class="space-y-2.5">
                        <li v-for="link in socialLinks" :key="link.label">
                            <a
                                :href="link.href"
                                class="text-inverse-on-surface/70 font-body text-sm transition-colors duration-200 hover:text-[#d4af37]"
                            >
                                {{ link.label }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="label-uppercase text-primary-container mb-4">Kunjungi Kami</h4>
                    <div class="text-inverse-on-surface/70 font-body space-y-2.5 text-sm">
                        <a 
                            href="https://www.google.com/maps/place/Jasmine+Patisserie/@-6.031659,106.0665247,17z/data=!4m6!3m5!1s0x2e418d552b1b5f5f:0x144825023187868!8m2!3d-6.0316239!4d106.0664852!16s%2Fg%2F11s2_zzpcr?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="block transition-colors duration-200 hover:text-[#d4af37]"
                        >
                            Jl. Boulevard Raya, Cibeber,<br>Kec. Cibeber, Kota Cilegon, Banten 42426
                        </a>
                        <p>jasminepatisserie15@gmail.com</p>
                        <p>+62 815-1119-6225</p>
                    </div>
                </div>
            </div>

            <!-- Divider -->
            <div class="border-inverse-on-surface/10 mt-12 border-t pt-6">
                <p class="text-inverse-on-surface/40 font-body text-center text-xs">
                    © 2024 Jasmine Patisserie. Kue Kustom Artisan Premium.
                </p>
            </div>
        </div>
    </footer>
</template>
