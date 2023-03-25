// import _ from "underscore";

const getLength = (x0, y0, x1, y1) => {
    const x = x1 - x0;
    const y = y1 - y0;
    return Math.sqrt(x * x + y * y);
};

const getAngle = (x0, y0, x1, y1) => {
    const x = x1 - x0;
    const y = y1 - y0;
    return Math.atan2(y, x);
};

//* constants
const DECAY = 4;
const SPREAD = 60;
const GRAVITY = 1200;

class confettiCanon {
    constructor() {
        //? set up the canvas
        this.canvas = document.createElement("canvas");
        this.dpr = window.devicePixelRatio || 1;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.scale(this.dpr, this.dpr);

        //? add confetti
        this.confettiSpriteIds = [];
        this.confettiSprite = {angle: 0,};

        //? vector line representing the firing angle
        this.drawVector = false;
        this.vector = [
            { x: window.innerWidth, y: window.innerHeight * 1.25 },
            { x: window.innerWidth, y: window.innerHeight * 2 },
        ];
        this.pointer = {};

        //? bind methods
        this.render = this.render.bind(this);
        this.handelMousedown = this.handelMousedown.bind(this);
        this.handelMouseup = this.handelMouseup.bind(this);
        this.handelMousemove = this.handelMousemove.bind(this);
        this.handelTouchstart = this.handelTouchstart.bind(this);
        this.handelTouchmove = this.handelTouchmove.bind(this);
        this.setCanvasSize = this.setCanvasSize.bind(this);
        this.setListeners = this.setListeners.bind(this);
        this.setCanvasSize();
        this.timer = setTimeout(this.handelMouseup, 1000);
    }
    setListeners() {
        //? use tweenLite tick event for the render loop
        TweenLite.ticker.addEventListener("tick", this.render);

        //* listen for resize events
        window.addEventListener("resize", this.setCanvasSize);

        //* listen for pointer down
        this.canvas.addEventListener("mousedown", this.handelMousedown);
        this.canvas.addEventListener("touchstart", this.handelTouchstart);

        //* listen for pointer up
        this.canvas.addEventListener("mouseup", this.handelMouseup);
        this.canvas.addEventListener("touchend", this.handelMouseup);

        //* listen for pointer move
        this.canvas.addEventListener("mousemove", this.handelMousemove);
        this.canvas.addEventListener("touchmove", this.handelTouchmove);
    }

    setCanvasSize() {
        this.canvas.width = window.innerWidth * this.dpr;
        this.canvas.height = window.innerHeight * this.dpr;
        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";
        //! this.ctx.scale(this.dpr, this.dpr);
    }

    handelMousedown(e) {
        clearTimeout(this.timer);
        this.pointer.x = e.clientX * this.dpr;
        this.pointer.y = e.clientY * this.dpr;
        this.vector[0] = { x: this.pointer.x, y: this.pointer.y };
        this.drawVector = true;
    }

    handelMouseup(e) {
        this.drawVector = false;
        const x0 = this.vector[0].x;
        const y0 = this.vector[0].y;
        const x1 = this.vector[1].x;
        const y1 = this.vector[1].y;
        const length = getLength(x0, y0, x1, y1);
        const angle = getAngle(x0, y0, x1, y1);
        const practicals = length / 5 + 5;
        const velocity = length * 10;
        this.addConfettiParticle(x0, y0, practicals, angle, velocity);
    }

    handelMousemove(e) {
        this.pointer.x = e.clientX * this.dpr;
        this.pointer.y = e.clientY * this.dpr;
        this.vector[1] = { x: this.pointer.x, y: this.pointer.y };
    }

    handelTouchstart(e) {
        clearTimeout(this.timer);
        this.pointer.x = e.touches[0].clientX * this.dpr;
        this.pointer.y = e.touches[0].clientY * this.dpr;
        this.vector[0] = { x: this.pointer.x, y: this.pointer.y };
        this.drawVector = true;
    }

    handelTouchmove(e) {
        this.pointer.x = e.touches[0].clientX * this.dpr;
        this.pointer.y = e.touches[0].clientY * this.dpr;
        this.vector[1] = { x: this.pointer.x, y: this.pointer.y };
        this.pointer = this.vector[1];
    }
    drawVectorLine() {
        this.ctx.strokeStyle = "pink";
        this.ctx.lineWidth = 2 * this.dpr;
        const x0 = this.vector[0].x;
        const y0 = this.vector[0].y;
        const x1 = this.vector[1].x;
        const y1 = this.vector[1].y;
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
    }

