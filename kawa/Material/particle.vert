attribute float index;
//uniform sampler2D texture;

void main(){
  gl_PointSize = 10.0;
  vec2 p = vec2(
      mod(index,4.)/4.,
      floor(index/4.)/4.
  );
  //vec4 tex = texture2D(texture,p);
  //vec2 position = vec2(tex.xy);
  vec2 position = vec2(p);
  gl_Position = vec4(position,0.,1.);
}
