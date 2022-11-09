import { BinaryTree } from "./models/BinaryTree.class";

const tree = new BinaryTree(50);
tree.insert(30)
tree.insert(4)
tree.insert(41)
tree.insert(33)
tree.show();

console.log('\n');
const depth = tree.getDepth()
console.log(`The depth is ${depth}`);
const totalNodes = tree.getTotalNodes()
console.log(`The number of nodes is ${totalNodes}`);
const sumOfNodes = tree.getSum()
console.log(`The sum of all nodes is ${sumOfNodes}`);

