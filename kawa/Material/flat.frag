precision mediump float;
uniform float timer;
uniform sampler2D texture;

void main(){
  vec2 uv = gl_FragCoord.xy/128.;
  vec4 tex = texture2D(texture,uv);
  //vec2 uv = gl_PointCoord.xy;
  //gl_FragColor = vec4(1);
  vec2 pos = tex.xy;
  pos.y += 0.01;
  gl_FragColor = vec4(pos,1,1);
}
