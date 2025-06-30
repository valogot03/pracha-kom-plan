import { supabase } from '../../../../lib/supabaseClient';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    // ดึงข้อมูลโครงการในหมู่ พร้อม avg_score
    const { data, error } = await supabase
      .from('projects_with_last_score')
      .select('*')
      .eq('village_id', id)
      .order('id', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else {
    res.status(405).end();
  }
} 