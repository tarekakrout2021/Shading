// These uniforms and attributes are provided by threejs.
// If you want to add your own, look at https://threejs.org/docs/#api/en/materials/ShaderMaterial #Custom attributes and uniforms
// defines the precision
precision highp float;

// = object.matrixWorld
uniform mat4 modelMatrix;

// = camera.matrixWorldInverse * object.matrixWorld
uniform mat4 modelViewMatrix;

// = camera.projectionMatrix
uniform mat4 projectionMatrix;

// = camera.matrixWorldInverse
uniform mat4 viewMatrix;

// = inverse transpose of modelViewMatrix
uniform mat3 normalMatrix;

// = camera position in world space
uniform vec3 cameraPosition;

uniform bool isCook; 
uniform vec3 diffuse_color; 
uniform float diffuse_reflectance;
uniform vec3 light; 
uniform float specular_reflectance;
uniform vec3 specular_color; 
uniform float roughness; 

// default vertex attributes provided by Geometry and BufferGeometry
in vec3 position;
in vec3 normal;
in vec2 uv;

out vec3 vPos;
out vec3 vNormal; 



// main function gets executed for every vertex
void main()
{
  //gl_Position = vec4(0., 0., 0., 1.0);
  if (isCook){
    vPos = position; 
    vNormal = normalize(vec3(transpose(inverse(modelMatrix)) *vec4(normal,1.0))); 
    gl_Position = projectionMatrix * modelViewMatrix*vec4(position,1.0);
  }
}
