import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, CloudSnow, Wind } from "lucide-react";

interface WeatherCardProps {
  temperature: number;
  location: string;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

const getWeatherIcon = (condition: string) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("rain")) return <CloudRain className="h-24 w-24" />;
  if (lowerCondition.includes("cloud")) return <Cloud className="h-24 w-24" />;
  if (lowerCondition.includes("snow")) return <CloudSnow className="h-24 w-24" />;
  if (lowerCondition.includes("clear") || lowerCondition.includes("sun")) return <Sun className="h-24 w-24" />;
  return <Cloud className="h-24 w-24" />;
};

export const WeatherCard = ({
  temperature,
  location,
  condition,
  description,
  humidity,
  windSpeed,
  feelsLike,
}: WeatherCardProps) => {
  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl p-8 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="text-foreground/80">
          {getWeatherIcon(condition)}
        </div>
        
        <div className="space-y-2">
          <h2 className="text-5xl font-bold text-foreground tracking-tight">
            {Math.round(temperature)}°C
          </h2>
          <p className="text-xl font-semibold text-foreground/90">{location}</p>
          <p className="text-lg text-muted-foreground capitalize">{description}</p>
        </div>

        <div className="grid grid-cols-3 gap-6 w-full pt-6 border-t border-border/50">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">Feels Like</p>
            <p className="text-2xl font-bold text-foreground">{Math.round(feelsLike)}°</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">Humidity</p>
            <p className="text-2xl font-bold text-foreground">{humidity}%</p>
          </div>
          <div className="space-y-1 flex flex-col items-center">
            <p className="text-sm text-muted-foreground font-medium">Wind</p>
            <div className="flex items-center gap-1">
              <Wind className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold text-foreground">{Math.round(windSpeed)}</p>
            </div>
            <p className="text-xs text-muted-foreground">m/s</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
