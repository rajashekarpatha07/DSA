/**
 * THE NODE CLASS
 * This is the building block of our list.
 * Imagine it as a person in a line who has two hands:
 * One hand points to the person in front (next)
 * One hand points to the person behind (prev)
 */
class Node {
  constructor(value) {
    this.data = value; // The actual data we want to store
    this.next = null; // Initially points to nothing
    this.prev = null; // Initially points to nothing
  }
}

/**
 * THE DOUBLY LINKED LIST CLASS
 * This class manages the nodes. Since we aren't using a 'tail',
 * we always start at the 'head' (the front) to do anything.
 */
class DoubleLL {
  constructor() {
    /* When we initialize the list, it is empty.
       'this.head' is our entry point. If it's null, the list is empty.
    */
    this.head = null;
  }

  /**
   * METHOD: insertAtEnd
   * Adds a new piece of data to the very end of the chain.
   */
  insertAtEnd(value) {
    /* Step 1: Create a new Node instance.
       At this moment, the node is "floating" in memory 
       and isn't connected to our list yet.
    */
    let temp = new Node(value);

    /* Step 2: Handle the "Empty List" scenario.
       If the head is null, this is the very first item.
       We just make this new node the head and stop here.
    */
    if (this.head === null) {
      this.head = temp;
      return;
    }

    /* Step 3: Finding the end.
       Since we don't have a 'tail' pointer, we have to walk from the
       front to the back. We use 't1' as a traveler.
    */
    let t1 = this.head;

    /* We keep moving t1 to the next node, but we stop 
       when 't1.next' is null. That null tells us 
       that 't1' is currently standing on the LAST node.
    */
    while (t1.next !== null) {
      t1 = t1.next;
    }

    /* Step 4: The Handshake.
       Now that t1 is the last node, we connect it to our new node (temp).
       1. t1.next = temp: The old last node now points forward to the new one.
       2. temp.prev = t1: The new node now points backward to the old last one.
    */
    t1.next = temp;
    temp.prev = t1;
  }

  /**
   * METHOD: insertAtBeg
   * Adds a new piece of data to the very front (beginning) of the chain.
   */
  insertAtBeg(value) {
    /* Step 1: Create a new Node instance.
       Just like before, this node is "floating" in memory 
       and is ready to be linked into our list.
    */
    let temp = new Node(value);

    /* Step 2: Handle the "Empty List" scenario.
       If the list has no head, this new node becomes 
       the very first and only item in the list.
    */
    if (this.head === null) {
      this.head = temp;
      return;
    }

    /* Step 3: The Handshake at the front.
       We need to connect our new node (temp) to the current first node (this.head).
       1. temp.next = this.head: The new node points forward to the old head.
       2. this.head.prev = temp: The old head points backward to our new node.
    */
    temp.next = this.head;
    this.head.prev = temp;

    /* Step 4: Update the Head pointer.
       Since our new node is now at the front of the line, 
       we must update 'this.head' to officially make it the new entry point.
    */
    this.head = temp;
  }

  /**
   * METHOD: insertAtMid
   * Inserts a new value immediately AFTER a specific value (x) in the list.
   */
  insertAtMid(value, x) {
    /* Step 1: Create the new node.
       It's currently an "island" looking for a place to dock.
    */
    const temp = new Node(value);

    /* Step 2: Start searching from the head.
       We need to find the node that contains the value 'x'.
    */
    let t1 = this.head;

    /* Step 3: The Search.
       We walk through the list. We stop if we find 'x' 
       OR if we hit the last node.
    */
    while (t1.next != null) {
      if (t1.data == x) {
        break;
      } else {
        t1 = t1.next;
      }
    }

    /* Step 4: The Four-Way Handshake.
       To squeeze a node into the middle, we have to rewire 4 connections.
    */
    temp.next = t1.next;
    
    /* SAFETY CHECK: If t1 was the last node, t1.next is null.
       Null doesn't have a 'prev' property, so we only update it if it exists!
    */
    if (t1.next !== null) { 
      t1.next.prev = temp; 
    }
    
    t1.next = temp;
    temp.prev = t1;
  }

  /**
   * METHOD: delete
   * Removes a node with a specific value from the list.
   */
  delete(value) {
    /* Step 1: Check if there's even a list to delete from.
       If the head is null, the room is empty!
    */
    if (this.head == null) {
      console.log("The list is empty");
      return;
    }

    let t1 = this.head;

    /* Case 1: Removing the Head.
       If the very first person is the one we want to remove.
    */
    if (t1.data == value) {
      if (t1.next == null) {
        // If they were the ONLY person, the list is now empty.
        this.head = null;
      } else {
        // Move the head pointer to the next person and let go of the old head.
        this.head = t1.next;
        this.head.prev = null;
      }
      return;
    }

    /* Step 2: Finding the Target.
       We walk down the line looking for the value.
    */
    while (t1 != null && t1.data != value) {
      t1 = t1.next;
    }

    /* Case 2: Value Not Found.
       If we walked off the end (null) and never found the value.
    */
    if (t1 == null) {
      console.log("Value not found");
      return;
    }

    /* Case 3: Removing the Tail.
       If the target is the very last person, the person 
       behind them just needs to stop pointing forward.
    */
    if (t1.next == null) {
      t1.prev.next = null;
      return;
    }

    /* Case 4: Removing from the Middle.
       We "bridge" the gap. We tell the person behind t1 to hold hands 
       with the person in front of t1, effectively skipping t1 entirely.
    */
    t1.prev.next = t1.next;
    t1.next.prev = t1.prev;
  }

  /**
   * METHOD: printList
   * Walks through the list and prints it in a readable way.
   */
  printList() {
    let t1 = this.head;
    let result = "";

    /* We traverse until t1 becomes null.
       This means we've walked past the last node.
    */
    while (t1 !== null) {
      /* We append the data and a visual 'double arrow' 
         to represent the two-way connection.
      */
      result += t1.data + " <--> ";
      t1 = t1.next;
    }
    console.log("Forward:  " + result + "null");
  }

  /**
   * METHOD: printReverse
   * Walks to the end of the list, then prints it backwards.
   * This proves our 'prev' pointers are linked up perfectly!
   */
  printReverse() {
    if (this.head === null) {
      console.log("List is empty");
      return;
    }

    let t1 = this.head;
    
    // Step 1: Walk to the very end
    while (t1.next !== null) {
      t1 = t1.next;
    }

    let result = "";
    
    // Step 2: Walk backwards using the 'prev' hands
    while (t1 !== null) {
      result += t1.data + " <--> ";
      t1 = t1.prev; // Going backwards!
    }
    console.log("Backward: " + result + "null");
  }
}

// --- TESTING THE CODE ---
const obj = new DoubleLL();
obj.insertAtEnd(12);
obj.insertAtEnd(18);
obj.insertAtEnd(25);
obj.insertAtEnd(30);
obj.insertAtBeg(2);
obj.insertAtMid(100, 25);

// Let's remove a few nodes
obj.delete(12);
obj.delete(2);
obj.delete(30);

// Print the final list forward
obj.printList(); 

// Print the final list backward to prove 'prev' pointers work!
obj.printReverse();