attribute vec2 position;

void main(){
  gl_Position = vec4(position,1,1);
  //gl_PointSize = 10.0;
}
