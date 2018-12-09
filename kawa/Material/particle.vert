attribute float index;
varying float depth;
uniform sampler2D texture;

float near = 5.;
float far = 50.;
float FOV = 3.14159/2.;
float asp = 1.;
mat4 mvp = mat4(
 1./asp*tan(FOV/2.),0,0,0,
 0,1./tan(FOV/2.),0,0,
 0,0,(near+far)/(near-far),2.*far*near/(near-far),
 0,0,-1.,0.
);

void main(){
  float res = 128.;
  vec2 p = vec2(
      mod(index,res)/res,
      floor(index/res)/res
  );
  vec4 position = mvp*texture2D(texture,p);
  depth = position.z/45.;
  gl_PointSize = 50./position.z;
  gl_Position = vec4(position);
}
