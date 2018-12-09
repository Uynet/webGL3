precision mediump float;
varying float depth;
varying float spe;

vec3 col = vec3(0.6,0.6,0.7);

void main(){
  //vec2 uv = gl_FragCoord.xy/400.0;
  //vec2 uv = gl_PointCoord.xy;
  col += vec3(spe);
  //gl_FragColor = vec4(col,(1.-depth-0.2)*0.5);
  gl_FragColor = vec4(col,depth + spe);
}
