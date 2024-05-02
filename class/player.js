class Player {
    constructor(container, plataforms) {
        this.x = 350;
        this.y = 350;
        this.speed = 0;
        this.jumpSpeed = 0;
        this.jumpsRemaining = 2;
        this.actions = { left: false, right: false, jump: false };
        this.element
        this.width = 50
        this.height = 50
        this.plataforms = plataforms

        this._createElement(container)
    }

    _createElement(container) {
        this.element = document.createElement('div');
        this.element.id = 'player';
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        container.appendChild(this.element);
        this.appearance
        this._setAppearance()
        this._createListener()
    }

    _createListener() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {

                case 'ArrowUp':
                    if (this.jumpsRemaining > 0) {
                        this.jumpsRemaining--
                        this.actions.jump = true
                        this.jumpSpeed = -5
                    }
                    if (this.jumpsRemaining == 1) this._setAppearance()
                    break;

                case 'ArrowLeft':
                    if (this.actions.left) break
                    this.actions.left = true
                    this._setAppearance()
                    break;

                case 'ArrowRight':
                    if (this.actions.right) break
                    this.actions.right = true
                    this._setAppearance()
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.actions.left = false
                    this._setAppearance()
                    break
                case 'ArrowRight':
                    this.actions.right = false
                    this._setAppearance()
                    break
            }
        });

        this._commands()
    }

    _setAppearance(i = 0, oldAction = null) {

        const { frame, action } = this._getAppearanceFrameAndAction(i)
        if (!(frame && action) || (oldAction && oldAction !== action)) return

        console.log(action)

        this.element.innerHTML = ''
        for (let colors of frame) {
            for (let color of colors) {
                let pixel = document.createElement('div')
                pixel.setAttribute('class', 'pixel')
                if (color != null) pixel.style.backgroundColor = `#${color}`
                else pixel.style.backgroundColor = `transparent`
                pixel.style.height = `${this.height / 20}px`
                pixel.style.width = `${this.height / 20}px`
                this.element.appendChild(pixel)
            }
        }


        if (action == 'right' || action == 'left') setTimeout(() => { this._setAppearance(i == 0 ? 1 : 0, action) }, 200);
    }

    _getAppearanceFrameAndAction(i) {
        let frame
        let action

        if (this.actions.jump) {
            action = 'jump'
            if (this.actions.left && !this.actions.right) frame = walkLeft[0]
            else if (!this.actions.left && this.actions.right) frame = walkRight[0]
            else if (this.jumpSpeed > 0) frame = drop
        }
        else if (this.actions.left === this.actions.right) {
            action = 'stop'
            frame = stop_
        }
        else {
            action = this.actions.left ? 'left' : 'right'
            frame = this.actions.left ? walkLeft[i] : walkRight[i]
        }
        return { frame, action }
    }

    _walk() {
        this.speed = 0
        if (this.actions.left && !this.actions.right) this.speed = -3;
        else if (this.actions.right && !this.actions.left) this.speed = 3;

        while (1) {
            const command = this.speed < 0 ? 'left' : this.speed > 0 ? 'right' : null
            const checkCollision = command === null ? false : this._checkCollision(command)

            if (!checkCollision) break

            if (this.speed < 0) this.speed += 1
            else if (this.speed > 0) this.speed -= 1
            else break
        }

        this.x += this.speed;
        this.element.style.left = `${this.x}px`
    }

    _jump() {
        const checkCollision = this._checkCollision()

        if (!checkCollision) {
            this.y += this.jumpSpeed
            this.jumpSpeed += 0.2
            this.element.style.top = `${this.y}px`
            return
        }

        if (this.jumpSpeed > 0) { //caindo
            this.y = checkCollision.y - this.height
            this.jumpSpeed = 0
            this.actions.jump = false
            this.jumpsRemaining = 2
            this.element.style.top = `${this.y}px`
            return
        }
        else if (this.jumpSpeed < 0) { // subindo
            this.jumpSpeed = 0
            this.y = checkCollision.y + checkCollision.height
            this.element.style.top = `${this.y}px`
        }
        // else this._setAppearance()
    }

    _checkCollision(command = 'jump') {
        if (command != 'jump' && (this.x + this.speed < 0 || this.x + this.speed > 800 - this.width)) return true

        if (command == 'jump' && this.y + this.jumpSpeed >= 350) return { height: 0, y: 400 }

        for (const plataform of this.plataforms) {
            if (command != 'jump' &&
                (this.y + this.height > plataform.y && this.y < plataform.y + plataform.height)
            ) {
                if (command == 'right' && plataform.x < this.x + this.width + this.speed &&
                    plataform.x + plataform.width > this.x) return true

                if (command == 'left' && this.x + this.speed < plataform.x + plataform.width &&
                    this.x + this.width > plataform.x) return true
            }
            else if (command == 'jump' &&
                (this.y + this.height + this.jumpSpeed > plataform.y && this.y + this.jumpSpeed < plataform.y + plataform.height) &&
                plataform.x < this.x + this.width + this.speed &&
                plataform.x + plataform.width > this.x &&
                this.x + this.speed < plataform.x + plataform.width &&
                this.x + this.width > plataform.x
            ) return { height: plataform.height, y: plataform.y }
        }
    }

    _commands() {
        this._walk()
        this._jump()
        requestAnimationFrame(() => this._commands())
    }
}