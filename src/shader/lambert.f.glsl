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


uniform bool isLambert; 
uniform vec3 color; 
uniform float diffuse_reflectance;
uniform vec3 light; 
uniform vec3 ambient_color; 
uniform float ambient_reflectance;

in vec3 vPos; 
in vec3 vNormal; 



// main function gets executed for every pixel
void main()
{
  //this colors all fragments (pixels) in the same color (RGBA)
  if (isLambert){
    vec3 n = vNormal;
    vec3 l = light - vPos;
    float res = dot(normalize(l), normalize(n));
    if ( res < 0.){
      res = 0.;
    }
    fragColor = vec4(color.r*res * diffuse_reflectance + ambient_reflectance * ambient_color.r,
                    color.g*res * diffuse_reflectance + ambient_reflectance * ambient_color.g,
                    color.b*res * diffuse_reflectance + ambient_reflectance * ambient_color.b,
                    1.) ;
   
  }
  
}
