import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onGetLocation: () => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, onGetLocation, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-10 h-12 bg-white/90 backdrop-blur-md border-white/50 shadow-lg focus:shadow-xl transition-all duration-300 rounded-full text-base"
          disabled={isLoading}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>
      <Button 
        type="submit" 
        size="lg"
        disabled={isLoading}
        className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Search
      </Button>
      <Button
        type="button"
        onClick={onGetLocation}
        size="lg"
        variant="secondary"
        disabled={isLoading}
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <MapPin className="h-5 w-5" />
      </Button>
    </form>
  );
};
