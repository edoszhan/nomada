"use client";
import { useState, useRef, useEffect } from "react";
import Split from "split.js";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Home, User, Send, CheckSquare, Square, Eye, MessageCircle, ThumbsUp, Paperclip, Play, LogOut } from "lucide-react";
import UnsplashImage from "../../components/UnsplashImage";
import { Button } from "../../components/ui/button";

const NAVY = "#001B3D";
const LEFT_BG = NAVY;
const LEFT_TEXT = "text-white";
const CARD_RADIUS = "rounded-2xl";
const CARD_GAP = "gap-6";
const CARD_SHADOW = "shadow-md";
const CARD_BORDER = "border border-gray-200";
const WHITE_CARD = `bg-white ${CARD_RADIUS} ${CARD_BORDER} ${CARD_SHADOW}`;
const NAVY_CARD = `bg-[${NAVY}] ${CARD_RADIUS}`;

const IMPORTANT_UPDATES = [
  "Visa-free TH ↔ KR extended to 90 days.",
  "Nomada v1.2.0 released – new budgeting tool.",
  "Breaking: There is a thunderstorm coming in a few weeks, so be ready according to national news!!"
];
const REMINDERS = ["Buy Detergent", "Contact Family"];
const TODOS = ["Plan new Product", "Implement CMS", "Update Website", "Replies Feedback"];
const HABITS = ["Go to the gym", "Drink 2L of water"];
const PROJECTS = [
  { label: "Launch New Product", percent: 62 },
  { label: "Performance Review", percent: 35 },
  { label: "Check Feedback", percent: 50 }
];
const ACCOMPLISHMENTS = [
  { label: "14 Countries" },
  { label: "49 Cities" },
  { label: "120,000 km" },
  { label: "10 Valid Visas" },
  { label: "50 visa-free" }
];
const PREP_LIST = ["Vaccination", "Snorkeling Mask", "Swimsuit", "Type F port"];
const VISA_MATERIALS = [
  { label: "Financial Statement", icon: <Paperclip className="inline w-4 h-4 ml-1" /> },
  { label: "Proof of Resident", icon: null }
];
const WHAT_NOMADA_HAVE = ["Passport", "Business Registration"];
const CALENDAR_SLOTS = [
  { time: "08:30-11:00", label: "Implement CMS Feature" },
  { time: "12:30-15:00", label: "Monthly Meeting" }
];
const TIME_OPTIONS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const FORUM_POSTS = [
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Anna (DE)",
    age: "2 h",
    title: "Cowork Friday at True Digital Park?",
    preview: "Anyone up for a cowork session this Friday?",
    tags: ["cowork", "bangkok"],
    views: 125,
    comments: 15,
    likes: 155
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "José (BR)",
    age: "5 h",
    title: "Extending visa at Chaeng Wattana—tips AMA.",
    preview: "Happy to answer any questions about the process!",
    tags: ["visa", "thailand"],
    views: 88,
    comments: 7,
    likes: 42
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    name: "Ming (CN)",
    age: "1 d",
    title: "Good cafés in downtown?",
    preview: "Looking for recommendations for quiet places to work.",
    tags: ["cafe", "recommendation"],
    views: 210,
    comments: 22,
    likes: 99
  }
];

function getBlocked(date: Date) {
  // Block weekends and Tue/Thu
  const day = date.getDay();
  return day === 0 || day === 6 || day === 2 || day === 4;
}

