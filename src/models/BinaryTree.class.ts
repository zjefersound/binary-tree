export class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.left = null;
    this.right = null;
    this.value = value;
  }

  insert(value: number) {
    if (value > this.value) {
      // Value is greater than the current root
      if (!this.right)
        this.right = new BinaryTree(value); // If it's empty we can add here
      else this.right.insert(value); // If it's not empty repeat the process
    }
    if (value < this.value) {
      // Value is not greater than the current root
      if (!this.left)
        this.left = new BinaryTree(value); // If it's empty we can add here
      else this.left.insert(value); // If it's not empty repeat the process
    }
  }

  getSum(nodes: number[] = []) {
    nodes.push(this.value);
    if (this.left) this.left.getTotalNodes(nodes);
    if (this.right) this.right.getTotalNodes(nodes);
    return nodes.reduce((total, node) => (total += node), 0);
  }

  getDepth(rows: number[][] = [], depth: number = 0) {
    if (rows[depth]) rows[depth].push(this.value);
    else rows[depth] = [this.value];

    if (this.left) this.left.getDepth(rows, depth + 1);
    if (this.right) this.right.getDepth(rows, depth + 1);

    return rows.length;
  }

  getTotalNodes(nodes: number[] = []) {
    nodes.push(this.value || null);
    if (this.left) this.left.getTotalNodes(nodes);
    if (this.right) this.right.getTotalNodes(nodes);
    return nodes.length;
  }

  getValuesByDepth(
    rows: string[][] = [],
    biggestDepth: number = 0,
    depth: number = 0
  ) {
    if (depth === 0) rows[depth] = [String(this.value)];
    if (depth === 0) biggestDepth = this.getDepth();

    if (depth + 1 < biggestDepth) {
      rows[depth + 1] = [
        ...(rows[depth + 1] || []),
        this.left?.value ? String(this.left.value) : "",
      ];
      rows[depth + 1] = [
        ...(rows[depth + 1] || []),
        this.right?.value ? String(this.right.value) : "",
      ];
    }

    if (this.left) this.left.getValuesByDepth(rows, biggestDepth, depth + 1);
    if (this.right) this.right.getValuesByDepth(rows, biggestDepth, depth + 1);

    return rows;
  }

  show() {
    const rows = this.getValuesByDepth();
    const depth = this.getDepth();
    const spacer = "___";

    rows.forEach((row, index) => {
      const externalSpace = spacer.repeat(2 ** (depth - 1 - index) - 1);
      const middleSpace = spacer.repeat(2 ** (depth - index) - 1);
      const values = row.reduce((text, node, index) => {
        const space = index > 0 ? middleSpace : "";
        const value = String(node).padStart(3, " ");
        return text + space + value;
      }, "");
      const rowAsText = externalSpace + values + externalSpace;
      console.log(rowAsText);
    });
  }
}
