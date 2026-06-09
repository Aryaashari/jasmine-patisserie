import * as THREE from 'three';

export class CakeDecorationsProvider {
    materials: Record<string, THREE.Material>;

    constructor() {
        this.materials = this._initDecorationMaterials();
    }

    private _initDecorationMaterials() {
        return {
            roseMat: new THREE.MeshPhysicalMaterial({
                color: 0xFFB7B2,
                roughness: 0.4,
                metalness: 0.0,
                clearcoat: 0.3,
                clearcoatRoughness: 0.4,
                sheen: 0.5,
                sheenRoughness: 0.6,
                sheenColor: new THREE.Color(0xFFD0CC),
                side: THREE.DoubleSide,
            }),
            leafMat: new THREE.MeshPhysicalMaterial({
                color: 0x8FBF7A,
                roughness: 0.5,
                metalness: 0.0,
                clearcoat: 0.2,
                clearcoatRoughness: 0.5,
                sheen: 0.3,
                sheenRoughness: 0.7,
                sheenColor: new THREE.Color(0xC5E8B0),
                side: THREE.DoubleSide,
            }),
            pearlMat: new THREE.MeshPhysicalMaterial({
                color: 0xFFF8F0,
                roughness: 0.05,
                metalness: 0.15,
                clearcoat: 1.0,
                clearcoatRoughness: 0.02,
                iridescence: 0.6,
                iridescenceIOR: 1.3,
                sheen: 0.8,
                sheenRoughness: 0.2,
                sheenColor: new THREE.Color(0xFFE8DD),
                reflectivity: 0.9,
            }),
            starMat: new THREE.MeshPhysicalMaterial({
                color: 0xFFD700,
                roughness: 0.15,
                metalness: 0.6,
                clearcoat: 0.8,
                clearcoatRoughness: 0.1,
                emissive: 0x332200,
                emissiveIntensity: 0.15,
            }),
            heartMat: new THREE.MeshPhysicalMaterial({
                color: 0xFF6B7A,
                roughness: 0.3,
                metalness: 0.0,
                clearcoat: 0.5,
                clearcoatRoughness: 0.2,
                sheen: 0.4,
                sheenRoughness: 0.4,
                sheenColor: new THREE.Color(0xFFA0AA),
            }),
            bowMat: new THREE.MeshPhysicalMaterial({
                color: 0xE2F0CB,
                roughness: 0.45,
                metalness: 0.0,
                clearcoat: 0.2,
                clearcoatRoughness: 0.5,
                sheen: 0.6,
                sheenRoughness: 0.5,
                sheenColor: new THREE.Color(0xF0FAE0),
                side: THREE.DoubleSide,
            }),
            chocoMat: new THREE.MeshPhysicalMaterial({
                color: 0x3D1F0B,
                roughness: 0.08,
                metalness: 0.05,
                clearcoat: 0.9,
                clearcoatRoughness: 0.05,
                reflectivity: 0.7,
                sheen: 0.3,
                sheenRoughness: 0.3,
                sheenColor: new THREE.Color(0x5A3015),
            }),
        };
    }

    // Multi-layered rose with spiral petals
    createRose(): THREE.Group {
        const roseGroup = new THREE.Group();
        roseGroup.name = "deco_rose";

        // Center bud — tighter cone, pointing UP
        const centerGeo = new THREE.ConeGeometry(0.035, 0.1, 8);
        const center = new THREE.Mesh(centerGeo, this.materials.roseMat);
        // Remove rotation.x = Math.PI so it points up
        center.position.y = 0.04; // Adjust height slightly so it sits right
        center.castShadow = true;
        center.receiveShadow = true;
        roseGroup.add(center);

        // Inner petals (5 petals, tightly wrapped)
        const innerPetalGeo = new THREE.SphereGeometry(0.04, 12, 8, 0, Math.PI);
        for (let i = 0; i < 5; i++) {
            const petal = new THREE.Mesh(innerPetalGeo, this.materials.roseMat);
            const angle = (i / 5) * Math.PI * 2 + 0.3;
            petal.position.set(Math.cos(angle) * 0.03, 0.01, Math.sin(angle) * 0.03);
            petal.rotation.y = -angle;
            petal.rotation.x = 0.6;
            petal.scale.set(1, 0.5, 0.8);
            petal.castShadow = true;
            petal.receiveShadow = true;
            roseGroup.add(petal);
        }

        // Outer petals (7 petals, more open)
        const outerPetalGeo = new THREE.SphereGeometry(0.05, 12, 8, 0, Math.PI);
        for (let i = 0; i < 7; i++) {
            const petal = new THREE.Mesh(outerPetalGeo, this.materials.roseMat);
            const angle = (i / 7) * Math.PI * 2;
            petal.position.set(Math.cos(angle) * 0.055, -0.01, Math.sin(angle) * 0.055);
            petal.rotation.y = -angle;
            petal.rotation.x = 0.9;
            petal.scale.set(1, 0.4, 0.9);
            petal.castShadow = true;
            petal.receiveShadow = true;
            roseGroup.add(petal);
        }

        roseGroup.scale.set(0.7, 0.7, 0.7);
        return roseGroup;
    }

