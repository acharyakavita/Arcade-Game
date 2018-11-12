/*Application file having the main game logic for Arcade game*/
// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        if (this.x > 480) {
            let min = 1;
            let max = 300;
            this.speed = Math.floor(Math.random() * (+max - +min)) + +min;
        }
        this.x = this.x + this.speed * dt;
    }

    // checks continuosly for collision between player and vehicles
    // If collided,player will losse one game life and his position will be reset to his Home position
    checkCollisions() {
        let xPos = Math.round(this.x);
        let yPos = Math.round(this.y);
        let approxXpos = xPos + 20;
        let approxYpos = yPos + 20;
        if ((player.x >= xPos && player.x <= approxXpos) && (player.y >= yPos && player.y <= approxYpos)) {
            player.x = 200;
            player.y = 420;
            player.lives--;
            player.livesText.textContent = player.lives;

        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        if (this.x > 490) {
            this.x = -5;
        }
    }
}

// Another type of enemy which player must avoid.
class Stone extends Enemy {
    constructor(x, y, speed) {
        super(x, y, speed);
        this.sprite = 'images/Rock.png';
    }
}



// Player/hero class
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lives = 3;
        this.sprite = 'images/char-boy.png';
        this.winMsg = false;
        this.lost = false;
        this.livesText = document.querySelector('.lives');
        this.livesText.textContent = this.lives;
    }
    //to check if the player won or lost teh current game.
    update() {
        if (this.y < 0) {
            this.winMsg = true;
            this.y = 0;
            congratulations();
        }
        if (this.lives === 0) {
            this.lives = -1;
            this.lost = true;
            gameLost();
        }
    }
    //to render the player image
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //to move the player as per the arrow keys
    handleInput(allowedKeys) {
        switch (allowedKeys) {
            case 'left':
                if (this.x > 50) {
                    this.x = this.x - 100;
                }
                break;
            case 'right':
                if (this.x >= 0 && this.x < 350) {
                    this.x = this.x + 100;
                }
                break;
            case 'up':
                if (this.y > 50) {
                    this.y = this.y - 90;
                }
                break;
            case 'down':
                if (this.y < 420) {
                    this.y = this.y + 90;
                }
        }
    }
}


//Gems or Lives that player can obtain by touching them
class Gems {
    constructor(xArray, yArray) {
        this.conquer = false;
        this.firstTime = true;
        this.count = 0;
        this.x = xArray[Math.floor(Math.random() * 5)];//To randomly assign position to the gem 
        this.y = yArray[Math.floor(Math.random() * 3)];
        const gem = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png', 'images/Heart.png', 'images/Key.png'];
        this.sprite = gem[Math.floor(Math.random() * 5)];//to pick any of the 5 gems
    }

    //to render the image of Gem object continuosly 
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //to  update the number of lives of a player if he acquires a gem.
    update() {
        let approxXpos = this.x + 20;
        let approxYpos = this.y + 20;
        if ((player.x >= this.x && player.x <= approxXpos) && (player.y >= this.y && player.y <= approxYpos)) {
            this.firstTime = false;
            this.conquer = true;
        }
        if (this.firstTime === false && this.count === 0) {
            player.lives++;
            player.livesText.textContent = player.lives;
            this.count++;
        }
    }

}

// Instantiating all enemy ,player,gem objects
let enemy1 = new Enemy(-5, 60, 40);
let enemy2 = new Enemy(-5, 140, 80);
let enemy3 = new Enemy(-5, 230, 50);
let enemy4 = new Enemy(0, 60, 10);
let enemy5 = new Enemy(0, 140, 60);
let enemy6 = new Stone(0, 230, 60);
let enemy7 = new Stone(0, 60, 10);
let player = new Player(200, 420);
//Array having x and y co-ordinates for the Gem objects.
let xArray = [0, 100, 200, 300, 400];
let yArray = [60, 150, 240];
let gem1 = new Gems(xArray, yArray);
let gem2 = new Gems(xArray, yArray);
let gem3 = new Gems(xArray, yArray);
// array to store all enemies and gem objects
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];
let allGems = [gem1, gem2, gem3];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (player.winMsg === false && player.lost === false) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});


