import { Briefcase } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Text */}
        <p className="text-gray-600 text-sm animate-pulse">
          Finding amazing opportunities...
        </p>

      </div>
    </div>
  );
};

export default LoadingSpinner;