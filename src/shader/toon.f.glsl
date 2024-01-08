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

uniform bool isToon; 
in vec3 vPos; 
in vec3 vNormal; 




// main function gets executed for every pixel
void main()
{
  //this colors all fragments (pixels) in the same color (RGBA)
  if (isToon){
    vec3 n = vNormal;
    vec3 viewDir = cameraPosition - vPos;
    float res = dot(normalize(viewDir), normalize(n));
    if (res <0.25){
      fragColor = vec4(0.2,0.1,0.1, 1.0) ;
    }
    else if (res >=0.25 && res < 0.5){
      fragColor = vec4(0.3,0.1,0.1, 1.0) ;
    }
    else if (res >=0.5 && res <=0.75){
      fragColor = vec4(0.5,0.1,0.1, 1.0) ;
    }else {
      fragColor = vec4(1.,0.1,0.1, 1.0) ;
    }

  }
  
}
