precision mediump float;
uniform float timer;
//uniform sampler2D texture;

void main(){
  vec2 uv = gl_FragCoord.xy/128.;
  //vec2 uv = gl_PointCoord.xy;
  //gl_FragColor = vec4(1);
  //texture;
  vec3 col = 0.5 + 0.5*cos(timer/20.+uv.xyx+vec3(0,2,4));
  gl_FragColor = vec4(col,1);
}
