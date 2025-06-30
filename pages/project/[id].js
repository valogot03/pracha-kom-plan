import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RatingInput from '../../components/RatingInput';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [avgScore, setAvgScore] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/projects/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProject(data.project);
          setAvgScore(data.avg_score);
        });
    }
  }, [id]);

  const handleScoreSubmit = async (score) => {
    await fetch(`/api/projects/${id}/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score_value: score }),
    });
    // Refresh avg score
    const res = await fetch(`/api/projects/${id}`);
    const data = await res.json();
    setAvgScore(data.avg_score);
  };

  if (!project) return <div>Loading...</div>;

  const handleDelete = async () => {
    if (confirm('คุณต้องการลบโครงการนี้ใช่หรือไม่?')) {
      await fetch(`/api/projects/${id}/delete`, { method: 'DELETE' });
      router.push(`/village/${project.village_id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 flex flex-col items-center justify-center py-12">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-2xl w-full border border-blue-100 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-4 text-blue-700 drop-shadow">{project.name}</h1>
        <p className="mb-4 text-gray-700 text-lg">{project.description}</p>
        {project.budget && (
          <p className="mb-4 text-green-700 text-lg font-semibold">งบประมาณ: {Number(project.budget).toLocaleString()} บาท</p>
        )}
        <RatingInput onSubmit={handleScoreSubmit} />
        <button
          className="mt-8 bg-gradient-to-r from-red-500 to-pink-400 text-white px-6 py-3 rounded-xl shadow-lg hover:from-red-600 hover:to-pink-500 transition font-bold text-lg"
          onClick={handleDelete}
        >
          ลบโครงการ
        </button>
      </div>
    </div>
  );
} 