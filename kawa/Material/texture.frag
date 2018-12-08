precision mediump float;
varying vec2 vTextureCoord; 
uniform sampler2D texture;

void main(){
  vec2 vUV = vTextureCoord;
  gl_FragColor = texture2D(texture,vUV);
  gl_FragColor.xyz = vec3(1.0) - gl_FragColor.xyz;
}
