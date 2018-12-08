let currentSlotPointer = 0;

export default class SlotManager{
  static allocate(){
    let pointer = currentSlotPointer;
    console.assert(pointer<16);
    currentSlotPointer++;
    return pointer;
  }
}
