'use client';
import { useEffect, useRef, useState } from 'react';
import Split from 'split.js';
import { motion } from 'framer-motion';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Button } from '../../components/ui/button';
import DestinationCards from '../../components/DestinationCards';
import DestinationDetails from '../../components/DestinationDetails';

const DESTINATIONS = [
  {
    city: 'Bali',
    country: 'Indonesia',
    price: '$1,233/m',
    wifi: 31,
    weather: '30° / 24°',
    image: 'Bali',
  },
  {
    city: 'Bangkok',
    country: 'Thailand',
    price: '$1,531/m',
    wifi: 320,
    weather: '34° / 29°',
    image: 'Bangkok',
  },
  {
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    price: '$1,001/m',
    wifi: 192,
    weather: '36° / 27°',
    image: 'Ho Chi Minh City',
  },
];

const AI_MESSAGES = [
  "Hello, I am Nomada, your AI assistant. How can I help you today?",
  "These are cities that match your criteria and passport. Any specific preferences you'd like to add?",
  "Here's plan for your stay in Bangkok, Thailand (June-October). You can easily make any changes or let me know if you'd like assistance. Additionally, you can book hotels and other services directly from here."
];

const tripPlanMock = (city: string, country: string, start: Date, end: Date) => ({
  city,
  country,
  dates: `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`,
  visaStatus: 'Ready',
  summary: {
    flights: 2,
    car: 1,
    lodging: 3,
    destinations: 3,
  },
  budget: 854,
  flight: {
    from: 'ICN',
    to: city.slice(0,3).toUpperCase(),
    dep: '09:35am',
    arr: '04:35am',
    date: start.toLocaleDateString(),
    duration: '5h 30min',
    terminal: 'B',
    gate: '2',
    conf: 'NMD025',
    price: 198,
  },
  accommodation: [
    { week: 'First week', place: 'Nomad Hostel', price: 120 },
    { week: 'Second week', place: 'City Center Hotel', price: 180 },
  ],
});

