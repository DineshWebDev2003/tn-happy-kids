import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'; // Added CardFooter for consistency if needed, though not strictly used by current props
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  ctaText?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, href, Icon, ctaText = "Let's Go!", className }) => {
  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full", className)}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Icon className="w-10 h-10 text-accent" />
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
      <CardContent className="pt-0"> {/* ShadCN CardFooter usually handles actions, using CardContent here for the button */}
        <Link href={href} passHref>
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
