import * as THREE from 'three';
import testVertexShader from './shaders/generation-pattern/generation-pattern.vertex.glsl';
import testFragmentShader from './shaders/generation-pattern/generation-pattern.fragment.glsl';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(240, 240);

const shapeCollection = {
    circles: `
        float d = sdCircle(uv, 0.);
        vec3 col = palette(length(uv0) + vTime);
    `,
    triangles: `
        float d = sdEquilateralTriangle(uv, 0.5);
        vec3 col = palette(sdEquilateralTriangle(uv0, 0.25) + vTime);
    `,
    squares: `
        float d = sdBox(uv, vec2(0.25, 0.25));
        vec3 col = palette(sdBox(uv0, vec2(0.25, 0.25)) + vTime);
    `,
};

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader.replace('shape_replacement();', shapeCollection.squares),
    uniforms:
    {
        uFrequency: { value: new THREE.Vector2(10, 5) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('orange') },
        uIterations: { value: 1 },
    },
});

// Mesh
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 640,
    height: 640,
};

const camera = new THREE.OrthographicCamera(
    -canvas.width * 0.4,
    canvas.width * 0.4,
    canvas.height * 0.8,
    -canvas.height * 0.8,
    0,
    1000
  );
camera.position.z = 1;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update material
    material.uniforms.uTime.value = elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
};

tick();

export const updateShape = (shapeKey) => {
    mesh.material.fragmentShader = testFragmentShader.replace('shape_replacement();', shapeCollection[shapeKey]);
    mesh.material.needsUpdate = true;
};

export const updateIterations = (iterations) => {
    material.uniforms.uIterations.value = iterations;
};