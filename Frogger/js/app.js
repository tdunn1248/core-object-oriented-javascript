// Enemies our player must avoid
class Enemy {

  constructor() {
    this.sprite = 'images/enemy-bug.png';
    this.reset()
  }

  update(dt) {
    this.x += this.speed * dt
      if (this.x > 505) {
        this.reset()
      }
  }

  render(){
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  reset(){
    this.y = this.getStartingPoint()
    this.x = -4;
    this.speed = Math.floor(Math.random()*500)
  }

}

Enemy.prototype.getStartingPoint = function() {
  this.startingYOptions = [60, 140, 220]
    return this.startingYOptions[Math.floor(Math.random() * this.startingYOptions.length)]
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

  constructor() {
    this.sprite = "images/char-boy.png"
    this.reset()
  }

  update(dt){
    this.checkCollisions();
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  handleInput(keyPress) {
    if(keyPress === "left") {
      this.x -= (this.x - 101 < -2) ? 0 : 101
    } else if (keyPress ==="right") {
        this.x += (this.x + 101 > 402) ? 0 : 101
    } else if (keyPress === "up") {
        this.y -= (this.y - 80 < -20) ? 0 : 80
    } else if (keyPress === "down") {
        this.y += (this.y + 80 > 400) ? 0 : 80
    }
  }

  reset() {
      this.x = 200
      this.y = 380
  }

  checkCollisions(){
      let self = this
      if (self.y <= 0) {
        this.reset()
      }   else if (this.y >= 60 && this.y <= 220){
            allEnemies.forEach(function(enemy){
              if(enemy.y == self.y) {
                if(enemy.x >= self.x - 30 && enemy.x <= self.x + 30) {
                  self.reset()
            }
          }
        })
      }
  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
for(let i = 0; i < 4; i++) {
  allEnemies.push(new Enemy());
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
