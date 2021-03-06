import Stage from "./Stage.js";
import Triangle from "./shape/Triangle.js";
import Renderer from "./glCore/renderer.js";
import Rectangle from "./shape/Rectangle.js";
import FlatMaterial from "./Material/flatMaterial.js";
import TextureMaterial from "./Material/textureMaterial.js";
import Texture from "./texture.js";
import Sprite from "./sprite.js";
import FrameBufferObject from "./glCore/frameBufferObject.js";
import Particle from "./particle.js";

export default class KAWA{
  static Init(width , height){
    this.width = width;
    this.height = height;
    this.Stage = Stage;
    this.Renderer = Renderer;
    this.Triangle = Triangle;
    this.Rectangle = Rectangle;
    this.Texture = Texture;
    this.Sprite = Sprite;
    this.FrameBufferObject = FrameBufferObject;
    this.Particle = Particle;

    this.Material = {
      texture : TextureMaterial,
      flat : FlatMaterial,
    }

    this.Renderer.Init(width,height);
    //なんかやばい
    return Promise.all([
      //Promiseを並列できるよ
      FlatMaterial.Init(),
      TextureMaterial.Init(),
    ]);
  }
  static Render(stage){
    this.Clear();
    this.Renderer.Render(stage);
  }
  static Clear(){
    const gl = this.Renderer.gl;
    gl.clearColor(155/256,155/256,175/256,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  getFrameBufferTexture(){
  }
}
