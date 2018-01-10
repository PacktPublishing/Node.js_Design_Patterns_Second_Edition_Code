"use strict";

const stampit = require('stampit');

const haveName = stampit()
  .props({
    name: 'anonymous'
  })
;

const haveCoordinates = stampit()
  .props({
    x: 0,
    y: 0
  })
;

const character = stampit(haveName, haveCoordinates)
  .props({
    lifePoints: 100
  })
;

const mover = stampit(haveName, haveCoordinates)
  .methods({
    move(xIncr, yIncr) {
      this.x += xIncr;
      this.y += yIncr;
      console.log(`${this.name} moved to [${this.x}, ${this.y}]`);
    }
  })
;

const slasher = stampit(haveName)
  .methods({
    slash(direction) {
      console.log(`${this.name} slashed to the ${direction}`);
    }
  })
;

const shooter = stampit()
  .props({
      bullets: 6
  })
  .methods({
    shoot(direction) {
      if (this.bullets > 0) {
        --this.bullets;
        console.log(`${this.name} shoot to the ${direction}`);
      }
    }
  })
;

const runner = stampit(character, mover);
const samurai = stampit(character, mover, slasher);
const sniper = stampit(character, shooter);
const gunslinger = stampit(character, mover, shooter);
const westernSamurai = stampit(gunslinger, samurai);

const gojiro = westernSamurai();
gojiro.name = 'Gojiro Kiryu';
gojiro.move(1,0);
gojiro.slash('left');
gojiro.shoot('right');
