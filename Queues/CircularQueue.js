// =============================================================================
// CIRCULAR QUEUE — A Fixed-Size Queue That Reuses Empty Slots
// =============================================================================
//
// WHY CIRCULAR QUEUE?
// A normal queue wastes space. Imagine a queue of size 5:
//
//   Enqueue 5 items → [A, B, C, D, E]   (full)
//   Dequeue 3 items → [_, _, _, D, E]   (front moved to index 3)
//
//   Now you try to enqueue again → ❌ FAILS, even though 3 slots are empty!
//   The front pointer keeps moving right and never looks back.
//
// A Circular Queue SOLVES this by wrapping around:
//   After index 4, the next index becomes 0 again (like a clock: after 12 comes 1).
//
// HOW IT WORKS (Mental Model):
//   Think of it as seats on a Ferris wheel.
//   - 'front' points to the person getting off  (oldest item)
//   - 'rear'  points to the person who just got on (newest item)
//   - The wheel keeps spinning — when someone gets off the front,
//     that seat becomes available for someone to get on at the back.
//
// VISUAL EXAMPLE (size = 5):
//
//    Index:  [0]   [1]   [2]   [3]   [4]
//             A     B     C     D     E
//             ↑                       ↑
//           front                   rear
//
//   After dequeuing A, B, C:
//    Index:  [0]   [1]   [2]   [3]   [4]
//             _     _     _     D     E
//                               ↑
//                             front
//   Enqueue F, G, H (wraps around to index 0, 1, 2):
//    Index:  [0]   [1]   [2]   [3]   [4]
//             F     G     H     D     E
//             ↑           ↑     ↑
//            rear        rear  front
//                    (rear ends up here after 3 enqueues)
//
// =============================================================================

class CircularQueue {

    // -------------------------------------------------------------------------
    // CONSTRUCTOR — Sets up the queue before any data enters
    // -------------------------------------------------------------------------
    constructor(size) {
        // 'size' is the MAXIMUM number of items this queue can hold at any time.
        // Once the queue is full, no more items can enter until someone dequeues.
        this.size = size;

        // We use a fixed-size array filled with null.
        // null means "this slot is currently empty / available".
        // We never resize this array — its length stays 'size' forever.
        this.items = new Array(size).fill(null);

        // 'front' is the index of the OLDEST item (the one that will be removed next).
        // We start at -1 to signal: "the queue is empty, no item exists yet."
        this.front = -1;

        // 'rear' is the index of the NEWEST item (the one that was added last).
        // Also starts at -1 for the same reason — nothing is in the queue yet.
        this.rear = -1;

        console.log(`🆕 Circular Queue created with capacity: ${size}`);
        console.log(`   Array: [${this.items}]`);
        console.log(`   front = ${this.front}, rear = ${this.rear}`);
        console.log("----------------------------------------------------");
    }


    // =========================================================================
    // HELPER — Check if the queue is completely full
    // =========================================================================
    //
    // WHY THIS FORMULA?  (this.rear + 1) % this.size === this.front
    //
    // We deliberately leave ONE slot empty between rear and front.
    // This is how we distinguish "full" from "empty":
    //
    //   EMPTY state:  front = -1  (both are -1)
    //   FULL state:   (rear + 1) % size === front
    //
    // Example with size = 4:
    //   Items: [A, B, C, _]
    //           ↑        ↑
    //         front     rear  → rear=2, (2+1)%4 = 3 → NOT full yet
    //
    //   Items: [A, B, C, D]   ← LOOKS full, but rear is at 3
    //           ↑           
    //         front=0, rear=3  → (3+1)%4 = 0 = front → FULL ✅
    //
    // We could also use a 'count' variable, but this formula is the classic
    // approach that avoids an extra variable.
    //
    isFull() {
        return (this.rear + 1) % this.size === this.front;
    }


    // =========================================================================
    // HELPER — Check if the queue has no items at all
    // =========================================================================
    //
    // front === -1 is our agreed-upon signal for "queue is empty".
    // We reset front (and rear) back to -1 whenever the last item is removed.
    //
    isEmpty() {
        return this.front === -1;
    }


    // =========================================================================
    // ENQUEUE — Add a new item to the REAR of the queue
    // =========================================================================
    //
    // Three situations we handle:
    //   1. Queue is FULL   → reject the item
    //   2. Queue is EMPTY  → special setup (both front and rear go to index 0)
    //   3. Normal insert   → move rear forward using modulo, then place item
    //
    enqueue(value) {
        console.log(`\n➡️  Trying to enqueue: "${value}"`);

        // -----------------------------------------------------------------
        // SITUATION 1: Queue is Full — no room to insert
        // -----------------------------------------------------------------
        if (this.isFull()) {
            // We do NOT modify anything. Just reject and return early.
            console.log(`   ❌ Queue is FULL! Cannot insert "${value}".`);
            this.display();
            return;
        }

        // -----------------------------------------------------------------
        // SITUATION 2: Queue is Empty — very first item being inserted
        // -----------------------------------------------------------------
        // When front = -1, the queue is empty and we need to initialize
        // both pointers to index 0, because the first item lives at index 0.
        //
        if (this.isEmpty()) {
            this.front = 0; // front now points to the first (and only) item
            this.rear  = 0; // rear also points to the same item (only one exists)
            console.log(`   🔵 First item! Setting front = 0, rear = 0`);
        }

        // -----------------------------------------------------------------
        // SITUATION 3: Normal insert — queue already has items
        // -----------------------------------------------------------------
        // Move 'rear' one step forward. The KEY trick is the modulo operator (%):
        //
        //   this.rear = (this.rear + 1) % this.size
        //
        // Why modulo? Let's say size = 3 and rear is currently at index 2 (last slot).
        //   (2 + 1) % 3 = 3 % 3 = 0  ← wraps back to index 0!
        //
        // This is the "circular" magic. Without modulo, rear would go out of bounds.
        // With modulo, it wraps around to the beginning, reusing freed-up slots.
        //
        else {
            this.rear = (this.rear + 1) % this.size;
            console.log(`   🔵 Moved rear from ${this.rear - 1} → ${this.rear} (wrap-around with % ${this.size})`);
        }

        // Place the actual value into the slot that 'rear' now points to.
        this.items[this.rear] = value;
        console.log(`   ✅ Inserted "${value}" at index [${this.rear}]`);
        this.display();
    }


