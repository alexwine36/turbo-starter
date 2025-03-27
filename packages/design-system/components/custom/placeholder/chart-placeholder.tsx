import { Skeleton } from '../../ui/skeleton';
import type { BasePlaceholderProps, ChartTypes } from './types';

export const ChartPlaceholder = (
  props: Pick<BasePlaceholderProps, 'chart'>
) => {
  let chart: ChartTypes = 'bar';
  if (typeof props.chart === 'string') {
    chart = props.chart;
  }

  if (chart === 'pie') {
    return <PieChartPlaceholder />;
  }
  return <BarChartPlaceholder />;
};

const PieChartPlaceholder = () => {
  return (
    <div className="m-auto flex size-full items-center justify-center">
      <svg viewBox="0 0 100 100" className="max-h-full max-w-full">
        <title>Placeholder Pie Chart</title>
        <defs>
          <mask id="center">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="50" cy="50" r="20" />
          </mask>
        </defs>
        <g id="pie-chart" mask="url(#center)" className="">
          <path
            d="M50,50 L50,10 A40,40 0 0,1 90,50 Z"
            mask="url(#center)"
            fill="gray"
            className="fill-accent"
          />
          <path
            d="M50,50 L90,50 A40,40 0 0,1 50,90 Z"
            fill="lightgray"
            className="fill-accent/25"
          />
          <path
            d="M50,50 L50,90 A40,40 0 0,1 10,50 Z"
            fill="darkgray"
            className="fill-accent/50"
          />
          <path
            d="M50,50 L10,50 A40,40 0 0,1 50,10 Z"
            fill="dimgray"
            className="fill-accent/75"
          />
        </g>
      </svg>
    </div>
  );
};

export const BarChartPlaceholder = () => {
  return (
    <div className="flex h-full max-h-full w-full items-end gap-2 overflow-hidden border-b border-l p-2">
      <Skeleton className="h-9/10 w-1/10" />
      <Skeleton className="h-7/10 w-1/10" />
      <Skeleton className="h-8/10 w-1/10" />
      <Skeleton className="w-1/10" />
      <Skeleton className="h-9/10 w-1/10" />
      <Skeleton className="h-7/10 w-1/10" />
      <Skeleton className="h-8/10 w-1/10" />
      <Skeleton className="w-1/10" />
      <Skeleton className="h-9/10 w-1/10" />
      <Skeleton className="h-7/10 w-1/10" />
      <Skeleton className="h-8/10 w-1/10" />
      <Skeleton className="w-1/10" />
      <Skeleton className="h-9/10 w-1/10" />
      <Skeleton className="h-7/10 w-1/10" />
      <Skeleton className="h-8/10 w-1/10" />
      <Skeleton className="w-1/10" />
      <Skeleton className="h-9/10 w-1/10" />
      <Skeleton className="h-7/10 w-1/10" />
      <Skeleton className="h-8/10 w-1/10" />
    </div>
  );
};
