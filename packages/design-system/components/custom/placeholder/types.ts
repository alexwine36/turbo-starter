export type TableType = {
  columns?: number;
  columnNames?: string[];
  rows?: number;
};

export type ChartTypes = 'bar' | 'pie';

export type BasePlaceholderProps = {
  className?: string;
  // children?: React.ReactNode;
  title?: string;
  description?: string;
  chart?: boolean | ChartTypes;
  notes?: string;
  table?: boolean | TableType;
};
