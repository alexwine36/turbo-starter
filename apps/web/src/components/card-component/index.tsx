import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';

type CardComponentProps = {
  title: string;

  description?: string;
  children: React.ReactNode;
  titleActions?: React.ReactNode;
};

export const CardComponent = (props: CardComponentProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {props.title}
          <div className="flex gap-2">
            {/* {props.titleActions?.map((action, index) => (
                <Button variant="outline" key={index} className="btn btn-primary">
                  {action.label}
                </Button>
              ))} */}
            {props.titleActions}
          </div>
        </CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};
