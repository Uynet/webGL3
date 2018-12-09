precision mediump float;
uniform float timer;
uniform sampler2D texture;

float rand(vec2 uv){
    return fract(sin(dot(uv.xy ,vec2(timer + 12.9898,78.233))) * 43758.5453);
}
void main(){
  vec2 uv = gl_FragCoord.xy/128.;
  //vec2 uv = gl_PointCoord.xy;
  //gl_FragColor = vec4(1);
  vec3 pos = texture2D(texture,uv).rgb;
  pos.y -= 0.5;
  pos.x += (rand(pos.xy)-0.5)*0.4;
  if(pos.y<-500.)pos.y=500.;
  gl_FragColor = vec4(pos,1.);
}
