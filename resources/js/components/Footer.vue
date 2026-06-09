<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

const quickLinks = [
    { label: 'Galeri', href: '/gallery' },
    { label: 'Desain Kustom', href: '/#custom-design' },
    { label: 'Tentang Kami', href: '/#story' },
    { label: 'FAQ', href: '/#faq' },
];

const socialLinks = [
    { label: 'Instagram', href: '#' },
    { label: 'Kontak WhatsApp', href: '#' },
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
                        <p>📍 Jl. Melati No. 27,<br>Jakarta Selatan 12345</p>
                        <p>📧 hello@jasminepatisserie.id</p>
                        <p>📞 +62 812-3456-7890</p>
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
