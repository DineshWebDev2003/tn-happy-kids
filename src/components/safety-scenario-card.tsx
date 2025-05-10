import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import type { SafetyScenario } from '@/data/mock-data';

interface SafetyScenarioCardProps {
  scenarioItem: SafetyScenario;
}

const SafetyScenarioCard: React.FC<SafetyScenarioCardProps> = ({ scenarioItem }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4">
        <div className="flex items-start gap-3">
          {scenarioItem.isGoodTouch ? (
            <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0 mt-1" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
          )}
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">{scenarioItem.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">{scenarioItem.scenario}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden bg-secondary/20">
          <Image
            src={`https://picsum.photos/seed/${scenarioItem.id}/300/150`}
            alt={scenarioItem.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={scenarioItem.imageHint}
          />
        </div>
        <p className={`text-sm p-3 rounded-md ${scenarioItem.isGoodTouch ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <strong>Explanation:</strong> {scenarioItem.explanation}
        </p>
      </CardContent>
    </Card>
  );
};

export default SafetyScenarioCard;
