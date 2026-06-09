<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { ref, watch, onBeforeUnmount } from 'vue';
import DesignerCanvas from '../components/designer/DesignerCanvas.vue';
import DesignerWizard from '../components/designer/DesignerWizard.vue';
import MainLayout from '../layouts/MainLayout.vue';
import { useDesignerScene } from '../lib/three/useDesignerScene';

// State
const currentStep = ref(1);
const totalSteps = 5;

const baseShape = ref(0);
const frostingStyle = ref('smooth_buttercream');
const frostingColor = ref('#FFFBF2');
const interactionMode = ref<'place_deco' | 'transform_translate' | 'transform_rotate' | 'draw_piping'>('place_deco');
const selectedDecoType = ref('none');
const decoColor = ref('#FFB7B2');
const decoScale = ref(1.0);
const pipingThickness = ref(0.015);
const customText = ref('');
const packaging = ref('none');

// Canvas ref
const canvasContainerRef = ref<HTMLElement | null>(null);

// Initialize Three.js Composable
// Note: useDesignerScene creates refs internally, we map our Vue refs to its methods.
// Because it needs the container element, we wait for the 'ready' event.
let sceneMethods: any = null;
const isSceneReady = ref(false);

const onCanvasReady = (el: HTMLElement) => {
    canvasContainerRef.value = el;
    sceneMethods = useDesignerScene(canvasContainerRef);
    
    // Sync local state refs with scene composable
    isSceneReady.value = sceneMethods.isReady.value;
    watch(sceneMethods.isReady, (val) => {
        isSceneReady.value = val;
    }, { immediate: true });

    // We need to map our wizard state changes to the Three.js scene update functions.
    watch(baseShape, (val) => sceneMethods.switchCakeShape(val));
    watch([frostingStyle, frostingColor], ([style, color]) => sceneMethods.applyFrostingAndDecor(style, color));
    watch(interactionMode, (val) => sceneMethods.currentMode.value = val);
    watch(selectedDecoType, (val) => sceneMethods.selectedDeco.value = val);
    watch(decoColor, (val) => sceneMethods.decoColor.value = val);
    watch(decoScale, (val) => {
        sceneMethods.decoScale.value = val;
        sceneMethods.updateLastDecoScale(val);
    });
    watch(pipingThickness, (val) => sceneMethods.pipingThickness.value = val);
    watch(customText, (val) => sceneMethods.customText.value = val);
    watch(packaging, (val) => sceneMethods.switchPackaging(val));
};

const handleUndo = () => sceneMethods?.undoDecoration();
const handleClear = () => sceneMethods?.clearDecorations();
const handleExportPNG = () => sceneMethods?.exportSnapshot();
const handleExportGLB = () => sceneMethods?.exportGLB();

onBeforeUnmount(() => {
    sceneMethods?.dispose();
});
</script>

<template>
    <MainLayout>
        <Head title="Desainer Kue Kustom | Jasmine Patisserie" />
        
        <div class="h-[calc(100vh-64px)] w-full mt-16 overflow-hidden">
            <!-- Mobile: Vertical Split, Desktop: Horizontal Split -->
            <div class="flex h-full flex-col-reverse md:flex-row">
                
                <!-- Left Panel (Wizard) -->
                <div class="h-1/2 w-full md:h-full md:w-[40%] lg:w-[35%] z-20 relative shadow-[4px_0_24px_rgba(0,0,0,0.05)]">
                    <DesignerWizard 
                        v-model:currentStep="currentStep"
                        :totalSteps="totalSteps"
                        v-model:baseShape="baseShape"
                        v-model:frostingStyle="frostingStyle"
                        v-model:frostingColor="frostingColor"
                        v-model:interactionMode="interactionMode"
                        v-model:selectedDecoType="selectedDecoType"
                        v-model:decoColor="decoColor"
                        v-model:decoScale="decoScale"
                        v-model:pipingThickness="pipingThickness"
                        v-model:customText="customText"
                        v-model:packaging="packaging"
                        @undo="handleUndo"
                        @clear="handleClear"
                        @export-png="handleExportPNG"
                        @export-glb="handleExportGLB"
                    />
                </div>

                <!-- Right Panel (3D Canvas) -->
                <div class="h-1/2 w-full md:h-full md:w-[60%] lg:w-[65%] z-10 sticky top-0">
                    <DesignerCanvas 
                        :isReady="isSceneReady"
                        @ready="onCanvasReady"
                    />
                </div>

            </div>
        </div>
    </MainLayout>
</template>
