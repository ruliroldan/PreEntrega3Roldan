const calculateTotalTime = (hours, minutes, seconds) => hours * 3600 + minutes * 60 + seconds;

const calculateAveragePace = (totalTimeSeconds, distance) => {
    if (totalTimeSeconds <= 0 || distance <= 0) {
        return "El tiempo y la distancia deben ser mayores que 0.";
    }

    const averagePaceSecondsPerKm = totalTimeSeconds / distance;
    return averagePaceSecondsPerKm;
};

const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} horas, ${minutes} minutos y ${remainingSeconds} segundos`;
};

const main = () => {
    const runsData = [];

    let continueInput = true;

    while (continueInput) {
        const distance = parseFloat(prompt("Ingresa la distancia en kilómetros"));
        console.log(`Distancia ingresada: ${distance} kilómetros`);

        const timeInput = prompt("Ingresa el tiempo en formato 'hh:mm:ss':");
        const timeParts = timeInput.split(":");
        const hours = parseFloat(timeParts[0]);
        const minutes = parseFloat(timeParts[1]);
        const seconds = parseFloat(timeParts[2]);
        console.log(`Tiempo ingresado: ${hours} horas, ${minutes} minutos, ${seconds} segundos`);

        const totalTimeSeconds = calculateTotalTime(hours, minutes, seconds);
        console.log(`Tiempo total en segundos: ${totalTimeSeconds} segundos`);

        const averagePace = calculateAveragePace(totalTimeSeconds, distance);
        const formattedTime = formatTime(Math.round(averagePace));
        console.log(`Tu promedio es de ${formattedTime} por kilómetro.`);

        let message = `Tu promedio es de ${formattedTime} por kilómetro.`;

        switch (true) {
            case averagePace > 600: // Más de 10 minutos por kilómetro
                message += "\n¡Vamos, puedes mejorar tu ritmo!";
                break;
            case averagePace <= 360: // Menos de 6 minutos por kilómetro
                message += "\n¡Excelente ritmo!";
                break;
            default:
                message += "\nSigue entrenando para mejorar tu tiempo.";
        }

        console.log(message);
        alert(message);

        runsData.push({
            distance,
            totalTimeSeconds,
            averagePace
        });

        const continueInputStr = prompt("¿Deseas ingresar otro conjunto de datos? (s/n)").toLowerCase();
        continueInput = continueInputStr === "s";
    }

    const distances = runsData.map(run => run.distance);
    console.log("Distancias de todas las carreras:", distances);
};

main();