    addConfettiParticle(amount, angle, velocity, x, y) {
        let i = 0;
        while (i < amount) {
            //* sprite
            const r = _.random(4, 6) * this.dpr;
            const d = _.random(15, 25) * this.dpr;
            const cr = _.random(30, 255);
            const cg = _.random(30, 230);
            const cb = _.random(30, 30);
            const color = `rgb(${cr}, ${cg}, ${cb})`;
            const tilt = _.random(10, -10);
            const tiltAngleIncremental = _.random(0.07, 0.05);
            const tiltAngle = 0;
            const id = _.uniqueId();
            const sprite = {
                x,
                y,
                r,
                d,
                tilt,
                tiltAngleIncremental,
                tiltAngle,
                color,
                velocity,
                angle,
            };
            Object.assign(this.confettiSprite, sprite);
            this.confettiSpriteIds.push(id);
            this.tweenConfettiParticle(id);
            i++;
        }
    }

    tweenConfettiParticle(id) {
        const minAngle = this.confettiSprite[id].angle - sprite / 2;
        const maxAngle = this.confettiSprite[id].angle + sprite / 2;
        const minVelocity = this.confettiSprite[id].velocity / 4;
        const maxVelocity = this.confettiSprite[id].velocity;

        //* Physics props
        const velocity = _.random(minVelocity, maxVelocity);
        const angle = _.random(minAngle, maxAngle);
        const gravity = GRAVITY;
        const friction = _.random(0.1, 0.25);
        const d = 0;
        TweenLite.to(this.confettiSprite[id], _.random(4, 6), {
            physics2D: {
                velocity,
                angle,
                gravity,
                friction,
            },
            d,
            ease: Power4.easeOut,
            onComplete: () => {
                //? remove confetti particle and id
                _.pull(this.confettiSpriteIds, id);
                delete this.confettiSprite[id];
            },
        });
    }

    updateConfettiParticle() {
        const sprite = this.confettiSprite;
        const liltAngle = 0.0005 * sprite.d;
        sprite.angle += 0.01;
        sprite.tiltAngle += liltAngle;
        sprite.tilt = Math.sin(sprite.tiltAngle - sprite.r / 2) * sprite.r * 2;
        sprite.y += Math.sin(sprite.angle + sprite.r / 2) * 2;
        sprite.x += Math.cos(sprite.angle) / 2;
    }

    drawConfetti() {
        this.confettiSpriteIds.map((id) => {
            const sprite = this.confettiSprite[id];
            this.ctx.beginPath();
            this.ctx.lineWidth = sprite.d / 2;
            this.ctx.strokeStyle = sprite.color;
            this.ctx.moveTo(sprite.x + sprite.tilt + sprite.r, sprite.y);
            this.ctx.lineTo(
                sprite.x + sprite.tilt,
                sprite.y + sprite.tilt + sprite.r
            );
            this.ctx.stroke();

            this.updateConfettiParticle(id);
        });
    }

    drawPointer() {
        const centerX = this.pointer.x;
        const centerY = this.pointer.y;
        const radius = 15 * this.dpr;

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * math.PI, false);
        this.ctx.fill();
        this.ctx.lineWidth = 2 * this.dpr;
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.stroke();
    }

    drawPower() {
        const x0 = this.vector[0].x;
        const y0 = this.vector[0].y;
        const x1 = this.vector[1].x;
        const y1 = this.vector[1].y;

        const length = getDistance(x0, y0, x1, y1);
        const centerX = x0;
        const centerY = y0;
        const radius = (1 * this.dpr * length) / 20;

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * math.PI, false);
        this.ctx.fillStyle = "transparent";
        this.ctx.fill();
        this.ctx.lineWidth = 2 * this.dpr;
        this.ctx.strokeStyle = "#333333";
        this.ctx.stroke();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawConfetti();
        if (this.drawVector) {
            this.drawVectorLine();
            this.drawPointer();
            this.drawPower();
        }
        this.timer = setTimeout(() => {
            this.render();
        }, 1000 / 60);
    }
}

const confetti = new confettiCanon();
