import { useState } from 'react';

export default function RatingInput({ onSubmit }) {
  const [score, setScore] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(score);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
      <label htmlFor="score" className="font-medium">ให้คะแนน:</label>
      <input
        id="score"
        type="number"
        min={1}
        max={100}
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        className="border rounded px-2 py-1 w-20"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? 'กำลังส่ง...' : 'ส่งคะแนน'}
      </button>
    </form>
  );
} 