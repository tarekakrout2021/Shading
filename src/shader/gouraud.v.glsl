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

uniform bool isGouraud; 
uniform vec3 color; 
uniform float diffuse_reflectance;
uniform vec3 light; 
uniform float specular_reflectance;
uniform float shininess;
uniform vec3 ambient_color; 
uniform float ambient_reflectance;
uniform vec3 specular_color; 

// default vertex attributes provided by Geometry and BufferGeometry
in vec3 position;
in vec3 normal;
in vec2 uv;

out vec3 vPos;
out vec3 vNormal; 
out vec4 vCol; 



// main function gets executed for every vertex
void main()
{
  //gl_Position = vec4(0., 0., 0., 1.0);
  if (isGouraud){
    vPos = position; 
    vNormal = normalize(vec3(transpose(inverse(modelMatrix)) *vec4(normal,1.0))); 

    vec3 n = vNormal;
    vec3 l = light - vPos;
    vec3 v = cameraPosition - vPos;
    vec3 r = vec3(2.*dot(n,l)*n.x, 2.*dot(n,l)*n.y,2.*dot(n,l)*n.z) - l; 
    float res = dot(normalize(l), normalize(n));
 
    float ls = specular_reflectance * pow(dot(normalize(r),normalize(v)),shininess);
    if ( dot(normalize(r),normalize(v)) < 0.){
      ls = 0.; 
    }
    if( res<0.){
      res =0.; 
    }

    vCol = vec4(color.r*res * diffuse_reflectance + ls* specular_color.r + ambient_color.r * ambient_reflectance ,
                    color.g*res * diffuse_reflectance + ls* specular_color.g + ambient_color.g * ambient_reflectance,
                    color.b*res * diffuse_reflectance + ls* specular_color.b + ambient_color.b * ambient_reflectance,
                    1.); 

    gl_Position = projectionMatrix * modelViewMatrix*vec4(position,1.0);
  }
}
