"use client";
import { useEffect, useRef, useState } from "react";
import Split from "split.js";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CountrySelect } from "../../components/CountrySelect";
import UploadBox from "../../components/UploadBox";
import UnsplashImage from "../../components/UnsplashImage";
import { Button } from "../../components/ui/button";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const AI_MESSAGES = [
  "Hello, I am Nomada, your AI assistant. How can I help you today?",
  "Which country are you planning to visit for your document processing?",
  "Please upload your passport and visa page (if available).",
  "Let's check your visa and passport status...",
  "Choose an appointment date at the immigration office.",
  "Your appointment is booked!"
];

const IMMIGRATION_OFFICE = `Seoul Immigration Center\n3F, Global Tower, 123-7 Hannam-daero, Yongsan-gu`;

const TIME_OPTIONS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

const STEP_LABELS = [
  "Country",
  "Upload",
  "Validation",
  "Calendar",
  "Confirm"
];

function getUnavailableDates() {
  const dates: Date[] = [];
  const now = new Date();
  for (let i = 0; i < 10; i++) {
    const offset = Math.floor(Math.random() * 60);
    const d = new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);
    d.setHours(0, 0, 0, 0);
    dates.push(d);
  }
  return dates;
}

function isTuesdayOrThursday(date: Date) {
  const day = date.getDay();
  return day === 2 || day === 4;
}

