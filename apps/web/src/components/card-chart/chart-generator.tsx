import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@repo/design-system/components/ui/chart';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export type ChartGeneratorProps = {
  categories: string[];
  xAxisDataKey?: 'month' | 'quarter';
};

type RequiredChartGeneratorProps = Required<ChartGeneratorProps>;

const getAxisData = (
  xAxisDataKey: RequiredChartGeneratorProps['xAxisDataKey']
) => {
  switch (xAxisDataKey) {
    case 'month':
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
    case 'quarter':
      return ['Q1', 'Q2', 'Q3', 'Q4'];
    default:
      throw new Error('Invalid xAxisDataKey');
  }
};

const generateChartData = ({
  categories,
  xAxisDataKey,
}: RequiredChartGeneratorProps) => {
  const chartConfig = categories.reduce<ChartConfig>((acc, category, idx) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (acc as any)[category.toLowerCase()] = {
      label: category,
      color: `var(--chart-${idx + 1})`,
    };
    return acc;
  }, {});

  const dataKeys = Object.keys(chartConfig);

  const chartData = getAxisData(xAxisDataKey).map((month, idx) => {
    const data = {
      month,
    };
    dataKeys.forEach((category, idx) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (data as any)[category] = Math.floor(Math.random() * 100);
    });
    return data;
  });

  return {
    chartConfig,
    chartData,
    dataKeys,
  };
};

export const ChartGenerator = ({
  categories,
  xAxisDataKey = 'month',
}: ChartGeneratorProps) => {
  const { chartConfig, chartData, dataKeys } = useMemo(
    () =>
      generateChartData({
        categories,
        xAxisDataKey,
      }),
    [categories, xAxisDataKey]
  );

  if (chartData && chartConfig && dataKeys) {
    return (
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={xAxisDataKey}
            tickLine={false}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          {dataKeys.map((key, idx) => (
            <Bar
              key={key}
              dataKey={key}
              fill={`var(--color-${key})`}
              radius={4}
            />
          ))}
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    );
  }
  return null;
};
