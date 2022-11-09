export class BinaryTree {
  // Define a classe de uma árvore binária
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  // precisa de um valor root pra ser criado
  constructor(value: number) {
    this.left = null;
    this.right = null;
    this.value = value;
  }

  insert(value: number) {
    // Vai pra direita
    if (value > this.value) {
      // Se não existe, adiciona, se existe, procura até não ter
      if (!this.right) this.right = new BinaryTree(value);
      else this.right.insert(value);
    }
    // Vai pra esquerda
    if (value < this.value) {
      // Se não existe, adiciona, se existe, procura até não ter
      if (!this.left) this.left = new BinaryTree(value);
      else this.left.insert(value);
    }
  }

  // Por padrão se tem uma lista vazia de nodes
  getSum(nodes: number[] = []) {
    // Adiciona no array de nodes passado
    nodes.push(this.value);

    // Caso tenha algum node filho repete o processo e passsa a lista como referência
    if (this.left) this.left.getTotalNodes(nodes);
    if (this.right) this.right.getTotalNodes(nodes);

    // Percorre o array de nodes e retorna a soma de todos
    return nodes.reduce((total, node) => (total += node), 0);
  }

  // Profundidade começa como 1 
  getDepth(biggestDepth = 0, depth: number = 1) {
    // Se a profundidade atual maior que a maior encontrada, substitiu 
    if (depth > biggestDepth) biggestDepth = depth;

    // Caso ainda tenha nodes filhos aumeta a profundidade
    if (this.left) biggestDepth = this.left.getDepth(biggestDepth, depth + 1);
    if (this.right) biggestDepth = this.right.getDepth(biggestDepth, depth + 1);

    // Caso não tenha mais filhos retorna a profundidade encontrada
    return biggestDepth;
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
