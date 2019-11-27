/**
 * Stack class
 */
class Stack {
  items: any[]
  // array is used to implement stack
  constructor() {
    this.items = [];
  }

  /**
   * stack methods
   */

  /**
   * push element into the items
   *
   * @param element
   */
  push(element) {
    // push element into the items
    this.items.push(element);
  }

  /**
   * Return top most element in the stack
   * and removes it from the stack
   * Underflow if stack is empty
   */
  pop() {
    if (this.items.length === 0) return -1;
    return this.items.pop();
  }

  /**
   * Return the top most element from the stack
   * but doesn't delete it.
   */
  peek() {
    return this.items[this.items.length - 1];
  }

  peekAt() {
    return this.items.length > 0 ? this.items.length - 1 : 0
  }

  /**
   * Return true if stack is empty
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Print the complete stack
   */
  printStack() {
    var str = '';
    for (var i = 0; i < this.items.length; i++) str += this.items[i] + '';
    return str;
  }
}

export default Stack;
