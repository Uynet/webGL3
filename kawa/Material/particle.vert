attribute float index;
varying float depth;
varying float spe;
uniform sampler2D texture;

vec3 up     = normalize(vec3(0,1,0));
vec3 forward= normalize(vec3(0,0,1));
vec3 side   = normalize(cross(forward,up));
vec3 eye = vec3(0,0,0);
mat4 view = mat4(
    side,-dot(eye,side),
    up,-dot(eye,up),
    forward,-dot(eye,forward),
    0,0,0,1
);

float near = 5.;
float far = 45.;
float FOV = 3.14159/2.;
float asp = 1.;
mat4 mvp = mat4(
 1./(asp*tan(FOV/2.)),0,0,0,
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
  vec3 tex = texture2D(texture,p).rgb;
  vec4 position = view*mvp*vec4(tex,0);
  //depth = position.z/45.;
  depth = position.z/45.;
  //float timer = tex.w;
  spe = 4.*pow(
      max(0.,cos(position.y*0.1)*cos(position.x*1.)),
      4.);
  gl_PointSize = 1.+(5.*spe + 30.)/position.z;
  //gl_PointSize = 3.;
  gl_Position = vec4(position);
}
