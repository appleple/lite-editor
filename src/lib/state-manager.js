import clone from 'clone';

export default class StateManager {

  constructor() {
    this.stackPosition = 0;
    this.stack = [];
  }

  pushState(state) {
    this.stack = this.stack.slice(0, this.stackPosition + 1);
    this.stack.push(clone(state));
    this.stackPosition++;
  }

  redo() {
    if (!this.canRedo()) {
      return;
    }
    this.stackPosition++;
    return clone(this.stack[this.stackPosition]);
  }

  canRedo() {
    if (this.stackPosition < this.stack.length - 1) {
      return true;
    }
    return false;
  }

  undo() {
    if (!this.canUndo()) {
      return;
    }
    this.stackPosition--;
    return clone(this.stack[this.stackPosition]);
  }

  canUndo() {
    if (this.stackPosition > 0) {
      return true;
    }
    return false;
  }
}
