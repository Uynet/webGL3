export default class FrameBufferManager{
  static SetCurrentFBO(fbo){
    this.currentFrameBuffer = fbo;
  }
  static GetCurrentFBO(){
    return this.currentFrameBuffer;
  }
}
