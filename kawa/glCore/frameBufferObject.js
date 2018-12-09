import Renderer from "./renderer.js";
import Texture from "../texture.js";
import SlotManager from "./slotManager.js";
import FrameBufferManager from "./frameBufferManager.js";

export default class FrameBufferObject{
  constructor(width,height){
    const gl = Renderer.GetGL();
    this.gl = gl;
    console.assert(width && height);
    this.width = width;
    this.height = height;
    this.createBuffer();
  }
  GetColorBufferSlot(){
    return this.texture.slot;
  }
  createBuffer(){
    const gl = this.gl;
    //this.Bind()
    //framebuffer
    this.framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER,this.framebuffer);
    //Defpth
    this.depthRendererBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER,this.depthRendererBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,this.width,this.height);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,this.depthRendererBuffer);

    //Texture
    this.fTexture = gl.createTexture();

    this.createTexture();

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.fTexture, 0);
    FrameBufferManager.SetCurrentFBO(this);

    //this.UnBind()
  }
  createTexture(){
    const gl = this.gl;
    this.texture = new Texture(null);
    let texSlot = SlotManager.allocate();
    gl.activeTexture(gl.TEXTURE0+texSlot);
    gl.bindTexture(gl.TEXTURE_2D,this.fTexture);

    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,this.width,this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    //浮動小数点
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,this.width,this.height, 0, gl.RGBA, gl.FLOAT, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    //gl.generateMipmap(gl.TEXTURE_2D);

    this.texture.slot = texSlot;
    this.texture.textureObject = this.fTexture;
    this.texture.onReady = true;
  }
  Bind(){
    const gl = this.gl;
    FrameBufferManager.SetCurrentFBO(this);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthRendererBuffer);
    gl.bindTexture(gl.TEXTURE_2D, this.texture.textureObject);
  }
  UnBind(){
    const gl = this.gl;
    FrameBufferManager.SetCurrentFBO(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
  bindFramebuffer(){
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
  }
}
