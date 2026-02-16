// The blueprint for a single element in the list
class Node {
  constructor(data, next = null) {
    this.data = data; // The actual value stored in the node
    this.next = next; // The pointer/reference to the next node in the sequence
  }
}

// The Linked List structure, which tracks the starting point
class SingleLinkedList {
  constructor(head = null) {
    this.head = head; // The pointer to the very first node (starting point)
  }

  // OPERATION: INSERT AT THE END (Time Complexity: O(n))
  insertAtEnd(value) {
    // Step 1: Create the new Node in memory
    let temp = new Node(value);

    // Step 2: Set a traversal pointer (t1) starting at the head
    let t1 = this.head;

    // Step 3: Check if the list is NOT empty
    if (this.head != null) {
      /* * Step 4: Traverse the list to find the very last node.
       * We stop moving when t1.next is null.
       */
      while (t1.next != null) {
        t1 = t1.next; // Move the pointer forward
      }

      /* * Step 5: Link the new node.
       * Set the 'next' pointer of the last node to our new node.
       */
      t1.next = temp;
    } 
    // Step 6: If the list was empty (head was null)
    else {
      // The new node simply becomes the first node
      this.head = temp;
    }
  }

  // OPERATION: INSERT AT THE BEGINNING (Time Complexity: O(1))
  insertAtBeg(value) {
    // 1. Create a new Node with the given value
    const temp = new Node(value);

    // 2. Point the 'next' reference of the new node to the current head
    temp.next = this.head;

    // 3. Update the head pointer to the new node, making it the new starting point
    this.head = temp;

    /* * Note: This is an O(1) operation because it requires no traversal.
     * It executes in constant time regardless of the list size.
     */
  }

  // OPERATION: INSERT IN THE MIDDLE (Time Complexity: O(n))
  insertAtMid(value, x) {
    // 1. Create the new node
    const temp = new Node(value);

    // 2. Set a pointer (t1) to traverse the list starting from the head
    let t1 = this.head;

    // 3. Traverse the list until the end is reached
    while (t1 != null) {
      
      // 4. Check if the current node contains the target value 'x'
      if (t1.data == x) {
        
        /* * 5. CRITICAL ORDER STEP 1: 
         * Connect the new node to the subsequent node first (t1.next).
         * This prevents losing the reference to the rest of the list.
         */
        temp.next = t1.next;

        /* * 6. CRITICAL ORDER STEP 2:
         * Update the target node's 'next' pointer to the new node.
         */
        t1.next = temp;

        // 7. Insertion complete, exit the function to stop traversal
        return;
      }
      
      // Move the pointer forward to continue the search and avoid an infinite loop
      t1 = t1.next;
    }
  }

  // OPERATION: DELETE A NODE (Time Complexity: O(n))
  deleteLL(value) {
    let t1 = this.head;
    let prev = null; // Tracks the node immediately preceding 't1'

    // CASE 1: The list is empty
    if (t1 === null) return;

    // CASE 2: The node to delete is the Head (First Node)
    if (t1.data === value) {
      this.head = t1.next; // Update the head pointer to the second node
      return;
    }

    // CASE 3: Searching the rest of the list
    while (t1 !== null) {
      
      // We found the target node to delete
      if (t1.data === value) {
        /* * THE BYPASS:
         * Update the previous node's 'next' pointer to skip 't1' 
         * and point directly to 't1.next'. 
         * t1 is now disconnected and will be garbage collected.
         */
        prev.next = t1.next;
        return;
      }
      // If not found, advance both pointers forward
      else {
        prev = t1;    // 'prev' catches up to 't1'
        t1 = t1.next; // 't1' moves to the next node
      }
    }
  }

  // OPERATION: TRAVERSE AND PRINT (Time Complexity: O(n))
  printList() {
    let t1 = this.head;
    let result = "";
    
    // Traverse until the pointer falls off the end of the list
    while (t1 != null) {
      result += t1.data + " -> ";
      t1 = t1.next;
    }

    console.log(result + "null");
  }
} // End of Class

// --- Execution & Testing ---
const obj = new SingleLinkedList();

// Test End Insertions
obj.insertAtEnd(21);
obj.insertAtEnd(232);
obj.insertAtEnd(62);
obj.insertAtEnd(43);

// Test Beginning Insertion
obj.insertAtBeg(5);

// Test Mid and End Insertions
obj.insertAtEnd(12);
obj.insertAtMid(18, 62);

// Test Deletion
obj.deleteLL(43);

// Output the final state
obj.printList(); 
// Expected Output: 5 -> 21 -> 232 -> 62 -> 18 -> 12 -> null