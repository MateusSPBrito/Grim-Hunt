const container = document.getElementById('container');

const plataforms = [
    new Platform(600, 350, 100, 20, container),
    new Platform(200, 300, 200, 20, container),
]

const enemys = [
    new Enemy(200, 350, 50, container, plataforms),
    new Enemy(750, 350, 50, container, plataforms),
    new Enemy(250, 250, 50, container, plataforms),
]

const player = new Player(container, plataforms)