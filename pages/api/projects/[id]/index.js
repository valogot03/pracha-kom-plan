import { supabase } from '../../../../lib/supabaseClient';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    // ดึงรายละเอียดโครงการ
    const { data: project, error: err1 } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (err1) return res.status(500).json({ error: err1.message });

    // ดึง avg_score
    const { data: avg, error: err2 } = await supabase
      .from('projects_with_avg_score')
      .select('avg_score')
      .eq('id', id)
      .single();
    if (err2) return res.status(500).json({ error: err2.message });

    res.status(200).json({ project, avg_score: avg?.avg_score });
  } else {
    res.status(405).end();
  }
} 