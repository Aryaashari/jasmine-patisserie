import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { ref, shallowRef } from 'vue';
import type { Ref } from 'vue';

import { CakeAssetPack } from './CakeAssetPack';
import { CakeDecorationsProvider } from './CakeDecorationsProvider';
import { CakeFrostingPack, PastelColors } from './CakeFrostingPack';
import { CakePackagingProvider } from './CakePackagingProvider';
import { CakeTopperProvider } from './CakeTopperProvider';

export function useDesignerScene(canvasContainerRef: Ref<HTMLElement | null>) {
    const isReady = ref(false);

    // Three.js instances
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let transformControl: TransformControls;

    // Asset providers
    const pack = new CakeAssetPack();
    const frostingManager = new CakeFrostingPack();
    const decoProvider = new CakeDecorationsProvider();
    const topperProvider = new CakeTopperProvider();
    const packagingProvider = new CakePackagingProvider();

    // State
    const cakeDefinitions = [
        { id: 0, generate: () => pack.createRoundSingleLayer(), radius: 1.0, topY: 0.6 + 0.06 },
        { id: 1, generate: () => pack.createRoundTwoLayer(), radius: 0.75, topY: 0.95 + 0.06 },
        { id: 2, generate: () => pack.createRoundThreeLayer(), radius: 0.6, topY: 1.35 + 0.06 },
        { id: 3, generate: () => pack.createSquareSingleLayer(), radius: 0.8, topY: 0.5 + 0.06 },
        { id: 4, generate: () => pack.createSquareTwoLayer(), radius: 0.6, topY: 0.97 + 0.06 },
        { id: 5, generate: () => pack.createHeartCake(), radius: 0.6, topY: 0.45 + 0.06 },
        { id: 6, generate: () => pack.createBentoCake(), radius: 0.45, topY: 0.4 + 0.06 },
        { id: 7, generate: () => pack.createSheetCake(), radius: 1.2, topY: 0.4 + 0.06 }
    ];

    let currentCakeDef = cakeDefinitions[0];
    let currentCakeMesh: THREE.Group | null = null;
    let currentPackaging: THREE.Group | null = null;
    let loadedFont: Font | null = null;
    const placedDecos = shallowRef<THREE.Group[]>([]);

    let animationFrameId: number;
    let resizeObserver: ResizeObserver;

    // Interaction State
    const currentMode = ref<'place_deco' | 'transform_translate' | 'transform_rotate' | 'draw_piping'>('place_deco');
    const selectedDeco = ref('none');
    const decoColor = ref('#FFB7B2');
    const decoScale = ref(1.0);
    const pipingThickness = ref(0.015);
    const customText = ref('');

    // Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDrawing = false;
    let drawingPoints: THREE.Vector3[] = [];
    let currentLineMesh: THREE.Mesh | null = null;
    const lastDrawPoint = new THREE.Vector3();
    const downPos = new THREE.Vector2();

    const initScene = () => {
        if (!canvasContainerRef.value) {
return;
}

        const width = canvasContainerRef.value.clientWidth;
        const height = canvasContainerRef.value.clientHeight;

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x2a2a40);
        scene.fog = new THREE.Fog(0x2a2a40, 12, 60);

        camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
        camera.position.set(3, 4.5, 7);

        renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        canvasContainerRef.value.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxPolarAngle = Math.PI / 2 - 0.05;
        controls.minDistance = 2;
        controls.maxDistance = 15;
        controls.target.set(0, 0.5, 0);

        // --- Studio Lighting Setup (3-point + ambient) ---

        // Ambient hemisphere (soft sky/ground fill)
        const hemiLight = new THREE.HemisphereLight(0xFFF8F0, 0xD4C4B8, 0.5);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);

        // Key Light (main directional — warm white)
        const keyLight = new THREE.DirectionalLight(0xFFF5EE, 1.4);
        keyLight.position.set(5, 12, 7);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        keyLight.shadow.camera.near = 0.1;
        keyLight.shadow.camera.far = 40;
        keyLight.shadow.camera.left = -5;
        keyLight.shadow.camera.right = 5;
        keyLight.shadow.camera.top = 5;
        keyLight.shadow.camera.bottom = -5;
        keyLight.shadow.bias = -0.0005;
        keyLight.shadow.normalBias = 0.02;
        scene.add(keyLight);

        // Fill Light (warm soft side)
        const fillLight = new THREE.DirectionalLight(0xFFE4D0, 0.6);
        fillLight.position.set(-6, 4, -4);
        scene.add(fillLight);

        // Rim / Back Light (cool accent for edge definition)
        const rimLight = new THREE.DirectionalLight(0xE8E0FF, 0.35);
        rimLight.position.set(-2, 6, -8);
        scene.add(rimLight);

        // Subtle bottom bounce light
        const bounceLight = new THREE.DirectionalLight(0xFFE8E0, 0.15);
        bounceLight.position.set(0, -2, 3);
        scene.add(bounceLight);

        // --- Environment Map for Reflections ---
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileCubemapShader();
        const envScene = new THREE.Scene();
        envScene.background = new THREE.Color(0x2a2a40);
        // Add gradient to environment for soft reflections
        const envTop = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 20),
            new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.BackSide })
        );
        envTop.position.y = 10;
        envTop.rotation.x = Math.PI / 2;
        envScene.add(envTop);
        const envRT = pmremGenerator.fromScene(envScene, 0.04);
        scene.environment = envRT.texture;
        pmremGenerator.dispose();

        // Floor
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshStandardMaterial({ color: 0x2a2a40, roughness: 0.95, metalness: 0.0 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -0.2;
        floor.receiveShadow = true;
        scene.add(floor);

        // Transform Controls
        transformControl = new TransformControls(camera, renderer.domElement);
        transformControl.addEventListener('dragging-changed', (event) => {
            controls.enabled = !event.value;
        });
        scene.add(transformControl as unknown as THREE.Object3D);

        // Font (loaded in background, only needed for custom 3D text)
        new FontLoader().load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', (font) => {
            loadedFont = font;
        });

        setupInteraction();

        // Resize handling
        resizeObserver = new ResizeObserver(() => {
            if (!canvasContainerRef.value || !renderer || !camera) {
return;
}

            const newWidth = canvasContainerRef.value.clientWidth;
            const newHeight = canvasContainerRef.value.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        });
        resizeObserver.observe(canvasContainerRef.value);

        // Initial Cake
        switchCakeShape(0);
        animate();

        // Scene is now ready
        isReady.value = true;
    };

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (controls) {
controls.update();
}

        if (renderer && scene && camera) {
renderer.render(scene, camera);
}
    };

    const setupInteraction = () => {
        if (!renderer) {
return;
}

        const dom = renderer.domElement;

        dom.addEventListener('pointerdown', (e) => {
            if (e.button !== 0) {
return;
}

            downPos.set(e.clientX, e.clientY);
            const rect = dom.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, camera);

            if (currentMode.value.startsWith('transform_')) {
                const modeType = currentMode.value.split('_')[1] as 'translate' | 'rotate';
                transformControl.setMode(modeType);

                const intersects = raycaster.intersectObjects(placedDecos.value, true);

                if (intersects.length > 0) {
                    let obj = intersects[0].object;

                    while (obj.parent && !placedDecos.value.includes(obj as THREE.Group)) {
                        obj = obj.parent;
                    }

                    if (placedDecos.value.includes(obj as THREE.Group)) {
                        transformControl.attach(obj);
                    }
                } else {
                    if (!transformControl.dragging) {
transformControl.detach();
}
                }

                return;
            } else {
                transformControl.detach();
            }

            if (currentMode.value === 'draw_piping' && currentCakeMesh) {
                const intersects = raycaster.intersectObject(currentCakeMesh, true);

                if (intersects.length > 0) {
                    controls.enabled = false;
                    isDrawing = true;
                    drawingPoints = [intersects[0].point.clone()];
                    lastDrawPoint.copy(intersects[0].point);
                }
            }
        });

        dom.addEventListener('pointermove', (e) => {
            if (!isDrawing || !currentCakeMesh) {
return;
}

            const rect = dom.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObject(currentCakeMesh, true);

            if (intersects.length > 0) {
                const hit = intersects[0];

                if (hit.point.distanceTo(lastDrawPoint) > 0.015) {
                    drawingPoints.push(hit.point.clone());
                    lastDrawPoint.copy(hit.point);

                    if (drawingPoints.length > 1) {
                        const curve = new THREE.CatmullRomCurve3(drawingPoints);
                        const tubeGeo = new THREE.TubeGeometry(curve, drawingPoints.length * 2, pipingThickness.value, 8, false);

                        if (!currentLineMesh) {
                            const pipingMat = new THREE.MeshPhysicalMaterial({
                                color: new THREE.Color(decoColor.value),
                                roughness: 0.3,
                                clearcoat: 0.5,
                                transmission: 0.05,
                                thickness: pipingThickness.value
                            });
                            currentLineMesh = new THREE.Mesh(tubeGeo, pipingMat);
                            currentLineMesh.castShadow = true;
                            scene.add(currentLineMesh);
                        } else {
                            currentLineMesh.geometry.dispose();
                            currentLineMesh.geometry = tubeGeo;
                        }
                    }
                }
            }
        });

        dom.addEventListener('pointerup', (e) => {
            if (isDrawing) {
                isDrawing = false;
                controls.enabled = true;

                if (currentLineMesh && currentCakeMesh) {
                    currentLineMesh.geometry.applyMatrix4(currentCakeMesh.matrixWorld.clone().invert());
                    currentLineMesh.position.set(0, 0, 0);
                    currentLineMesh.rotation.set(0, 0, 0);
                    currentLineMesh.scale.set(1, 1, 1);
                    currentCakeMesh.add(currentLineMesh);
                    
                    const newDecos = [...placedDecos.value, currentLineMesh as unknown as THREE.Group];
                    placedDecos.value = newDecos;
                    currentLineMesh = null;
                }

                return;
            }

            const dist = downPos.distanceTo(new THREE.Vector2(e.clientX, e.clientY));

            if (dist > 5) {
return;
}

            if (currentMode.value !== 'place_deco') {
return;
}

            if (selectedDeco.value === 'none') {
return;
}

            const rect = dom.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            
            if (!currentCakeMesh) {
return;
}

            const intersects = raycaster.intersectObject(currentCakeMesh, true);

            if (intersects.length > 0) {
                const hit = intersects.find(i => i.object.name === 'frosting' || i.object.name === 'sponge' || i.object.name === 'plate');

                if (hit && hit.face) {
                    addDecoration(hit.object as THREE.Mesh, hit.point, hit.face.normal);
                }
            }
        });
    };

    const addDecoration = (hitObject: THREE.Mesh, intersectPoint: THREE.Vector3, intersectNormal: THREE.Vector3) => {
        if (!currentCakeMesh) {
return;
}

        let newDeco: THREE.Group | THREE.Mesh | null = null;
        const type = selectedDeco.value;

        if (type === 'custom_text') {
            if (!loadedFont || !customText.value.trim()) {
return;
}

            const textGeo = new TextGeometry(customText.value, {
                font: loadedFont, size: 0.1, depth: 0.02,
                curveSegments: 4, bevelEnabled: true,
                bevelThickness: 0.005, bevelSize: 0.005, bevelSegments: 2
            });
            textGeo.center();
            const textMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(decoColor.value), roughness: 0.2, metalness: 0.1 });
            const textMesh = new THREE.Mesh(textGeo, textMat);
            textMesh.position.y = 0.05;
            textMesh.castShadow = true;
            newDeco = new THREE.Group();
            newDeco.add(textMesh);
        } else {
            switch(type) {
                case 'rose': newDeco = decoProvider.createRose(); break;
                case 'leaf': newDeco = decoProvider.createLeaf(); break;
                case 'heart': newDeco = decoProvider.createHeartTopper(); break;
                case 'mini_bow': newDeco = decoProvider.createMiniBow(); break;
                case 'choco_shard': newDeco = decoProvider.createChocolateShard(); break;
                case 'candle_1': newDeco = topperProvider.createCandleSet(1, new THREE.Color(decoColor.value)); break;
                case 'candle_3': newDeco = topperProvider.createCandleSet(3, new THREE.Color(decoColor.value)); break;
                case 'love_text': newDeco = topperProvider.createLoveTopper(new THREE.Color(decoColor.value)); break;
            }
        }

        if (!newDeco) {
return;
}

        if (type === 'rose') {
            newDeco.children.forEach(c => {
                 if((c as THREE.Mesh).material) {
                     ((c as THREE.Mesh).material as THREE.MeshStandardMaterial).color.set(decoColor.value);
                 }
            });
        }

        newDeco.name = "user_placed_decoration";
        const localPoint = currentCakeMesh.worldToLocal(intersectPoint.clone());
        const worldNormal = intersectNormal.clone().transformDirection(hitObject.matrixWorld);
        const localNormal = worldNormal.clone().transformDirection(currentCakeMesh.matrixWorld.clone().invert());

        newDeco.position.copy(localPoint);
        const upVector = new THREE.Vector3(0, 1, 0);
        newDeco.quaternion.setFromUnitVectors(upVector, localNormal);

        if (type !== 'love_text' && type !== 'custom_text') {
            newDeco.rotateY(Math.random() * Math.PI * 2);
        }

        newDeco.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
 child.castShadow = true; child.receiveShadow = true; 
}
        });

        newDeco.scale.set(decoScale.value, decoScale.value, decoScale.value);
        newDeco.userData = { type: type, localPoint: localPoint, localNormal: localNormal };

        currentCakeMesh.add(newDeco);
        placedDecos.value = [...placedDecos.value, newDeco as THREE.Group];
    };

    const applyFrostingAndDecor = (styleName: string, colorValue: string) => {
        if (!currentCakeMesh) {
return;
}

        const hexColor = new THREE.Color(colorValue);
        frostingManager.setGlobalFrostingColor(hexColor);

        currentCakeMesh.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && child.name.includes("frosting")) {
                if (styleName === "korean_minimalist") {
                    (child as THREE.Mesh).material = frostingManager.getKoreanMinimalistMaterial(hexColor);
                } else if (styleName === "whipped_cream") {
                    (child as THREE.Mesh).material = frostingManager.getWhippedCreamMaterial(hexColor);
                } else {
                    (child as THREE.Mesh).material = frostingManager.getSmoothButtercreamMaterial(hexColor);
                }
            }
        });

        const oldPiping = currentCakeMesh.getObjectByName("lambeth_vintage_piping");

        if (oldPiping) {
currentCakeMesh.remove(oldPiping);
}

        const oldDrip = currentCakeMesh.getObjectByName("drip_chocolate_layer");

        if (oldDrip) {
currentCakeMesh.remove(oldDrip);
}

        if (styleName === "vintage_lambeth") {
            const pipingDecor = frostingManager.createVintagePipingMesh(currentCakeDef.radius, 64, hexColor);
            pipingDecor.position.y = currentCakeDef.topY;
            currentCakeMesh.add(pipingDecor);
        } else if (styleName === "drip_chocolate") {
            const dripDecor = frostingManager.createDripEffectMesh(currentCakeDef.radius, currentCakeDef.topY, PastelColors.chocolateDrip);
            currentCakeMesh.add(dripDecor);
        }
    };

    const switchCakeShape = (index: number) => {
        if (currentCakeMesh) {
scene.remove(currentCakeMesh);
}

        currentCakeDef = cakeDefinitions[index];
        currentCakeMesh = currentCakeDef.generate();
        scene.add(currentCakeMesh);
        placedDecos.value = [];
        applyFrostingAndDecor('smooth_buttercream', '#FFFBF2');
    };

    const switchPackaging = (type: string) => {
        if (currentPackaging) {
 scene.remove(currentPackaging); currentPackaging = null; 
}

        if (type === 'box_base') {
currentPackaging = packagingProvider.createSquareBoxBase(3.5);
} else if (type === 'dome_cover') {
currentPackaging = packagingProvider.createDomeCover(1.6, 1.8);
}

        if (currentPackaging) {
scene.add(currentPackaging);
}
    };

    const undoDecoration = () => {
        if (placedDecos.value.length > 0) {
            transformControl.detach();
            const newDecos = [...placedDecos.value];
            const lastDeco = newDecos.pop();

            if (lastDeco && lastDeco.parent) {
lastDeco.parent.remove(lastDeco);
}

            placedDecos.value = newDecos;
        }
    };

    const clearDecorations = () => {
        transformControl.detach();
        placedDecos.value.forEach(deco => {
            if (deco.parent) {
deco.parent.remove(deco);
}
        });
        placedDecos.value = [];
    };

    const updateLastDecoScale = (scale: number) => {
        if (placedDecos.value.length === 0) {
return;
}

        const lastDeco = placedDecos.value[placedDecos.value.length - 1];

        if (lastDeco.userData.type) {
            lastDeco.scale.set(scale, scale, scale);
        }
    };

    const exportSnapshot = () => {
        transformControl.detach();
        renderer.render(scene, camera);
        const link = document.createElement('a');
        link.download = `cake_snapshot_${Date.now()}.png`;
        link.href = renderer.domElement.toDataURL('image/png');
        link.click();
    };

    const exportGLB = () => {
        transformControl.detach();

        if (!currentCakeMesh) {
return;
}

        const exporter = new GLTFExporter();
        const exportScene = new THREE.Scene();
        exportScene.add(currentCakeMesh.clone());

        if (currentPackaging) {
exportScene.add(currentPackaging.clone());
}

        exporter.parse(exportScene, (gltf) => {
            const blob = new Blob([gltf as ArrayBuffer], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url; link.download = `cake_design_${Date.now()}.glb`;
            document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url);
        }, (error) => console.error("Export Error:", error), { binary: true });
    };

    // Initialize immediately — the composable is called after DOM is ready
    initScene();

    const dispose = () => {
        cancelAnimationFrame(animationFrameId);

        if (resizeObserver) {
            resizeObserver.disconnect();
        }

        if (renderer) {
            renderer.dispose();
        }
    };

    return {
        isReady,
        currentMode,
        selectedDeco,
        decoColor,
        decoScale,
        pipingThickness,
        customText,
        switchCakeShape,
        applyFrostingAndDecor,
        switchPackaging,
        undoDecoration,
        clearDecorations,
        updateLastDecoScale,
        exportSnapshot,
        exportGLB,
        placedDecos,
        dispose
    };
}
