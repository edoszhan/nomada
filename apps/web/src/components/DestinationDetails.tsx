import { useEffect, useState } from 'react';

export default function DestinationDetails({ destination, onConfirm, onBack }: { destination: any, onConfirm: () => void, onBack: () => void }) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(destination.city)}&per_page=1`, {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results[0]) {
          setImgUrl(data.results[0].urls.regular);
        } else {
          setImgUrl(null);
        }
      })
      .catch(() => setImgUrl(null))
      .finally(() => setLoading(false));
  }, [destination.city]);

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">Loading...</div>
        ) : imgUrl ? (
          <img src={imgUrl} alt={destination.city} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No image</div>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">{destination.city}, <span className="font-normal">{destination.country}</span></div>
      <div className="flex gap-4 text-gray-600 text-lg mb-4">
        <span>💸 <b>{destination.price}</b></span>
        <span>📶 {destination.wifi} Mbps</span>
        <span>🌤 {destination.weather}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="font-semibold mb-2">Cost of Living</div>
          <div>Total: {destination.price}</div>
          <div>Groceries: $321</div>
          <div>Food Outside: $402</div>
          <div>Base Cost: $134</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="font-semibold mb-2">Safety</div>
          <div>Safety Index: Moderate</div>
          <div>Crime Index: Moderate</div>
          <div>Walking at Day: Safe</div>
          <div>Walking at Night: Moderate</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="font-semibold mb-2">Weather</div>
          <div>Forecast: {destination.weather}</div>
          <div>Air Quality: Good</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="font-semibold mb-2">Mobility</div>
          <div>Walkability: Okay</div>
          <div>Public Transit: Limited</div>
          <div>Bikeability: Okay</div>
        </div>
      </div>
      <button className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold" onClick={onConfirm}>Book This Destination</button>
      <button className="w-full mt-2 text-gray-600 underline" onClick={onBack}>Back to Cities</button>
    </div>
  );
} 