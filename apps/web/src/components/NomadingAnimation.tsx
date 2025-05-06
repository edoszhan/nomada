export default function NomadingAnimation({ animText }: { animText: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <span className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">{animText}</span>
      <span className="text-lg text-gray-500">Generating your plan...</span>
    </div>
  );
} 