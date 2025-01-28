import { NumberTicker } from '@repo/design-system/components/ui/number-ticker';

export const Statistics = () => {
  interface statsProps {
    quantity: number;
    description: string;
    suffix?: string;
    decimalPlaces?: number;
  }

  const stats: statsProps[] = [
    {
      quantity: 2700,
      description: 'Users',
    },
    {
      quantity: 1800,
      description: 'Subscribers',
    },
    {
      quantity: 112,
      description: 'Downloads',
    },
    {
      quantity: 4,
      description: 'Products',
    },
  ];
  const displayStats = stats.map((stat) => {
    if (stat.quantity > 1000) {
      return {
        ...stat,
        quantity: stat.quantity / 1000,
        suffix: 'K+',
        decimalPlaces: 1,
      };
    }
    return stat;
  });
  return (
    <section id="statistics">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {displayStats.map(
          ({ quantity, description, suffix, decimalPlaces }: statsProps) => (
            <div key={description} className="space-y-2 text-center">
              <div className="font-bold text-3xl sm:text-4xl">
                <NumberTicker
                  decimalPlaces={decimalPlaces}
                  className=" "
                  value={quantity}
                />
                <span className="inline-block text-black tabular-nums tracking-wider dark:text-white">
                  {suffix}
                </span>
              </div>

              <p className="text-muted-foreground text-xl">{description}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};
