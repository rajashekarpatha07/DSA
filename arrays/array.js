// const array = [1, 2, 3, 4, 5, 6];

// looping through the array

// for (let i = 0; i < array.length; i++) {
//   console.log(array[i]);
// }

// insert push to "right Start at the End	data[i] = data[i-1]"
// delete pull "left "Start at the Holedata[i] = data[i+1]"

class Array {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  get(index) {
    if (index < 0 || index > this.length) return "index out of bound";
    return this.data[index];
  } // Time complexity = O(1)

  insert(element) {
    this.data[this.length] = element;
    this.length++;
    return this;
  } // Time complexity = O(1)

  insertAtFirst(element) {
    // 1. Move existing elements one step to the right
    // We start at the end (this.length) and work backwards to index 0
    for (let i = this.length; i > 0; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[0] = element;

    this.length++;

    return this.data;
  }

  // Array = ["A", "B", "C", "D"]
  delete(index) {
    //check weather the index is out of bound or not
    if (index < 0 || index >= this.length) return "index out of bound";

    // store the element that to be deleted in an variable
    const elementtobeDeleted = this.data[index]; // Element "B" is stored in this variable

    for (let i = index; i < this.length - 1; i++) {
      // at the first itration this.data[i] = B, this.data[i+1] = C it became ["A", "C", "C", "D"],
      // in the next itration it becomes ["A","C","D", "D"]
      // now we delete the last element with delete this.data[this.length - 1];
      // now we decrese the length of array by 1

      this.data[i] = this.data[i + 1];
    }

    delete this.data[this.length - 1];
    this.length--;

    return elementtobeDeleted
  }
}

const myArray = new Array();

myArray.insert(19);
myArray.insert(12);
myArray.insert(18);
myArray.insertAtEnd(8);
myArray.insert(70);
myArray.insertAtFirst(100);

console.log(myArray);
