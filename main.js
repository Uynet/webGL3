import KAWA from "./kawa/kawasemi.js";
import SlotManager from "./kawa/glCore/slotManager.js";
import Timer from "./Timer.js";

let kawa,stage;
let timer;
let r1,r2;
let sprite
let fbo1,fbo2;
let particle;

export default class Main{
  static Init(){
    return new Promise(resolve=>{
      timer = 0;
      stage = new KAWA.Stage();
      //let program = KAWA.ShaderProgram();

      fbo1 = new KAWA.FrameBufferObject(128,128);
      fbo2 = new KAWA.FrameBufferObject(128,128);
      //let texture = new KAWA.Texture("resource/img.png");
      let texture = fbo1.texture;
      sprite = new KAWA.Sprite(texture,-0.5,-0.5,0.4,0.4);
      stage.Add(sprite);
      particle = new KAWA.Particle(16*16);
      particle.SetTexture(texture);

      r1 = new KAWA.Rectangle(-1,-1,2,2);
      r1.texture = fbo1.texture;
      stage.Add(r1);

      resolve();
    })
  }
  //test for only 1 drawing
  static Run(){
    requestAnimationFrame(Main.Run);
    fbo1.Bind();
    r1.Render();
    //fbo1.gl.viewport(0,0,fbo.width, fbo.height);
    fbo1.UnBind();
    //fbo1.gl.viewport(0,0,400,400);
    //fbo2.Bind();
    //fbo2.UnBind();
    KAWA.Clear();
    //sprite.Render();
    particle.Render();

    //Main.flipFBO(fbo,fbo2);
    Timer.IncTime();
  }
  static flipFBO(fbo1,fbo2){
    let tmp = fbo1;
    fbo1 = fbo2;
    fbo2 = tmp;
  }
}

KAWA.Init(400,400).then(()=>{
  Main.Init()
  setTimeout(Main.Run,400);
});

