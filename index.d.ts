type TabelizeInput = {
    headers: (string | number)[];
    rows: (string | number)[][];
};
export default function tableize(input: TabelizeInput): string;
export {};
