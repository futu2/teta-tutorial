export type TutorialOutline = {
  title: string;
  dialect: "Postgresql";
  sections: Array<{
    id: string;
    title: string;
    intro?: string;
    examples: Array<{
      id: string;
      title: string;
      file: string;
    }>;
  }>;
};

const tutorial: TutorialOutline = {
  title: "SQL EDSL Tutorial",
  dialect: "Postgresql",
  sections: [
    {
      id: "select-basics",
      title: "0 SELECT basics",
      intro: "Start with SELECT, FROM, and basic column projection.",
      examples: [
        {
          id: "select-name-population",
          title: "Select name and population",
          file: "tutorial/examples/select-basics/01-select-name-population.ts",
        },
      ],
    },
    {
      id: "select-name",
      title: "1 SELECT name",
      intro: "Filtering, sorting, and string matching.",
      examples: [],
    },
    {
      id: "select-world",
      title: "2 SELECT from WORLD",
      intro: "Working with country data and numeric filters.",
      examples: [],
    },
    {
      id: "select-nobel",
      title: "3 SELECT from NOBEL",
      intro: "Practice selecting rows from a prize dataset.",
      examples: [],
    },
    {
      id: "select-within-select",
      title: "4 SELECT within SELECT",
      intro: "Subqueries and nested filters.",
      examples: [],
    },
    {
      id: "sum-count",
      title: "5 SUM and COUNT",
      intro: "Aggregate functions and grouping.",
      examples: [],
    },
    {
      id: "join",
      title: "6 JOIN",
      intro: "Joining tables with foreign keys.",
      examples: [],
    },
    {
      id: "more-join",
      title: "7 More JOIN",
      intro: "Multi-table joins and aliases.",
      examples: [],
    },
    {
      id: "using-null",
      title: "8 Using NULL",
      intro: "Null checks and outer joins.",
      examples: [],
    },
    {
      id: "self-join",
      title: "9 Self JOIN",
      intro: "Self-referencing joins and comparisons.",
      examples: [],
    },
  ],
};

export default tutorial;
