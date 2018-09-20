const secHand = document.querySelector('.sec-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const sada = new Date();

    const sekundara = sada.getSeconds();
    const sekundaraStepen = ((sekundara / 60) * 360) + 90;
    secHand.style.transform = `rotate(${sekundaraStepen}deg)`;

    const min = sada.getMinutes();
    const minStepen = ((min / 60) * 360) + 90;
    minHand.style.transform = `rotate(${minStepen}deg)`;

    const sat = sada.getHours();
    const satStepen = ((min / (12 * 60)) * 360) + 90 + sat * 30;
    hourHand.style.transform = `rotate(${satStepen}deg)`;

}

setInterval(setDate, 1000);