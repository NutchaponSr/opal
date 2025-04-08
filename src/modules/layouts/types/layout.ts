const layouts = ["table"] as const;

export type Layout = (typeof layouts)[number];