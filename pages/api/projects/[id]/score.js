import { supabase } from '../../../../lib/supabaseClient';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'POST') {
    const { score_value } = req.body;
    // ลบคะแนนเดิมทั้งหมดของ project นี้ก่อน
    await supabase.from('scores').delete().eq('project_id', id);
    // เพิ่มคะแนนใหม่
    const { error } = await supabase
      .from('scores')
      .insert([{ project_id: id, score_value }]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'คะแนนถูกบันทึกแล้ว' });
  } else {
    res.status(405).end();
  }
} 