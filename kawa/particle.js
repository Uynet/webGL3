import Renderer from "./glCore/renderer.js";
import GLProgram from "./glCore/GLProgram.js";

export default class Particle{
  constructor(size){
    const gl = Renderer.gl;
    let indexVBO = gl.createBuffer();
    this.VBO = indexVBO;
    gl.bindBuffer(gl.ARRAY_BUFFER,indexVBO);
    let data = new Array(size);
    this.vertexLength = size;
    for(let i=0;i<size;i++){
      data[i]=i;
    }
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    const resolve = ()=>{};
    const frag = "kawa/Material/particle.frag";
    const vert = "kawa/Material/particle.vert";
    this.shader= new GLProgram(frag,vert,resolve);
  }
  SetTexture(texture){
    this.texture = texture;
  }
  SetUniform(gl){
    let tLoc = gl.getUniformLocation(this.shader.program, 'texture');
    gl.bindTexture(gl.TEXTURE_2D,this.texture.textureObject);
    gl.uniform1i(tLoc,this.texture.slot);
  }
  SetAttribute(gl){
    gl.bindBuffer(gl.ARRAY_BUFFER,this.VBO);
    let loc = gl.getAttribLocation(this.shader.program, 'index');
    gl.vertexAttribPointer(loc,1,gl.FLOAT,false,0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
  }
  Render(){
    const gl = Renderer.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER,this.VBO);
    gl.useProgram(this.shader.program);
    this.SetAttribute(gl);
    this.SetUniform(gl);
    gl.drawArrays(gl.POIINTS,0,this.vertexLength);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
  }
}
