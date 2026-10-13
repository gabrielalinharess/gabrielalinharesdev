document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Animação Principal da Linha (Hero)
       ========================================================================== */
    const heroLineContainer = document.querySelector('.hero-line-container');
    
    // Inicia a animação 1 segundo após o carregamento da página
    setTimeout(() => {
        heroLineContainer.classList.add('animating');
        
        // A animação do CSS dura 2.5s. Após isso, muda para o estado 'settled'
        setTimeout(() => {
            heroLineContainer.classList.remove('animating');
            heroLineContainer.classList.add('settled');
        }, 2500);

    }, 1000);

    /* ==========================================================================
       2. Scroll Reveal Animations
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       3. Atualizar Menu Ativo no Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    const sectionOptions = {
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, sectionOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* ==========================================================================
       4. Menu Mobile Toggle
       ========================================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Fechar menu mobile ao clicar em um link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    /* ==========================================================================
       5. Partículas Sutis de Background
       ========================================================================== */
    const particlesContainer = document.getElementById('particles');
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posição randômica
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamanho minúsculo de estrelinha
        const size = Math.random() * 1.5 + 0.5;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 1.5;

        particle.style.left = `${posX}vw`;
        particle.style.top = `${posY}vh`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(particle);
    }

    /* ==========================================================================
       6. Lógica do Modal de Serviços
       ========================================================================== */
    const servicesData = {
        'criacao_sites': {
            title: 'CRIAÇÃO DE SITES',
            image: 'images/service_criacao_sites.jpg',
            points: [
                'Desenvolvimento de sites personalizados e únicos.',
                'Design responsivo para todas as telas.',
                'Otimização de performance e velocidade.',
                'Tecnologias web modernas (HTML5, CSS3, JS).'
            ],
            whatsappMessage: 'Olá Gabriela, gostaria de saber mais sobre o serviço de Criação de Sites.'
        },
        'landing_pages': {
            title: 'LANDING PAGES',
            image: 'images/service_landing_pages.jpg',
            points: [
                'Páginas criadas com foco total em conversão.',
                'Estruturação persuasiva e copywriting visual.',
                'Carregamento ultra-rápido para reter usuários.',
                'Design atrativo, limpo e direto ao ponto.'
            ],
            whatsappMessage: 'Olá Gabriela, gostaria de saber mais sobre a criação de Landing Pages.'
        },
        'institucional': {
            title: 'SITES INSTITUCIONAIS',
            image: 'images/service_institucional.jpg',
            points: [
                'Presença digital corporativa de alta credibilidade.',
                'Design sofisticado que transmite autoridade.',
                'Estrutura para apresentar a história da empresa.',
                'Layout focado na confiança do cliente.'
            ],
            whatsappMessage: 'Olá Gabriela, gostaria de orçar um Site Institucional para minha empresa.'
        },
        'portfolio': {
            title: 'PORTFÓLIOS',
            image: 'images/service_portfolio.jpg',
            points: [
                'Apresentação extremamente elegante do seu trabalho.',
                'Galerias de imagens fluidas e dinâmicas.',
                'Foco absoluto na estética e identidade visual.',
                'Destaque profissional da sua trajetória.'
            ],
            whatsappMessage: 'Olá Gabriela, gostaria de criar um Portfólio profissional com você.'
        },
        'business': {
            title: 'SITES PARA NEGÓCIOS',
            image: 'images/service_business.jpg',
            points: [
                'Plataformas web voltadas para expansão de negócios.',
                'Foco em captação de leads e clientes.',
                'Integração com contatos e redes sociais.',
                'Design estratégico alinhado à sua marca.'
            ],
            whatsappMessage: 'Olá Gabriela, gostaria de entender como um Site para Negócios pode ajudar minha empresa.'
        },
        'maintenance': {
            title: 'MANUTENÇÃO DE SITES',
            image: 'images/service_maintenance.jpg',
            points: [
                'Atualização contínua de conteúdos e imagens.',
                'Monitoramento de estabilidade e segurança.',
                'Refinamento periódico de performance web.',
                'Suporte técnico ágil e eficiente.'
            ],
            whatsappMessage: 'Olá Gabriela, preciso de serviços de Manutenção e suporte para o meu site.'
        }
    };

    const modal = document.getElementById('serviceModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalList = document.getElementById('modalList');
    const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
    let modalAnimTimeout;

    window.openModal = function(serviceId) {
        const data = servicesData[serviceId];
        if(!data) return;

        // Preencher conteúdo
        modalTitle.textContent = data.title;
        modalImage.src = data.image.includes('/') ? data.image.split('/').pop() : data.image;
        modalImage.onerror = function() {
            if (!this.dataset.retry) {
                this.dataset.retry = 1;
                this.src = 'images/' + (data.image.includes('/') ? data.image.split('/').pop() : data.image);
            }
        };
        modalList.innerHTML = data.points.map(point => `<li>${point}</li>`).join('');
        modalWhatsappBtn.href = `https://wa.me/5583974002281?text=${encodeURIComponent(data.whatsappMessage)}`;

        // Limpar estados anteriores
        clearTimeout(modalAnimTimeout);
        modal.classList.remove('settled');
        modal.classList.remove('animating');

        // Mostrar o Modal
        modal.classList.add('open');
        
        // Iniciar animação da luz dourada
        setTimeout(() => {
            modal.classList.add('animating');
            
            // Depois de 2 segundos de subida, vira "settled" (pulsando)
            modalAnimTimeout = setTimeout(() => {
                modal.classList.remove('animating');
                modal.classList.add('settled');
            }, 2000);
        }, 100);
    };

    window.closeModal = function() {
        modal.classList.remove('open');
        clearTimeout(modalAnimTimeout);
        
        // Esperar o fade out para resetar a linha
        setTimeout(() => {
            modal.classList.remove('animating');
            modal.classList.remove('settled');
        }, 500);
    };

    /* ==========================================================================
       7. Balão de E-mail (Aparece ao Clicar na Palavra E-MAIL)
       ========================================================================== */
    window.toggleEmailPopup = function(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const popup = document.getElementById('emailPopup');
        const triggerBtn = document.getElementById('emailTriggerBtn');
        if (!popup) return;
        
        const isShown = popup.classList.toggle('show');
        if (triggerBtn) {
            triggerBtn.classList.toggle('active', isShown);
        }
    };

    window.copyEmailFromPopup = function(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const email = 'mariagabrielalinharess@yahoo.com';
        
        function setCopied() {
            const popupCopyText = document.getElementById('popupCopyText');
            const popupCopyBtn = document.querySelector('.popup-copy-btn');
            if (popupCopyText) {
                popupCopyText.textContent = 'Copiado! ✓';
                if (popupCopyBtn) popupCopyBtn.classList.add('copied');
                setTimeout(() => {
                    popupCopyText.textContent = 'Copiar';
                    if (popupCopyBtn) popupCopyBtn.classList.remove('copied');
                }, 2500);
            }
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email)
                .then(setCopied)
                .catch(() => {
                    fallbackCopy(email);
                    setCopied();
                });
        } else {
            fallbackCopy(email);
            setCopied();
        }
    };

    // Fechar balão se clicar em qualquer outro lugar fora
    document.addEventListener('click', (event) => {
        const popup = document.getElementById('emailPopup');
        const triggerBtn = document.getElementById('emailTriggerBtn');
        if (popup && popup.classList.contains('show')) {
            if (!event.target.closest('.email-link-wrapper')) {
                popup.classList.remove('show');
                if (triggerBtn) triggerBtn.classList.remove('active');
            }
        }
    });

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (e) {}
        document.body.removeChild(textArea);
    }
});

