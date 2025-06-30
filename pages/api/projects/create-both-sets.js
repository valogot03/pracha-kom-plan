import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { projectA, projectB } = req.body;

    try {
      // สร้างทั้งสองโครงการในทรานแซคชั่นเดียวกัน
      const { data, error } = await supabase
        .from('projects')
        .insert([projectA, projectB]);

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
} 