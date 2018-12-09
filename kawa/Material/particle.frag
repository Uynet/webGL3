precision mediump float;
varying float depth;


void main(){
  //vec2 uv = gl_FragCoord.xy/400.0;
  //vec2 uv = gl_PointCoord.xy;
  //gl_FragColor = vec4(1);
  gl_FragColor = vec4(1,1,1,(1.-depth-0.2)*0.5);
}
