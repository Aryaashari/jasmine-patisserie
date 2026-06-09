import * as THREE from 'three';

export class CakeTopperProvider {
    materials: {
        wax: THREE.MeshPhysicalMaterial;
        flame: THREE.MeshPhysicalMaterial;
        stick: THREE.MeshPhysicalMaterial;
        goldText: THREE.MeshPhysicalMaterial;
    };

    constructor() {
        this.materials = {
            wax: new THREE.MeshPhysicalMaterial({
                color: 0xFFF5E1,
                roughness: 0.6,
                metalness: 0.0,
                clearcoat: 0.3,
                clearcoatRoughness: 0.4,
                transmission: 0.15,
                thickness: 0.5,
                ior: 1.45,
            }),
            flame: new THREE.MeshPhysicalMaterial({
                color: 0xFFAA33,
                emissive: 0xFF6600,
                emissiveIntensity: 2.0,
                roughness: 0.1,
                metalness: 0.0,
                transmission: 0.3,
                thickness: 0.1,
                transparent: true,
                opacity: 0.9,
            }),
            stick: new THREE.MeshPhysicalMaterial({
                color: 0xE8E0D8,
                roughness: 0.7,
                metalness: 0.05,
                clearcoat: 0.1,
            }),
            goldText: new THREE.MeshPhysicalMaterial({
                color: 0xFFD700,
                roughness: 0.1,
                metalness: 0.9,
                clearcoat: 0.8,
                clearcoatRoughness: 0.05,
                reflectivity: 1.0,
            }),
        };
    }

    private _createSingleCandle(customColor?: number | THREE.Color | null): THREE.Group {
        const group = new THREE.Group();

        const waxMat = this.materials.wax.clone();
        if (customColor) waxMat.color.set(customColor);

        // Candle body — slightly tapered for realism
        const waxGeo = new THREE.CylinderGeometry(0.014, 0.016, 0.25, 16);
        const wax = new THREE.Mesh(waxGeo, waxMat);
        wax.position.y = 0.125;
        wax.castShadow = true;
        group.add(wax);

        // Melted wax drip at top
        const meltGeo = new THREE.SphereGeometry(0.018, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const melt = new THREE.Mesh(meltGeo, waxMat);
        melt.position.y = 0.25;
        melt.scale.set(1, 0.4, 1);
        group.add(melt);

        // Wick
        const wickGeo = new THREE.CylinderGeometry(0.0015, 0.002, 0.025, 4);
        const wick = new THREE.Mesh(wickGeo, new THREE.MeshBasicMaterial({ color: 0x222222 }));
        wick.position.y = 0.265;
        group.add(wick);

        // Flame — teardrop shape using LatheGeometry
        const flamePoints = [
            new THREE.Vector2(0, 0.04),
            new THREE.Vector2(0.006, 0.03),
            new THREE.Vector2(0.01, 0.015),
            new THREE.Vector2(0.008, 0.005),
            new THREE.Vector2(0, 0),
        ];
        const flameGeo = new THREE.LatheGeometry(flamePoints, 12);
        const flame = new THREE.Mesh(flameGeo, this.materials.flame);
        flame.position.y = 0.275;

        // Inner glow core
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0xFFFFCC,
            transparent: true,
            opacity: 0.7,
        });
        const glowGeo = new THREE.SphereGeometry(0.005, 8, 8);
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.y = 0.015;
        flame.add(glow);

        // Point light
        const light = new THREE.PointLight(0xFF9922, 0.6, 2.5, 2);
        flame.add(light);

        group.add(flame);
        return group;
    }

    createCandleSet(count: number = 1, customColor?: number | THREE.Color | null): THREE.Group {
        const group = new THREE.Group();
        group.name = "topper_candles";

        if (count === 1) {
            const candle = this._createSingleCandle(customColor);
            group.add(candle);
        } else {
            const radius = count > 3 ? 0.08 : 0.05;
            for (let i = 0; i < count; i++) {
                const candle = this._createSingleCandle(customColor);
                const angle = (i / count) * Math.PI * 2;
                candle.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

                candle.rotation.z = (Math.random() - 0.5) * 0.08;
                candle.rotation.x = (Math.random() - 0.5) * 0.08;
                group.add(candle);
            }
        }
        return group;
    }

    createLoveTopper(customColor?: number | THREE.Color | null): THREE.Group {
        const group = new THREE.Group();
        group.name = "topper_love";

        const textMat = this.materials.goldText.clone();
        if (customColor) textMat.color.set(customColor);

        const plaqueShape = new THREE.Shape();
        plaqueShape.moveTo(-0.3, 0);
        plaqueShape.lineTo(0.3, 0);
        plaqueShape.quadraticCurveTo(0.4, 0, 0.4, 0.1);
        plaqueShape.lineTo(0.4, 0.2);
        plaqueShape.quadraticCurveTo(0.4, 0.3, 0.3, 0.3);
        plaqueShape.lineTo(-0.3, 0.3);
        plaqueShape.quadraticCurveTo(-0.4, 0.3, -0.4, 0.2);
        plaqueShape.lineTo(-0.4, 0.1);
        plaqueShape.quadraticCurveTo(-0.4, 0, -0.3, 0);

        const extrudeSettings = {
            depth: 0.015,
            bevelEnabled: true,
            bevelSegments: 4,
            steps: 1,
            bevelSize: 0.006,
            bevelThickness: 0.006,
        };
        const plaqueGeo = new THREE.ExtrudeGeometry(plaqueShape, extrudeSettings);
        plaqueGeo.center();

        const plaque = new THREE.Mesh(plaqueGeo, textMat);
        plaque.position.y = 0.3;
        plaque.castShadow = true;
        group.add(plaque);

        // Sticks
        const stickGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.25, 8);

        const stick1 = new THREE.Mesh(stickGeo, this.materials.stick);
        stick1.position.set(-0.2, 0.1, 0);

        const stick2 = new THREE.Mesh(stickGeo, this.materials.stick);
        stick2.position.set(0.2, 0.1, 0);

        group.add(stick1, stick2);
        return group;
    }
}
