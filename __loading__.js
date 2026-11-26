pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = ASSET_PREFIX + 'logo.png';
        logo.id = 'splash-logo';
        splash.appendChild(logo);

        logo.onload = function () {
            splash.style.display = 'flex';
        };

        var borderContainer = document.createElement('div');
        borderContainer.id = 'progress-bar-border';
        splash.appendChild(borderContainer);

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        borderContainer.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #141416;',
            '}',
            '',
            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #141416;',
            '    display: flex;',
            '    flex-direction: column;',
            '    align-items: center;',
            '    justify-content: center;',
            '}',
            '',
            '#application-splash {',
            '    display: flex;',
            '    flex-direction: column;',
            '    align-items: center;',
            '    justify-content: center;',
            '    gap: 15px;',  // Espacio entre logo y barra de carga
            '    margin-top: -15px;', // Mueve todo hacia arriba
            '}',
            '',
            '#splash-logo {',
            '    width: 320px;', // Tamaño del logo más pequeño
            '    max-width: 70%;',
            '    height: auto;',
            '}',
            '',
            '#progress-bar-border {',
            '    height: 18px;',  // Reducimos la altura de la barra
            '    width: 65%;', // Hacemos que la barra sea más estrecha
            '    max-width: 400px;',  // No dejar que sea muy grande
            '    background-color: #ffffff;',  // Borde blanco
            '    padding: 2px;',
            '    box-sizing: border-box;',
            '    display: flex;',
            '    justify-content: center;',
            '    align-items: center;',
            '}',
            '',
            '#progress-bar-container {',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #141416;', // Fondo oscuro dentro del borde
            '    overflow: hidden;',
            '    display: flex;',
            '    align-items: center;',
            '}',
            '',
            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #ffffff;', // Barra blanca
            '    border: none;',
            '}',
            '',
            '@media (max-width: 480px) {',
            '    #splash-logo {',
            '        width: 200px;', // Tamaño más pequeño en móviles
            '    }',
            '    #progress-bar-border {',
            '        width: 80%;',
            '    }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});
