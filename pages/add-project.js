import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AddProject() {
  const [villages, setVillages] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    budget: '',
    village_id: '',
  });
  const router = useRouter();

  useEffect(() => {
    fetch('/api/villages')
      .then((res) => res.json())
      .then((data) => setVillages(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // สร้างโครงการทั้งชุด A และ B
    const projectA = {
      ...form,
      project_set: 'A',
      name: form.name + ' (ชุด A)',
      budget: Number(form.budget),
      village_id: Number(form.village_id)
    };

    const projectB = {
      ...form,
      project_set: 'B',
      name: form.name + ' (ชุด B)',
      budget: Number(form.budget),
      village_id: Number(form.village_id)
    };

    // บันทึกทั้งสองโครงการ
    await fetch('/api/projects/create-both-sets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectA, projectB }),
    });

    router.push(`/village/${form.village_id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-blue-700 drop-shadow text-center">เพิ่มโครงการใหม่</h1>
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full flex flex-col gap-6 border border-blue-100">
        <p className="text-gray-600 text-center">
          โครงการจะถูกสร้างทั้งชุด A และ B โดยอัตโนมัติ
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <label>
            <span className="block text-sm font-medium text-gray-700 mb-1">หมู่บ้าน</span>
            <select 
              name="village_id" 
              value={form.village_id}
              className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required 
              onChange={handleChange}
            >
              <option value="">เลือกหมู่</option>
              {villages.map((v) => (
                <option key={v.id} value={v.id}>หมู่ {v.name}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-1">แผน</span>
            <input 
              name="name" 
              value={form.name}
              placeholder="ชื่อแผน" 
              className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required 
              onChange={handleChange} 
            />
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-1">ชื่อโครงการ</span>
            <textarea 
              name="description" 
              value={form.description}
              placeholder="รายละเอียดโครงการ" 
              className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required 
              onChange={handleChange} 
            />
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-1">งบประมาณ (บาท)</span>
            <input 
              name="budget" 
              value={form.budget}
              placeholder="0" 
              type="number" 
              min="0" 
              className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required 
              onChange={handleChange} 
            />
          </label>

          <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-green-500 transition font-bold text-lg">
            บันทึกโครงการทั้ง 2 ชุด
          </button>
        </form>
      </div>
    </div>
  );
} 