precision mediump float;

void main(){
  vec2 uv = gl_FragCoord.xy/400.0;
  //vec2 uv = gl_PointCoord.xy;
  gl_FragColor = vec4(uv,1,1);
  //gl_FragColor = vec4(1);
}
