import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

// local from us provided utilities
import * as utils from './lib/utils';

// load shader
import basicVertexShader from './shader/basic.v.glsl?raw';
import basicFragmentShader from './shader/basic.f.glsl?raw';
import ambientVertexShader from './shader/ambient.v.glsl?raw';
import ambientFragmentShader from './shader/ambient.f.glsl?raw';
import normalVertexShader from './shader/normal.v.glsl?raw';
import normalFragmentShader from './shader/normal.f.glsl?raw';
import toonVertexShader from './shader/toon.v.glsl?raw';
import toonFragmentShader from './shader/toon.f.glsl?raw';
import lambertVertexShader from './shader/lambert.v.glsl?raw';
import lambertFragmentShader from './shader/lambert.f.glsl?raw';
import gouraudVertexShader from './shader/gouraud.v.glsl?raw';
import gouraudFragmentShader from './shader/gouraud.f.glsl?raw';
import phongVertexShader from './shader/phong.v.glsl?raw';
import phongFragmentShader from './shader/phong.f.glsl?raw';
import cookVertexShader from './shader/cookTorrance.v.glsl?raw';
import cookFragmentShader from './shader/cookTorrance.f.glsl?raw';

/*******************************************************************************
 * Defines Settings and GUI will later be seperated into settings.ts
 ******************************************************************************/

// enum(s)
export enum Shaders {
  basic = "Basic",
  ambient = "Ambient",
  normal = "Normal",
  toon = "Toon",
  lambert = "Lambert",
  gouraud_phong = "Gouraud",
  phong_phong = "Phong",
  phong_blinnPhong = "Blinn-Phong",
  phong_cooktorrance = "Cook-Torrance",
}

// (default) Settings.
export class Settings extends utils.Callbackable{
  // different setting types are possible (e.g. string, enum, number, boolean)
  shader: Shaders = Shaders.basic;
  ambient_reflectance: number = 0.5;
  ambient_color: [number, number, number] = [104, 13, 13];
  diffuse_reflectance: number = 1;
  diffuse_color: [number, number, number] = [204, 25, 25];
  specular_reflectance: number = 1;
  specular_color: [number, number, number] = [255, 255, 255];
  magnitude: number = 128;
  roughness: number = 0.2;
  lightX: number = 2;
  lightY: number = 2;
  lightZ: number = 2;
  light_color: [number, number, number] = [255, 255, 255];
  light_intensity: number = 1.0;
}

// create GUI given a Settings object
export function createGUI(params: Settings): dat.GUI {
  // we are using dat.GUI (https://github.com/dataarts/dat.gui)
  var gui: dat.GUI = new dat.GUI();

  // build GUI
  gui.add(params, 'shader', utils.enumOptions(Shaders)).name('Shader');

  gui.add(params, 'ambient_reflectance', 0, 1, 0.01).name('Ambient reflec...');
  gui.addColor(params, 'ambient_color').name('Ambient color');

  gui.add(params, 'diffuse_reflectance', 0, 1, 0.01).name('Diffuse reflect...');
  gui.addColor(params, 'diffuse_color').name('Diffuse color');

  gui.add(params, 'specular_reflectance', 0, 1, 0.01).name('Specular reflec...');
  gui.addColor(params, 'specular_color').name('Specular color');

  gui.add(params, 'magnitude', 0, 128, 1).name('Shininess');
  gui.add(params, 'roughness', 0, 1, 0.01).name('Roughness');

  var lightFolder = gui.addFolder("Light");
  lightFolder.add(params, 'lightX', -10, 10, 0.5).name('X');
  lightFolder.add(params, 'lightY', -10, 10, 0.5).name('Y');
  lightFolder.add(params, 'lightZ', -10, 10, 0.5).name('Z');
  lightFolder.addColor(params, 'light_color').name('Color');
  lightFolder.add(params, 'light_intensity', 0, 4, 0.05).name('Intensity');
  lightFolder.open();

  return gui;
}


/*******************************************************************************
 * helper functions to build scene (geometry, light), camera and controls.
 ******************************************************************************/

export function setupGeometry(scene: THREE.Scene){
    // https://threejs.org/docs/#api/en/geometries/BoxGeometry
    var torusKnotGeo = new THREE.TorusKnotGeometry(1, 0.3, 100, 32)
    var sphereGeo1 = new THREE.SphereGeometry(1.4, 20, 20);
    var boxGeo = new THREE.BoxGeometry(2, 2, 2);
    var sphereGeo2 = new THREE.SphereGeometry(1.4, 20, 20);
    var material = new THREE.RawShaderMaterial( {
     vertexShader: basicVertexShader,
     fragmentShader: basicFragmentShader
    });
    material.glslVersion = THREE.GLSL3;

    var model0 = new THREE.Mesh(torusKnotGeo, material);
    scene.add(model0);

    sphereGeo1.scale(1, 0.5, 1);
    var model1 = new THREE.Mesh(sphereGeo1, material);
    model1.rotateX(3.141592/2);
    model1.translateX(-4);
    model1.translateZ(-1.5);
    scene.add(model1);

    var model2 = new THREE.Mesh(sphereGeo2, material);
    model2.scale.set(1, 0.5, 1);
    model2.rotateX(3.141592/2);
    model2.translateX(-4);
    model2.translateZ(1.5);
    scene.add(model2);

    var model3 = new THREE.Mesh(boxGeo, material);
    model3.translateX(4);
    scene.add(model3);

    return { material, model0, model1, model2, model3 };
 };


 export function setupGeometryAmbient(scene: THREE.Scene){
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  var torusKnotGeo = new THREE.TorusKnotGeometry(1, 0.3, 100, 32)
  var sphereGeo1 = new THREE.SphereGeometry(1.4, 20, 20);
  var boxGeo = new THREE.BoxGeometry(2, 2, 2);
  var sphereGeo2 = new THREE.SphereGeometry(1.4, 20, 20);
  var material = new THREE.RawShaderMaterial( {
   vertexShader: ambientVertexShader,
   fragmentShader: ambientFragmentShader
  });
  material.glslVersion = THREE.GLSL3;

  var model0 = new THREE.Mesh(torusKnotGeo, material);
  scene.add(model0);

  sphereGeo1.scale(1, 0.5, 1);
  var model1 = new THREE.Mesh(sphereGeo1, material);
  model1.rotateX(3.141592/2);
  model1.translateX(-4);
  model1.translateZ(-1.5);
  scene.add(model1);

  var model2 = new THREE.Mesh(sphereGeo2, material);
  model2.scale.set(1, 0.5, 1);
  model2.rotateX(3.141592/2);
  model2.translateX(-4);
  model2.translateZ(1.5);
  scene.add(model2);

  var model3 = new THREE.Mesh(boxGeo, material);
  model3.translateX(4);
  scene.add(model3);

  return material;
};



export function setupGeometryNormal(scene: THREE.Scene){
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  var torusKnotGeo = new THREE.TorusKnotGeometry(1, 0.3, 100, 32)
  var sphereGeo1 = new THREE.SphereGeometry(1.4, 20, 20);
  var boxGeo = new THREE.BoxGeometry(2, 2, 2);
  var sphereGeo2 = new THREE.SphereGeometry(1.4, 20, 20);
  var material = new THREE.RawShaderMaterial( {
   vertexShader: normalVertexShader,
   fragmentShader: normalFragmentShader
  });
  material.glslVersion = THREE.GLSL3;

  var model0 = new THREE.Mesh(torusKnotGeo, material);
  scene.add(model0);

  sphereGeo1.scale(1, 0.5, 1);
  var model1 = new THREE.Mesh(sphereGeo1, material);
  model1.rotateX(3.141592/2);
  model1.translateX(-4);
  model1.translateZ(-1.5);
  scene.add(model1);

  var model2 = new THREE.Mesh(sphereGeo2, material);
  model2.scale.set(1, 0.5, 1);
  model2.rotateX(3.141592/2);
  model2.translateX(-4);
  model2.translateZ(1.5);
  scene.add(model2);

  var model3 = new THREE.Mesh(boxGeo, material);
  model3.translateX(4);
  scene.add(model3);

  return material;
};


