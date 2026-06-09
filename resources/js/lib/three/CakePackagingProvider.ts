import * as THREE from 'three';

export class CakePackagingProvider {
    materials: {
        cardboard: THREE.MeshPhysicalMaterial;
        plasticDome: THREE.MeshPhysicalMaterial;
    };

    constructor() {
        this.materials = {
            cardboard: new THREE.MeshPhysicalMaterial({
                color: 0xFAF6F0,
                roughness: 0.85,
                metalness: 0.0,
                side: THREE.DoubleSide,
                clearcoat: 0.05,
                clearcoatRoughness: 0.9,
                sheen: 0.1,
                sheenRoughness: 0.8,
                sheenColor: new THREE.Color(0xFFF8F0),
            }),
            plasticDome: new THREE.MeshPhysicalMaterial({
                color: 0xFFFFFF,
                metalness: 0.1,
                roughness: 0.05,
                transparent: true,
                opacity: 0.25,
                side: THREE.DoubleSide,
                clearcoat: 1.0,
                clearcoatRoughness: 0.05,
                envMapIntensity: 1.5,
                depthWrite: false,
            }),
        };
    }

    createDomeCover(radius: number = 1.2, height: number = 1.5): THREE.Group {
        const group = new THREE.Group();
        group.name = "packaging_dome";

        // Dome walls
        const domeGeo = new THREE.CylinderGeometry(radius, radius, height, 96, 1, true);
        const dome = new THREE.Mesh(domeGeo, this.materials.plasticDome);
        dome.position.y = height / 2;
        dome.renderOrder = 10;
        group.add(dome);

        // Top sphere cap
        const capGeo = new THREE.SphereGeometry(radius, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2);
        const cap = new THREE.Mesh(capGeo, this.materials.plasticDome);
        cap.position.y = height;
        cap.renderOrder = 10;
        group.add(cap);

        // Handle knob on top (solid, not transparent)
        const handleMat = new THREE.MeshPhysicalMaterial({
            color: 0xE8E4E0,
            roughness: 0.3,
            metalness: 0.1,
            clearcoat: 0.5,
        });
        const handleGeo = new THREE.SphereGeometry(0.06, 32, 32);
        const handle = new THREE.Mesh(handleGeo, handleMat);
        handle.position.y = height + radius * 0.05;
        handle.castShadow = true;
        group.add(handle);

        // Bottom rim ring
        const rimMat = new THREE.MeshPhysicalMaterial({
            color: 0xE0DCD8,
            roughness: 0.3,
            metalness: 0.05,
            clearcoat: 0.3,
        });
        const rimGeo = new THREE.TorusGeometry(radius, 0.012, 12, 96);
        const rim = new THREE.Mesh(rimGeo, rimMat);
        rim.rotation.x = Math.PI / 2;
        rim.position.y = 0.01;
        rim.castShadow = true;
        group.add(rim);

        return group;
    }

    createSquareBoxBase(width: number = 3.0): THREE.Group {
        const group = new THREE.Group();
        group.name = "packaging_box_base";

        const thickness = 0.04;
        const height = 0.5;

        // Bottom
        const bottomGeo = new THREE.BoxGeometry(width, thickness, width, 2, 1, 2);
        const bottom = new THREE.Mesh(bottomGeo, this.materials.cardboard);
        bottom.position.y = thickness / 2;
        bottom.receiveShadow = true;
        bottom.castShadow = true;
        group.add(bottom);

        // Sides
        const sideGeo = new THREE.BoxGeometry(width, height, thickness, 2, 2, 1);

        const back = new THREE.Mesh(sideGeo, this.materials.cardboard);
        back.position.set(0, height / 2 + thickness, -width / 2 + thickness / 2);
        back.castShadow = true;

        const front = new THREE.Mesh(sideGeo, this.materials.cardboard);
        front.position.set(0, height / 2 + thickness, width / 2 - thickness / 2);
        front.castShadow = true;

        const sideProfileGeo = new THREE.BoxGeometry(thickness, height, width - thickness * 2, 1, 2, 2);
        const left = new THREE.Mesh(sideProfileGeo, this.materials.cardboard);
        left.position.set(-width / 2 + thickness / 2, height / 2 + thickness, 0);
        left.castShadow = true;

        const right = new THREE.Mesh(sideProfileGeo, this.materials.cardboard);
        right.position.set(width / 2 - thickness / 2, height / 2 + thickness, 0);
        right.castShadow = true;

        group.add(back, front, left, right);

        group.position.y = -thickness;
        return group;
    }
}
