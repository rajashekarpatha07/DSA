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
    console.log(result + "null");
  }
}

const obj = new DoubleLL();
obj.insertAtEnd(12);
obj.insertAtEnd(18);
obj.insertAtEnd(25);
obj.insertAtEnd(30);
obj.insertAtBeg(2);
obj.printList();
