precision mediump float;
varying vec2 vTextureCoord; 
uniform sampler2D texture;

void main(){
  vec2 vUV = vTextureCoord;
  gl_FragColor = texture2D(texture,vUV);
}
