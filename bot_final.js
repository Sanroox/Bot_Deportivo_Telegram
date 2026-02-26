//Llaves de la aplicacion
const API_KEY_NBA = process.env.API_KEY_NBA;
const API_KEY_FUTBOL = process.env.API_KEY_FUTBOL;
const TOKEN_TELEGRAM = process.env.TOKEN_TELEGRAM;
const CANAL = "@Deporte_Al_Dia";

//Pedimos la hora
const hoy = new Date();
const fechaHoy = hoy.toISOString().split('T')[0];

const url_nba = "https://api.balldontlie.io/v1/games?dates[]=" + fechaHoy;
const url_futbol = "https://v3.football.api-sports.io/fixtures?date=" + fechaHoy;

console.log("Recopilando datos deportivos mundiales... ⏳");

//Asincronia
Promise.all([
    fetch(url_nba, { method: 'GET', headers: { 'Authorization': API_KEY_NBA } }).then(res => res.json()),
    fetch(url_futbol, { method: 'GET', headers: { 'x-apisports-key': API_KEY_FUTBOL } }).then(res => res.json())
])
    .then(resultados => {
        const datos_nba = resultados[0];
        const datos_futbol = resultados[1];

        //Imprimimos en la terminal la respuesta de la api de futbol
        console.log("Respuesta de los partidos de futbol:");
        console.log(datos_futbol);
    

        const url_telegram = `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendMessage`;

//Mensaje por separado con los partidos de la Nba
    let mensaje_nba = "🏀 *PARTIDOS NBA DE HOY:*\n\n";
    
    if (datos_nba.data && datos_nba.data.length > 0) {
        datos_nba.data.forEach(partido => {
            mensaje_nba += `▶️ ${partido.home_team.full_name} vs ${partido.visitor_team.full_name}\n`;
        });
    } else {
         mensaje_nba += "Hoy no hay partidos de la NBA programados.\n";
    }

    const foto_nba = "https://assets.turbologo.com/blog/es/2019/10/19133000/NBA-logo-illustration.jpg";
    const url_telegram_foto_nba = `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendPhoto`;

    fetch(url_telegram_foto_nba, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            chat_id: CANAL, 
            photo: foto_nba,       
            caption: mensaje_nba,  
            parse_mode: "Markdown" 
        })
    });


//Mensaje por separado con los partidos de las principales competiciones de Europa.
    let mensaje_futbol = "⚽ *PARTIDOS TOP EUROPA DE HOY:*\n\n";

    if (datos_futbol.response && datos_futbol.response.length > 0) {
        const ligas_top = [2, 3, 39, 61, 78, 135, 140, 848];
        const partidos_filtrados = datos_futbol.response.filter(partido => ligas_top.includes(partido.league.id));

        if (partidos_filtrados.length > 0) {
            
            const ligas_agrupadas = {};

            partidos_filtrados.forEach(partido => {
                const nombreLiga = partido.league.name;
                if (!ligas_agrupadas[nombreLiga]) {
                    ligas_agrupadas[nombreLiga] = [];
                }
                
                ligas_agrupadas[nombreLiga].push(partido);
            });

            for (const liga in ligas_agrupadas) {
                mensaje_futbol += `🏆 *${liga}*\n`; 

                ligas_agrupadas[liga].forEach(partido => {
                    const golesLocal = partido.goals.home !== null ? partido.goals.home : "-";
                    const golesVisitante = partido.goals.away !== null ? partido.goals.away : "-";
                    mensaje_futbol += `  ▶️ ${partido.teams.home.name} ${golesLocal} - ${golesVisitante} ${partido.teams.away.name}\n`;
                });
                mensaje_futbol += `\n`; 
            }

        } else {
            mensaje_futbol += "Hoy descansan las grandes ligas. ¡No hay partidos Top!\n";
        }
    } else {
        mensaje_futbol += "El servidor de fútbol no ha devuelto datos hoy.\n";
    }


    const foto_futbol = "https://assets.soyfutbol.com/img/2020/10/19/champions_wall_crop1603126829541.jpg?__scale=w:420,h:420,t:2,q:80";
    const url_telegram_foto_futbol = `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendPhoto`;

    fetch(url_telegram_foto_futbol, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            chat_id: CANAL, 
            photo: foto_futbol,      
            caption: mensaje_futbol,  
            parse_mode: "Markdown" 
        })
    });

    })
    .catch(error => console.error("Error:", error));