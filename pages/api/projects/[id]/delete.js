import { supabase } from '../../../../lib/supabaseClient';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    // ลบคะแนนที่อ้างถึง project นี้ก่อน
    await supabase.from('scores').delete().eq('project_id', id);
    // แล้วค่อยลบ project
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: 'ลบโครงการสำเร็จ' });
  } else {
    res.status(405).end();
  }
} 