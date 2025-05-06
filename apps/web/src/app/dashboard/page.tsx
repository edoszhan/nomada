'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/utils/supabaseClient';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string | null;
  passport: string | null;
  joined_at: string | null;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'running' | 'completed' | 'error';
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Travel Planning Assistant',
      description: 'AI-powered travel planning workflow that helps you find the best destinations, accommodations, and activities based on your preferences.',
      status: 'idle'
    },
    {
      id: '2',
      name: 'Document Processing',
      description: 'Automated document processing workflow that handles visa applications, passport renewals, and other travel-related paperwork.',
      status: 'idle'
    },
    {
      id: '3',
      name: 'Social Interactions',
      description: 'Community, habits, project progress and forum in one place.',
      status: 'idle'
    }
  ]);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabaseBrowser().auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      const { data: profileData, error } = await supabaseBrowser()
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(profileData);
      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabaseBrowser().auth.signOut();
    router.push('/login');
  };

  const startWorkflow = async (workflowId: string) => {
    // Update the workflow status
    setWorkflows(workflows.map(w => 
      w.id === workflowId ? { ...w, status: 'running' } : w
    ));

    try {
      // For Travel Planning Assistant, redirect to survey
      if (workflowId === '1') {
        router.push('/survey');
        return;
      }

      // For Document Processing, redirect to panel2
      if (workflowId === '2') {
        router.push('/panel2');
        return;
      }

      // For Social Interactions, redirect to panel3
      if (workflowId === '3') {
        router.push('/panel3');
        return;
      }

      // For other workflows, handle normally
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setWorkflows(workflows.map(w => 
        w.id === workflowId ? { ...w, status: 'completed' } : w
      ));
    } catch (error) {
      setWorkflows(workflows.map(w => 
        w.id === workflowId ? { ...w, status: 'error' } : w
      ));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome, {profile?.name || 'User'}!</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Your Information</h2>
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Passport:</span> {profile?.passport || 'Not set'}</p>
                <p><span className="font-medium">Member Since:</span> {profile?.joined_at ? new Date(profile.joined_at).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Available Workflows</h2>
              {workflows.map((workflow) => (
                <div key={workflow.id} className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{workflow.name}</h3>
                      <p className="text-gray-600 mt-1">{workflow.description}</p>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          workflow.status === 'idle' ? 'bg-gray-100 text-gray-800' :
                          workflow.status === 'running' ? 'bg-blue-100 text-blue-800' :
                          workflow.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => startWorkflow(workflow.id)}
                      disabled={workflow.status === 'running'}
                      className="ml-4"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <Link href="/profile" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Edit Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 