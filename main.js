import KAWA from "./kawa/kawasemi.js";

let kawa,stage;
let timer;
let r1,r2;
let sprite
let fbo;
let particle;

export default class Main{
  static Init(){
    return new Promise(resolve=>{
      timer = 0;
      stage = new KAWA.Stage();
      r1 = new KAWA.Rectangle(-1,-1,2,2);
      stage.Add(r1);
      //r2 = new KAWA.Rectangle(0.5,-0.5,0.3,0.3);
      //stage.Add(r2);
      //let program = KAWA.ShaderProgram();

      fbo = new KAWA.FrameBufferObject(128,128);
      //let texture = new KAWA.Texture("resource/img.png");
      let texture = fbo.texture;
      sprite = new KAWA.Sprite(texture,0,-0.5,0.4,0.4);
      stage.Add(sprite);
      particle = new KAWA.Particle(4*4);

      resolve();
    })
  }
  //test for only 1 drawing
  static Run(){
    requestAnimationFrame(Main.Run);
    fbo.Bind();
    fbo.gl.viewport(0,0,fbo.width, fbo.height);
    r1.Render();
    fbo.UnBind();
    fbo.gl.viewport(0,0,400,400);
    KAWA.Clear();
    sprite.Render();
    //particle.Render();
    timer++;
  }
}

KAWA.Init(400,400).then(()=>{
  Main.Init()
  setTimeout(Main.Run,400);
});

