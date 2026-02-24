class Stack {
  constructor() {
    // Internal array to store stack elements
    this.s = []; 
    // The 'top' pointer tracks the index of the last element added.
    // We start at -1 because the stack is initially empty.
    this.top = -1; 
  }

  // Returns the current number of elements in the stack
  length() {
    // If top is 0 (one element), length is 1. Hence, top + 1.
    return this.top + 1;
  }

  // Helper method to check if the stack has no elements
  isEmpty() {
    return this.top === -1;
  }

  // Pushes a new value onto the stack
  push(value) {
    this.top++;               // 1. Move the pointer to the next available spot
    this.s[this.top] = value; // 2. Place the value at that index
    // Note: In an interview, mention this is O(1) time complexity.
  }

  // Removes and returns the top element
  pop() {
    // CORRECTION: Better to use isEmpty() or check this.top
    if (this.isEmpty()) {
      throw new Error("Stack Underflow: Cannot pop from empty stack");
    }

    let poppedvalue = this.s[this.top]; // 1. Store the top value to return it later
    
    // 2. Manually shrink the array to remove the element from memory
    // Setting length to the current 'top' index effectively deletes the last item.
    this.s.length = this.top; 
    
    this.top--; // 3. Move the pointer down to the new top
    return poppedvalue;
  }

  // Returns the top element without removing it
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is Empty: Cannot peek");
    }
    
    // so it can be used elsewhere in your code.
    let value = this.s[this.top];
    console.log("The value at the top is:", value);
    return value; 
  }
}

// --- Execution ---
const myStack = new Stack();

myStack.push(12);  // Stack: [12], top: 0
myStack.push(100); // Stack: [12, 100], top: 1
myStack.push(13);  // Stack: [12, 100, 13], top: 2

myStack.pop();     // Removes 13. Stack: [12, 100], top: 1

myStack.peek();    // Logs 100.

console.log("Final Stack Object:", myStack);
console.log("Current Length:", myStack.length());