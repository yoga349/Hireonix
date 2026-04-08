import { Briefcase } from "lucide-react";
import moment from "moment";

const JobDashboardCard = ({ job }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-md">
          <Briefcase className="text-blue-600" />
        </div>

        <div>
          <h4 className="font-semibold text-gray-800">
            {job.title}
          </h4>
          <p className="text-sm text-gray-500">
            {job.location} • {moment(job.createdAt).format("DD MMM YYYY")}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            !job.isClosed
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {job.isClosed ? "Closed" : "Active"}
        </span>
      </div>

    </div>
  );
};

export default JobDashboardCard;