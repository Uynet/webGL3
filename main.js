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
      //r2 = new KAWA.Rectangle(0.5,-0.5,0.3,0.3);
      stage.Add(r1);
      //stage.Add(r2);
      //let program = KAWA.ShaderProgram();

      //let texture = new KAWA.Texture("resource/img.png");
      fbo = new KAWA.FrameBufferObject(256,256);
      //sprite = new KAWA.Sprite(texture,0,0,0.4,0.4);
      //stage.Add(sprite);
      particle = new KAWA.Particle(4*4);

      resolve();
    })
  }
  //test for only 1 drawing
  static Run(){
    requestAnimationFrame(Main.Run);
    fbo.Bind();
    //fbo.gl.viewport(0,0,fbo.width, fbo.height);
    //KAWA.Render(stage);
    //r1.x = Math.sin(timer) ;
    KAWA.Render(stage);
    fbo.UnBind();
    KAWA.Clear();
    particle.Render();
    timer++;
  }
}

KAWA.Init(400,400).then(()=>{
  Main.Init()
  setTimeout(Main.Run,400);
});

