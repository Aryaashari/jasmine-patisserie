import * as THREE from 'three';

export const PastelColors = {
    vanillaCream: 0xFFFBF2,
    strawberryPink: 0xFFD1DC,
    mintGreen: 0xC1E1C1,
    lavenderPurple: 0xE6E6FA,
    skyBlue: 0xAEC6CF,
    matchaYellow: 0xE8ECC8,
    chocolateDrip: 0x3D1F0B,
};

function createFrostingBumpMap(): THREE.CanvasTexture {
    const w = 256, h = 256;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const context = canvas.getContext('2d')!;
    const imageData = context.createImageData(w, h);
    const data = imageData.data;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const swirl = Math.sin(x * 0.1 + Math.sin(y * 0.08) * 4) * 0.5 + 0.5;
            const noise = Math.random() * 0.1;
            const val = Math.floor((swirl * 0.7 + 0.15 + noise) * 255);
            data[i] = data[i + 1] = data[i + 2] = val;
            data[i + 3] = 255;
        }
    }
    context.putImageData(imageData, 0, 0);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    tex.needsUpdate = true;
    return tex;
}

export class CakeFrostingPack {
    currentBaseColor: number | THREE.Color;
    private bumpMap: THREE.CanvasTexture;

    constructor() {
        this.currentBaseColor = PastelColors.vanillaCream;
        this.bumpMap = createFrostingBumpMap();
    }

    setGlobalFrostingColor(hexColor: number | THREE.Color) {
        this.currentBaseColor = hexColor;
    }

    getSmoothButtercreamMaterial(customColor?: number | THREE.Color | null): THREE.MeshPhysicalMaterial {
        return new THREE.MeshPhysicalMaterial({
            color: customColor || this.currentBaseColor,
            roughness: 0.38,
            metalness: 0.0,
            clearcoat: 0.35,
            clearcoatRoughness: 0.3,
            transmission: 0.04,
            thickness: 0.3,
            bumpMap: this.bumpMap,
            bumpScale: 0.008,
            sheen: 0.3,
            sheenRoughness: 0.5,
            sheenColor: new THREE.Color(0xFFE8E0),
        });
    }

    getWhippedCreamMaterial(customColor?: number | THREE.Color | null): THREE.MeshPhysicalMaterial {
        return new THREE.MeshPhysicalMaterial({
            color: customColor || this.currentBaseColor,
            roughness: 0.55,
            metalness: 0.0,
            transmission: 0.08,
            thickness: 0.4,
            ior: 1.35,
            clearcoat: 0.15,
            clearcoatRoughness: 0.5,
            sheen: 0.5,
            sheenRoughness: 0.7,
            sheenColor: new THREE.Color(0xFFF5F0),
            flatShading: true,
        });
    }

    getKoreanMinimalistMaterial(customColor?: number | THREE.Color | null): THREE.MeshPhysicalMaterial {
        return new THREE.MeshPhysicalMaterial({
            color: customColor || this.currentBaseColor,
            roughness: 0.12,
            metalness: 0.0,
            clearcoat: 0.95,
            clearcoatRoughness: 0.05,
            transmission: 0.06,
            thickness: 0.5,
            ior: 1.45,
            reflectivity: 0.6,
            sheen: 0.2,
            sheenRoughness: 0.3,
            sheenColor: new THREE.Color(0xFFF0F0),
        });
    }

    createVintagePipingMesh(radius: number, segments: number = 96, customColor?: number | THREE.Color | null): THREE.Group {
        const pipingGroup = new THREE.Group();
        pipingGroup.name = "lambeth_vintage_piping";

        const pipingMaterial = new THREE.MeshPhysicalMaterial({
            color: customColor || this.currentBaseColor,
            roughness: 0.28,
            metalness: 0.0,
            clearcoat: 0.4,
            clearcoatRoughness: 0.3,
            sheen: 0.3,
            sheenRoughness: 0.5,
            sheenColor: new THREE.Color(0xFFE8E0),
        });

        const tubeRadius = radius * 0.035;
        const pipingGeometry = new THREE.TorusKnotGeometry(radius, tubeRadius, segments, 12, 2, 40);
        const pipingMesh = new THREE.Mesh(pipingGeometry, pipingMaterial);
        pipingMesh.scale.set(1, 0.25, 1);
        pipingMesh.castShadow = true;
        pipingGroup.add(pipingMesh);

        // Secondary smaller detail ring
        const detailGeo = new THREE.TorusGeometry(radius * 0.92, tubeRadius * 0.5, 12, segments);
        const detail = new THREE.Mesh(detailGeo, pipingMaterial);
        detail.rotation.x = Math.PI / 2;
        detail.castShadow = true;
        pipingGroup.add(detail);

        return pipingGroup;
    }

    createDripEffectMesh(radius: number, baseHeight: number, customDripColor?: number | THREE.Color | null): THREE.Group {
        const dripGroup = new THREE.Group();
        dripGroup.name = "drip_chocolate_layer";

        const dripMaterial = new THREE.MeshPhysicalMaterial({
            color: customDripColor || PastelColors.chocolateDrip,
            roughness: 0.05,
            metalness: 0.08,
            clearcoat: 1.0,
            clearcoatRoughness: 0.02,
            reflectivity: 0.8,
            sheen: 0.6,
            sheenRoughness: 0.3,
            sheenColor: new THREE.Color(0x5A3015),
        });

        // Top ganache pool
        const topGeo = new THREE.CylinderGeometry(radius * 1.01, radius * 1.01, 0.025, 64);
        const topMesh = new THREE.Mesh(topGeo, dripMaterial);
        topMesh.position.y = baseHeight + 0.012;
        topMesh.castShadow = true;
        dripGroup.add(topMesh);

        // Drip streams — variable length, slightly bulging at bottom
        const dripCount = 20;
        for (let i = 0; i < dripCount; i++) {
            const angle = (i / dripCount) * Math.PI * 2;
            const dripLength = 0.08 + Math.sin(i * 2.7 + 0.5) * 0.06 + Math.random() * 0.04;
            const topR = radius * 0.022;
            const bottomR = radius * 0.012;

            // Tapered drip using Lathe
            const points = [
                new THREE.Vector2(topR, 0),
                new THREE.Vector2(topR * 1.1, -dripLength * 0.3),
                new THREE.Vector2(bottomR * 1.4, -dripLength * 0.7),
                new THREE.Vector2(bottomR * 0.6, -dripLength * 0.95),
                new THREE.Vector2(0, -dripLength),
            ];
            const dripGeo = new THREE.LatheGeometry(points, 8);
            const singleDrip = new THREE.Mesh(dripGeo, dripMaterial);

            const posX = Math.cos(angle) * (radius * 1.005);
            const posZ = Math.sin(angle) * (radius * 1.005);
            singleDrip.position.set(posX, baseHeight, posZ);
            singleDrip.castShadow = true;

            dripGroup.add(singleDrip);
        }

        return dripGroup;
    }
}
