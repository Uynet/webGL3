attribute float index;
uniform sampler2D texture;

void main(){
  vec2 p = vec2(
      mod(index,4.)/4.,
      floor(index/4.)/4.
  );
  vec4 tex = texture2D(texture,p);
  gl_PointSize = 30.0*sin(tex.x * tex.y);
  //vec2 position = vec2(tex.xy);
  vec2 position = vec2(p);
  gl_Position = vec4(position,0.,1.);
}
