import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as XLSX from 'xlsx';

export default function VillagePage() {
  const router = useRouter();
  const { id } = router.query;
  const [projects, setProjects] = useState([]);
  const [selectedSet, setSelectedSet] = useState('all');

  useEffect(() => {
    if (id) {
      fetch(`/api/villages/${id}/projects`)
        .then((res) => res.json())
        .then((data) => setProjects(data));
    }
  }, [id]);

  const filteredProjects = selectedSet === 'all' 
    ? projects 
    : projects.filter(project => project.project_set === selectedSet);

  const exportToExcel = () => {
    // เตรียมข้อมูลสำหรับ Excel
    const excelData = filteredProjects.map(project => ({
      'แผน': project.name,
      'ชื่อโครงการ': project.description,
      'งบประมาณ': project.budget ? Number(project.budget).toLocaleString() + ' บาท' : '-',
      'คะแนน': project.last_score ? Number(project.last_score).toFixed(0) : '-',
      'ชุด': project.project_set
    }));

    // สร้าง workbook และ worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // ปรับความกว้างคอลัมน์
    const colWidths = [
      { wch: 30 }, // แผน
      { wch: 40 }, // ชื่อโครงการ
      { wch: 15 }, // งบประมาณ
      { wch: 10 }, // คะแนน
      { wch: 8 }   // ชุด
    ];
    ws['!cols'] = colWidths;

    // เพิ่ม worksheet ลงใน workbook
    XLSX.utils.book_append_sheet(wb, ws, `โครงการหมู่${id}`);

    // บันทึกไฟล์
    XLSX.writeFile(wb, `โครงการหมู่${id}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-purple-500 hover:to-pink-600 font-bold text-lg transition">
                ← กลับหน้าหลัก
              </button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 drop-shadow">โครงการในหมู่ {id}</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={exportToExcel}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-6 py-3 rounded-xl shadow-lg hover:from-emerald-600 hover:to-teal-500 transition font-bold text-lg flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Export Excel
            </button>
            <Link href="/add-project">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-green-500 hover:to-blue-600 font-bold text-lg transition">
                + เพิ่มโครงการ
              </button>
            </Link>
          </div>
        </div>

        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={() => setSelectedSet('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              selectedSet === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setSelectedSet('A')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              selectedSet === 'A'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            ชุด A
          </button>
          <button
            onClick={() => setSelectedSet('B')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              selectedSet === 'B'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            ชุด B
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full table-fixed">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th scope="col" className="w-1/6 p-4 text-left text-sm font-bold text-gray-700">แผน</th>
                <th scope="col" className="w-1/4 p-4 text-left text-sm font-bold text-gray-700">ชื่อโครงการ</th>
                <th scope="col" className="w-1/6 p-4 text-right text-sm font-bold text-gray-700">งบประมาณ</th>
                <th scope="col" className="w-[10%] p-4 text-center text-sm font-bold text-gray-700">คะแนน</th>
                <th scope="col" className="w-[10%] p-4 text-center text-sm font-bold text-gray-700">ชุด</th>
                <th scope="col" className="w-[15%] p-4 text-center text-sm font-bold text-gray-700">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-900 truncate">{project.name}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-500 truncate">{project.description}</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="text-sm text-green-600 font-semibold whitespace-nowrap">
                      {project.budget ? Number(project.budget).toLocaleString() + ' บาท' : '-'}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="text-sm font-medium text-blue-600">
                      {project.last_score ? Number(project.last_score).toFixed(0) : '-'}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className={`text-sm font-medium px-2 py-1 rounded-full inline-block
                      ${project.project_set === 'A' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                      }`}>
                      {project.project_set}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <Link href={`/project/${project.id}`}>
                      <button className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        ดูรายละเอียด
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
