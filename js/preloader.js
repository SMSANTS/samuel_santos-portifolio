const preloader = document.getElementById('preloader');
const conteudo = document.getElementById('conteudo');

// Marca o início do carregamento
const startTime = Date.now();

// Quando o site terminar de carregar
window.addEventListener('load', function() {
    const elapsedTime = Date.now() - startTime;
    const minimumTime = 2000; // 2 segundos

    if (elapsedTime >= minimumTime) {
        esconderPreloader();
    } else {
        // Espera o tempo restante
        setTimeout(esconderPreloader, minimumTime - elapsedTime);
    }
});

function esconderPreloader() {
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.5s ease';

    setTimeout(function() {
        preloader.style.display = 'none';
        conteudo.style.display = 'block';
    }, 500); // espera o fade-out terminar
}



// Função para selecionar elementos
var select = function(s) {
  return document.querySelector(s);
}

// Função para números aleatórios
function randomBetween(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1) + min);
    
    if (number !== 0) {
        return number;
    } else {
        return 0.5;
    }
}

// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Cria timeline principal
    var tl = gsap.timeline();
    
    // Anima as bolhas do SVG
    for(var i = 0; i < 11; i++) { // 0 a 10 (11 bolhas no seu SVG)
        var bubble = select('.bubble' + i);
        
        if (bubble) {
            // Cria animação para cada bolha
            var animation = gsap.to(bubble, {
                duration: randomBetween(1, 1.5),
                x: randomBetween(12, 15) * (randomBetween(-1, 1)),
                y: randomBetween(12, 15) * (randomBetween(-1, 1)),
                repeat: -1,
                repeatDelay: randomBetween(0.2, 0.5),
                yoyo: true,
                ease: "elastic.out(1, 0.5)"
            });
            
            // Adiciona à timeline
            tl.add(animation, (i + 1) / 0.6);
        }
    }
    
    // Inicia a timeline em um ponto específico
    tl.seek(50);
});
