// const array = [1, 2, 3, 4, 5, 6];

// looping through the array

// for (let i = 0; i < array.length; i++) {
//   console.log(array[i]);
// }

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
}

const myArray = new Array();

console.log(myArray.insert(20));

console.log(myArray.get(0));
