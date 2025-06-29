// Efeito de curva dinâmica no scroll
(function() {
    // Aguarda o DOM estar carregado
    document.addEventListener('DOMContentLoaded', function() {
        // Container da seção de apresentação
        var efeitoContainer = document.getElementById("apresentacao");
        if (!efeitoContainer) {
            console.warn('Seção #apresentacao não encontrada');
            return;
        }

        // Seleciona o path do SVG
        var $curve = efeitoContainer.querySelector("svg path");
        if (!$curve) {
            console.warn('Path do SVG não encontrado');
            return;
        }

        // Variáveis do efeito
        var last_known_scroll_position = 0;
        var defaultCurveValue = 35; // Ajustado para viewBox 0 0 100 100
        var curveRate = 8; // Taxa de mudança da curva
        var ticking = false;
        var curveValue;

        // Função que aplica o efeito da curva
        function scrollEvent(scrollPos) {
            // Limita o efeito aos primeiros 800px de scroll
            if (scrollPos >= 0 && scrollPos < 800) {
                curveValue = defaultCurveValue - parseFloat(scrollPos / curveRate);
                
                // Garante que o valor não fique negativo
                curveValue = Math.max(curveValue, 10);
                
                // Atualiza o path do SVG - adaptado para viewBox 100x100
                $curve.setAttribute(
                    "d",
                    "M 0 50 Q 50 " + curveValue + " 100 50 L 100 100 L 0 100 Z"
                );
            }
        }

        // Event listener otimizado para scroll da página
        window.addEventListener("scroll", function() {
            last_known_scroll_position = window.pageYOffset;

            if (!ticking) {
                window.requestAnimationFrame(function() {
                    scrollEvent(last_known_scroll_position);
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Inicializa o efeito
        scrollEvent(0);
    });
})();

// Gerenciamento do preloader
(function() {
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        const conteudo = document.getElementById('conteudo');
        
        if (preloader && conteudo) {
            // Adiciona fade out ao preloader
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease-out';
            
            setTimeout(function() {
                preloader.style.display = 'none';
                conteudo.style.display = 'block';
                
                // Fade in do conteúdo
                conteudo.style.opacity = '0';
                conteudo.style.transition = 'opacity 0.5s ease-in';
                
                setTimeout(function() {
                    conteudo.style.opacity = '1';
                }, 50);
            }, 500);
        }
    });
})();

// Smooth scroll e efeitos de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para o botão CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#sobre');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Efeito parallax suave na neve
    let parallaxTicking = false;
    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            window.requestAnimationFrame(function() {
                const snowContainer = document.querySelector('.snow-container');
                if (snowContainer) {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.3; // Taxa de parallax mais suave
                    snowContainer.style.transform = `translateY(${rate}px)`;
                }
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    });
});

// Animação das partículas de neve
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const snowArea = document.querySelector('.snow-area');
        const flakes = document.querySelectorAll('.flake');
        
        if (snowArea && flakes.length > 0) {
            flakes.forEach(function(flake, index) {
                // Posicionamento aleatório
                const randomX = Math.random() * 100;
                const randomDelay = Math.random() * 5;
                const randomDuration = 8 + Math.random() * 6;
                const randomSize = 0.8 + Math.random() * 0.6;
                
                flake.style.left = randomX + '%';
                flake.style.animationDelay = randomDelay + 's';
                flake.style.animationDuration = randomDuration + 's';
                flake.style.transform = `scale(${randomSize})`;
                
                // Adiciona símbolo de floco de neve
                flake.innerHTML = '❄';
                flake.style.color = 'rgba(255, 255, 255, 0.8)';
                flake.style.fontSize = '1.2em';
                flake.style.position = 'absolute';
                flake.style.top = '-20px';
                flake.style.userSelect = 'none';
                flake.style.pointerEvents = 'none';
            });
        }
    });
})();

// Otimização de performance - reduz animações em dispositivos com baixa performance
(function() {
    // Detecta se o dispositivo prefere animações reduzidas
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        
        // Desabilita parallax em dispositivos com preferência por menos movimento
        const snowContainer = document.querySelector('.snow-container');
        if (snowContainer) {
            snowContainer.style.transform = 'none';
        }
    }
})();

// Debug helper - remove em produção
console.log('JavaScript carregado com sucesso!');