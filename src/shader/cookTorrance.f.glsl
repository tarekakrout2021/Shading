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


uniform bool isCook; 
uniform vec3 diffuse_color; 
uniform float diffuse_reflectance;
uniform vec3 light; 
uniform float specular_reflectance;
uniform vec3 specular_color; 
uniform float roughness; 

in vec3 vPos; 
in vec3 vNormal; 



// main function gets executed for every pixel
void main()
{
  //this colors all fragments (pixels) in the same color (RGBA)
  if (isCook){
    vec3 n = normalize(vNormal);
    vec3 l = normalize(light - vPos);
    vec3 v = normalize(cameraPosition - vPos);
    vec3 h = normalize(v+l);

    float g = 0.;
    float g1 = 0.;
    float g2 = 0.;
    float d = 0.;
    float PI = 3.14159265358979323846; 
    // is x == vPos ?
    float alpha2 = pow(roughness,2.);
    float dot12 = pow(dot(vPos,h),2.);
    float dot22 = pow(dot(l,h),2.);
    float dot32 = pow(dot(n,h),2.);
    if(dot(vPos,h)>0.){
      g1 = 2./(1. +sqrt(1.+ alpha2 *((1. - dot12 )/( dot12 ))  ));
    }

    if(dot(l,h)>0.){
      g2 = 2./(1. +sqrt(1.+ alpha2 *((1. -dot22 )/(dot22 ))  ));
    }

    if(dot(n,h)>0.){
      d = alpha2 /( PI*pow( dot32 * (   alpha2 + ((1. -dot32 )/(dot32 )) )       ,2.));
    }
    vec3 f = specular_color + (1. - specular_color) * pow(1. - dot(v,h), 5.);

    g = g1*g2;

    // vec3 r = vec3(2.*dot(n,l)*n.x, 2.*dot(n,l)*n.y,2.*dot(n,l)*n.z) - l; 
    float res = dot(normalize(l), normalize(n));
 
    if( res<0.){
      res =0.; 
    }

    vec3 fs ;
    fs.x = dot(n,l)*(d*g*f.x)/(4.*abs(dot(n,l))*abs(dot(n,v)+ 0.001)); 
    fs.y = dot(n,l)*(d*g*f.y)/(4.*abs(dot(n,l))*abs(dot(n,v)+ 0.001));
    fs.z = dot(n,l)*(d*g*f.z)/(4.*abs(dot(n,l))*abs(dot(n,v)+ 0.001));


    if(dot(n,l)>0.){
      fs.x+=dot(n,l)* (diffuse_color.r*res * diffuse_reflectance)/ PI;
      fs.y+=dot(n,l)* (diffuse_color.g*res * diffuse_reflectance)/ PI;
      fs.z+=dot(n,l)* (diffuse_color.b*res * diffuse_reflectance)/ PI;
    }else{
      fs = vec3(0.);
    }
    // TODO : add Ka 
    fragColor = vec4( fs.x* specular_color.r ,
                      fs.y* specular_color.g ,
                      fs.z* specular_color.b ,
                    1.) ;
   
  }
  
}
