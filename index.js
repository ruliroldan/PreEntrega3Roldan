document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculateButton");
    const dailyAveragesDiv = document.getElementById("dailyAverages");
    const distanceInput = document.getElementById("distanceInput");
    const timeInput = document.getElementById("timeInput");

    let dailyAverages = [];

    function loadJSONData() {
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                dailyAverages = data;
                showDailyAverages();
            })
            .catch(error => console.error(error));
    }

    loadJSONData();

    calculateButton.addEventListener("click", function () {
        const distance = parseFloat(distanceInput.value);
        const timeInputValue = timeInput.value;

        if (!isValidInput(distance) || !isValidTimeInput(timeInputValue)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresa datos válidos.'
            });
            return;
        }

        const timeParts = timeInputValue.split(":");
        const hours = parseFloat(timeParts[0]);
        const minutes = parseFloat(timeParts[1]);
        const seconds = parseFloat(timeParts[2]);

        const totalTimeSeconds = calculateTotalTime(hours, minutes, seconds);
        const averagePace = calculateAveragePace(totalTimeSeconds, distance);
        const formattedTime = formatTime(Math.round(averagePace));

        let message = averagePace > 600
            ? "¡Vamos, puedes mejorar tu ritmo!"
            : (averagePace <= 360 ? "¡Excelente ritmo!" : "Sigue entrenando para mejorar tu tiempo.");

        Swal.fire({
            icon: 'info',
            title: 'Resultado',
            text: `Tu promedio es de ${formattedTime} por kilómetro. ${message}`
        });

        dailyAverages.push({
            day: new Date().toLocaleDateString(),
            averagePace: averagePace
        });

        showDailyAverages();
        localStorage.setItem("dailyAverages", JSON.stringify(dailyAverages));
        saveJSONData();
    });

    function showDailyAverages() {
        dailyAveragesDiv.innerHTML = "";

        dailyAverages.forEach((data, index) => {
            const day = data.day;
            const average = data.averagePace;
            const paragraph = document.createElement("p");
            paragraph.textContent = `Día ${day}: ${formatTime(Math.round(average))} por kilómetro.`;
            dailyAveragesDiv.appendChild(paragraph);
        });
    }

    function saveJSONData() {
        fetch("data.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dailyAverages)
        })
            .then(response => response.json())
            .then(data => console.log("Datos guardados en data.json:", data))
            .catch(error => console.error("Error al guardar los datos:", error));
    }

    function calculateTotalTime(hours, minutes, seconds) {
        return hours * 3600 + minutes * 60 + seconds;
    }

    function calculateAveragePace(totalTimeSeconds, distance) {
        return totalTimeSeconds / distance;
    }

    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function isValidInput(value) {
        return !isNaN(value) && value > 0;
    }

    function isValidTimeInput(inputValue) {
        const timeRegex = /^\d{1,2}:\d{2}:\d{2}$/;
        return timeRegex.test(inputValue);
    }
});