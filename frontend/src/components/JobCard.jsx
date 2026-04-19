// src/components/JobCard.jsx
// Component hiển thị một công việc

import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase } from 'lucide-react';

const JobCard = ({ job }) => {
  const formatSalary = (min, max) => {
    return `${(min / 1000000).toFixed(0)}M - ${(max / 1000000).toFixed(0)}M`;
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
          <p className="text-gray-600">{job.companyName}</p>
        </div>
        <img
          src={job.companyLogo || 'https://via.placeholder.com/50'}
          alt={job.companyName}
          className="w-12 h-12 rounded"
        />
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

      <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-blue-600" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={18} className="text-blue-600" />
          <span>{formatSalary(job.salary.min, job.salary.max)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={18} className="text-blue-600" />
          <span className="capitalize">{job.jobType}</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {job.requiredSkills?.slice(0, 3).map((skill, idx) => (
          <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>

      <Link
        to={`/jobs/${job._id}`}
        className="btn-primary inline-block"
      >
        Xem chi tiết
      </Link>
    </div>
  );
};

export default JobCard;
