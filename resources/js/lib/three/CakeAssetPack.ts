import * as THREE from 'three';

// --- Procedural Texture Generators ---

function createSpongeBumpMap(): THREE.CanvasTexture {
    const width = 512;
    const height = 512;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d')!;
    const imageData = context.createImageData(width, height);
    const data = imageData.data;

    // Multi-octave noise for realistic sponge pores
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            // Combine multiple noise frequencies for organic feel
            const n1 = Math.random();
            const n2 = Math.sin(x * 0.15) * Math.cos(y * 0.15) * 0.5 + 0.5;
            const n3 = Math.random() > 0.88 ? 0 : 1; // Larger pores
            const n4 = Math.random() > 0.95 ? 0.3 : 1; // Occasional deep pits
            const val = Math.floor(((n1 * 0.3 + n2 * 0.2 + n3 * 0.3 + n4 * 0.2)) * 255);
            data[i] = val;
            data[i + 1] = val;
            data[i + 2] = val;
            data[i + 3] = 255;
        }
    }

    context.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    texture.needsUpdate = true;
    return texture;
}

function createFrostingRoughnessMap(): THREE.CanvasTexture {
    const width = 256;
    const height = 256;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d')!;
    const imageData = context.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            // Subtle swirl pattern for frosted surface
            const swirl = Math.sin(x * 0.08 + Math.sin(y * 0.06) * 3) * 0.5 + 0.5;
            const noise = Math.random() * 0.15;
            const val = Math.floor((swirl * 0.6 + 0.2 + noise) * 255);
            data[i] = val;
            data[i + 1] = val;
            data[i + 2] = val;
            data[i + 3] = 255;
        }
    }

    context.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    texture.needsUpdate = true;
    return texture;
}

// --- Materials ---

export const createCakeMaterials = () => {
    const spongeBump = createSpongeBumpMap();
    const frostingRoughness = createFrostingRoughnessMap();

    const spongeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xF5E0B0,
        roughness: 0.92,
        metalness: 0.0,
        bumpMap: spongeBump,
        bumpScale: 0.04,
        // Subsurface-like softness
        transmission: 0.02,
        thickness: 0.5,
        clearcoat: 0.05,
        clearcoatRoughness: 0.9,
        flatShading: false,
    });

    const frostingMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFFEFC,
        roughness: 0.25,
        roughnessMap: frostingRoughness,
        metalness: 0.0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        // Subsurface scattering simulation
        transmission: 0.08,
        thickness: 0.3,
        ior: 1.4,
        sheen: 0.4,
        sheenRoughness: 0.5,
        sheenColor: new THREE.Color(0xFFE8E0),
        flatShading: false,
    });

    const plateMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xF8F4F0,
        roughness: 0.12,
        metalness: 0.05,
        clearcoat: 0.9,
        clearcoatRoughness: 0.08,
        reflectivity: 0.6,
        flatShading: false,
    });

    // Frosting side wrap (covers the side of the cake)
    const frostingSideMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFFEFC,
        roughness: 0.35,
        roughnessMap: frostingRoughness,
        metalness: 0.0,
        clearcoat: 0.5,
        clearcoatRoughness: 0.25,
        transmission: 0.04,
        thickness: 0.2,
        sheen: 0.3,
        sheenRoughness: 0.6,
        sheenColor: new THREE.Color(0xFFE8E0),
        flatShading: false,
    });

    const decoMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        roughness: 0.25,
        metalness: 0.0,
        clearcoat: 0.4,
        clearcoatRoughness: 0.3,
        flatShading: false,
    });

    return {
        sponge: spongeMaterial,
        frosting: frostingMaterial,
        frostingSide: frostingSideMaterial,
        plate: plateMaterial,
        deco: decoMaterial,
    };
};

// --- Geometry Helpers ---

export class CakeAssetPack {
    materials: ReturnType<typeof createCakeMaterials>;

    constructor() {
        this.materials = createCakeMaterials();
    }

    _createRoundPlate(radius: number): THREE.Group {
        const group = new THREE.Group();

        // Main plate body
        const plateGeo = new THREE.CylinderGeometry(radius * 1.2, radius * 1.15, 0.05, 96);
        const plate = new THREE.Mesh(plateGeo, this.materials.plate);
        plate.position.y = 0.025;
        plate.castShadow = true;
        plate.receiveShadow = true;
        plate.name = "plate";
        group.add(plate);

        // Plate rim (subtle raised edge)
        const rimGeo = new THREE.TorusGeometry(radius * 1.175, 0.018, 16, 96);
        const rim = new THREE.Mesh(rimGeo, this.materials.plate);
        rim.rotation.x = Math.PI / 2;
        rim.position.y = 0.05;
        rim.castShadow = true;
        rim.name = "plate";
        group.add(rim);

        return group;
    }

