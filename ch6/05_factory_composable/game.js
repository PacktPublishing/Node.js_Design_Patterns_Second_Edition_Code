"use strict";

const stampit = require('stampit');

const Character = stampit().
    props({
        name: 'anonymous',
        lifePoints: 100,
        x: 0,
        y: 0
    })
;

const Mover = stampit().
    methods({
        move(xIncr, yIncr) {
            this.x += xIncr;
            this.y += yIncr;
            console.log(`${this.name} moved to [${this.x}, ${this.y}]`);
        }
    })
;

const Slasher = stampit().
    methods({
        slash(direction) {
            console.log(`${this.name} slashed to the ${direction}`);
        }
    })
;

const Shooter = stampit().
    props({
        bullets: 6
    }).
    methods({
        shoot(direction) {
            if (this.bullets > 0) {
                --this.bullets;
                console.log(`${this.name} shoot to the ${direction}`);
            }
        }
    })
;

const Runner = stampit.compose(Character, Mover);
const Samurai = stampit.compose(Character, Mover, Slasher);
const Sniper = stampit.compose(Character, Shooter);
const Gunslinger = stampit.compose(Character, Mover, Shooter);
const WesternSamurai = stampit.compose(Gunslinger, Samurai);

let gojiro = WesternSamurai();
gojiro.name = 'Gojiro Kiryu';
gojiro.move(1,0);
gojiro.slash('left');
gojiro.shoot('right');
