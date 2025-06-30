import { useEffect, useState } from 'react';
import VillageGrid from '../components/VillageGrid';

export default function Home() {
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    fetch('/api/villages')
      .then((res) => res.json())
      .then((data) => setVillages(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-blue-700 drop-shadow text-center">เลือกหมู่บ้าน</h1>
      <div className="w-full max-w-5xl">
        <VillageGrid villages={villages} />
      </div>
    </div>
  );
} 