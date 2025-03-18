import { Button } from '@repo/design-system/components/ui/button';
import { Filter, SaveAllIcon } from 'lucide-react';
import { CardComponent } from '../card-component';
import { ChartGenerator, type ChartGeneratorProps } from './chart-generator';

type CardChartProps = {
  title: string;
  description?: string;
  // children: React.ReactNode;
  // titleActions?: {
  //     label: string;
  // }[];
  filterExport?: boolean;
} & Partial<ChartGeneratorProps>;

const FilterExport = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline">
        <Filter />
        Filter
      </Button>
      <Button variant="outline">
        <SaveAllIcon />
        Export
      </Button>
    </div>
  );
};

export const CardChart = ({
  title,
  description,
  filterExport,
  categories = ['Prospects', 'Leads', 'Opportunities', 'Closed'],
  xAxisDataKey,
}: CardChartProps) => {
  const titleActions = filterExport ? <FilterExport /> : null;

  return (
    <CardComponent
      title={title}
      description={description}
      titleActions={titleActions}
    >
      <ChartGenerator
        categories={categories}
        xAxisDataKey={xAxisDataKey}
        // categories={['Prospects', 'Leads', 'Opportunities', 'Customers']}
      />
    </CardComponent>
  );
};
