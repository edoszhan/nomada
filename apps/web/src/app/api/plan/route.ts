import { NextRequest, NextResponse } from 'next/server';

type PlanStep = {
  title: string;
  detail: string;
};

type Plan = {
  steps: PlanStep[];
};

// type CountryCode = 'TH' | 'VN' | 'ID';

// // Country-specific plan templates
// const countryPlans: Record<CountryCode, Plan> = {
//   TH: {
//     steps: [
//       {
//         title: "Thailand Visa Requirements",
//         detail: "Tourist visa required for stays over 30 days. Can be extended for an additional 30 days."
//       },
//       {
//         title: "Accommodation Options",
//         detail: "Recommended areas: Bangkok (Sukhumvit), Chiang Mai (Old City), Phuket (Patong Beach)"
//       },
//       {
//         title: "Cost of Living",
//         detail: "Average monthly budget: $1,000-$1,500. Includes accommodation, food, and local transport."
//       },
//       {
//         title: "Internet & Co-working",
//         detail: "Fast and reliable internet available. Popular co-working spaces: The Hive, Hubba, Punspace"
//       }
//     ]
//   },
//   VN: {
//     steps: [
//       {
//         title: "Vietnam Visa Requirements",
//         detail: "E-visa available for 30 days. Can be extended once for another 30 days."
//       },
//       {
//         title: "Accommodation Options",
//         detail: "Recommended areas: Ho Chi Minh City (District 1), Hanoi (Old Quarter), Da Nang (My Khe Beach)"
//       },
//       {
//         title: "Cost of Living",
//         detail: "Average monthly budget: $800-$1,200. Very affordable living costs compared to other countries."
//       },
//       {
//         title: "Internet & Co-working",
//         detail: "Good internet speeds. Popular co-working spaces: Dreamplex, Toong, UP Co-working"
//       }
//     ]
//   },
//   ID: {
//     steps: [
//       {
//         title: "Indonesia Visa Requirements",
//         detail: "Visa on arrival for 30 days. Can be extended once for another 30 days."
//       },
//       {
//         title: "Accommodation Options",
//         detail: "Recommended areas: Bali (Canggu, Ubud), Jakarta (South Jakarta), Yogyakarta (Malioboro)"
//       },
//       {
//         title: "Cost of Living",
//         detail: "Average monthly budget: $900-$1,400. Bali can be more expensive than other areas."
//       },
//       {
//         title: "Internet & Co-working",
//         detail: "Internet quality varies. Popular co-working spaces: Dojo Bali, GoWork, CoHive"
//       }
//     ]
//   }
// };

export async function POST(req: NextRequest) {
  try {
    // 1. read form data coming from the survey page
    const body = await req.json();
    console.log('Received request body:', body);

    // 2. forward it to n8n webhook
    const n8nUrl = process.env.NEXT_PUBLIC_N8N_URL || 'http://localhost:5678/webhook-test/plan';
    console.log('Forwarding to n8n webhook:', n8nUrl);

    const res = await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    console.log('n8n response status:', res.status);
    
    if (!res.ok) {
      console.error('n8n error:', await res.text());
      return NextResponse.json({ error: 'n8n failed' }, { status: 500 });
    }

    // 3. Get the response from n8n
    const n8nResponse = await res.json();
    console.log('n8n response:', n8nResponse);

    // 4. Transform n8n response into our plan structure
    const plan: Plan = {
      steps: [
        {
          title: "Visa Information",
          detail: n8nResponse.plan.output
        }
      ]
    };

    // 5. stash plan in a cookie
    const cookieVal = encodeURIComponent(JSON.stringify(plan));
    const headers = {
      'Set-Cookie': `plan=${cookieVal}; Path=/; HttpOnly; SameSite=Lax`,
    };

    // 6. send response back to the browser
    return NextResponse.json(plan, { headers });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Add OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
