'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

type FormData = {
  name: string;
  passport: string;
  country: string;
};

export default function SurveyPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      // pick ONE of the two endpoints:
      const url =
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ??
        '/api/plan';   
        
      console.log('Form data being sent:', data);
      console.log('API URL being used:', url);

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', errorText);
        throw new Error(`Server returned ${res.status}: ${errorText}`);
      }

      console.log('API Response status:', res.status);

      // try to parse JSON – if it fails, fall back to text
      const maybeJson = await res
        .clone()
        .json()
        .catch(() => res.text());

      // store small token / plan stub (avoid huge cookies!)
      document.cookie = `plan=${encodeURIComponent(
        JSON.stringify({ plan: maybeJson })
      )}; path=/`;

      router.push('/planner');
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md py-20 space-y-4">
      <h1 className="text-2xl font-bold">Quick Preferences</h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('name')}
          placeholder="Full Name"
          className="w-full border p-2"
          required
        />

        <select {...register('passport')} className="w-full border p-2" required>
          <option value="">Passport</option>
          <option value="KAZ">Kazakhstan</option>
          <option value="USA">USA</option>
          <option value="KOR">South Korea</option>
        </select>

        <select {...register('country')} className="w-full border p-2" required>
          <option value="">Destination Country</option>
          <option value="TH">Thailand</option>
          <option value="ID">Indonesia</option>
          <option value="VN">Vietnam</option>
        </select>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Generating…' : 'Generate Plan'}
        </Button>
      </form>
    </main>
  );
}
