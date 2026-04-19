import dotenv from 'dotenv';
import connectDB from './config/database.js';
import User from './models/User.js';
import Job from './models/Job.js';
import Application from './models/Application.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    await Application.deleteMany();
    await Job.deleteMany();
    await User.deleteMany();

    const usersData = [
      {
        fullName: 'Lê Văn A',
        email: 'candidate1@example.com',
        password: 'Password123!',
        phone: '0901234567',
        address: 'Hồ Chí Minh',
        avatar: 'https://i.pravatar.cc/200?img=12',
        role: 'candidate',
        candidate: {
          bio: 'Ứng viên frontend có 3 năm kinh nghiệm phát triển React và thiết kế UI/UX.',
          skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
          experience: '3 năm',
          education: 'Cử nhân Công nghệ thông tin',
          cvFile: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          desiredSalary: { min: 15000000, max: 22000000, currency: 'VND' },
          preferredLocations: ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng'],
          jobTypes: ['full-time', 'remote'],
        },
      },
      {
        fullName: 'Nguyễn Thị B',
        email: 'candidate2@example.com',
        password: 'Password123!',
        phone: '0912345678',
        address: 'Hà Nội',
        avatar: 'https://i.pravatar.cc/200?img=23',
        role: 'candidate',
        candidate: {
          bio: 'Ứng viên marketing với kinh nghiệm xây dựng chiến lược nội dung và quảng cáo số.',
          skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Google Ads'],
          experience: '4 năm',
          education: 'Cử nhân Marketing',
          cvFile: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          desiredSalary: { min: 12000000, max: 18000000, currency: 'VND' },
          preferredLocations: ['Hà Nội', 'Hải Phòng'],
          jobTypes: ['full-time'],
        },
      },
      {
        fullName: 'Công ty TechCorp',
        email: 'employer1@example.com',
        password: 'Employer123!',
        phone: '0281234567',
        address: 'Quận 1, TP.HCM',
        role: 'employer',
        employer: {
          companyName: 'TechCorp Solutions',
          industry: 'Công nghệ thông tin',
          companyWebsite: 'https://techcorp.example.com',
          companyLogo: 'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=200&q=80',
          companySize: 'medium',
          description: 'Công ty chuyên phát triển giải pháp phần mềm doanh nghiệp và ứng dụng web.',
          companyAddress: 'Tầng 10, Tòa nhà Sunflower, TP.HCM',
        },
      },
      {
        fullName: 'Công ty GreenWorks',
        email: 'employer2@example.com',
        password: 'Employer123!',
        phone: '0243987654',
        address: 'Cầu Giấy, Hà Nội',
        role: 'employer',
        employer: {
          companyName: 'GreenWorks Creative',
          industry: 'Marketing & Truyền thông',
          companyWebsite: 'https://greenworks.example.com',
          companyLogo: 'https://images.unsplash.com/photo-1492724441997-5dc865305da4?auto=format&fit=crop&w=200&q=80',
          companySize: 'small',
          description: 'Agency sáng tạo chuyên về thương hiệu, nội dung số và quảng cáo.',
          companyAddress: 'Tầng 5, Tòa nhà Mekong, Hà Nội',
        },
      },
      {
        fullName: 'Admin System',
        email: 'admin@example.com',
        password: 'Admin123!',
        role: 'admin',
      },
    ];

    const createdUsers = await Promise.all(usersData.map((user) => User.create(user)));

    const employers = createdUsers.filter((user) => user.role === 'employer');
    const candidates = createdUsers.filter((user) => user.role === 'candidate');

    const jobsData = [
      {
        title: 'Senior Frontend Developer',
        description: 'Phát triển giao diện người dùng cho hệ thống tuyển dụng, tối ưu trải nghiệm mobile-first.',
        requirements: ['React', 'Redux', 'Tailwind CSS', 'REST API', 'Testing'],
        responsibilities: ['Xây dựng UI', 'Tối ưu hiệu năng', 'Kết nối API', 'Bảo trì codebase'],
        category: 'IT & Software',
        salary: { min: 18000000, max: 26000000, currency: 'VND', period: 'month' },
        jobType: 'full-time',
        location: 'Hồ Chí Minh',
        experienceLevel: 'senior',
        yearsRequired: 4,
        requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'UI/UX'],
        employerId: employers[0]._id,
        companyName: employers[0].employer.companyName,
        companyLogo: employers[0].employer.companyLogo,
        status: 'active',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Backend Node.js Developer',
        description: 'Thiết kế và triển khai API cho hệ thống tuyển dụng, đảm bảo hiệu năng và bảo mật.',
        requirements: ['Node.js', 'Express', 'MongoDB', 'JWT', 'RESTful API'],
        responsibilities: ['Xây dựng API', 'Tối ưu database', 'Viết test', 'Triển khai server'],
        category: 'IT & Software',
        salary: { min: 17000000, max: 24000000, currency: 'VND', period: 'month' },
        jobType: 'full-time',
        location: 'Hà Nội',
        experienceLevel: 'mid',
        yearsRequired: 3,
        requiredSkills: ['Node.js', 'Express', 'MongoDB', 'REST API', 'Docker'],
        employerId: employers[0]._id,
        companyName: employers[0].employer.companyName,
        companyLogo: employers[0].employer.companyLogo,
        status: 'active',
        expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Creative Marketing Specialist',
        description: 'Phát triển chiến dịch marketing số, nội dung và thương hiệu cho sản phẩm mới.',
        requirements: ['Content Marketing', 'Social Media', 'SEO', 'Google Ads'],
        responsibilities: ['Lên ý tưởng content', 'Quản lý chiến dịch', 'Phân tích dữ liệu'],
        category: 'Sales & Marketing',
        salary: { min: 12000000, max: 18000000, currency: 'VND', period: 'month' },
        jobType: 'full-time',
        location: 'Hà Nội',
        experienceLevel: 'junior',
        yearsRequired: 2,
        requiredSkills: ['Content', 'SEO', 'Analytics', 'Digital Ads'],
        employerId: employers[1]._id,
        companyName: employers[1].employer.companyName,
        companyLogo: employers[1].employer.companyLogo,
        status: 'active',
        expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Remote UX/UI Designer',
        description: 'Thiết kế trải nghiệm người dùng và UI cho ứng dụng web/di động, làm việc từ xa.',
        requirements: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
        responsibilities: ['Thiết kế UI', 'Nghiên cứu người dùng', 'Cập nhật thiết kế'],
        category: 'Design',
        salary: { min: 14000000, max: 21000000, currency: 'VND', period: 'month' },
        jobType: 'remote',
        location: 'Remote',
        experienceLevel: 'mid',
        yearsRequired: 3,
        requiredSkills: ['Figma', 'Sketch', 'Design System', 'User Testing'],
        employerId: employers[1]._id,
        companyName: employers[1].employer.companyName,
        companyLogo: employers[1].employer.companyLogo,
        status: 'active',
        expiryDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      },
    ];

    const createdJobs = await Job.insertMany(jobsData);

    const candidate1 = candidates[0];
    const candidate2 = candidates[1];

    candidate1.candidate.savedJobs = [createdJobs[0]._id, createdJobs[3]._id];
    candidate2.candidate.savedJobs = [createdJobs[2]._id];
    await candidate1.save();
    await candidate2.save();

    const applicationsData = [
      {
        jobId: createdJobs[0]._id,
        candidateId: candidate1._id,
        candidateName: candidate1.fullName,
        candidateEmail: candidate1.email,
        candidatePhone: candidate1.phone,
        jobTitle: createdJobs[0].title,
        employerId: employers[0]._id,
        companyName: createdJobs[0].companyName,
        coverLetter: 'Tôi rất quan tâm đến vị trí Senior Frontend Developer và tin rằng kỹ năng React của tôi phù hợp với yêu cầu.',
        cvFile: candidate1.candidate.cvFile,
        status: 'pending',
      },
      {
        jobId: createdJobs[2]._id,
        candidateId: candidate2._id,
        candidateName: candidate2.fullName,
        candidateEmail: candidate2.email,
        candidatePhone: candidate2.phone,
        jobTitle: createdJobs[2].title,
        employerId: employers[1]._id,
        companyName: createdJobs[2].companyName,
        coverLetter: 'Tôi có kinh nghiệm triển khai chiến dịch marketing hiệu quả và muốn đóng góp cho GreenWorks.',
        cvFile: candidate2.candidate.cvFile,
        status: 'reviewed',
        isViewed: true,
      },
    ];

    await Application.insertMany(applicationsData);

    console.log('Seed data created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed data failed:', error);
    process.exit(1);
  }
};

seedDatabase();
