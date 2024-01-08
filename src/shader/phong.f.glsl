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


uniform bool isPhong; 
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



// main function gets executed for every pixel
void main()
{
  //this colors all fragments (pixels) in the same color (RGBA)
  if (isPhong){
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

    // TODO : add Ka 
    fragColor = vec4(color.r*res * diffuse_reflectance + ls* specular_color.r + ambient_color.r * ambient_reflectance ,
                    color.g*res * diffuse_reflectance + ls* specular_color.g + ambient_color.g * ambient_reflectance,
                    color.b*res * diffuse_reflectance + ls* specular_color.b + ambient_color.b * ambient_reflectance,
                    1.) ;
   
  }
  
}
