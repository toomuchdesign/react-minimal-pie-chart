import type { ReactNode } from 'react';
import type { LabelRenderProps } from './Label';

export type LabelRenderFunction<DataEntry extends BaseDataEntry> = (
  labelRenderProps: LabelRenderProps<DataEntry>
) => ReactNode;

export type BaseDataEntry = {
  title?: string | number;
  color: string;
  value: number;
  key?: string | number;
};

type BaseExtendedDataEntry<DataEntry extends BaseDataEntry = BaseDataEntry> =
  DataEntry & {
    degrees: number;
    startAngle: number;
    percentage: number;
  };

export type Data<DataEntry extends BaseDataEntry = BaseDataEntry> = DataEntry[];
export type ExtendedData<DataEntry extends BaseDataEntry = BaseDataEntry> =
  BaseExtendedDataEntry<DataEntry>[];
