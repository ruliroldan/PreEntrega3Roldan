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

// Función para formatear el tiempo en HH:MM:SS
const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${minutes}:${remainingSeconds}`;
};

document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculateButton");
    const resultDiv = document.getElementById("result");

    calculateButton.addEventListener("click", function () {
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

        // Mostrar resultado en el DOM
        resultDiv.innerHTML = ""; // Limpia cualquier contenido anterior
        const resultParagraph = document.createElement("p");
        resultParagraph.textContent = `Tu promedio es de ${formattedTime} por kilómetro.`;
        resultDiv.appendChild(resultParagraph);

        // Guardar en el almacenamiento local
        localStorage.setItem("averagePace", averagePace);
    });

    // Recuperar datos del almacenamiento local al cargar la página
    const savedAveragePace = localStorage.getItem("averagePace");
    if (savedAveragePace) {
        const formattedTime = formatTime(Math.round(parseFloat(savedAveragePace)));
        resultDiv.innerHTML = `<p>Tu promedio anterior era de ${formattedTime} por kilómetro.</p>`;
    }
});