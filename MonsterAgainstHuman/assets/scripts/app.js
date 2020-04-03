const ATTACK_VALUE = 10;
const MONSTERATTACK_VALUE = 13;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Maximum life for player and monster.....', '100');
let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;


adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, playerHealth, monsterHealth) {
    let logEntry;/* {
        event: event,
        value: value,
        finalPlayerHealth: playerHealth,
        finalMonsterHealth: monsterHealth
    };*/
    if (event === LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'MONSTER',
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'MONSTER',
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    } else if (event === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    } else if (event === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    } else if (event === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: event,
            value: value,
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTERATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentPlayerHealth, currentMonsterHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be death but Bonus Life saved you !!!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You win !');
        writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON', currentPlayerHealth, currentMonsterHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost !');
        writeToLog(LOG_EVENT_GAME_OVER, 'MONSTER WON', currentPlayerHealth, currentMonsterHealth);
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('You have a draw !');
        writeToLog(LOG_EVENT_GAME_OVER, 'NOBODY WON', currentPlayerHealth, currentMonsterHealth);
    }
    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        reset()
    }
}

function attackMonster(mode) {
    let logEvent;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentPlayerHealth, currentMonsterHealth);

    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert('You can not heal more than your maximum life is! ')
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentPlayerHealth, currentMonsterHealth);
    endRound();
}

function printLog() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLog);