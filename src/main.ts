// external dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// local from us provided utilities
import RenderWidget from './lib/rendererWidget';
import { Application, createWindow } from './lib/window';
import type * as utils from './lib/utils';

// helper lib, provides exercise dependent prewritten Code
import * as helper from './helper';

// create scene
var scene = new THREE.Scene();

var materialAmbient = helper.setupGeometryAmbient(scene);
var materialNormal = helper.setupGeometryNormal(scene);
var materialToon = helper.setupGeometryToon(scene);
var materialLambert = helper.setupGeometryLambert(scene);
var materialGouraud = helper.setupGeometryGouraud(scene);
var materialPhong = helper.setupGeometryPhong(scene);
var materialCook = helper.setupGeometryCook(scene);


// add light 
var lightgeo = new THREE.SphereGeometry(0.1, 32, 32);
var lightMaterial = new THREE.MeshBasicMaterial({color: 0xff8010});
var light = new THREE.Mesh(lightgeo, lightMaterial);
light.position.x = 2.;
light.position.y = 2.;
light.position.z = 2.; 
scene.add(light);

// create Settingsand create GUI settings
var settings = new helper.Settings();
helper.createGUI(settings);
// adds the callback that gets called on params change
settings.addCallback(callback);


function callback(changed: utils.KeyValuePair<helper.Settings>) {
  //light 
  if(changed.key == 'lightX'){
    light.position.x = changed.value;
    materialLambert.uniforms.light = { value : light.position };
    materialGouraud.uniforms.light = { value : light.position };
    materialPhong.uniforms.light = { value : light.position };
    materialCook.uniforms.light = { value : light.position };
  }
  if(changed.key == 'lightY'){
    light.position.y = changed.value;
    materialLambert.uniforms.light = { value : light.position };
    materialGouraud.uniforms.light = { value : light.position };
    materialPhong.uniforms.light = { value : light.position };
    materialCook.uniforms.light = { value : light.position };

  }
  if(changed.key == 'lightZ'){
    light.position.z = changed.value;
    materialLambert.uniforms.light = { value : light.position };
    materialGouraud.uniforms.light = { value : light.position };
    materialPhong.uniforms.light = { value : light.position };
    materialCook.uniforms.light = { value : light.position };


  }
  if (changed.key == 'diffuse_color' ) {
    materialGouraud.uniforms.color =  { value : new THREE.Vector3(changed.value[0]/255,changed.value[1]/255,changed.value[2]/255)  };
    materialPhong.uniforms.color =  { value : new THREE.Vector3(changed.value[0]/255,changed.value[1]/255,changed.value[2]/255)  };
    materialCook.uniforms.diffuse_color =  { value : new THREE.Vector3(changed.value[0]/255,changed.value[1]/255,changed.value[2]/255)  };

  }
  if(changed.key == 'diffuse_reflectance'){
    materialLambert.uniforms.diffuse_reflectance = {value : changed.value}; 
    materialGouraud.uniforms.diffuse_reflectance = { value : changed.value };
    materialPhong.uniforms.diffuse_reflectance = { value : changed.value };
    materialCook.uniforms.diffuse_reflectance = { value : changed.value };
  }
  if(changed.key == 'specular_reflectance'){
    materialGouraud.uniforms.specular_reflectance = { value : changed.value };
    materialPhong.uniforms.specular_reflectance = { value : changed.value };
    materialCook.uniforms.specular_reflectance = { value : changed.value };
  }
  if(changed.key == 'magnitude'){
    materialGouraud.uniforms.shininess = { value : changed.value };
    materialPhong.uniforms.shininess = { value : changed.value };
  }

  if (changed.key == 'ambient_color' ) {
    materialGouraud.uniforms.ambient_color = {value :new THREE.Vector3(changed.value[0]/255,changed.value[1]/255,changed.value[2]/255)  };
    materialPhong.uniforms.ambient_color = {value :new THREE.Vector3(changed.value[0]/255,changed.value[1]/255,changed.value[2]/255)  };
    materialLambert.uniforms.ambient_color = {value :new THREE.Vector3(changed.value[0]/255,changed.value[1]/255,changed.value[2]/255)  };

  }
  if (changed.key == 'ambient_reflectance' ) {
    materialGouraud.uniforms.ambient_reflectance = {value : changed.value};
    materialPhong.uniforms.ambient_reflectance = {value : changed.value};
    materialAmbient.uniforms.ambient_reflectance = {value : changed.value};
  }
  if (changed.key == 'specular_color' ) {
    materialGouraud.uniforms.specular_color = {value : new THREE.Vector3(changed.value[0]/255,changed.value[1]/255,changed.value[2]/255)};
    materialPhong.uniforms.specular_color = {value : new THREE.Vector3(changed.value[0]/255,changed.value[1]/255,changed.value[2]/255)};
    materialCook.uniforms.specular_color = {value : new THREE.Vector3(changed.value[0]/255,changed.value[1]/255,changed.value[2]/255)};
  }

  if (changed.key == 'roughness' ) {
    materialCook.uniforms.roughness = {value : changed.value};
  }

  if(settings.shader == helper.Shaders.ambient ){
    materialAmbient.uniforms.isAmbient = {value: true}; 
    if (changed.key == 'ambient_color' ) {
      materialAmbient.uniforms.color = {value : new THREE.Vector3(changed.value[0]/255,changed.value[1]/255,changed.value[2]/255) };
    }
    if (changed.key == 'ambient_reflectance') {
      materialAmbient.uniforms.ambient_reflectance = {value: changed.value}
    }
  }else{
    materialAmbient.uniforms.isAmbient = {value: false}; 
  }


  if(settings.shader == helper.Shaders.normal ){   
    materialNormal.uniforms.isNormal = {value: true}; 
  }else{
    materialNormal.uniforms.isNormal = {value: false}; 
  }

  if(settings.shader == helper.Shaders.toon ){   
    materialToon.uniforms.isToon = {value: true};     
  }else{
    materialToon.uniforms.isToon = {value: false}; 
  }

  if(settings.shader == helper.Shaders.lambert ){   
    materialLambert.uniforms.isLambert = {value: true};     
  }else{
    materialLambert.uniforms.isLambert = {value: false}; 
  }

  if(settings.shader == helper.Shaders.gouraud_phong ){   
    materialGouraud.uniforms.isGouraud = {value: true};     
  }else{
    materialGouraud.uniforms.isGouraud = {value: false}; 
  }
  if(settings.shader == helper.Shaders.phong_phong ){   
    materialPhong.uniforms.isPhong = {value: true};     
  }else{
    materialPhong.uniforms.isPhong = {value: false}; 
  }
  if(settings.shader == helper.Shaders.phong_cooktorrance ){   
    materialCook.uniforms.isCook = {value: true};     
  }else{
    materialCook.uniforms.isCook = {value: false}; 
  }
  


}

