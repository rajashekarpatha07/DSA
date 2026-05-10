/**
 * Queue Data Structure
 * Principle: FIFO (First-In, First-Out). The first element added is the first one removed.
 * Real-world analogy: A line at a grocery store checkout.
 */
class Queue {
  constructor() {
    // We use a built-in JavaScript Array to store the queue elements.
    // Space Complexity: O(n) where n is the number of elements in the queue.
    this.items = [];
  }

  /**
   * Checks if the queue has any elements.
   * Time Complexity: O(1) - Constant time, just checking a property.
   */
  isEmpty() {
    return this.items.length === 0; // Better practice to use strict equality (===)
  }

  /**
   * Enqueue Operation: Adds a new element to the REAR (end) of the queue.
   * Time Complexity: O(1) - Pushing to the end of an array is highly optimized and fast.
   */
  insert(value) {
    this.items.push(value);
  }

  /**
   * Dequeue Operation: Removes the element from the FRONT (start) of the queue.
   * Time Complexity: O(n) - **INTERVIEW TRICK!**
   * Using array.shift() is O(n) because after removing the first item (index 0),
   * the computer must shift every other element in the array one space to the left to re-index them.
   */
  delete() {
    // 1. Always check for "Underflow" (trying to delete from an empty structure)
    if (this.isEmpty()) {
      console.log("The Queue Is Empty...!");
      return null;
    } else {
      // 2. Remove and capture the front item
      const removedItem = this.items.shift();
      console.log(this.items); // Log the remaining queue
      return removedItem; // Good practice to return the item you just deleted
    }
  }
}

// --- Execution Trace ---

const MyQueue = new Queue();

MyQueue.insert(10); // Queue state: [10]
MyQueue.insert(94); // Queue state: [10, 94]
MyQueue.insert(12); // Queue state: [10, 94, 12]
MyQueue.insert(75); // Queue state: [10, 94, 12, 75]

// Deletes 10 (the first item inserted), leaving [94, 12, 75]
MyQueue.delete();

//Interview tip
/**
 * Yes. Using this.items.shift() gives the delete method a time complexity of $O(n)$. Every time we remove the first item, all subsequent items have to shift their index down by one. For small arrays, this is fine. But for a massive queue, this becomes a bottleneck. To achieve $O(1)$ deletion, we would need to implement this Queue using a Linked List or use an object with Head and Tail pointers instead of an array.
 */
