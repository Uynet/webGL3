attribute float index;
uniform sampler2D texture;

void main(){
  float res = 16.;
  vec2 p = vec2(
      mod(index,res)/res,
      floor(index/res)/res
  );
  vec4 tex = texture2D(texture,p);
  gl_PointSize = 3.;
  //gl_PointSize = 10. + 20.0*(sin(tex.x * tex.y * 10.)+1.);
  //vec2 position = vec2(p);
  vec2 position = vec2(tex.xy)-vec2(0.5);
  gl_Position = vec4(position,0.,1.);
}
