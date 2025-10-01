import { useState, useEffect } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import { SearchBar } from "@/components/SearchBar";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// You'll need to get your own API key from https://openweathermap.org/api
const API_KEY = "2e66003e0f27855551fc925a10443d97"; // Replace with your OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

interface WeatherData {
  temperature: number;
  location: string;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

interface ForecastData {
  day: string;
  temp: number;
  condition: string;
  icon: string;
}

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherByCity = async (city: string) => {
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
      toast.error("Please add your OpenWeatherMap API key in the code!");
      return;
    }

    setIsLoading(true);
    try {
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }

      const weatherData = await weatherResponse.json();
      
      setWeather({
        temperature: weatherData.main.temp,
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        condition: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        feelsLike: weatherData.main.feels_like,
      });

      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();

      const dailyForecasts = forecastData.list
        .filter((_: any, index: number) => index % 8 === 0)
        .slice(0, 5)
        .map((item: any) => ({
          day: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
          temp: item.main.temp,
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
        }));

      setForecast(dailyForecasts);
      toast.success(`Weather data loaded for ${city}`);
    } catch (error) {
      toast.error("Failed to fetch weather data. Please check the city name.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
      toast.error("Please add your OpenWeatherMap API key in the code!");
      return;
    }

    setIsLoading(true);
    try {
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();

      setWeather({
        temperature: weatherData.main.temp,
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        condition: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        feelsLike: weatherData.main.feels_like,
      });

      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();

      const dailyForecasts = forecastData.list
        .filter((_: any, index: number) => index % 8 === 0)
        .slice(0, 5)
        .map((item: any) => ({
          day: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
          temp: item.main.temp,
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
        }));

      setForecast(dailyForecasts);
      toast.success("Weather data loaded for your location");
    } catch (error) {
      toast.error("Failed to fetch weather data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          toast.error("Unable to get your location. Please search for a city instead.");
          console.error(error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  useEffect(() => {
    // Load default city on mount
    fetchWeatherByCity("London");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-cyan-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            Weather Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time weather information at your fingertips
          </p>
        </header>

        <div className="mb-12">
          <SearchBar
            onSearch={fetchWeatherByCity}
            onGetLocation={handleGetLocation}
            isLoading={isLoading}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {weather && (
              <div className="mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                <WeatherCard {...weather} />
              </div>
            )}

            {forecast.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center text-foreground">
                  5-Day Forecast
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                  {forecast.map((day, index) => (
                    <div
                      key={index}
                      className="animate-in fade-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ForecastCard {...day} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {!weather && !isLoading && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Search for a city or use your current location to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