    // Realistic leaf with folded vein
    createLeaf(): THREE.Group {
        const leafGroup = new THREE.Group();
        leafGroup.name = "deco_leaf";

        // Two halves for a folded leaf effect
        const halfGeo = new THREE.ConeGeometry(0.04, 0.14, 4);
        const left = new THREE.Mesh(halfGeo, this.materials.leafMat);
        left.rotation.z = -0.15;
        left.rotation.x = Math.PI / 2;
        left.position.x = -0.015;
        left.scale.set(0.8, 0.15, 1);
        left.castShadow = true;
        left.receiveShadow = true;
        leafGroup.add(left);

        const right = new THREE.Mesh(halfGeo, this.materials.leafMat);
        right.rotation.z = 0.15;
        right.rotation.x = Math.PI / 2;
        right.position.x = 0.015;
        right.scale.set(0.8, 0.15, 1);
        right.castShadow = true;
        right.receiveShadow = true;
        leafGroup.add(right);

        // Vein (center ridge)
        const veinGeo = new THREE.CylinderGeometry(0.003, 0.001, 0.12, 4);
        const vein = new THREE.Mesh(veinGeo, this.materials.leafMat);
        vein.rotation.x = Math.PI / 2;
        vein.position.y = 0.005;
        vein.castShadow = true;
        leafGroup.add(vein);

        return leafGroup;
    }

    createPearlString(length: number = 0.5, beadRadius: number = 0.018): THREE.Group {
        const stringGroup = new THREE.Group();
        stringGroup.name = "deco_pearl_string";

        const beadGeo = new THREE.SphereGeometry(beadRadius, 16, 16);
        const count = Math.floor(length / (beadRadius * 2));

        for (let i = 0; i < count; i++) {
            const bead = new THREE.Mesh(beadGeo, this.materials.pearlMat);
            bead.position.x = i * (beadRadius * 1.85);
            bead.castShadow = true;
            stringGroup.add(bead);
        }
        return stringGroup;
    }

    createStarCluster(): THREE.Group {
        const cluster = new THREE.Group();
        cluster.name = "deco_star_cluster";

        // 5-pointed star shape using custom points
        const starShape = new THREE.Shape();
        const outerR = 0.04, innerR = 0.018;
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
            const r = i % 2 === 0 ? outerR : innerR;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            if (i === 0) starShape.moveTo(x, y);
            else starShape.lineTo(x, y);
        }
        starShape.closePath();
        const starGeo = new THREE.ExtrudeGeometry(starShape, { depth: 0.015, bevelEnabled: true, bevelThickness: 0.003, bevelSize: 0.003, bevelSegments: 2 });

        const positions = [[0, 0, 0], [0.06, 0.01, 0.04], [-0.05, -0.01, 0.07]];
        positions.forEach((pos) => {
            const star = new THREE.Mesh(starGeo, this.materials.starMat);
            star.position.set(pos[0], pos[1], pos[2]);
            star.rotation.set(Math.random(), Math.random(), Math.random());
            star.castShadow = true;
            cluster.add(star);
        });

