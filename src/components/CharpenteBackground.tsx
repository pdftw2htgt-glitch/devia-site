"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CharpenteBackground - Phase 1
 *
 * Affiche une charpente traditionnelle en 3D en arriere-plan.
 * Pour l'instant : rotation lente continue (statique).
 * A venir Phase 2 : zoom progressif.
 * A venir Phase 3 : decomposition en filaire.
 */
export default function CharpenteBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Desactiver sur mobile (perf)
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 7, 14);
    camera.lookAt(0, 1.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Eclairage
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4d6, 1.2);
    keyLight.position.set(10, 15, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf0c040, 0.5);
    fillLight.position.set(-8, 4, -6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffd980, 0.3);
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);

    // Materiaux bois
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0xc89968,
      roughness: 0.85,
      metalness: 0.05,
    });
    const woodMaterialDark = new THREE.MeshStandardMaterial({
      color: 0xa8794a,
      roughness: 0.9,
      metalness: 0.05,
    });
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0c040,
      roughness: 0.7,
      metalness: 0.1,
      emissive: 0xf0c040,
      emissiveIntensity: 0.05,
    });

    // Groupe principal - tout y va, on le fait tourner
    const charpenteGroup = new THREE.Group();
    scene.add(charpenteGroup);

    // ===== DIMENSIONS DE LA CHARPENTE =====
    const longueur = 8;   // longueur batiment (axe Z)
    const largeur = 6;    // largeur batiment (axe X)
    const hauteurMurs = 0;        // a la sabliere
    const hauteurFaitage = 3;     // au faitage
    const nbFermes = 3;           // nombre de fermes (espacees regulierement)
    const nbChevronsParPan = 7;   // nb chevrons par cote du toit

    // ===== SABLIERES (2 - une de chaque cote) =====
    const sabliereGeom = new THREE.BoxGeometry(0.15, 0.15, longueur);
    [-largeur / 2, largeur / 2].forEach((x) => {
      const sabliere = new THREE.Mesh(sabliereGeom, woodMaterialDark);
      sabliere.position.set(x, hauteurMurs, 0);
      charpenteGroup.add(sabliere);
    });

    // ===== FERMES =====
    // Une ferme = 2 arbaletriers + 1 entrait
    const fermePositions: number[] = [];
    for (let i = 0; i < nbFermes; i++) {
      const z = -longueur / 2 + (i * longueur) / (nbFermes - 1);
      fermePositions.push(z);
    }

    fermePositions.forEach((z) => {
      // Entrait horizontal (entre les deux sablieres)
      const entraitGeom = new THREE.BoxGeometry(largeur, 0.15, 0.15);
      const entrait = new THREE.Mesh(entraitGeom, woodMaterialDark);
      entrait.position.set(0, hauteurMurs, z);
      charpenteGroup.add(entrait);

      // 2 arbaletriers
      const longueurArbal = Math.sqrt(
        Math.pow(largeur / 2, 2) + Math.pow(hauteurFaitage, 2)
      );
      [-1, 1].forEach((cote) => {
        const arbalGeom = new THREE.BoxGeometry(0.18, 0.18, longueurArbal);
        const arbal = new THREE.Mesh(arbalGeom, woodMaterial);
        // Position au milieu de la pente
        arbal.position.set((cote * largeur) / 4, hauteurFaitage / 2, z);
        // Rotation pour suivre la pente
        const angle = Math.atan2(hauteurFaitage, largeur / 2);
        arbal.rotation.y = Math.PI / 2;
        arbal.rotation.x = cote * angle;
        charpenteGroup.add(arbal);
      });

      // Petit cube au faitage pour visuel
      const faitageNode = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.2, 0.2),
        accentMaterial
      );
      faitageNode.position.set(0, hauteurFaitage, z);
      charpenteGroup.add(faitageNode);
    });

    // ===== PANNES (3 par pan : sabliere deja faite, intermediaire, faitiere) =====
    // Faitiere
    const faitiereGeom = new THREE.BoxGeometry(0.15, 0.15, longueur);
    const faitiere = new THREE.Mesh(faitiereGeom, accentMaterial);
    faitiere.position.set(0, hauteurFaitage, 0);
    charpenteGroup.add(faitiere);

    // Pannes intermediaires (1 de chaque cote)
    [-1, 1].forEach((cote) => {
      const panneInter = new THREE.Mesh(faitiereGeom, woodMaterial);
      panneInter.position.set((cote * largeur) / 4, hauteurFaitage / 2, 0);
      charpenteGroup.add(panneInter);
    });

    // ===== CHEVRONS (perpendiculaires aux pannes, suivent la pente) =====
    const longueurChevron = Math.sqrt(
      Math.pow(largeur / 2, 2) + Math.pow(hauteurFaitage, 2)
    );
    const chevronGeom = new THREE.BoxGeometry(0.08, 0.08, longueurChevron);

    for (let i = 0; i < nbChevronsParPan; i++) {
      const z = -longueur / 2 + (i * longueur) / (nbChevronsParPan - 1);

      // Chevron cote gauche
      const chevronG = new THREE.Mesh(chevronGeom, woodMaterial);
      chevronG.position.set(-largeur / 4, hauteurFaitage / 2, z);
      chevronG.rotation.y = Math.PI / 2;
      chevronG.rotation.x = Math.atan2(hauteurFaitage, largeur / 2);
      charpenteGroup.add(chevronG);

      // Chevron cote droit
      const chevronD = new THREE.Mesh(chevronGeom, woodMaterial);
      chevronD.position.set(largeur / 4, hauteurFaitage / 2, z);
      chevronD.rotation.y = Math.PI / 2;
      chevronD.rotation.x = -Math.atan2(hauteurFaitage, largeur / 2);
      charpenteGroup.add(chevronD);
    }

    // Rotation legere pour vue 3/4
    charpenteGroup.rotation.y = -0.4;

    // ===== ANIMATION : rotation lente continue =====
    let animationFrameId: number;
    let frame = 0;
    const animate = () => {
      frame++;
      charpenteGroup.rotation.y = -0.4 + Math.sin(frame * 0.0015) * 0.15;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // ===== RESPONSIVE =====
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // ===== CLEANUP =====
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      aria-hidden="true"
    />
  );
}
