import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('villages').select('*').order('id');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else {
    res.status(405).end();
  }
} 