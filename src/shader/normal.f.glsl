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

uniform bool isNormal; 
in vec3 vNormal; 


// main function gets executed for every pixel
void main()
{
  //this colors all fragments (pixels) in the same color (RGBA)
  if (isNormal){
    vec3 tmp = normalize(vNormal);
    // (x+1)/2 just for the function to be bijective. Range of vector  [-1,1] -> [0,1]
    fragColor = vec4((tmp.r+1.0)/2.0,(tmp.g+1.0)/2.0,(tmp.b+1.0)/2.0, 1.0) ;
  }
  
}
