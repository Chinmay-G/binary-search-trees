import { mergeSort } from "./mergeSort.js";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    root;
    constructor(arr) {
        this.root = this.SortAndbuildTree(arr);
    }

    buildTree(arr) {
        if (0 > arr.length - 1) return null;

        let mid = Math.floor(((arr.length - 1) - 0) / 2);

        const root = new Node(arr[mid]);

        root.left = this.buildTree(arr.slice(0, mid));
        root.right = this.buildTree(arr.slice(mid + 1));

        return root;
    }

    SortAndbuildTree(array) {
        let sortedArr = mergeSort([...new Set(array)]);
        return this.buildTree(sortedArr, 0, sortedArr.length - 1);
    }

    insert(value) {
        function insertRec(root) {
            if (!root) return new Node(value);

            if (value === root.data) return;

            if (value < root.data)
                root.left = insertRec(root.left);
            else if (value > root.data)
                root.right = insertRec(root.right);

            return root;
        }
        this.root = insertRec(this.root);
    }

    delete(value) {
        function getSuccessor(curr) {
            while (curr && curr.left)
                curr = curr.left;
            return curr;
        }
        function deleteRec(root, value) {
            // Base case
            if (!root) return root;

            // When value is in a subtree
            if (value < root.data)
                root.left = deleteRec(root.left, value);
            else if (value > root.data)
                root.right = deleteRec(root.right, value);
            else { // When value is in th root

                // When 0 children exists OR,
                if (!root.left)  // only right child is present
                    return root.right;
                if (!root.left)  // only right child is present
                    return root.left;

                // When both children are present
                let succNode = getSuccessor(root.right);
                root.data = succNode.data;
                root.right = deleteRec(root.right, succNode.data);
            }
            return root;
        }
        deleteRec(this.root, value);
    }

    find(value, root = this.root) {
        if (!root) return null;
        if (root.data === value) return root;

        if (value < root.data)
            return this.find(value, root.left);
        if (value > root.data)
            return this.find(value, root.right);
    }

    levelOrder(callback, root = this.root) {
        if (!callback) throw new Error('callback is Required!');
        let arr = [root];
        function levelOrderRec(root) {
            if (arr.length === 0) return;

            if (root.left) arr.push(root.left);
            if (root.right) arr.push(root.right);

            callback(arr.shift());
            levelOrderRec(arr[0]);
        }
        levelOrderRec(root);
    }

    inOrder(callback, root = this.root) {
        if (!callback) throw new Error('callback is Required!');
        if (!root) return;

        this.inOrder(callback, root.left);
        callback(root);
        this.inOrder(callback, root.right);
    }

    preOrder(callback, root = this.root) {
        if (!callback) throw new Error('callback is Required!');
        if (!root) return;
        let balanced = true;

        balanced = callback(root);
        if (balanced === false) return;
        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right);
    }

    postOrder(callback, root = this.root) {
        if (!callback) throw new Error('callback is Required!');
        if (!root) return;

        this.postOrder(callback, root.left);
        this.postOrder(callback, root.right);
        callback(root);
    }

    height(node) {
        if (!node) return -1;

        let lHeight = this.height(node.left);
        let rHeight = this.height(node.right);

        return Math.max(lHeight, rHeight) + 1;
    }

    depth(node) {
        let maxHeight = this.height(this.root);
        let nodeHeight = this.height(node);
        return maxHeight - nodeHeight;

        // let i = 0;
        // function depthRec(root) {
        //     if (!root) {
        //         i = false;
        //         return null;
        //     }
        //     if (root.data === value) return root;

        //     if (value < root.data) {
        //         i = i + 1;
        //         return depthRec(root.left);
        //     }
        //     if (value > root.data) {
        //         i = i + 1;
        //         return depthRec(root.right);
        //     }
        // }
        // depthRec(root);
        // return i;
    }

    isBalanced() {
        if (this.root === null) return true;
        let node = this.root;
        let queue = [node];

        while (queue.length) {
            let currNode = queue[0];

            if (!this.isNodeBalanced(currNode)) return false;

            if (currNode.left)
                queue.push(currNode.left);
            if (currNode.right)
                queue.push(currNode.right);

            queue.shift();
        }
        return true;

        // let isBalancedArr = [];
        // this.preOrder(findDiff.bind(this));

        // function findDiff(node = root) {
        //     let lHeight;
        //     let rHeight;

        //     if (!node.left) lHeight = -1;
        //     else lHeight = this.height(node.left);

        //     if (!node.right) rHeight = -1;
        //     else rHeight = this.height(node.right);

        //     if (lHeight - rHeight > 1 || lHeight - rHeight < -1) {
        //         isBalancedArr.push(false);
        //         return false;
        //     } else isBalancedArr.push(true);
        // }
        // console.log(isBalancedArr);
        // if (isBalancedArr.some((ele) => ele === false)) return false;
        // else return true;
    }

    isNodeBalanced(node) {
        if (node.left === null) {
            if (this.height(node.right) < 1) {
                return true;
            } else {
                return false;
            }
        }
        if (node.right === null) {
            if (this.height(node.left) < 1) {
                return true;
            } else {
                return false;
            }
        }

        let leftTreeHeight = this.height(node.left);
        let rightTreeHeight = this.height(node.right);

        if (
            leftTreeHeight === rightTreeHeight ||
            leftTreeHeight === rightTreeHeight + 1 ||
            leftTreeHeight === rightTreeHeight - 1
        ) {
            return true;
        } else {
            return false;
        }
    }

    rebalance() {
        if (this.isBalanced()) {
            console.log('The Tree is Already Balanced');
            return;
        }

        let arr = [];
        const addToArr = (node) => {
            arr.push(node.data);
        };
        this.inOrder(addToArr);

        this.root = new Tree(arr).root;
    }
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (!node) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


// buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

const tree1 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree1);


prettyPrint(tree1.root);
tree1.insert(48);
tree1.insert(6);
tree1.insert(36);
console.log('\n -----After Instertion-----\n');
prettyPrint(tree1.root);

tree1.delete(23); // only have right child
tree1.delete(6); // leaf node; left child
tree1.delete(634); // ele not present
tree1.delete(6345); // leaf node right child
tree1.delete(8);
console.log('\n -----After Deletion-----\n');
prettyPrint(tree1.root);

// console.log(tree1.find(48));
// console.log(tree1.find(4));
// console.log(tree1.find(9));
// console.log(tree1.find(10));

let arr = [];
const logDataInArr = (node) => {
    arr.push(node.data);
};

// tree1.levelOrder(logData);
// tree1.levelOrder();

// console.log('\n ------------INORDER-------------\n');
// tree1.inOrder(logDataInArr);

// tree1.preOrder(logDataInArr);

tree1.postOrder(logDataInArr);
console.log(arr);

console.log(tree1.depth(36));

console.log(tree1.height(tree1.find(67)));

tree1.insert(68);
tree1.insert(69);
// tree1.delete(1);
// tree1.delete(3);
tree1.insert(70);
prettyPrint(tree1.root);

console.log(tree1.isBalanced());

tree1.rebalance();
prettyPrint(tree1.root);
