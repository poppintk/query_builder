const sub3 = {
  id: 60,
  parent_id: 0,
  relation_type: "and",
  nested: [],
  objects: [
    {
      id: 61,
      criteria_id: 11,
      expression: "=",
      value: "ccc",
    },
    {
      id: 62,
      criteria_id: 12,
      expression: "=",
      value: "ddd",
    },
    {
      id: 63,
      criteria_id: 19,
      expression: "=",
      value: "3600",
    },
    {
      id: 64,
      criteria_id: 20,
      expression: "=",
      value: "43033",
    },
  ],
};

const sub2 = {
  id: 60,
  parent_id: 0,
  relation_type: "and",
  nested: [],
  subFilter: [sub3],
  objects: [
    {
      id: 61,
      criteria_id: 11,
      expression: "=",
      value: "ccc",
    },
    {
      id: 62,
      criteria_id: 12,
      expression: "=",
      value: "ddd",
    },
    {
      id: 63,
      criteria_id: 19,
      expression: "=",
      value: "3600",
    },
    {
      id: 64,
      criteria_id: 20,
      expression: "=",
      value: "43033",
    },
  ],
};

const sub1 = {
  id: 50,
  parent_id: 0,
  relation_type: "and",
  subFilter: [sub2],
  nested: [
    {
      id: 51,
      parent_id: 50,
      relation_type: "or",
      objects: [
        {
          id: 52,
          criteria_id: 11,
          expression: "=",
          value: "ccc",
        },
        {
          id: 53,
          criteria_id: 12,
          expression: "=",
          value: "ddd",
        },
      ],
    },
  ],
  objects: [
    {
      id: 54,
      criteria_id: 19,
      expression: "=",
      value: "3600",
    },
    {
      id: 55,
      criteria_id: 20,
      expression: "=",
      value: "43033",
    },
  ],
};

const sub = {
  id: 21,
  parent_id: 0,
  relation_type: "and",
  subFilter: [sub1],
  nested: [
    {
      id: 22,
      parent_id: 21,
      relation_type: "or",
      objects: [
        {
          id: 12,
          criteria_id: 11,
          expression: "=",
          value: "ccc",
        },
        {
          id: 12,
          criteria_id: 12,
          expression: "=",
          value: "ddd",
        },
      ],
    },
    {
      id: 23,
      parent_id: 21,
      relation_type: "and",
      nested: [
        {
          id: 24,
          parent_id: 23,
          relation_type: "or",

          objects: [
            {
              id: 25,
              criteria_id: 13,
              expression: "=",
              value: "ccc",
            },
            {
              id: 26,
              criteria_id: 14,
              expression: "=",
              value: "ddd",
            },
          ],
        },
        {
          id: 27,
          parent_id: 23,
          relation_type: "or",
          objects: [
            {
              id: 28,
              criteria_id: 15,
              expression: "=",
              value: "aaa",
            },
            {
              id: 29,
              criteria_id: 16,
              expression: "=",
              value: "bbb",
            },
          ],
        },
      ],
      objects: [
        {
          id: 30,
          criteria_id: 17,
          expression: "=",
          value: "aaa",
        },
        {
          id: 31,
          criteria_id: 18,
          expression: "=",
          value: "bbb",
        },
      ],
    },
  ],
  objects: [
    {
      id: 32,
      criteria_id: 19,
      expression: "=",
      value: "3600",
    },
    {
      id: 33,
      criteria_id: 20,
      expression: "=",
      value: "43033",
    },
  ],
};

export const data2 = {
  id: 11,
  parent_id: 0,
  relation_type: "and",
  nested: [
    {
      id: 12,
      parent_id: 11,
      relation_type: "or",
      objects: [
        {
          id: 12,
          criteria_id: 1,
          expression: "=",
          value: "ccc",
          type: "integer",
        },
        {
          id: 12,
          criteria_id: 2,
          expression: "=",
          value: "ddd",
          type: "integer",
        },
      ],
    },
    {
      id: 13,
      parent_id: 11,
      relation_type: "and",
      nested: [
        {
          id: 14,
          parent_id: 13,
          relation_type: "or",
          subFilter: [sub],
          objects: [
            {
              id: 14,
              criteria_id: 3,
              expression: "=",
              value: "ccc",
              type: "integer",
            },
            {
              id: 14,
              criteria_id: 4,
              expression: "=",
              value: "ddd",
              type: "integer",
            },
          ],
        },
        {
          id: 15,
          parent_id: 13,
          relation_type: "or",
          objects: [
            {
              id: 15,
              criteria_id: 5,
              expression: "=",
              value: "aaa",
              type: "integer",
            },
            {
              id: 15,
              criteria_id: 6,
              expression: "=",
              value: "bbb",
              type: "integer",
            },
          ],
        },
      ],
      objects: [
        {
          id: 13,
          criteria_id: 7,
          expression: "=",
          value: "aaa",
          type: "boolean",
        },
        {
          id: 13,
          criteria_id: 8,
          expression: "=",
          value: "bbb",
          type: "lookup",
        },
      ],
    },
  ],
  objects: [
    {
      id: 11,
      criteria_id: 9,
      expression: "=",
      value: "3600",
      type: "integer",
    },
    {
      id: 11,
      criteria_id: 10,
      expression: "=",
      value: "43033",
      type: "string",
    },
  ],
};