export default function Panel2Page() {
  const [messages, setMessages] = useState([
    { from: "ai", text: AI_MESSAGES[0] }
  ]);
  const [input, setInput] = useState("");
  const [aiStep, setAiStep] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [rightStep2, setRightStep2] = useState<"country"|"upload"|"validation"|"calendar"|"confirm">("country");
  const [country, setCountry] = useState<{ code: string; name: string } | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [visaFile, setVisaFile] = useState<File | null>(null);
  const [visaFree, setVisaFree] = useState<boolean>(false);
  const [passportExpired, setPassportExpired] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const router = useRouter();

  // Split.js setup
  useEffect(() => {
    Split(["#left-sheet2", "#right-sheet2"], {
      sizes: [50, 50],
      minSize: 200,
      gutterSize: 8,
      cursor: "col-resize",
    });
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Generate unavailable dates on calendar step
  useEffect(() => {
    if (rightStep2 === "calendar") {
      setUnavailableDates(getUnavailableDates());
    }
  }, [rightStep2]);

  // Chat send logic
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      if (aiStep < AI_MESSAGES.length - 1) {
        setMessages(prev => [...prev, { from: "ai", text: AI_MESSAGES[aiStep + 1] }]);
        setAiStep(aiStep + 1);
      }
    }, 800);
  };

  // Right panel content by step
  let rightContent = null;
  const currentStepIdx = ["country","upload","validation","calendar","confirm"].indexOf(rightStep2);

  // Stepper visual indicator
  const Stepper = () => (
    <div className="flex justify-center mb-8">
      {STEP_LABELS.map((label, idx) => (
        <div key={label} className={`flex items-center ${idx < STEP_LABELS.length-1 ? 'flex-1' : ''}`}> 
          <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-white ${idx <= currentStepIdx ? 'bg-blue-600' : 'bg-gray-300'}`}>{idx+1}</div>
          {idx < STEP_LABELS.length-1 && <div className={`h-1 flex-1 ${idx < currentStepIdx ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
        </div>
      ))}
    </div>
  );

  if (rightStep2 === "country") {
    rightContent = (
      <div className="max-w-md mx-auto w-full flex flex-col items-center">
        <Stepper />
        <h2 className="text-2xl font-bold mb-6">Select Destination Country</h2>
        <CountrySelect
          value={country?.code || ""}
          onChange={code => {
            fetch('https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code')
              .then(res => res.json())
              .then(data => {
                const found = data.countries.find((c: any) => c.value === code);
                setCountry(found ? { code, name: found.label } : null);
                setRightStep2("upload");
                setMessages(prev => [...prev, { from: "user", text: `I want to process documents for ${found?.label || code}` }]);
                setTimeout(() => setMessages(prev => [...prev, { from: "ai", text: `Please upload your passport and visa page (if available).` }]), 600);
              });
          }}
        />
      </div>
    );
  } else if (rightStep2 === "upload") {
    rightContent = (
      <div className="max-w-md mx-auto w-full flex flex-col items-center">
        <Stepper />
        <h2 className="text-2xl font-bold mb-6">Upload Passport & Visa</h2>
        <div className="flex flex-col gap-6 w-full items-center">
          <UploadBox
            label="Passport Photo"
            accept=".jpg,.jpeg,.png"
            required
            value={passportFile}
            onFileChange={setPassportFile}
          />
          <UploadBox
            label="Visa Page (optional)"
            accept=".jpg,.jpeg,.png"
            value={visaFile}
            onFileChange={setVisaFile}
          />
        </div>
        <Button className="w-full mt-8" disabled={!passportFile} onClick={() => {
          setVisaFree(!!country);
          setPassportExpired(passportFile ? passportFile.name.includes("expired") : false);
          setRightStep2("validation");
          setMessages(prev => [...prev, { from: "user", text: `Uploaded passport${visaFile ? ' and visa' : ''}.` }]);
          setTimeout(() => setMessages(prev => [...prev, { from: "ai", text: `Let's check your visa and passport status...` }]), 600);
        }}>Next</Button>
        <Button variant="ghost" className="w-full mt-2" onClick={() => setRightStep2("country")}>Back</Button>
      </div>
    );
  } else if (rightStep2 === "validation") {
    rightContent = (
      <div className="max-w-md mx-auto w-full flex flex-col items-center">
        <Stepper />
        <h2 className="text-2xl font-bold mb-6">Validation Results</h2>
        {visaFree && (
          <div className="w-full bg-green-100 border border-green-300 rounded-lg p-4 mb-4 flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <span>Visa not required for stays up to 90 days.</span>
          </div>
        )}
        {passportExpired ? (
          <div className="w-full bg-red-100 border border-red-300 rounded-lg p-4 mb-4 flex items-center gap-2">
            <span className="text-2xl">❌</span>
            <span>Passport expired – please renew.</span>
          </div>
        ) : null}
        <Button className="w-full mt-4" disabled={passportExpired} onClick={() => {
          setRightStep2("calendar");
          setMessages(prev => [...prev, { from: "user", text: `Proceed to appointment calendar.` }]);
          setTimeout(() => setMessages(prev => [...prev, { from: "ai", text: `Choose an appointment date at the immigration office.` }]), 600);
        }}>Proceed</Button>
        <Button variant="ghost" className="w-full mt-2" onClick={() => setRightStep2("upload")}>Back</Button>
      </div>
    );
  } else if (rightStep2 === "calendar") {
    const isUnavailable = (date: Date) => {
      if (!(date instanceof Date)) return true;
      if (isTuesdayOrThursday(date)) return true;
      return unavailableDates.some((d: Date) => d.getTime() === date.getTime());
    };
    rightContent = (
      <div className="max-w-md mx-auto w-full flex flex-col items-center">
        <Stepper />
        <h2 className="text-2xl font-bold mb-4 text-center w-full">Book Appointment</h2>
        <div className="mb-4 w-full flex justify-center">
          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              if (Array.isArray(date)) return;
              if (date instanceof Date && !isUnavailable(date)) setSelectedDate(date);
              else if (date === null) setSelectedDate(null);
            }}
            // @ts-ignore: react-date-picker passes these to react-calendar
            tileDisabled={({ date }: { date: Date }) => isUnavailable(date)}
            // @ts-ignore
            tileClassName={({ date }: { date: Date }) => {
              if (isUnavailable(date)) return "!bg-red-200 !text-red-600";
              return "!bg-green-100 !text-green-700";
            }}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)}
            calendarType="gregory"
            className="mb-2"
          />
        </div>
        <div className="mb-6 w-full flex flex-col items-center">
          <label className="font-semibold mb-2 text-center w-full">Select Time</label>
          <select
            className="border rounded px-3 py-2 w-full max-w-xs text-center"
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
            disabled={!selectedDate}
          >
            <option value="">Select time</option>
            {TIME_OPTIONS.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <Button className="w-full mt-2" disabled={!selectedDate || !selectedTime || isUnavailable(selectedDate)} onClick={() => {
          setRightStep2("confirm");
          setMessages(prev => [...prev, { from: "user", text: `Book appointment for ${selectedDate?.toLocaleDateString()} at ${selectedTime}` }]);
          setTimeout(() => setMessages(prev => [...prev, { from: "ai", text: `Your appointment is booked!` }]), 600);
        }}>Confirm Appointment</Button>
        <Button variant="ghost" className="w-full mt-2" onClick={() => setRightStep2("validation")}>Back</Button>
      </div>
    );
  } else if (rightStep2 === "confirm") {
    rightContent = (
      <div className="max-w-xl mx-auto w-full bg-white rounded-2xl shadow p-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <div className="rounded-full bg-blue-50 p-6 mb-4">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="36" stroke="#05294B" strokeWidth="6" fill="#F5F7F6" />
              <path d="M25 41L37 53L56 31" stroke="#05294B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2 flex flex-col items-center">
            <span>Your appointment is booked!</span>
            <span className="text-lg font-normal mt-2">{selectedDate?.toLocaleDateString()} {selectedTime && (<span>at {selectedTime}</span>)}</span>
          </h2>
        </div>
        <div className="w-full text-center text-lg font-semibold mb-2 whitespace-pre-line flex flex-col items-center">
          <span className="inline-flex items-center gap-2 mb-2"><svg width="24" height="24" fill="none" stroke="#05294B" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg> Immigration Office</span>
          {IMMIGRATION_OFFICE}
        </div>
        <div className="w-full h-48 rounded-xl overflow-hidden mb-6">
          <UnsplashImage query="government building immigration" className="w-full h-full object-cover" />
        </div>
        <Button className="w-full mt-8" onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left: Chat Sheet */}
      <div
        id="left-sheet2"
        className="flex flex-col border-r bg-white min-w-[200px] max-w-[70vw] h-screen"
        style={{ height: "100vh" }}
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
                msg.from === "user"
                  ? "ml-auto bg-blue-100 text-right"
                  : "bg-gray-100"
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
              if (e.key === "Enter" && !e.shiftKey) {
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
        id="right-sheet2"
        className="flex-1 flex flex-col bg-gray-50 p-8 overflow-y-auto min-w-[200px]"
        style={{ height: "100vh" }}
      >
        {rightContent}
      </div>
    </div>
  );
} 