function main(){
  // setup/layout root Application.
  // Its the body HTMLElement with some additional functions.
  // More complex layouts are possible too.
  var root = Application("Shader");
	root.setLayout([["renderer"]]);
  root.setLayoutColumns(["100%"]);
  root.setLayoutRows(["100%"]);

   // create RenderDiv
	var rendererDiv = createWindow("renderer");
  root.appendChild(rendererDiv);

  // create renderer
  var renderer = new THREE.WebGLRenderer({
      antialias: true,  // to enable anti-alias and get smoother output
  });



  // create camera
  var camera = new THREE.PerspectiveCamera();
  helper.setupCamera(camera, scene);

  // create controls
  var controls = new OrbitControls(camera, rendererDiv);
  helper.setupControls(controls);


  // Task1
  materialAmbient.uniforms.color = {value : new THREE.Vector3(104/255,13/255,13/255) }
  materialAmbient.uniforms.ambient_reflectance = {value : 0.5 }
  materialAmbient.uniforms.isAmbient = {value : false }
  // Task2
  materialNormal.uniforms.isNormal = {value : false }
  // Task3
  materialToon.uniforms.isToon = {value : false }
  // Task4
  materialLambert.uniforms.isLambert = {value : false }
  materialLambert.uniforms.color = {value : new THREE.Vector3(204/255,25/255,25/255) }
  materialLambert.uniforms.diffuse_reflectance = {value : 1. }
  materialLambert.uniforms.light = {value : new THREE.Vector3(2.,2.,2.) }
  materialLambert.uniforms.ambient_color = {value : new THREE.Vector3(104/255,13/255,13/255) }
  materialLambert.uniforms.ambient_reflectance = {value : 0.5 }


  // Task5
  materialGouraud.uniforms.isGouraud = {value : false }
  materialGouraud.uniforms.color = {value : new THREE.Vector3(204/255,25/255,25/255) }
  materialGouraud.uniforms.diffuse_reflectance = {value : 1. }
  materialGouraud.uniforms.light = {value : new THREE.Vector3(2.,2.,2.) }
  materialGouraud.uniforms.specular_reflectance = {value : 1. }
  materialGouraud.uniforms.shininess = {value : 128. }
  materialGouraud.uniforms.ambient_color = {value : new THREE.Vector3(104/255,13/255,13/255) }
  materialGouraud.uniforms.ambient_reflectance = {value : 0.5 }
  materialGouraud.uniforms.specular_color = {value : new THREE.Vector3(1.,1.,1.) }


  materialPhong.uniforms.isPhong = {value : false }
  materialPhong.uniforms.color = {value : new THREE.Vector3(204/255,25/255,25/255) }
  materialPhong.uniforms.diffuse_reflectance = {value : 1. }
  materialPhong.uniforms.light = {value : new THREE.Vector3(2.,2.,2.) }
  materialPhong.uniforms.specular_reflectance = {value : 1. }
  materialPhong.uniforms.shininess = {value : 128. }
  materialPhong.uniforms.ambient_color = {value : new THREE.Vector3(104/255,13/255,13/255) }
  materialPhong.uniforms.ambient_reflectance = {value : 0.5 }
  materialPhong.uniforms.specular_color = {value : new THREE.Vector3(1.,1.,1.) }

  // Task 6
  materialCook.uniforms.isCook = {value : false }
  materialCook.uniforms.diffuse_color = {value : new THREE.Vector3(204/255,25/255,25/255) }
  materialCook.uniforms.diffuse_reflectance = {value : 1. }
  materialCook.uniforms.light = {value : new THREE.Vector3(2.,2.,2.) }
  materialCook.uniforms.specular_reflectance = {value : 1. }
  materialCook.uniforms.specular_color = {value : new THREE.Vector3(1.,1.,1.) }
  materialCook.uniforms.roughness = {value : 0.2 }

  var wid = new RenderWidget(rendererDiv, renderer, camera, scene, controls);
  // start the draw loop (this call is async)
  wid.animate();
}

// call main entrypoint
main();