    _createRectPlate(width: number, depth: number): THREE.Group {
        const group = new THREE.Group();

        // Rounded rectangle via BoxGeometry + EdgesGeometry for a subtle look
        const plateGeo = new THREE.BoxGeometry(width * 1.2, 0.05, depth * 1.2, 2, 1, 2);
        const plate = new THREE.Mesh(plateGeo, this.materials.plate);
        plate.position.y = 0.025;
        plate.castShadow = true;
        plate.receiveShadow = true;
        plate.name = "plate";
        group.add(plate);

        return group;
    }

    _addPiping(group: THREE.Group, radius: number, height: number, count: number): void {
        // Swirl piping dollops on top edge
        const pipingGeo = new THREE.SphereGeometry(radius * 0.065, 24, 24);

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const mesh = new THREE.Mesh(pipingGeo, this.materials.frosting);
            mesh.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
            // Slight vertical squish for whipped cream look
            mesh.scale.set(1, 0.7, 1);
            mesh.castShadow = true;
            mesh.name = "piping";
            group.add(mesh);
        }
    }

    _createCylindricalLayer(radius: number, height: number, segments: number = 96, withPiping: boolean = false): THREE.Group {
        const group = new THREE.Group();

        // Sponge Base
        const spongeGeo = new THREE.CylinderGeometry(radius * 0.98, radius * 0.98, height * 0.75, segments);
        const spongeMesh = new THREE.Mesh(spongeGeo, this.materials.sponge);
        spongeMesh.position.y = (height * 0.75) / 2;
        spongeMesh.castShadow = true;
        spongeMesh.receiveShadow = true;
        spongeMesh.name = "sponge";
        group.add(spongeMesh);

        // Frosting side wrap (encases the sponge sides)
        const frostingSideGeo = new THREE.CylinderGeometry(radius, radius, height * 0.75, segments, 1, true);
        const frostingSide = new THREE.Mesh(frostingSideGeo, this.materials.frostingSide);
        frostingSide.position.y = (height * 0.75) / 2;
        frostingSide.castShadow = true;
        frostingSide.name = "frosting";
        group.add(frostingSide);

        // Frosting Top Layer (slightly tapered top for subtle dome effect)
        const topRadius = radius * 1.01;
        const frostingGeo = new THREE.CylinderGeometry(topRadius * 0.98, topRadius, height * 0.28, segments);
        const frostingMesh = new THREE.Mesh(frostingGeo, this.materials.frosting);
        frostingMesh.position.y = (height * 0.75) + (height * 0.28) / 2 - 0.02;
        frostingMesh.castShadow = true;
        frostingMesh.receiveShadow = true;
        frostingMesh.name = "frosting";
        group.add(frostingMesh);

        if (withPiping) {
            this._addPiping(group, radius * 0.92, height * 0.75 + height * 0.25, Math.floor(radius * 40));
        }

        return group;
    }

    createRoundSingleLayer(): THREE.Group {
        const group = this._createRoundPlate(1.0);
        group.name = "round_single_layer";

        const cake = this._createCylindricalLayer(1.0, 0.6, 96, true);
        cake.position.y = 0.06;
        group.add(cake);

        return group;
    }

    createRoundTwoLayer(): THREE.Group {
        const group = this._createRoundPlate(1.0);
        group.name = "round_2_layer";

        const layer1 = this._createCylindricalLayer(1.0, 0.5, 96, true);
        layer1.position.y = 0.06;

        const layer2 = this._createCylindricalLayer(0.75, 0.45, 96, true);
        layer2.position.y = 0.06 + 0.5;

        group.add(layer1, layer2);
        return group;
    }

    createRoundThreeLayer(): THREE.Group {
        const group = this._createRoundPlate(1.2);
        group.name = "round_3_layer";

        const layer1 = this._createCylindricalLayer(1.2, 0.45, 96, true);
        layer1.position.y = 0.06;

        const layer2 = this._createCylindricalLayer(0.9, 0.45, 96, true);
        layer2.position.y = 0.06 + 0.45;

        const layer3 = this._createCylindricalLayer(0.6, 0.45, 96, true);
        layer3.position.y = 0.06 + 0.9;

        group.add(layer1, layer2, layer3);
        return group;
    }

    createSquareSingleLayer(): THREE.Group {
        const group = this._createRectPlate(1.5, 1.5);
        group.name = "square_single_layer";

        const sponge = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 1.5, 4, 4, 4), this.materials.sponge);
        sponge.position.y = 0.25 + 0.06;
        sponge.castShadow = true;
        sponge.name = "sponge";

        const frosting = new THREE.Mesh(new THREE.BoxGeometry(1.54, 0.15, 1.54, 4, 2, 4), this.materials.frosting);
        frosting.position.y = 0.5 + 0.06;
        frosting.castShadow = true;
        frosting.name = "frosting";

        group.add(sponge, frosting);
        return group;
    }

    createSquareTwoLayer(): THREE.Group {
        const group = this._createRectPlate(1.6, 1.6);
        group.name = "square_2_layer";

        const bSponge = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 1.6, 4, 4, 4), this.materials.sponge);
        bSponge.position.y = 0.2 + 0.06;
        bSponge.castShadow = true;
        bSponge.name = "sponge";

        const bFrosting = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.15, 1.64, 4, 2, 4), this.materials.frosting);
        bFrosting.position.y = 0.45 + 0.06;
        bFrosting.castShadow = true;
        bFrosting.name = "frosting";

        const tSponge = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 1.0, 4, 4, 4), this.materials.sponge);
        tSponge.position.y = 0.72 + 0.06;
        tSponge.castShadow = true;
        tSponge.name = "sponge";

        const tFrosting = new THREE.Mesh(new THREE.BoxGeometry(1.04, 0.15, 1.04, 4, 2, 4), this.materials.frosting);
        tFrosting.position.y = 0.97 + 0.06;
        tFrosting.castShadow = true;
        tFrosting.name = "frosting";

        group.add(bSponge, bFrosting, tSponge, tFrosting);
        return group;
    }

    createHeartCake(): THREE.Group {
        const group = this._createRoundPlate(1.0);
        group.name = "heart_shaped_cake";

        const shapeGroup = new THREE.Group();

        const center = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 1.0, 4, 4, 4), this.materials.sponge);
        center.rotation.y = Math.PI / 4;
        center.position.y = 0.2 + 0.06;
        center.castShadow = true;
        center.name = "sponge";

        const lobe1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.4, 96), this.materials.sponge);
        lobe1.position.set(-0.353, 0.2 + 0.06, 0.353);
        lobe1.castShadow = true;
        lobe1.name = "sponge";

        const lobe2 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.4, 96), this.materials.sponge);
        lobe2.position.set(0.353, 0.2 + 0.06, 0.353);
        lobe2.castShadow = true;
        lobe2.name = "sponge";

        shapeGroup.add(center, lobe1, lobe2);

        const fCenter = new THREE.Mesh(new THREE.BoxGeometry(1.04, 0.15, 1.04, 4, 2, 4), this.materials.frosting);
        fCenter.rotation.y = Math.PI / 4;
        fCenter.position.y = 0.45 + 0.06;
        fCenter.castShadow = true;
        fCenter.name = "frosting";

        const fLobe1 = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.15, 96), this.materials.frosting);
        fLobe1.position.set(-0.353, 0.45 + 0.06, 0.353);
        fLobe1.castShadow = true;
        fLobe1.name = "frosting";

        const fLobe2 = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.15, 96), this.materials.frosting);
        fLobe2.position.set(0.353, 0.45 + 0.06, 0.353);
        fLobe2.castShadow = true;
        fLobe2.name = "frosting";

        group.add(shapeGroup, fCenter, fLobe1, fLobe2);
        return group;
    }

    createBentoCake(): THREE.Group {
        const group = this._createRoundPlate(0.6);
        group.name = "bento_mini_cake";

        const cake = this._createCylindricalLayer(0.45, 0.4, 96, true);
        cake.position.y = 0.06;
        group.add(cake);

        return group;
    }

    createSheetCake(): THREE.Group {
        const group = this._createRectPlate(2.2, 1.4);
        group.name = "sheet_cake_rectangular";

        const sponge = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 1.4, 4, 4, 4), this.materials.sponge);
        sponge.position.y = 0.175 + 0.06;
        sponge.castShadow = true;
        sponge.name = "sponge";

        const frosting = new THREE.Mesh(new THREE.BoxGeometry(2.24, 0.15, 1.44, 4, 2, 4), this.materials.frosting);
        frosting.position.y = 0.4 + 0.06;
        frosting.castShadow = true;
        frosting.name = "frosting";

        group.add(sponge, frosting);
        return group;
    }
}