export default function Panel3Page() {
  // Left state
  const [reminders, setReminders] = useState(REMINDERS.map(r => ({ label: r, checked: false })));
  const [todos, setTodos] = useState(TODOS.map(r => ({ label: r, checked: false })));
  const [habits, setHabits] = useState(HABITS.map(r => ({ label: r, checked: false })));
  const [materials, setMaterials] = useState(VISA_MATERIALS.map(m => ({ ...m, checked: false })));
  const [whatNomada, setWhatNomada] = useState(WHAT_NOMADA_HAVE.map(m => ({ label: m, checked: true })));
  const [chat, setChat] = useState<{from: string, text: string}[]>([]);
  const [chatInput, setChatInput] = useState("");
  // Right state
  const [rightTab, setRightTab] = useState<'home'|'prep'>('home');
  const [calendarDate, setCalendarDate] = useState("");
  const [calendarTime, setCalendarTime] = useState("");
  const [search, setSearch] = useState("");
  const chatEndRef = useRef<HTMLDivElement|null>(null);
  const router = useRouter();

  useEffect(() => {
    Split(["#left-sheet3", "#right-sheet3"], {
      sizes: [35, 65],
      minSize: 200,
      gutterSize: 8,
      cursor: "col-resize",
    });
  }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat]);

  // Left widgets
  const WidgetCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`w-full ${CARD_RADIUS} bg-white text-black p-4 mb-4 border border-gray-200 ${className}`}>{children}</div>
  );

  // Floating bar
  const FloatingBar = () => (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-30" style={{marginLeft: '8px'}}>
      <button aria-label="Home" className={`rounded-full p-3 ${rightTab==='home'?'bg-blue-600 text-white':'bg-white text-blue-900'} shadow-lg`} onClick={()=>setRightTab('home')}><Home /></button>
      <button aria-label="Send" className={`rounded-full p-3 ${rightTab==='prep'?'bg-blue-600 text-white':'bg-white text-blue-900'} shadow-lg`} onClick={()=>setRightTab('prep')}><Send /></button>
      <button aria-label="Quit" className="rounded-full p-3 bg-white text-blue-900 shadow-lg hover:bg-red-100 cursor-pointer" onClick={()=>router.push('/dashboard')}><LogOut /></button>
    </div>
  );

  // Left sheet content
  const leftContent = (
    <div className="relative flex flex-col h-full p-6 bg-[#001B3D] text-white ${CARD_RADIUS} min-h-screen overflow-hidden">
      <FloatingBar />
      <div className="flex flex-col gap-4 pb-8 overflow-y-auto hide-scrollbar" style={{maxHeight: '100vh'}}>
        <WidgetCard className="text-lg font-bold mb-2 bg-blue-900">Important Updates
          <ul className="mt-2 text-base font-normal">
            {IMPORTANT_UPDATES.map((u, i) => <li key={i} className="mb-1">{u}</li>)}
          </ul>
        </WidgetCard>
        <hr className="my-4 border-t-2 border-blue-200 opacity-60" />
        <WidgetCard className="uppercase tracking-wider text-sm font-bold">Reminder
          <ul className="mt-2">
            {reminders.map((r, i) => (
              <li key={i} className="flex items-center gap-2 mt-1">
                <button onClick={()=>setReminders(reminders.map((x,j)=>j===i?{...x,checked:!x.checked}:x))} className="focus:outline-none">
                  {r.checked ? <CheckSquare className="text-green-300" size={18}/> : <Square size={18}/>} 
                </button>
                <span className={r.checked?"line-through text-gray-300":""}>{r.label}</span>
              </li>
            ))}
          </ul>
        </WidgetCard>
        <WidgetCard className="uppercase tracking-wider text-sm font-bold">To-Do List
          <ul className="mt-2">
            {todos.map((r, i) => (
              <li key={i} className="flex items-center gap-2 mt-1">
                <button onClick={()=>setTodos(todos.map((x,j)=>j===i?{...x,checked:!x.checked}:x))} className="focus:outline-none">
                  {r.checked ? <CheckSquare className="text-green-300" size={18}/> : <Square size={18}/>} 
                </button>
                <span className={r.checked?"line-through text-gray-300":""}>{r.label}</span>
              </li>
            ))}
          </ul>
        </WidgetCard>
        <WidgetCard className="uppercase tracking-wider text-sm font-bold">Habits
          <ul className="mt-2">
            {habits.map((r, i) => (
              <li key={i} className="flex items-center gap-2 mt-1">
                <button onClick={()=>setHabits(habits.map((x,j)=>j===i?{...x,checked:!x.checked}:x))} className="focus:outline-none">
                  {r.checked ? <CheckSquare className="text-green-300" size={18}/> : <Square size={18}/>} 
                </button>
                <span className={r.checked?"line-through text-gray-300":""}>{r.label}</span>
              </li>
            ))}
          </ul>
        </WidgetCard>
        <WidgetCard className="text-base font-bold mb-2">AI Chat Bot
          <form className="flex items-center gap-2 mt-2" onSubmit={e=>{e.preventDefault();if(chatInput.trim()){setChat([...chat,{from:'user',text:chatInput}]);setTimeout(()=>setChat(c=>[...c,{from:'ai',text:`Nomada: ${chatInput}`}]),400);setChatInput("");}}}>
            <input className="flex-1 rounded-lg border-none px-3 py-2 text-blue-900" placeholder="Ask anything..." value={chatInput} onChange={e=>setChatInput(e.target.value)} />
            <Button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded-lg">&gt;</Button>
          </form>
          <div className="mt-2 max-h-24 overflow-y-auto">
            {chat.map((msg,i)=>(<div key={i} className={`text-sm ${msg.from==='ai'?'text-blue-200':'text-white text-right'}`}>{msg.text}</div>))}
            <div ref={chatEndRef}/>
          </div>
        </WidgetCard>
        <WidgetCard className="text-base font-bold mb-2">Project Progress
          <ul className="mt-2">
            {PROJECTS.map((p,i)=>(
              <li key={i} className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg">{p.percent}%</div>
                <span>{p.label}</span>
              </li>
            ))}
          </ul>
        </WidgetCard>
      </div>
    </div>
  );

  // Right: Community Home
  const rightHome = (
    <div className="flex flex-col gap-6">
      <div className="w-full bg-blue-900 text-white text-3xl font-bold rounded-2xl flex items-center justify-center py-8 mb-4">302 Digital Nomads in Bangkok</div>
      <div className="w-full flex flex-col gap-2">
        <input className="w-full rounded-lg bg-gray-100 px-4 py-3 text-lg mb-2" placeholder="Search something…" value={search} onChange={e=>setSearch(e.target.value)} />
        <div className="flex gap-2 mb-2">
          <span className="px-4 py-2 rounded-full bg-blue-600 text-white font-bold">New</span>
          <span className="px-4 py-2 rounded-full bg-gray-200 text-gray-700">Top</span>
          <span className="px-4 py-2 rounded-full bg-gray-200 text-gray-700">Hot</span>
          <span className="px-4 py-2 rounded-full bg-gray-200 text-gray-700">Closed</span>
        </div>
        <div className="flex flex-col gap-4">
          {FORUM_POSTS.filter(p=>!search||p.title.toLowerCase().includes(search.toLowerCase())).map((p,i)=>(
            <div key={i} className="bg-gray-50 rounded-xl shadow p-4 flex gap-4 items-start border border-gray-200">
              <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-200" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-base">{p.name}</span>
                  <span className="text-xs text-gray-400">{p.age}</span>
                </div>
                <div className="font-semibold text-lg mb-1">{p.title}</div>
                <div className="text-gray-700 mb-2 text-sm">{p.preview}</div>
                <div className="flex gap-2 mb-1">
                  {p.tags.map((t,j)=>(<span key={j} className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700">{t}</span>))}
                </div>
                <div className="flex gap-4 text-gray-500 text-xs items-center">
                  <Eye className="inline w-4 h-4" /> {p.views}
                  <MessageCircle className="inline w-4 h-4" /> {p.comments}
                  <ThumbsUp className="inline w-4 h-4" /> {p.likes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Right: Trip Prep & Stats
  const rightPrep = (
    <div className="flex flex-col gap-6">
      <div className="w-full flex flex-row gap-4 mb-2">
        {ACCOMPLISHMENTS.map((a,i)=>(<div key={i} className="flex-1 bg-white border border-gray-200 rounded-xl shadow flex flex-col items-center justify-center py-4"><span className="font-bold text-lg">{a.label}</span></div>))}
      </div>
      <div className="w-full flex flex-row gap-6">
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col gap-2">
          <div className="font-bold text-lg mb-2 underline">Prepare List</div>
          <ul>
            {PREP_LIST.map((item,i)=>(<li key={i} className="flex items-center gap-2 mb-1"><Square size={18}/>{item}</li>))}
          </ul>
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col items-center justify-center relative">
          <UnsplashImage query="Bali" className="w-full h-32 object-cover rounded-xl mb-2" />
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 rounded-full p-3 shadow"><Play className="w-8 h-8 text-blue-900" /></button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-lg bg-black/40 px-4 py-1 rounded-full">BALI</div>
        </div>
      </div>
      <div className="w-full flex flex-row gap-6">
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col gap-2">
          <div className="font-bold text-lg mb-2">Calendar</div>
          <div className="flex flex-col gap-2">
            {CALENDAR_SLOTS.map((slot,i)=>(<div key={i} className="bg-blue-100 text-blue-900 rounded-lg px-3 py-2 flex flex-col mb-1"><span className="font-semibold">{slot.label}</span><span className="text-xs">{slot.time}</span></div>))}
            <label className="font-semibold mt-2">Book a time</label>
            <input type="date" className="border rounded px-3 py-2 w-full max-w-xs mb-2" value={calendarDate} onChange={e=>setCalendarDate(e.target.value)} />
            <select className="border rounded px-3 py-2 w-full max-w-xs mb-2" value={calendarTime} onChange={e=>setCalendarTime(e.target.value)}>
              <option value="">Select time</option>
              {TIME_OPTIONS.map(t=>(<option key={t} value={t}>{t}</option>))}
            </select>
            <Button className="w-full mt-2" disabled={!calendarDate||!calendarTime||getBlocked(new Date(calendarDate))}>Confirm</Button>
          </div>
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col gap-2">
          <div className="font-bold text-lg mb-2">Materials for Visa</div>
          <ul>
            {materials.map((m,i)=>(<li key={i} className="flex items-center gap-2 mb-1"><button onClick={()=>setMaterials(materials.map((x,j)=>j===i?{...x,checked:!x.checked}:x))}>{m.checked?<CheckSquare className="text-green-400" size={18}/>:<Square size={18}/>}</button>{m.label}{m.icon}</li>))}
          </ul>
          <div className="mt-4 text-xs text-gray-500">What Nomada have</div>
          <ul>
            {whatNomada.map((m,i)=>(<li key={i} className={"flex items-center gap-2 mb-1 "+(m.checked?"line-through text-gray-400":"text-gray-700")}>{m.label}</li>))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left: Widgets */}
      <div
        id="left-sheet3"
        className="flex flex-col bg-[#001B3D] min-w-[320px] max-w-[30vw] h-screen relative"
        style={{ height: "100vh", overflow: 'hidden' }}
      >
        {leftContent}
        <style jsx global>{`
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
      {/* Right: Community Home or Trip Prep */}
      <div
        id="right-sheet3"
        className="flex-1 flex flex-col bg-gray-50 p-8 overflow-y-auto min-w-[200px]"
        style={{ height: "100vh" }}
      >
        {rightTab==='home'?rightHome:rightPrep}
      </div>
    </div>
  );
} 