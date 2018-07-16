export default class Node {
  constructor(
    id = 0,
    relation_type = null,
    parent_id = 0,
    children = [],
    values = []
  ) {
    this.id = id;
    this.relation_type = relation_type;
    this.parent_id = parent_id;
    this.children = children;
    this.values = values;
    this.subFilter = [];
  }
}
