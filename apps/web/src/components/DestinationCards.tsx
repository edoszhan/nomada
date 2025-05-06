import { DestinationCard } from './DestinationCard';

export default function DestinationCards({ destinations, onSelect }: { destinations: any[], onSelect: (dest: any) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Recommended Cities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map(dest => (
          <DestinationCard
            key={dest.city}
            city={dest.city}
            country={dest.country}
            price={dest.price}
            wifi={dest.wifi}
            weather={dest.weather}
            image={dest.image}
            onSelect={() => onSelect(dest)}
          />
        ))}
      </div>
    </div>
  );
} 