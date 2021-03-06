import kawa from "../kawasemi.js";
import Renderer from "../glCore/renderer.js";

export default class Primitive{
  constructor(){
  }
  Render(){
    const gl = Renderer.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER,this.VBO);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexData),gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES,0,3);
    gl.flush();
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
  }
  VBOInit(data){
    const gl = Renderer.gl;
    this.VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,this.VBO);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
  }
  IBOInit(data){
    const gl = Renderer.gl;
    this.IBO = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.IBO);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Int16Array(data),gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
  }
}
