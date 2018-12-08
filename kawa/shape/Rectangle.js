import kawa from "../kawasemi.js";
import Renderer from "../glCore/renderer.js";
import Primitive from "./Primitive.js";
import FlatMaterial from "../Material/flatMaterial.js";
import TextureMaterial from "../Material/textureMaterial.js";

export default class Rectanlge extends Primitive{
  constructor(x,y,w,h){
    super();
    this.primitiveType = "RECTANGLE";
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.stride = 3;//in 3d
    this.vertexData = [
      x , y , 0 ,
      x+w , y , 0,
      x , y+h , 0,
      x+w , y+h , 0,
    ]
    this.material = FlatMaterial;
    this.VBOInit(this.vertexData);
    this.indexData = [
      0,1,2,
      1,2,3
    ]
    this.IBOInit(this.indexData);
    this.SetPositionBuffer()
  }
  Render(){
    const gl = Renderer.gl;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.IBO);
    gl.useProgram(this.material.program);
    gl.drawElements(gl.TRIANGLES,this.indexData.length,gl.UNSIGNED_SHORT,0);
    //gl.drawElements(gl.POINTS,this.indexData.length,gl.UNSIGNED_SHORT,0);
    gl.flush();
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
  }
  SetPositionBuffer(){
    const gl = Renderer.gl;
    const program = this.material.program;
    gl.bindBuffer(gl.ARRAY_BUFFER,this.VBO);
    const attr = gl.getAttribLocation(program,"position");
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr, this.stride, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
  }
}
