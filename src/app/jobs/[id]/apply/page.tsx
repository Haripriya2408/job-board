'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { saveApplication } from '@/lib/applicationService';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Phone, User, Briefcase, X, FileText } from 'lucide-react';

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: ''
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const resumeData = resume ? await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(resume);
      }) : null;

      await saveApplication({
        jobId,
        ...formData,
        resumeName: resume?.name,
        resumeData
      });
      setIsSubmitted(true);
    } catch (error) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="container mx-auto px-4 py-12 max-w-2xl relative">
          <div className="bg-white rounded-xl shadow-sm p-8 relative">
            
            <Alert className="bg-green-50 border-green-200 mb-6 text-black">
              <AlertDescription>
                Your application has been submitted successfully!
              </AlertDescription>
            </Alert>
            
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Application Details</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-3 text-purple-600" />
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-purple-600" />
                <span>{formData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-purple-600" />
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-3 text-purple-600" />
                <span>{formData.experience} years experience</span>
              </div>
              {resume && (
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-3 text-purple-600" />
                  <span>{resume.name}</span>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex space-x-4">
              <button 
                onClick={() => router.push('/')}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                View All Jobs
              </button>
              <button 
                onClick={handleClose}
                className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Submit Your Application</h1>
            <p className="text-white/90">Fill out the form below to apply for this position</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            {error && (
              <Alert className="bg-red-50 border-red-200 mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <User className="w-4 h-4 mr-2 text-purple-600" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 text-black"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <Mail className="w-4 h-4 mr-2 text-purple-600" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full text-black p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <Phone className="w-4 h-4 mr-2 text-purple-600" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <Briefcase className="w-4 h-4 mr-2 text-purple-600" />
                    Experience Level *
                  </label>
                  <select 
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray- text-black"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  >
                    <option value="" className='texxt-black'>Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <FileText className="w-4 h-4 mr-2 text-purple-600" />
                  Upload Resume *
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                />
                <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 
                         disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}