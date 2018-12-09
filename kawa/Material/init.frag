precision mediump float;
uniform int po;

float near = 2.;
float far = 45.;
float FOV = 3.14159/2.;
float asp = 1.;


float rand(vec2 uv){
    return fract(sin(dot(uv.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
void main(){
  vec2 uv = gl_FragCoord.xy/128.0;
  float screen = 1000.;
  float x = screen*(rand(uv)-0.5);
  float y = screen*(rand(-uv+vec2(1))-0.5);
  float z = -near - (far - near)*rand(uv.yx);
  vec3 pos = vec3(x,y,z);
  gl_FragColor = vec4(pos,1.);
}