        return cluster;
    }

    createHeartTopper(): THREE.Group {
        const topperGroup = new THREE.Group();
        topperGroup.name = "deco_heart_topper";

        // Heart shape via path
        const heartShape = new THREE.Shape();
        heartShape.moveTo(0, 0.02);
        heartShape.bezierCurveTo(0, 0.04, -0.02, 0.06, -0.04, 0.06);
        heartShape.bezierCurveTo(-0.065, 0.06, -0.065, 0.035, -0.065, 0.035);
        heartShape.bezierCurveTo(-0.065, 0.02, -0.05, 0.0, 0, -0.03);
        heartShape.bezierCurveTo(0.05, 0.0, 0.065, 0.02, 0.065, 0.035);
        heartShape.bezierCurveTo(0.065, 0.035, 0.065, 0.06, 0.04, 0.06);
        heartShape.bezierCurveTo(0.02, 0.06, 0, 0.04, 0, 0.02);

        const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
            depth: 0.015, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 3,
        });
        heartGeo.center();
        const heart = new THREE.Mesh(heartGeo, this.materials.heartMat);
        heart.position.y = 0.17;
        heart.scale.set(1.5, 1.5, 1.5);
        heart.castShadow = true;
        topperGroup.add(heart);

        // Stick
        const stickGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.15, 8);
        const stick = new THREE.Mesh(stickGeo, new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.8 }));
        stick.position.y = 0.075;
        topperGroup.add(stick);

        return topperGroup;
    }

    createMiniBow(): THREE.Group {
        const bowGroup = new THREE.Group();
        bowGroup.name = "deco_mini_bow";

        // Ribbon loops using TorusGeometry for smooth loops
        const loopGeo = new THREE.TorusGeometry(0.03, 0.008, 12, 24, Math.PI);

        const leftLoop = new THREE.Mesh(loopGeo, this.materials.bowMat);
        leftLoop.rotation.z = Math.PI / 4;
        leftLoop.position.set(-0.02, 0.01, 0);
        leftLoop.castShadow = true;

        const rightLoop = new THREE.Mesh(loopGeo, this.materials.bowMat);
        rightLoop.rotation.z = -Math.PI / 4;
        rightLoop.rotation.y = Math.PI;
        rightLoop.position.set(0.02, 0.01, 0);
        rightLoop.castShadow = true;

        // Center knot
        const knotGeo = new THREE.SphereGeometry(0.012, 12, 12);
        const knot = new THREE.Mesh(knotGeo, this.materials.bowMat);
        knot.castShadow = true;

        // Tail ribbons
        const tailGeo = new THREE.CylinderGeometry(0.006, 0.003, 0.04, 6);
        const tailL = new THREE.Mesh(tailGeo, this.materials.bowMat);
        tailL.position.set(-0.015, -0.02, 0);
        tailL.rotation.z = 0.3;
        const tailR = new THREE.Mesh(tailGeo, this.materials.bowMat);
        tailR.position.set(0.015, -0.02, 0);
        tailR.rotation.z = -0.3;

        bowGroup.add(leftLoop, rightLoop, knot, tailL, tailR);
        return bowGroup;
    }

    createChocolateShard(): THREE.Group {
        const shardGroup = new THREE.Group();
        shardGroup.name = "deco_choco_shard";

        // Irregular triangular shard
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0.04, 0.16);
        shape.lineTo(0.06, 0.12);
        shape.lineTo(0.035, 0);
        shape.closePath();

        const shardGeo = new THREE.ExtrudeGeometry(shape, {
            depth: 0.008, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.002, bevelSegments: 1,
        });

        const shard = new THREE.Mesh(shardGeo, this.materials.chocoMat);
        shard.rotation.x = -0.2;
        shard.castShadow = true;
        shardGroup.add(shard);

        // Second smaller shard
        const shape2 = new THREE.Shape();
        shape2.moveTo(0, 0);
        shape2.lineTo(-0.02, 0.1);
        shape2.lineTo(0.01, 0.08);
        shape2.lineTo(0.02, 0);
        shape2.closePath();

        const shardGeo2 = new THREE.ExtrudeGeometry(shape2, {
            depth: 0.006, bevelEnabled: true, bevelThickness: 0.001, bevelSize: 0.001, bevelSegments: 1,
        });
        const shard2 = new THREE.Mesh(shardGeo2, this.materials.chocoMat);
        shard2.position.set(0.04, 0, 0.01);
        shard2.rotation.y = 0.5;
        shard2.rotation.x = -0.15;
        shard2.castShadow = true;
        shardGroup.add(shard2);

        return shardGroup;
    }

    getSingleCandySprinkle(): THREE.Mesh {
        const sprinkleGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.035, 6);
        sprinkleGeo.rotateX(Math.PI / 2);

        const colors = [0xFFB7B2, 0xFFDAC1, 0xE2F0CB, 0xB5EAD7, 0xC7CEEA];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const sprinkleMat = new THREE.MeshPhysicalMaterial({
            color: randomColor,
            roughness: 0.25,
            clearcoat: 0.3,
            clearcoatRoughness: 0.4,
        });

        const sprinkle = new THREE.Mesh(sprinkleGeo, sprinkleMat);
        sprinkle.name = "base_sprinkle_particle";
        return sprinkle;
    }
}
