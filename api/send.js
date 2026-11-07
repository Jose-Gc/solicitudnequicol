// Vercel Serverless Function: Proxy seguro para enviar notificaciones a Discord
export default async function handler(req, res) {
  // Manejo de CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Utilice POST.' });
  }

  const webhookURL = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1396648981777354833/Afd4RlMJx91KqeOb3vx2q4bcDkHuA53_AVbqh6gxWKey3k_lbZCHqeyT_NwN9gipxmoZ';

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ 
        error: 'Error al enviar a Discord', 
        details: errorText 
      });
    }

    return res.status(200).json({ success: true, message: 'Datos enviados correctamente' });
  } catch (error) {
    console.error('Error en /api/send:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor', 
      message: error.message 
    });
  }
}
