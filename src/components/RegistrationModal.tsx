import React, { useState } from 'react';
import { X } from 'lucide-react';
import StudentRegistrationForm from './StudentRegistrationForm';
import ParentRegistrationForm from './ParentRegistrationForm';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  price?: {
    ugx: number;
    usd: number;
  };
  courses?: string[];
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  courseTitle = "Course Registration",
  price = { ugx: 400000, usd: 100 },
  courses = []
}) => {
  const [registrationType, setRegistrationType] = useState<'student' | 'parent' | null>(null);

  const closeModal = () => {
    setRegistrationType(null);
    onClose();
  };

  const resetSelection = () => {
    setRegistrationType(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
      <div
        className="relative bg-dark-light rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 opacity-0 scale-90 animate-[fadeInScale_0.3s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors duration-300"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold gradient-text mb-6">{courseTitle} - Registration</h2>
        
        {!registrationType ? (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-300 mb-6">Choose your registration type:</p>
            </div>
            
            <div className="space-y-4">
              <button
                className="w-full btn-primary py-4 text-lg"
                onClick={() => setRegistrationType('student')}
              >
                Register as Student
                <span className="block text-sm text-gray-300 mt-1">
                  For students registering themselves
                </span>
              </button>
              <button
                className="w-full btn-outline py-4 text-lg"
                onClick={() => setRegistrationType('parent')}
              >
                Register Child (Parent Registration)
                <span className="block text-sm text-gray-300 mt-1">
                  For parents registering their children
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {registrationType === 'student' ? (
              <StudentRegistrationForm 
                courseTitle={courseTitle} 
                price={price} 
                courses={courses.length > 0 ? courses : [courseTitle]} 
                onClose={resetSelection} 
              />
            ) : (
              <ParentRegistrationForm 
                courseTitle={courseTitle} 
                price={price} 
                onClose={resetSelection}
                courses={courses.length > 0 ? courses : [courseTitle]}
              />
            )}

            <button
              className="mt-4 text-gray-400 hover:text-gray-300 transition-colors duration-300"
              onClick={resetSelection}
            >
              ← Back to registration options
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
