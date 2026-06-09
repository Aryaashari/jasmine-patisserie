<script setup lang="ts">
import { ref } from 'vue';
import FlavorCircle from './FlavorCircle.vue';
import SectionHeading from './SectionHeading.vue';

const activeFlavor = ref('Stroberi');

const flavors = [
    { image: '/images/flavor-strawberry.png', label: 'Stroberi' },
    { image: '/images/flavor-chocolate.png', label: 'Cokelat' },
    { image: '/images/flavor-vanilla.png', label: 'Vanila' },
    { image: '/images/flavor-pistachio.png', label: 'Pistachio' },
];

function selectFlavor(label: string) {
    activeFlavor.value = label;
}
</script>

<template>
    <section id="flavors" class="bg-surface-container-low py-16 md:py-24">
        <div class="mx-auto max-w-7xl px-4 md:px-16">
            <SectionHeading
                title="Jelajahi Varian Rasa Kami"
                align="center"
            />

            <!-- Flavor Circles Row -->
            <div class="hide-scrollbar flex justify-center gap-8 overflow-x-auto pb-4 md:gap-12">
                <FlavorCircle
                    v-for="flavor in flavors"
                    :key="flavor.label"
                    :image="flavor.image"
                    :label="flavor.label"
                    :active="activeFlavor === flavor.label"
                    @click="selectFlavor(flavor.label)"
                />
            </div>
        </div>
    </section>
</template>
