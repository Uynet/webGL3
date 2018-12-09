import KAWA from "./kawa/kawasemi.js";
import GLProgram from "./kawa/glCore/glProgram.js";
import FrameBufferManager from "./kawa/glCore/frameBufferManager.js";
import SlotManager from "./kawa/glCore/slotManager.js";
import Timer from "./Timer.js";

let kawa,stage;
let timer;
let r1,r2;
let sprite
let frontFBO,backFBO;
let particle;

export default class Main{
  static Init(){
    return new Promise(resolve=>{
      timer = 0;
      stage = new KAWA.Stage();
      //let program = KAWA.ShaderProgram();

      frontFBO = new KAWA.FrameBufferObject(128,128);
      backFBO = new KAWA.FrameBufferObject(128,128);
      //let texture = new KAWA.Texture("resource/img.png");
      let texture = frontFBO.texture;
      sprite = new KAWA.Sprite(texture,-0.5,-0.5,0.4,0.4);
      stage.Add(sprite);
      particle = new KAWA.Particle(16*16);
      particle.SetTexture(texture);

      r1 = new KAWA.Rectangle(-1,-1,2,2);
      stage.Add(r1);

      const resolve2 = ()=>{};
      const frag = "kawa/Material/init.frag";
      const vert = "kawa/Material/flat.vert";
      const shader= new GLProgram(frag,vert,resolve2);
      r1.program = shader.program;

      resolve();
    })
  }
  static Boot(){
    backFBO.Bind();
    r1.Render(frontFBO);
    backFBO.UnBind();
    r1.program = r1.material.program;
    Main.Run();
  }
  //test for only 1 drawing
  static Run(){
    requestAnimationFrame(Main.Run);
    frontFBO.Bind();
    r1.Render(backFBO);
    //frontFBO.gl.viewport(0,0,fbo.width, fbo.height);
    frontFBO.UnBind();
    //frontFBO.gl.viewport(0,0,400,400);
    //backFBO.Bind();
    //backFBO.UnBind();
    KAWA.Clear();
    //sprite.Render();
    particle.Render();
    particle.SetTexture(frontFBO.texture);

      let tmp = frontFBO;
      frontFBO = backFBO;
      backFBO = tmp;
    Timer.IncTime();
  }
}

KAWA.Init(400,400).then(()=>{
  Main.Init()
  setTimeout(Main.Boot,400);
});