function UnsplashCityImage({ city, className }: { city: string, className?: string }) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(city)}&per_page=1`, {
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
  }, [city]);
  if (loading) return <div className={className + ' flex items-center justify-center h-full'}>Loading...</div>;
  if (imgUrl) return <img src={imgUrl} alt={city} className={className} />;
  return <div className={className + ' flex items-center justify-center h-full text-gray-400'}>No image</div>;
}

export default function PanelPage() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: AI_MESSAGES[0] }
  ]);
  const [input, setInput] = useState('');
  const [aiStep, setAiStep] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [rightStep, setRightStep] = useState<'cards'|'details'|'calendar'|'loading'|'plan'|'confirmation'>('cards');
  const [selectedDest, setSelectedDest] = useState<{
    city: string;
    country: string;
    price: string;
    wifi: number;
    weather: string;
    image: string;
  } | null>(null);
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(new Date().getTime() + 7*24*60*60*1000), key: 'selection' }
  ]);
  const [plan, setPlan] = useState<ReturnType<typeof tripPlanMock> | null>(null);
  const [animText, setAnimText] = useState('N');
  const letters = ['N', 'No', 'Nom', 'Noma', 'Nomad', 'Nomadi', 'Nomadin', 'Nomading...'];

  // Split.js setup
  useEffect(() => {
    Split(['#left-sheet', '#right-sheet'], {
      sizes: [50, 50],
      minSize: 200,
      gutterSize: 8,
      cursor: 'col-resize',
    });
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (rightStep === 'loading') {
      let idx = 0;
      setAnimText(letters[0]);
      const interval = setInterval(() => {
        setAnimText(letters[idx]);
        idx++;
        if (idx >= letters.length) {
          clearInterval(interval);
          setTimeout(() => setRightStep('plan'), 600);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [rightStep]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      // Simulate AI response based on step
      if (aiStep < AI_MESSAGES.length - 1) {
        setMessages(prev => [...prev, { from: 'ai', text: AI_MESSAGES[aiStep + 1] }]);
        setAiStep(aiStep + 1);
      }
    }, 800);
  };

  // Right panel content by step
  let rightContent = null;
  if (rightStep === 'cards') {
    rightContent = (
      <DestinationCards
        destinations={DESTINATIONS}
        onSelect={dest => {
          setSelectedDest(dest);
          setRightStep('details');
        }}
      />
    );
  } else if (rightStep === 'details' && selectedDest) {
    rightContent = (
      <DestinationDetails
        destination={selectedDest}
        onConfirm={() => {
          setRightStep('calendar');
          setMessages(prev => [...prev, { from: 'user', text: `Show me booking calendar for ${selectedDest.city}` }]);
          setTimeout(() => setMessages(prev => [...prev, { from: 'ai', text: `Sure! Please select your travel dates for ${selectedDest.city}.` }]), 600);
        }}
        onBack={() => setRightStep('cards')}
      />
    );
  } else if (rightStep === 'calendar' && selectedDest) {
    rightContent = (
      <div className="max-w-xl mx-auto w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">Select your trip dates</h2>
        <DateRange
          editableDateInputs={true}
          onChange={(ranges: RangeKeyDict) => {
            if (ranges.selection) {
              setDateRange([{
                startDate: ranges.selection.startDate ?? new Date(),
                endDate: ranges.selection.endDate ?? new Date(),
                key: 'selection'
              }]);
            }
          }}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          months={2}
          direction="horizontal"
          className="mb-6"
        />
        <Button className="w-full mt-4" onClick={() => {
          setRightStep('loading');
          setMessages(prev => [...prev, { from: 'user', text: `My dates: ${dateRange[0].startDate?.toLocaleDateString() || ''} - ${dateRange[0].endDate?.toLocaleDateString() || ''}` }]);
          setTimeout(() => setMessages(prev => [...prev, { from: 'ai', text: `Great! Generating your plan for ${selectedDest.city}...` }]), 600);
          setTimeout(() => setPlan(tripPlanMock(selectedDest.city, selectedDest.country, dateRange[0].startDate || new Date(), dateRange[0].endDate || new Date())), 1200);
        }}>Confirm Dates</Button>
        <Button variant="ghost" className="w-full mt-2" onClick={() => setRightStep('details')}>Back</Button>
      </div>
    );
  } else if (rightStep === 'loading') {
    rightContent = (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <span className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">{animText}</span>
        <span className="text-lg text-gray-500">Generating your plan...</span>
      </div>
    );
  } else if (rightStep === 'plan' && plan) {
    rightContent = (
      <div className="max-w-2xl mx-auto w-full">
        <div className="relative w-full h-48 rounded-t-xl overflow-hidden mb-6">
          <UnsplashCityImage city={plan.city} className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-xl shadow text-xl font-bold flex items-center gap-2">
          <span className="fi fi-th mr-2" />
          {plan.city}, {plan.country} Trip
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-xl shadow p-4 -mt-12 mb-2 z-10 relative">
          <div className="flex flex-col gap-1">
            <div className="text-lg font-bold">{plan.dates}</div>
            <div className="text-gray-600">Visa Status: <span className="font-semibold text-green-600">{plan.visaStatus}</span></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-900 text-white rounded-lg p-6 flex flex-col gap-2">
            <div className="font-semibold text-lg mb-2">Trip Summary</div>
            <div>✈️ {plan.summary.flights} Flights</div>
            <div>🚗 {plan.summary.car} Rental Car</div>
            <div>🏨 {plan.summary.lodging} Lodging</div>
            <div>📍 {plan.summary.destinations} Destinations</div>
          </div>
          <div className="bg-blue-900 text-white rounded-lg p-6 flex flex-col gap-2">
            <div className="font-semibold text-lg mb-2">Estimated Budget</div>
            <div className="text-3xl font-bold">${plan.budget.toFixed(2)}</div>
            <button className="underline text-white text-sm text-left mt-2">View Details</button>
          </div>
        </div>
        <div className="bg-blue-900 text-white rounded-lg p-6 flex flex-col md:flex-row md:items-center gap-6 mt-6">
          <div className="flex-1">
            <div className="font-semibold text-lg mb-2">Upcoming Flight</div>
            <div className="flex flex-col gap-1">
              <div className="font-bold text-lg">ICN ✈️ {plan.flight.to}</div>
              <div className="text-sm">{plan.flight.date} | {plan.flight.duration}</div>
              <div className="text-sm">ICN Incheon {plan.flight.dep} → {plan.flight.to} {plan.flight.arr}</div>
              <div className="text-xs text-green-300 mt-1">Update live status</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-end">
            <div className="font-semibold text-lg mb-2">Confirmation Number</div>
            <div className="text-xl font-mono bg-white text-blue-900 px-3 py-1 rounded mb-2">{plan.flight.conf}</div>
            <div className="text-2xl font-bold">${plan.flight.price}</div>
            <div className="text-xs mt-1">Haven't checked in yet? <span className="underline cursor-pointer">Check in</span></div>
          </div>
        </div>
        <div className="bg-blue-900 text-white rounded-lg p-6 flex flex-col gap-4 mt-6">
          <div className="font-semibold text-lg mb-2">Accomodation</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.accommodation.map((a) => (
              <div key={a.week} className="bg-white text-blue-900 rounded-lg p-4 flex flex-col gap-1">
                <div className="font-bold">{a.week}</div>
                <div>{a.place}</div>
                <div className="text-lg font-semibold">${a.price}</div>
              </div>
            ))}
          </div>
        </div>
        <Button className="w-full mt-8" onClick={() => {
          setRightStep('confirmation');
          setMessages(prev => [...prev, { from: 'user', text: `Book my trip to ${plan.city}!` }]);
          setTimeout(() => setMessages(prev => [...prev, { from: 'ai', text: `Your trip to ${plan.city} is all booked!` }]), 600);
        }}>Book Trip</Button>
      </div>
    );
  } else if (rightStep === 'confirmation' && plan) {
    rightContent = (
      <div className="max-w-xl mx-auto w-full bg-white rounded-2xl shadow p-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <div className="rounded-full bg-blue-50 p-6 mb-4">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="36" stroke="#05294B" strokeWidth="6" fill="#F5F7F6" />
              <path d="M25 41L37 53L56 31" stroke="#05294B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Your {plan.city} trip is all booked with Nomada</h2>
        </div>
        <div className="w-full text-left text-lg font-semibold mb-2">Flight</div>
        <ul className="w-full mb-4 text-gray-800">
          <li>• NM2025 × 1 adult</li>
          <li>• XJ777 × 1 adult</li>
        </ul>
        <div className="w-full text-left text-lg font-semibold mb-2">Hotel</div>
        <ul className="w-full mb-4 text-gray-800">
          <li>• Novotel {plan.city} × 3 nights</li>
          <li>• Supalai Park, {plan.city} × 4 nights</li>
          <li>• The Berkeley Sukhumvit × 2 nights</li>
        </ul>
        <div className="w-full text-left text-lg font-semibold mb-2">Rental Car</div>
        <ul className="w-full mb-4 text-gray-800">
          <li>• Toyota Yaris Cross × 1</li>
        </ul>
        <div className="w-full text-left text-lg font-semibold mb-2">Coworking Space</div>
        <ul className="w-full mb-6 text-gray-800">
          <li>• Samyan Mitrtown × 1</li>
          <li>• Cocon Co-working space × 1</li>
          <li>• The Great room Gaysorn Tower × 1</li>
        </ul>
        <div className="w-full text-center text-2xl font-bold mt-4 mb-2">Total Budget: ${plan.budget}</div>
        <Button className="w-full mt-8" onClick={() => {
          setRightStep('cards');
          setSelectedDest(null);
          setPlan(null);
          setMessages(prev => [...prev, { from: 'user', text: `Show me more destinations!` }]);
          setTimeout(() => setMessages(prev => [...prev, { from: 'ai', text: `Here are more cities you might like!` }]), 600);
        }}>Back to Cities</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left: Chat Sheet */}
      <div
        id="left-sheet"
        className="flex flex-col border-r bg-white min-w-[200px] max-w-[70vw] h-screen"
        style={{ height: '100vh' }}
      >
        <div className="flex items-center px-6 py-4 border-b bg-gray-100">
          <span className="font-bold text-lg">AI Assistant</span>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.from === 'user'
                  ? 'ml-auto bg-blue-100 text-right'
                  : 'bg-gray-100'
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form
          className="flex items-center gap-2 p-4 border-t bg-white"
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Send
          </button>
        </form>
      </div>

      {/* Right: Step-based content */}
      <div
        id="right-sheet"
        className="flex-1 flex flex-col bg-gray-50 p-8 overflow-y-auto min-w-[200px]"
        style={{ height: '100vh' }}
      >
        {rightContent}
      </div>
    </div>
  );
} 