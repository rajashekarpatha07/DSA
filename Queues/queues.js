/**
 * Deque (Double-Ended Queue) Data Structure
 * Principle: Elements can be inserted and removed from BOTH the front and the rear.
 * Note: While named "Queue" here, the presence of front-insertion and rear-deletion 
 * makes this a Deque.
 */
class Queue {
  constructor() {
    // We use a built-in JavaScript Array to store the queue elements.
    // Space Complexity: O(n) where n is the number of elements in the queue.
    this.items = [];
  }

  /**
   * Checks if the queue has any elements.
   * Time Complexity: O(1) - Constant time, as it just checks the length property.
   * @returns {boolean} True if empty, false otherwise.
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Enqueue (Rear Insertion): Adds a new element to the REAR (end) of the queue.
   * Time Complexity: O(1) - Pushing to the end of an array is highly optimized.
   * @param {*} value - The data to be added to the queue.
   */
  insert(value) {
    this.items.push(value);
  }

  /**
   * VIP Enqueue (Front Insertion): Adds a new element to the FRONT (start) of the queue.
   * Time Complexity: O(n) - **PERFORMANCE HIT!**
   * Using array.unshift() is O(n) because the computer must shift every existing 
   * element one index to the right to make room at index 0.
   * @param {*} value - The data to be added to the front.
   */
  insertAtFront(value) {
    this.items.unshift(value);
  }

  /**
   * Dequeue (Front Deletion): Removes the element from the FRONT (start) of the queue.
   * Time Complexity: O(n) - **INTERVIEW TRICK!**
   * Using array.shift() is O(n) because after removing the first item (index 0),
   * the computer must shift every other element one space to the left to re-index them.
   * @returns {*} The element that was removed, or null if the queue is empty.
   */
  delete() {
    // 1. Always check for "Underflow" (trying to delete from an empty structure)
    if (this.isEmpty()) {
      console.log("The Queue Is Empty...!");
      return null;
    } else {
      // 2. Remove and capture the front item
      const removedItem = this.items.shift();
      console.log("Current state after front deletion:", this.items); 
      return removedItem;
    }
  }

  /**
   * Pop (Rear Deletion): Removes the element from the REAR (end) of the queue.
   * Time Complexity: O(1) - Removing the last item requires no shifting, making it very fast.
   * @returns {*} The element that was removed, or null if the queue is empty.
   */
  deleteAtRear() {
    // 1. Check for Underflow
    if (this.isEmpty()) {
      console.log("The queue is empty...!");
      return null;
    }
    // 2. Remove and return the last item 
    return this.items.pop();
  }
}

// --- Execution Trace ---

const MyQueue = new Queue();

MyQueue.insert(10);        // State: [10]
MyQueue.insert(94);        // State: [10, 94]
MyQueue.insertAtFront(50); // State: [50, 10, 94] (50 jumps the line!)
MyQueue.insert(12);        // State: [50, 10, 94, 12]

// Deletes 50 (the item currently at the front), leaving [10, 94, 12]
MyQueue.delete();

// Deletes 12 (the item currently at the rear), leaving [10, 94]
MyQueue.deleteAtRear(); 

// --- Interview Tip ---
/**
 * Using `this.items.shift()` and `this.items.unshift()` gives the front operations 
 * a time complexity of O(n). Every time we add or remove the first item, all 
 * subsequent items have to shift their index. For small arrays, this is fine. 
 * But for a massive queue, this becomes a bottleneck. To achieve O(1) for ALL 
 * operations, we would need to implement this using a Doubly Linked List, or use 
 * a standard Object with manual Head and Tail pointers instead of an Array!
 */