    // =========================================================================
    // DEQUEUE — Remove and return the item from the FRONT of the queue
    // =========================================================================
    //
    // Three situations we handle:
    //   1. Queue is EMPTY        → nothing to remove
    //   2. Last item is removed  → reset both pointers back to -1 (empty state)
    //   3. Normal remove         → move front forward using modulo
    //
    dequeue() {
        console.log(`\n⬅️  Trying to dequeue...`);

        // -----------------------------------------------------------------
        // SITUATION 1: Queue is Empty — nothing to remove
        // -----------------------------------------------------------------
        if (this.isEmpty()) {
            console.log("   ⚠️ Queue is EMPTY! Nothing to delete.");
            return null;
        }

        // Grab the item at 'front' BEFORE we move the pointer.
        // We need to return this value to the caller.
        const removedItem = this.items[this.front];

        // Clear the slot visually (optional but helpful for debugging).
        // This doesn't affect logic — the slot will be overwritten on next enqueue anyway.
        this.items[this.front] = null;

        // -----------------------------------------------------------------
        // SITUATION 2: Only ONE item was left — removing it empties the queue
        // -----------------------------------------------------------------
        // When front === rear, both are pointing to the same (last) item.
        // After removing it, there are 0 items, so we reset to the initial
        // "empty" state: front = -1, rear = -1.
        //
        if (this.front === this.rear) {
            console.log(`   🔵 That was the last item! Resetting front and rear to -1 (empty state)`);
            this.front = -1;
            this.rear  = -1;
        }

        // -----------------------------------------------------------------
        // SITUATION 3: Normal remove — more items still exist after this one
        // -----------------------------------------------------------------
        // Move 'front' one step forward using the same modulo trick.
        //
        //   this.front = (this.front + 1) % this.size
        //
        // Example: size = 3, front is at index 2 (last index).
        //   (2 + 1) % 3 = 0  ← wraps to the beginning!
        //
        // This handles the case where items at the end of the array were removed
        // and new items were wrapped around to the start.
        //
        else {
            const oldFront = this.front;
            this.front = (this.front + 1) % this.size;
            console.log(`   🔵 Moved front from [${oldFront}] → [${this.front}] (wrap-around with % ${this.size})`);
        }

        console.log(`   🗑️ Removed: "${removedItem}"`);
        this.display();
        return removedItem;
    }


    // =========================================================================
    // DISPLAY — Print the current state of the queue for easy visualization
    // =========================================================================
    display() {
        const state = this.items.map((item, index) => {
            let label = item !== null ? `"${item}"` : "null";
            let markers = [];
            if (index === this.front) markers.push("F"); // F = front pointer
            if (index === this.rear)  markers.push("R"); // R = rear pointer
            return markers.length > 0 ? `[${label}←${markers.join("+")}]` : `[${label}]`;
        });
        console.log(`   State: ${state.join("  ")}`);
        console.log(`   front=${this.front}, rear=${this.rear}`);
    }
}


// =============================================================================
// TEST — Watch how the circular wrap-around actually plays out
// =============================================================================

console.log("=============================================================================");
console.log("  CIRCULAR QUEUE DEMO — Size: 3");
console.log("=============================================================================");

const queue = new CircularQueue(3);
//   Array starts as: [null, null, null]
//   front = -1, rear = -1

queue.enqueue("Apple");
//   First item → front = 0, rear = 0
//   Array: ["Apple", null, null]

queue.enqueue("Banana");
//   rear moves: (0+1)%3 = 1
//   Array: ["Apple", "Banana", null]

queue.enqueue("Cherry");
//   rear moves: (1+1)%3 = 2
//   Array: ["Apple", "Banana", "Cherry"]  ← FULL now

queue.enqueue("Date");
//   (rear+1)%size = (2+1)%3 = 0 = front → isFull() is TRUE → ❌ Rejected

queue.dequeue();
//   Removes "Apple" from index 0
//   front moves: (0+1)%3 = 1
//   Array: [null, "Banana", "Cherry"]  ← index 0 is FREE again!

queue.enqueue("Date");
//   rear moves: (2+1)%3 = 0  ← WRAPS AROUND to index 0!
//   Array: ["Date", "Banana", "Cherry"]
//   front=1, rear=0  ← rear is now BEHIND front in terms of index, which is fine!