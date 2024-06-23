class Level {
    constructor(container) {
        this.container = container
        this.width = 1536
        this.height = 400
        this.plataforms = this.generatePlataforms()
        this.player = new Player({ element: container, width: this.width, height: this.height }, this.plataforms)
        this.enemies = this.generateEnemies()
        this.generateLevel()
    }

    generateLevel() {
        this.container.style.width = `${this.width}px`
        this.container.style.height = `${this.height}px`

        this.generatePlataforms()
    }

    generatePlataforms() {
        return [
            new Platform(500, 40, 100, 20, this.container),
            new Platform(200, 100, 200, 20, this.container)
        ]

    }

    generateEnemies() {
        const parameters = [{ element: container, width: this.width, height: this.height }, this.plataforms]
        return [
            new Skull(200, 0, 65, ...parameters),
            new Skull(700, 0, 65, ...parameters),
            new Skull(250, 120, 65, ...parameters),
        ]
    }
}