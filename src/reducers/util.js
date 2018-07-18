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

/**
 * @param subTree Tree object
 * @param Tree Tree object
 * return node with given criteria
 */
export const findSubTreePath = (subTree, Tree, path = []) => {
  let res = Tree.subFilter.find((s) => s.id === subTree.id);
  if (res) {
    path.push('subFilter');
    return path;
  } else {
    path.push('children');
    let arr = Tree.children.map((sub_tree, k) => {
      path.push(k);
      return findSubTreePath(sub_tree, Tree, path);
    });
    return arr.reduce((acc, curr) => {
      return acc || curr;
    });
    return res;
  }
}



/**
 * @param node Tree object
 * @param criteria Criteria object
 * return node with given criteria
 */
export const findNodeByCriteria = (node, criteria) => {
  let res = node.values.find((v) => v.criteria_id === criteria.criteria_id);
  if (res) {
    return node;
  } else {
    if (node.children.length) {
      let arr = node.children.map((n) => {
        return findNodeByCriteria(n, criteria);
      });
      return arr.reduce((acc, curr) => {
        return acc || curr;
      });
    }
    return res;
  }
}


/**
 * @param node Tree object
 * @param subFilter Criteria object
 * return node with given subfilter
 */
export const findNodeBySubfilter = (node, subFilter) => {
  let res = node.subFilter.find((s) => s.id === subFilter.id);
  if (res) {
    return node;
  } else {
    if (node.children.length) {
      let arr = node.children.map((n) => {
        return this.findNodeBySubfilter(n, subFilter);
      });
      let ret = arr.reduce((acc, curr) => {
        return acc || curr;
      });
      return ret;
    }
    return res;
  }
}

/**
 * @param value Criteria object
 * @param found_node Node object
 * @param allow_merge boolean
 * Romove criteria(value) from given node.
 * it manages all cases after move reqiures merge
 */
export const removeCriteria = (value, found_node, allow_merge = true) => {
  if (found_node) {
    let index = found_node.values.findIndex(
      (v) => v.criteria_id === value.criteria_id
    );
    found_node.values.splice(index, 1);

    if (allow_merge) {
      // find parent Node
      let parent_node = this.findParentNode(
        this.state.tree_copy,
        found_node.parent_id
      );

      // after moving if node.values has only one criteria and no nested children node and no subFilter
      // => merge to it's parent node's values
      if (
        found_node.values.length === 1 &&
        !found_node.children.length &&
        !found_node.subFilter.length
      ) {
        // pop out last element
        let value = found_node.values.pop();

        parent_node.values.push(value);

        // delete the empty node from parent
        parent_node.children = parent_node.children.filter((n) => {
          return n.id !== found_node.id;
        });
      }
      // continue check if after moving, a node does not have any criteria and no subFliter and
      // only one node in it's chidlren => merge to parent
      if (!found_node.values.length &&
        !found_node.subFilter.length &&
        found_node.children.length === 1
      ) {
        console.log("triggered");
        // delete the empty node from parent
        // Note: we just replace found_node's children node with
        // found_node (replace everything but not parent_id)
        let child_node = found_node.children[0];
        found_node.id = child_node.id;
        found_node.relation_type = child_node.relation_type;
        found_node.children = child_node.children;
        found_node.values = child_node.values;
        found_node.subFilter = child_node.subFilter;
      }
      // continue check if after moving, a node does not have any criteria and values has only one criteria
      // only one criteria in it's subFilter => merge to parent
      if (!found_node.values.length &&
        !found_node.children.length &&
        found_node.subFilter.length === 1
      ) {
        console.log("triggered 2");
        // pop out last element
        let subTree = found_node.subFilter.pop();

        parent_node.subFilter.push(subTree);

        // delete the empty node from parent
        parent_node.children = parent_node.children.filter((n) => {
          return n.id !== found_node.id;
        });
      }
    }
  }
}

/**
 * @param sub Tree object
 * @param found_node Node object
 * @param allow_merge boolean
 * Romove Sub Filter(Tree) from given node.
 * it manages all cases after move reqiures merge
 */
export const removeSubfilter = (sub, found_node, allow_merge = true) => {
  if (found_node) {
    let index = found_node.subFilter.findIndex((s) => s.id === sub.id);
    found_node.subFilter.splice(index, 1);

    if (allow_merge) {
      // find parent Node
      let parent_node = this.findParentNode(
        this.state.tree_copy,
        found_node.parent_id
      );

      // after moving if node.values has only one criteria and no nested children node and no subFilter
      // => merge to it's parent node's values
      if (
        found_node.values.length === 1 &&
        !found_node.children.length &&
        !found_node.subFilter.length
      ) {
        // pop out last element
        let value = found_node.values.pop();

        parent_node.values.push(value);

        // delete the empty node from parent
        parent_node.children = parent_node.children.filter((n) => {
          return n.id !== found_node.id;
        });
      }
      // continue check if after moving, a node does not have any criteria and no subFliter and
      // only one node in it's chidlren => merge to parent
      if (!found_node.values.length &&
        !found_node.subFilter.length &&
        found_node.children.length === 1
      ) {
        console.log("triggered");
        // delete the empty node from parent
        // Note: we just replace found_node's children node with
        // found_node (replace everything but not parent_id)
        let child_node = found_node.children[0];
        found_node.id = child_node.id;
        found_node.relation_type = child_node.relation_type;
        found_node.children = child_node.children;
        found_node.values = child_node.values;

        found_node.subFilter = child_node.subFilter;
      }
      // continue check if after moving, a node does not have any criteria and values has only one criteria
      // only one criteria in it's subFilter => merge to parent
      if (!found_node.values.length &&
        !found_node.children.length &&
        found_node.subFilter.length === 1
      ) {
        console.log("triggered 2");
        // pop out last element
        let subTree = found_node.subFilter.pop();

        parent_node.subFilter.push(subTree);

        // delete the empty node from parent
        parent_node.children = parent_node.children.filter((n) => {
          return n.id !== found_node.id;
        });
      }
    }
  }
}
/**
 * @param node Tree object
 * @param parent_id integer
 *
 * Return parent node
 *
 */
export const findParentNode = (node, parent_id) => {
  if (parent_id === 0) {
    return node;
  }
  let res = node.id === parent_id;
  if (res) {
    return node;
  } else {
    if (node.children.length) {
      let arr = node.children.map((n) => {
        return this.findParentNode(n, parent_id);
      });

      return arr.reduce((acc, curr) => {
        return acc || curr;
      });
    }
    return res;
  }
}