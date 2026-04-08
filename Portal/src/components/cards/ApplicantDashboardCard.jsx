import { Clock } from "lucide-react";

const ApplicantDashboardCard = ({
  applicant = {},
  position,
  time,
}) => {
  const initials = applicant?.name
    ? applicant.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "NA";

  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/60 transition-all duration-200">

      {/* Left Section */}
      <div className="flex items-center gap-3">

        {/* Avatar */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
          {initials}
        </div>

        {/* Info */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800">
            {applicant?.name || "Unknown"}
          </h4>
          <p className="text-xs text-gray-500">
            {position || "No position"}
          </p>
        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 text-gray-400 text-xs">
        <Clock className="w-4 h-4" />
        <span>{time || "Just now"}</span>
      </div>

    </div>
  );
};

export default ApplicantDashboardCard;