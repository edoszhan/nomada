import { cookies } from 'next/headers';
import PlanClient from './PlanClient';

export default async function Planner() {
  const cookie = (await cookies()).get('plan');
  if (!cookie) return <p className="p-10">No plan found. Go back to the survey.</p>;

  try {
    const plan = JSON.parse(decodeURIComponent(cookie.value));
    console.log('Plan data from cookie:', plan);

    // Transform the plan structure to match what PlanClient expects
    const transformedPlan = {
      steps: [
        {
          title: "Visa Information",
          detail: plan.plan.output
        }
      ]
    };

    return <PlanClient plan={transformedPlan} />;
  } catch (error) {
    console.error('Error parsing plan cookie:', error);
    return <p className="p-10">Error loading plan. Please try again.</p>;
  }
}
