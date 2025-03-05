import { Tree, prettyPrint } from "./binarySearch.js";

function randomArr() {
    let arr = [];
    for (let i = 0; i < 30; i++) {
        let ele = Math.floor(Math.random() * 100) + 1;
        arr.push(ele);
    }
    return arr;
}

const treeTest = new Tree(randomArr());
prettyPrint(treeTest.root);

console.log(treeTest.isBalanced());


let arr = [];
function printArr(node) {
    arr.push(node.data);
}

treeTest.levelOrder(printArr);
console.log(arr.join(' '));
arr = [];
treeTest.inOrder(printArr);
console.log(arr.join(' '));
arr = [];
treeTest.preOrder(printArr);
console.log(arr.join(' '));
arr = [];
treeTest.postOrder(printArr);
console.log(arr.join(' '));
arr = [];


for (let i = 0; i < 100; i++) {
    treeTest.insert(Math.floor(Math.random() * 100) + 1);
}
prettyPrint(treeTest.root);


console.log(treeTest.isBalanced());

treeTest.rebalance();
prettyPrint(treeTest.root);

console.log(treeTest.isBalanced());


treeTest.levelOrder(printArr);
console.log(arr.join(' '));
arr = [];
treeTest.inOrder(printArr);
console.log(arr.join(' '));
arr = [];
treeTest.preOrder(printArr);
console.log(arr.join(' '));
arr = [];
treeTest.postOrder(printArr);
console.log(arr.join(' '));
arr = [];