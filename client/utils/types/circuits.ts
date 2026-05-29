export type TCircuitShort = {
  id: number;
  name: string;
  length: number;
};

export type TCircuitReference = TCircuitShort & {
  location: string;
};
