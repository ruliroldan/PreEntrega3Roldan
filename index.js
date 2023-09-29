// Función para calcular el tiempo total en segundos
const calculateTotalTime = (hours, minutes, seconds) => hours * 3600 + minutes * 60 + seconds;

// Función para calcular el ritmo promedio
const calculateAveragePace = (totalTimeSeconds, distance) => {
    if (totalTimeSeconds <= 0 || distance <= 0) {
        return "El tiempo y la distancia deben ser mayores que 0.";
    }

    const averagePaceSecondsPerKm = totalTimeSeconds / distance;
    return averagePaceSecondsPerKm;
};

// Función para formatear el tiempo en formato 'hh:mm:ss'
const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} horas, ${minutes} minutos y ${remainingSeconds} segundos`;
};

// Función principal
const main = () => {
    const calculateButton = document.getElementById("calculateButton");
    const resultDiv = document.getElementById("result");

    calculateButton.addEventListener("click", () => {
        const distanceInput = document.getElementById("distanceInput").value;
        const timeInput = document.getElementById("timeInput").value;

        const distance = parseFloat(distanceInput);
        const timeParts = timeInput.split(":");
        const hours = parseFloat(timeParts[0]);
        const minutes = parseFloat(timeParts[1]);
        const seconds = parseFloat(timeParts[2]);
        const totalTimeSeconds = calculateTotalTime(hours, minutes, seconds);
        const averagePace = calculateAveragePace(totalTimeSeconds, distance);
        const formattedTime = formatTime(Math.round(averagePace));

        let message = averagePace > 600
            ? "¡Vamos, puedes mejorar tu ritmo!"
            : (averagePace <= 360 ? "¡Excelente ritmo!" : "Sigue entrenando para mejorar tu tiempo.");

        // Actualiza la interfaz de usuario con los resultados
        resultDiv.innerHTML = `<p>Tu promedio es de ${formattedTime} por kilómetro.</p>`;
        alert("¡HOLA RUNNER!\n" + message);
    });
};

// Llamamos a la función principal main al cargar la página
window.onload = main;