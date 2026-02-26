# Telegram Sports Bot - Automated Daily Digest

## Descripción del Proyecto
Este proyecto consiste en un bot automatizado para Telegram desarrollado en Node.js, diseñado para recopilar, filtrar y formatear información deportiva diaria desde múltiples fuentes de datos. El objetivo principal es resolver la necesidad de consultar manualmente los horarios de las principales competiciones deportivas, consolidando la información en un único reporte diario estructurado y de fácil lectura.

El sistema se ejecuta de forma autónoma cada mañana a las 8:00 AM (CET) mediante la integración de flujos de trabajo de integración y despliegue continuo (CI/CD).

## Características Principales (Features)

* **Integración de múltiples APIs RESTful:** El bot realiza peticiones asíncronas concurrentes (utilizando `Promise.all`) a diferentes servicios externos para minimizar el tiempo de respuesta.
  * *Football API-Sports:* Para la obtención de calendarios de fútbol europeo.
  * *Balldontlie API:* Para la recopilación de la jornada de la NBA correspondiente a la próxima madrugada.
* **Procesamiento y Filtrado de Datos:** El sistema no se limita a reenviar la información, sino que aplica una capa de lógica de negocio para filtrar exclusivamente las competiciones de alto nivel (UEFA Champions League, Europa League, Conference League, Premier League, LaLiga, Serie A, Bundesliga y Ligue 1).
* **Estructuración de la Información:** Los datos obtenidos son agrupados dinámicamente por competición (mediante manipulación avanzada de objetos y arrays en JavaScript) para mejorar la experiencia de usuario (UX) en la lectura final.
* **Envío de Contenido Multimedia:** Utilización de la API oficial de Telegram para el envío de peticiones POST HTTP, combinando texto formateado en Markdown y contenido fotográfico optimizado para cumplir con las restricciones de peso de la plataforma.
* **Automatización en la Nube:** El despliegue está configurado mediante GitHub Actions, estableciendo un proceso cronometrado (Cron Job) que garantiza la ejecución del script en un entorno de servidor efímero de manera diaria sin necesidad de intervención manual ni infraestructura local.

## Stack Tecnológico

* **Lenguaje:** JavaScript (ES6+)
* **Entorno de ejecución:** Node.js
* **Automatización:** GitHub Actions (Cron Jobs)
* **Integraciones:** Telegram Bot API
* **Peticiones HTTP:** Fetch API nativa de Node.js

## Instalación y Despliegue Local

Para ejecutar este proyecto en un entorno de desarrollo local, sigue los siguientes pasos:

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener Node.js instalado (versión 18 o superior recomendada).
3. Configura tus propias claves de acceso (API Keys) y el Token de tu bot de Telegram. Por motivos de seguridad, las credenciales no están incluidas en el control de versiones. Deberás declararlas como variables en la cabecera del script principal:
   - `API_KEY_NBA`
   - `API_KEY_FUTBOL`
   - `TOKEN_TELEGRAM`
4. Ejecuta el script principal desde la terminal:
   `node bot_final.js`

## Posibles Mejoras Futuras
* Implementación de variables de entorno (`.env`) para una gestión más robusta de las credenciales.
* Refactorización del código hacia una arquitectura modular, separando los controladores de las APIs y la lógica de Telegram en distintos archivos.
* Integración de una base de datos ligera para almacenar preferencias de usuarios.
