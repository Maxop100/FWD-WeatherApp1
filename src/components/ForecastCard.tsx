import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, CloudSnow } from "lucide-react";

interface ForecastCardProps {
  day: string;
  temp: number;
  condition: string;
  icon: string;
}

const getWeatherIcon = (condition: string) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("rain")) return <CloudRain className="h-8 w-8" />;
  if (lowerCondition.includes("cloud")) return <Cloud className="h-8 w-8" />;
  if (lowerCondition.includes("snow")) return <CloudSnow className="h-8 w-8" />;
  if (lowerCondition.includes("clear") || lowerCondition.includes("sun")) return <Sun className="h-8 w-8" />;
  return <Cloud className="h-8 w-8" />;
};

export const ForecastCard = ({ day, temp, condition }: ForecastCardProps) => {
  return (
    <Card className="border-none bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
      <div className="flex flex-col items-center space-y-3 text-center">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{day}</p>
        <div className="text-primary">
          {getWeatherIcon(condition)}
        </div>
        <p className="text-2xl font-bold text-foreground">{Math.round(temp)}°C</p>
        <p className="text-xs text-muted-foreground capitalize">{condition}</p>
      </div>
    </Card>
  );
};