export function setupGeometryToon(scene: THREE.Scene){
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  var torusKnotGeo = new THREE.TorusKnotGeometry(1, 0.3, 100, 32)
  var sphereGeo1 = new THREE.SphereGeometry(1.4, 20, 20);
  var boxGeo = new THREE.BoxGeometry(2, 2, 2);
  var sphereGeo2 = new THREE.SphereGeometry(1.4, 20, 20);
  var material = new THREE.RawShaderMaterial( {
   vertexShader: toonVertexShader,
   fragmentShader: toonFragmentShader
  });
  material.glslVersion = THREE.GLSL3;

  var model0 = new THREE.Mesh(torusKnotGeo, material);
  scene.add(model0);

  sphereGeo1.scale(1, 0.5, 1);
  var model1 = new THREE.Mesh(sphereGeo1, material);
  model1.rotateX(3.141592/2);
  model1.translateX(-4);
  model1.translateZ(-1.5);
  scene.add(model1);

  var model2 = new THREE.Mesh(sphereGeo2, material);
  model2.scale.set(1, 0.5, 1);
  model2.rotateX(3.141592/2);
  model2.translateX(-4);
  model2.translateZ(1.5);
  scene.add(model2);

  var model3 = new THREE.Mesh(boxGeo, material);
  model3.translateX(4);
  scene.add(model3);

  return material;
};


export function setupGeometryLambert(scene: THREE.Scene){
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  var torusKnotGeo = new THREE.TorusKnotGeometry(1, 0.3, 100, 32)
  var sphereGeo1 = new THREE.SphereGeometry(1.4, 20, 20);
  var boxGeo = new THREE.BoxGeometry(2, 2, 2);
  var sphereGeo2 = new THREE.SphereGeometry(1.4, 20, 20);
  var material = new THREE.RawShaderMaterial( {
   vertexShader: lambertVertexShader,
   fragmentShader: lambertFragmentShader
  });
  material.glslVersion = THREE.GLSL3;

  var model0 = new THREE.Mesh(torusKnotGeo, material);
  scene.add(model0);

  sphereGeo1.scale(1, 0.5, 1);
  var model1 = new THREE.Mesh(sphereGeo1, material);
  model1.rotateX(3.141592/2);
  model1.translateX(-4);
  model1.translateZ(-1.5);
  scene.add(model1);

  var model2 = new THREE.Mesh(sphereGeo2, material);
  model2.scale.set(1, 0.5, 1);
  model2.rotateX(3.141592/2);
  model2.translateX(-4);
  model2.translateZ(1.5);
  scene.add(model2);

  var model3 = new THREE.Mesh(boxGeo, material);
  model3.translateX(4);
  scene.add(model3);

  return material;
};


export function setupGeometryGouraud(scene: THREE.Scene){
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  var torusKnotGeo = new THREE.TorusKnotGeometry(1, 0.3, 100, 32)
  var sphereGeo1 = new THREE.SphereGeometry(1.4, 20, 20);
  var boxGeo = new THREE.BoxGeometry(2, 2, 2);
  var sphereGeo2 = new THREE.SphereGeometry(1.4, 20, 20);
  var material = new THREE.RawShaderMaterial( {
   vertexShader: gouraudVertexShader,
   fragmentShader: gouraudFragmentShader
  });
  material.glslVersion = THREE.GLSL3;

  var model0 = new THREE.Mesh(torusKnotGeo, material);
  scene.add(model0);

  sphereGeo1.scale(1, 0.5, 1);
  var model1 = new THREE.Mesh(sphereGeo1, material);
  model1.rotateX(3.141592/2);
  model1.translateX(-4);
  model1.translateZ(-1.5);
  scene.add(model1);

  var model2 = new THREE.Mesh(sphereGeo2, material);
  model2.scale.set(1, 0.5, 1);
  model2.rotateX(3.141592/2);
  model2.translateX(-4);
  model2.translateZ(1.5);
  scene.add(model2);

  var model3 = new THREE.Mesh(boxGeo, material);
  model3.translateX(4);
  scene.add(model3);

  return material;
};


