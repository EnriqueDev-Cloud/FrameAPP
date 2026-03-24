import { db } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo no permitido' });
  }

  const { name, correo, movil, escuela, carrera } = req.body;

  try {
    const client = await db.connect();
    await client.sql`
      INSERT INTO registros (nombre, correo, telefono, escuela, carrera)
      VALUES (${name}, ${correo}, ${movil}, ${escuela}, ${carrera});
    `;
    return res.status(200).json({ message: 'Exito' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}