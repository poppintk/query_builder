/**
 * Recursive Function:
 * serialize data into Tree object, only store ref to the tree in root level
 */
export const constructTree = (data) => {
  let node = {};
  node.subFilter = [];
  node.children = [];
  node.values = [];
  if (data.relation_type) {
    node.id = data.id;
    node.parent_id = data.parent_id;
    node.relation_type = data.relation_type;
    node.values = data.objects.slice();
  }
  if (data.nested) {
    node.children = [];
    data.nested.forEach((d) => {
      node.children.push(constructTree(d));
    });
  }
  if (data.subFilter) {
    node.subFilter = [];
    data.subFilter.forEach((d) => {
      node.subFilter.push(constructTree(d));
    });
  }

  return node;
};
