class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class SingleLinkedList {
  constructor(head = null) {
    this.head = head;
  }

  insertAtEnd(value) {
    // Step A: Create the new Node (it exists in memory, but isn't linked yet)
    let temp = new Node(value);

    // Step B: Send an 'Assistant' (t1) to the start of the list
    let t1 = this.head;

    // Step C: Check if the list is NOT empty
    if (this.head != null) {
      /** * Step D: The 'Look Ahead' Loop
       * We ask: "Is there a node AFTER the one I'm currently holding?"
       * We stop exactly ON the last node (where next is null).
       */
      while (t1.next != null) {
        t1 = t1.next; // Move Assistant to the next node
      }

      /** * Step E: Linking
       * t1 is now standing on the last node.
       * We take its empty 'next' hook and point it to our new node (temp).
       */
      t1.next = temp;
    }
    // Step F: If the list was empty (head was null)
    else {
      // The new node simply becomes the first node (head)
      this.head = temp;
    }
  }

  insertAtBeg(value) {
    // 1. Create a brand new Node (carriage) with the given value
    const temp = new Node(value);

    // 2. Point the 'next' hook of our new node to the current front of the train
    // If the train was [21 -> 232], our new node now points to 21.
    temp.next = this.head;

    // 3. Move the 'Anchor' (head) to our new node
    // This officially makes our new node the first carriage in the train.
    this.head = temp;

    /** * Why this is fast (O(1) complexity):
     * Notice there is NO 'while' loop.
     * Whether the list has 5 nodes or 5 million nodes,
     * this operation always takes the same 3 steps.
     */
  }

  insertAtMid(value, x) {
    // 1. Prepare the new carriage (New node)
    const temp = new Node(value);

    // 2. Send a Worker (t1) to the front of the train (Engine)
    let t1 = this.head;

    // 3. The Worker walks through the train while there are carriages to check
    while (t1 != null) {
      // 4. Checking the cargo: "Is this Carriage X?"
      if (t1.data == x) {
        /** * 5. THE SECURE STEP:
         * Before we unhook Carriage X, our NEW carriage (temp) 
         * must grab onto the carriage currently behind X (t1.next).
         */
        temp.next = t1.next;

        /** * 6. THE COUPLING STEP:
         * Now that the back of the train is secured to our new carriage,
         * we can safely unhook Carriage X and hook it to the New one.
         */
        t1.next = temp;

        // 7. Job complete! The Worker leaves the train.
        return;
      }
      // Move the worker to the next carriage so the loop doesn't run forever
      t1 = t1.next;
    }
  }

  printList() {
    let t1 = this.head;
    let result = "";
    while (t1 != null) {
      result += t1.data + " -> ";
      t1 = t1.next;
    }

    console.log(result + "null");
  }
} // End of Class

// Execution
const obj = new SingleLinkedList();
obj.insertAtEnd(21);
obj.insertAtEnd(232);
obj.insertAtEnd(62);
obj.insertAtEnd(43);
obj.insertAtBeg(5);
obj.insertAtEnd(12);
obj.insertAtMid(18, 62);
obj.printList();