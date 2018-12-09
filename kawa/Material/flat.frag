precision mediump float;
uniform float timer;
uniform sampler2D texture;

float rand(vec2 uv){
    return fract(sin(dot(uv.xy ,vec2(timer + 12.9898,78.233))) * 43758.5453);
}
void main(){
  vec2 uv = gl_FragCoord.xy/128.;
  vec4 tex = texture2D(texture,uv);
  //vec2 uv = gl_PointCoord.xy;
  //gl_FragColor = vec4(1);
  vec3 pos = tex.xyz;
  pos.y -= 0.5;
  pos.x += (rand(pos.xy)-0.5)*0.4;
  //pos.z += (rand(pos.zx)-0.5);
  pos.z = max(min(-5.,pos.z),-50.);
  if(pos.y<-500.)pos.y=500.;
  gl_FragColor = vec4(pos,1);
}
