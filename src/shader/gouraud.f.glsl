// defines the precision
precision highp float;

// we have access to the same uniforms as in the vertex shader
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

out vec4 fragColor;


uniform bool isGouraud; 
uniform vec3 color; 
uniform float diffuse_reflectance;
uniform vec3 light; 
uniform float specular_reflectance;
uniform float shininess;
uniform vec3 ambient_color; 
uniform float ambient_reflectance;
uniform vec3 specular_color; 

in vec3 vPos; 
in vec3 vNormal; 
in vec4 vCol; 



// main function gets executed for every pixel
void main()
{
  //this colors all fragments (pixels) in the same color (RGBA)
  if (isGouraud){


    // TODO : add Ka 
    fragColor = vCol ;
   
  }
  
}
