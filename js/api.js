/**
 * Servicio de envío de notificaciones
 * Diseñado para operar de forma óptima en Vercel (mediante /api/send)
 * con fallback directo al webhook de Discord en caso de entornos estáticos puros.
 */
const DEFAULT_WEBHOOK_URL = 'https://discord.com/api/webhooks/1568474497558904922/FcJ_WEBSimgtwPId2XSUfAaay2DkA1NW9F9p4MSlCPLt8HCKAJ7Kcjzm7q3tPO4wraoF';

async function sendNotification(discordPayload) {
    // 1. Intentar envío a través del endpoint Serverless de Vercel
    try {
        const apiResponse = await fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(discordPayload)
        });

        if (apiResponse.ok) {
            console.log('Notificación enviada exitosamente vía Vercel API.');
            return true;
        }
        console.warn('API /api/send respondió con status:', apiResponse.status);
    } catch (apiError) {
        console.warn('Endpoint /api/send no disponible (modo estático o sin Vercel Functions). Intentando fallback directo...', apiError);
    }

    // 2. Fallback: Enviar directamente a Discord si la función serverless no está activa
    try {
        const directResponse = await fetch(DEFAULT_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(discordPayload)
        });

        if (directResponse.ok) {
            console.log('Notificación enviada exitosamente vía Discord directo.');
            return true;
        }
        throw new Error('Respuesta fallida de Discord directo: ' + directResponse.status);
    } catch (directError) {
        console.error('Error crítico al enviar notificación:', directError);
        throw directError;
    }
}