export function setupGeometryPhong(scene: THREE.Scene){
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  var torusKnotGeo = new THREE.TorusKnotGeometry(1, 0.3, 100, 32)
  var sphereGeo1 = new THREE.SphereGeometry(1.4, 20, 20);
  var boxGeo = new THREE.BoxGeometry(2, 2, 2);
  var sphereGeo2 = new THREE.SphereGeometry(1.4, 20, 20);
  var material = new THREE.RawShaderMaterial( {
   vertexShader: phongVertexShader,
   fragmentShader: phongFragmentShader
  });
  material.glslVersion = THREE.GLSL3;

  var model0 = new THREE.Mesh(torusKnotGeo, material);
  scene.add(model0);

  sphereGeo1.scale(1, 0.5, 1);
  var model1 = new THREE.Mesh(sphereGeo1, material);
  model1.rotateX(3.141592/2);
  model1.translateX(-4);
  model1.translateZ(-1.5);
  scene.add(model1);

  var model2 = new THREE.Mesh(sphereGeo2, material);
  model2.scale.set(1, 0.5, 1);
  model2.rotateX(3.141592/2);
  model2.translateX(-4);
  model2.translateZ(1.5);
  scene.add(model2);

  var model3 = new THREE.Mesh(boxGeo, material);
  model3.translateX(4);
  scene.add(model3);

  return material;
};

export function setupGeometryCook(scene: THREE.Scene){
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  var torusKnotGeo = new THREE.TorusKnotGeometry(1, 0.3, 100, 32)
  var sphereGeo1 = new THREE.SphereGeometry(1.4, 20, 20);
  var boxGeo = new THREE.BoxGeometry(2, 2, 2);
  var sphereGeo2 = new THREE.SphereGeometry(1.4, 20, 20);
  var material = new THREE.RawShaderMaterial( {
   vertexShader: cookVertexShader,
   fragmentShader: cookFragmentShader
  });
  material.glslVersion = THREE.GLSL3;

  var model0 = new THREE.Mesh(torusKnotGeo, material);
  scene.add(model0);

  sphereGeo1.scale(1, 0.5, 1);
  var model1 = new THREE.Mesh(sphereGeo1, material);
  model1.rotateX(3.141592/2);
  model1.translateX(-4);
  model1.translateZ(-1.5);
  scene.add(model1);

  var model2 = new THREE.Mesh(sphereGeo2, material);
  model2.scale.set(1, 0.5, 1);
  model2.rotateX(3.141592/2);
  model2.translateX(-4);
  model2.translateZ(1.5);
  scene.add(model2);

  var model3 = new THREE.Mesh(boxGeo, material);
  model3.translateX(4);
  scene.add(model3);

  return material;
};


 // define camera that looks into scene
export function setupCamera(camera: THREE.PerspectiveCamera, scene: THREE.Scene){
  // https://threejs.org/docs/#api/cameras/PerspectiveCamera
  camera.near = 0.01;
  camera.far = 20;
  camera.fov = 70;
  camera.position.z = 6;
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix()
  return camera
}

 // define controls (mouse interaction with the renderer)
export function setupControls(controls: OrbitControls){
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.enableZoom = true;
  controls.keys = {LEFT: "KeyA", UP:"KeyW", RIGHT: "KeyD", BOTTOM:"KeyS"};
  controls.listenToKeyEvents(document.body);
  controls.minDistance = 0.1;
  controls.maxDistance = 9;
  return controls;
};
