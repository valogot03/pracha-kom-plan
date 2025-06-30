import Link from 'next/link';

export default function ProjectCard({ project, onDelete }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col border border-blue-100 hover:shadow-2xl transition-all">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-blue-700 mb-2">{project.name}</h3>
        <p className="text-sm text-gray-500 mb-2">คะแนนล่าสุด: <span className="font-semibold text-yellow-500">{project.last_score ?? '-'}</span></p>
      </div>
      <div className="flex gap-2 mt-2">
        <Link href={`/project/${project.id}`}>
          <button className="flex-1 bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-green-500 transition">ดูรายละเอียด</button>
        </Link>
        {onDelete && (
          <button
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
            onClick={() => onDelete(project.id)}
          >
            ลบ
          </button>
        )}
      </div>
    </div>
  );
} 