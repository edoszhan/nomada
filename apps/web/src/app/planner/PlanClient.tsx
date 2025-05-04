'use client';
export default function PlanClient({ plan }: { plan: any }) {
  // if (!plan?.steps) {
  //   return (
  //     <div className="p-10">
  //       <p>No plan steps available. Please try again.</p>
  //     </div>
  //   );
  // }
  console.log('Plan data in PlanClient:', plan);


  return (
    <div className="grid md:grid-cols-3 min-h-screen">
      {/* Left: placeholder chat */}
      <section className="col-span-2 border-r p-6 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Chat (coming soon)</h2>
        <p className="text-muted-foreground">We'll add conversation here later.</p>
      </section>

      {/* Right: action log */}
      <aside className="p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Your Plan</h2>
        <div className="border rounded p-3">
          <h4 className="font-semibold">Visa Information</h4>
          <p className="text-sm whitespace-pre-line">{plan.steps[0].detail}</p>
        </div>
      </aside>
    </div>
  );
}
