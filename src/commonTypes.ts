export declare type StyleObject = {
  [key: string]: string | number;
};

export type DataEntry = {
  title?: string | number;
  color: string;
  value: number;
  key?: string | number;
  style?: StyleObject;
  [key: string]: any;
};

type ExtendedDataEntry = DataEntry & {
  degrees: number;
  startOffset: number;
  percentage: number;
};

export type Data = DataEntry[];
export type ExtendedData = ExtendedDataEntry[];
