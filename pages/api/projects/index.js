import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description, budget, village_id, project_set } = req.body;
    const { data, error } = await supabase
      .from('projects')
      .insert([
        { 
          name, 
          description, 
          budget: Number(budget), 
          village_id: Number(village_id),
          project_set 
        }
      ])
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } else {
    res.status(405).end();
  }
} 