/**
 * Stack
 *
 * Last In First Out — Collection of data.
 */

class Stack {
	/**
	 * Constructor need I say more?!
	 */
	constructor() {
		// Data inside the stack in form of an array.
		this.data = [];
	}

	/**
	 * Adds item to Stack.
	 *
	 * @param String item Item to push.
	 */
	push(item) {
		this.data[this.data.length] = item; // Trick: this.data.length is always +1 of the index.
	}

	/**
	 * Removes item from Stack.
	 */
	pop() {
		return this.data.pop();
	}

	/**
	 * Gets the top most item of a Stack.
	 */
	peek() {
		return this.data[this.data.length - 1];
	}

	/**
	 * Checks if the Stack is empty and returns TRUE/FALSE.
	 */
	isEmpty() {
		return this.data.length === 0; // Equivalent to `!!this.data.length`.
	}

	/**
	 * Gets the size of Stack.
	 */
	size() {
		return this.data.length;
	}
}

// Init.
const theStack = new Stack();

theStack.isEmpty(); // STATE: true.
theStack.push('1'); // [1].
theStack.push('2'); // [1, 2].
theStack.push('3'); // [1, 2, 3].
theStack.pop(); // [1, 2].
theStack.peek(); // 2.
theStack.size(); // 2.
theStack.isEmpty(); // STATE: false.
let stackSize = theStack.size();
