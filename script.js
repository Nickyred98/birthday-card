// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el modal
    const modal = document.getElementById('imageModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModal = document.querySelector('.close-modal');
    const galleryImages = document.querySelectorAll('.gallery-image');
    const filmStripContent = document.querySelector('.film-strip-content');

    // Función para abrir el modal con el mensaje correspondiente
    function openModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        // Pausar la animación
        if (filmStripContent) {
            filmStripContent.classList.add('paused');
        }
    }

    // Función para cerrar el modal
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
        // Reanudar la animación
        if (filmStripContent) {
            filmStripContent.classList.remove('paused');
        }
    }

    // Agregar evento click a cada imagen
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            if (message) {
                openModal(message);
            }
        });
    });

    // Cerrar modal al hacer click en el botón de cerrar
    closeModal.addEventListener('click', closeModalFunc);

    // Cerrar modal al hacer click fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunc();
        }
    });

    // Control de música
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicButton = document.getElementById('musicButton');
    let isPlaying = false;

    if (backgroundMusic && musicButton) {
        backgroundMusic.volume = 0.5; // Volumen al 50%

        // Función para reproducir/pausar música
        function toggleMusic() {
            if (isPlaying) {
                backgroundMusic.pause();
                musicButton.classList.remove('playing');
                isPlaying = false;
            } else {
                backgroundMusic.play().then(function() {
                    musicButton.classList.add('playing');
                    isPlaying = true;
                }).catch(function(error) {
                    console.log('Error al reproducir música:', error);
                });
            }
        }

        // Agregar evento click al botón
        musicButton.addEventListener('click', toggleMusic);

        // Función para iniciar música automáticamente
        function startMusicAuto() {
            if (!isPlaying) {
                // Intentar reproducir directamente
                backgroundMusic.play().then(function() {
                    musicButton.classList.add('playing');
                    isPlaying = true;
                }).catch(function(error) {
                    console.log('Error al reproducir automáticamente:', error);
                    // Si falla, intentar hacer click programático
                    setTimeout(function() {
                        musicButton.click();
                    }, 100);
                });
            }
        }

        // Esperar a que el audio esté listo antes de intentar reproducir
        backgroundMusic.addEventListener('canplay', function() {
            setTimeout(startMusicAuto, 1000);
        }, { once: true });

        // También intentar después de que la página esté completamente cargada
        window.addEventListener('load', function() {
            setTimeout(startMusicAuto, 1000);
        });

        // Fallback: intentar después de un tiempo adicional
        setTimeout(startMusicAuto, 2000);
    }
});