//help function havings intructions on how to play the game.
(function help() {

    let help = document.querySelector('.help');
    let helpModal = document.querySelector('.help-modal');
    let close = document.querySelector('.close');

    help.addEventListener('click', function () {
        helpModal.classList.add('help-modal', 'show');
    })

    close.addEventListener('click', function () {
        helpModal.classList.remove('show');
    })
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target == helpModal) {
            helpModal.classList.remove('show');
        }
    }
})();

/*
* function to execute the timer
*/

let seconds = 0, minutes = 0, hours = 0;
const CalculateTimeElapsed = () => timerStatus = setTimeout(addTime, 1000);


/*
 * function to calculate the time
 */
const addTime = () => {
    let time = document.querySelector('.timer')
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
        ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" + (seconds > 9 ? seconds : "0" + seconds);

    CalculateTimeElapsed();
}

//function to display the congratulations message upon game win.
const congratulations = () => {
    if (player.winMsg === true) {
        let body = document.querySelector('body');
        let modal = document.createElement('div');
        let time = document.querySelector('.timer');
        clearTimeout(timerStatus);

        modal.innerHTML += `<div class="content"><h2>congratulations!!!You made it to the next level!!!</h2>
                        <p>in ${time.textContent} seconds</p>
                        <button class="continue">continue</button></div>`;


        body.appendChild(modal);
        modal.classList.add('modal');
        continueGame();
    }
}

//function to display game lost message
const gameLost = () => {
    let body = document.querySelector('body');
    let modal = document.createElement('div');
    clearTimeout(timerStatus);

    modal.innerHTML += `<div class="content"><h2>Game Over!!!.Better luck next time!!</h2>
                        <button class="restart">Restart</button></div>`;


    body.appendChild(modal);
    modal.classList.add('modal');
    reset();
}

//function to continue the game, post a level win
const continueGame = () => {
    const continueGame = document.querySelector('.continue');
    continueGame.addEventListener('click', function () {
        let body = document.querySelector('body');
        let item = body.lastElementChild;
        body.removeChild(item);
        player.y = 420;
        player.x = 200;
        seconds = 0;
        minutes = 0;
        hours = 0;
        player.winMsg = false;
        CalculateTimeElapsed();
    })
}


//function to choose a player character from a set
(function avatar() {
    let avatar = document.querySelector('select');
    avatar.addEventListener('change', function (event) {
        switch (event.target.value) {
            case 'Avatar':
            case 'Super Boy':
                player.sprite = 'images/char-boy.png';
                break;
            case 'Cat Woman':
                player.sprite = 'images/char-cat-girl.png';
                break;
            case 'Super Girl':
                player.sprite = 'images/char-horn-girl.png';
                break;
            case 'Barbie Girl':
                player.sprite = 'images/char-pink-girl.png';
                break;
            case 'Princess':
                player.sprite = 'images/char-princess-girl.png';
                break;
        }
        avatar.blur();
    })
})();


//function to restart the game from the beginning
(function restartGame() {
    return reset();
})();


//function that clears the exiting objects and creates a new one for new game.
//all the global variables are reset here.
function reset() {
    let restartBtn = document.querySelectorAll('.restart');
    Array.from(restartBtn).forEach(btn => {
        btn.addEventListener('click', function () {
            if (player.lost === true) {
                let body = document.querySelector('body');
                let item = body.lastElementChild;
                body.removeChild(item)
            }
            seconds = 0;
            minutes = 0;
            hours = 0;
            let saveChar = player.sprite;
            allEnemies.length = 0;
            allGems.length = 0;
            enemy1 = new Enemy(-5, 60, 40);
            enemy2 = new Enemy(-5, 140, 80);
            enemy3 = new Enemy(-5, 230, 50);
            enemy4 = new Enemy(0, 60, 10);
            enemy5 = new Enemy(0, 140, 60);
            enemy6 = new Stone(0, 230, 60);
            enemy7 = new Stone(0, 60, 10);
            allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];
            player = new Player(200, 420);
            player.sprite = saveChar;
            gem1 = new Gems(xArray, yArray);
            gem2 = new Gems(xArray, yArray);
            gem3 = new Gems(xArray, yArray);
            allGems = [gem1, gem2, gem3];
        })
    })
};