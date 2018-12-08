import Renderer from "./glCore/renderer.js";
import SlotManager from "./glCore/slotManager.js";

export default class Texture {
  constructor(path){
    const gl = Renderer.gl;
    let img = new Image;
    this.onReady = false;
    this.slot = SlotManager.allocate();
    img.onload = ()=>{
      this.onReady = true;
      this.textureObject = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D,this.textureObject);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D,null);
    }
    img.src = path;
  }
}
