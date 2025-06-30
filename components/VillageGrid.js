import Link from 'next/link';

export default function VillageGrid({ villages }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {villages.map((village) => (
        <Link key={village.id} href={`/village/${village.id}`}>
          <div className="bg-gradient-to-br from-green-200 via-blue-100 to-blue-200 shadow-lg rounded-xl p-10 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all border-2 border-blue-100">
            <h2 className="text-2xl font-bold text-center text-blue-800 drop-shadow">หมู่ {village.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
} 