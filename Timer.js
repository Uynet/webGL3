let timer = 0

export default class Timer{
  static IncTime(){
    timer++;
  }
  static GetTime(){
    return timer;
  }
}
