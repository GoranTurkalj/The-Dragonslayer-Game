const bunny = new Vue({
  el: "#game-container",

  data: {
    // General Game Data****************************************************************************
    gameIsRunning: false,
    showContainer: false,
    attachActive: true,
    attacker: "",
    defender: "",
    rolledDice: 0,
    diceThrown: false, // moze li se ovo i rolledDice iskombinirati da roll dice button ne treba ovaj property nego da koristi rolledDice
    diceImage: "/images/dice.png",
    attachRoll: false,
    attachEndTurn: false,
    rotateEndTurn: 0,
    player: 0,
    attackCritHit: false,
    attackCritMiss: false,
    attachRotation: false,
    attachSwitchSkill: false,
    tooltip: "",

    // General Game Sounds*****************************************************************************

    startBattleSound: new Audio("/sounds/start fire.mp3"),
    throwDiceSound: new Audio("/sounds/roll dice plastic 1.mp3"),
    endTurnSound1: new Audio("/sounds/hourglass 1.mp3"),
    endTurnSound2: new Audio("/sounds/hourglass 2.mp3"),
    battleRecords: [],
    ctrlImages: {
      lightAttack: ["/images/strike 1.png", "/images/dragon claw 4.png"],
      heavyAttack: ["/images/heavy 1.png", "/images/dragon tail 2.png"],
      rangedAttack: [
        "/images/player ranged 16.png",
        "/images/dragon fire 2.png",
      ],
      defenseSkill: [
        "/images/defend icon 1.png",
        "/images/dragon defend 1.png",
      ],
      specialSkill: ["/images/heal 6.png", "/images/heal spell 3.png"],
      buffSkill: ["/images/player buff 2.png", "/images/dragon buff 1.png"],
      forfeitBattle: ["/images/start 11.png", "/images/start 11.png"],
    },

    // Player Data***********************************************************************************
    hero: {
      name: "Hero",
      id: 0,
      maxHP: 100,
      currentHP: 100,
      maxDEF: 50,
      currentDEF: 0,
      defenseBar: 0,
      buffed: false,
      lucky: false,
      wasAttacked: false,
      dead: false,
      image: "/images/hero.jpg",
      victoryQuote: "THE GREAT WORM IS DEAD AT LAST!!!",
      tooltips: [
        { id: 1, text: "Sword Strike" },
        { id: 2, text: "Axe Swing " },
        { id: 3, text: "Drink Elixir" },
        { id: 4, text: "Shield Wall" },
        { id: 5, text: "Warrior's Luck" },
        { id: 6, text: "Cannon Blast" },
      ],
      skills: [
        {
          id: 1,
          name: "lightAttack",
          range: [5, 10],
          doesDMG: true,
          raiseDEF: false,
          raiseHP: false,
          skillSounds: new Audio("/sounds/light 0.mp3"),
        },
        {
          id: 2,
          name: "heavyAttack",
          range: [10, 20],
          doesDMG: true,
          raiseDEF: false,
          raiseHP: false,
          skillSounds: new Audio("/sounds/heavy 0.mp3"),
        },
        {
          id: 6,
          name: "rangedAttack",
          range: [30, 45],
          doesDMG: true,
          raiseDEF: false,
          raiseHP: false,
          skillSounds: new Audio("/sounds/ranged 0.mp3"),
        },
        {
          id: 4,
          name: "defenseSkill",
          range: [10, 20],
          doesDMG: false,
          raiseDEF: true,
          raiseHP: false,
          skillSounds: new Audio("/sounds/defense 0.mp3"),
        },
        {
          id: 3,
          name: "healSkill",
          range: [10, 25],
          doesDMG: false,
          raiseDEF: false,
          raiseHP: true,
          skillSounds: new Audio("/sounds/heal 0.mp3"),
        },
        {
          id: 5,
          name: "buffSkill",
          range: [1, 2],
          doesDMG: false,
          raiseDEF: false,
          raiseHP: false,
          doesBuff: true,
          skillSounds: new Audio("/sounds/buff 0.mp3"),
        },
      ],
      generalSounds: {
        injurySounds: [
          "/sounds/heroinjury 0.mp3",
          "/sounds/heroinjury 1.mp3",
          "/sounds/heroinjury 2.mp3",
        ],
        defeatSounds: new Audio("/sounds/defeat 0.mp3"),
        victorySounds: new Audio("/sounds/victory 0.mp3"),
      },
    },

    // Every information about the dragon**************************************************************

    dragon: {
      name: "Dragon",
      id: 1,
      maxHP: 100,
      currentHP: 100,
      maxDEF: 50,
      currentDEF: 0,
      defenseBar: 0,
      buffed: false,
      lucky: false,
      wasAttacked: false,
      dead: false,
      image: "/images/dragon.jpg",
      victoryQuote: "I WILL ADD YOUR SCORCHED SKULL TO THE PILE!!!",
      tooltips: [
        { id: 1, text: "Claw Slash" },
        { id: 2, text: "Tail Swipe" },
        { id: 3, text: "Regenerate" },
        { id: 4, text: "Wing Barricade" },
        { id: 5, text: "Fire Gaze" },
        { id: 6, text: "Dragon Breath" },
      ],
      skills: [
        {
          id: 1,
          name: "lightAttack",
          range: [10, 15],
          doesDMG: true,
          raiseDEF: false,
          raiseHP: false,
          skillSounds: new Audio("/sounds/light 1.mp3"),
        },
        {
          id: 2,
          name: "heavyAttack",
          range: [15, 20],
          doesDMG: true,
          raiseDEF: false,
          raiseHP: false,
          skillSounds: new Audio("/sounds/heavy 1.mp3"),
        },
        {
          id: 6,
          name: "rangedAttack",
          range: [20, 35],
          doesDMG: true,
          raiseDEF: false,
          raiseHP: false,
          skillSounds: new Audio("/sounds/ranged 1.mp3"),
        },
        {
          id: 4,
          name: "defenseSkill",
          range: [10, 20],
          doesDMG: false,
          raiseDEF: true,
          raiseHP: false,
          skillSounds: new Audio("/sounds/defense 1.mp3"),
        },
        {
          id: 3,
          name: "healSkill",
          range: [10, 30],
          doesDMG: false,
          raiseDEF: false,
          raiseHP: true,
          skillSounds: new Audio("/sounds/heal 1.mp3"),
        },
        {
          id: 5,
          name: "buffSkill",
          range: [1, 2],
          doesDMG: false,
          raiseDEF: false,
          raiseHP: false,
          doesBuff: true,
          skillSounds: new Audio("/sounds/buff 1.mp3"),
        },
      ],

      generalSounds: {
        injurySounds: [
          "/sounds/dragoninjury 0.mp3",
          "/sounds/dragoninjury 1.mp3",
          "/sounds/dragoninjury 2.mp3",
        ],
        defeatSounds: new Audio("/sounds/defeat 1.mp3"),
        victorySounds: new Audio("/sounds/victory 1.mp3"),
      },
    },
  },

  // COMPUTED PROPERTIES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  computed: {
    dragonImage: function () {
      return { backgroundImage: `url("${this.dragon.image}")` };
    },

    heroImage: function () {
      return { backgroundImage: `url("${this.hero.image}")` };
    },

    rotateHourglass: function () {
      console.log("rotateHourglass just ran!");
      return { transform: `rotateZ(${this.rotateEndTurn}deg)` };
    },

    displayHeroBuff: function () {
      if (this.hero.buffed) {
        return { displayBuff: true };
      }
    },

    displayDragonBuff: function () {
      if (this.dragon.buffed) {
        return { displayBuff: true };
      }
    },

    displayHeroDefense: function () {
      if (this.hero.currentDEF) {
        return { displayShield: true };
      }
    },

    displayDragonDefense: function () {
      if (this.dragon.currentDEF) {
        return { displayShield: true };
      }
    },

    displayHeroLuck: function () {
      if (this.hero.lucky) {
        new Audio("/sounds/luck.mp3").play();
        return { displayLuck: true };
      }
    },

    displayDragonLuck: function () {
      if (this.dragon.lucky) {
        new Audio("/sounds/luck.mp3").play();
        return { displayLuck: true };
      }
    },

    // Attacha klasu .active ovisno o tome tko je current attacker

    activeHero: function () {
      if (this.attacker === this.hero) {
        return "active: true";
      }
    },
  },

  //************************************ GENERAL GAME METHODS ****************************************************************//
  methods: {
    // This function determines the id of a button when a mouseover event fires, and with that id I can determine which tooltip text should be injected into the data-tooltip attibute of that element

    getTooltip: function (event) {
      let btnID = parseInt(event.currentTarget.id);

      let tooltips = [];

      if (this.player === 0) {
        tooltips = this.hero.tooltips;
      } else {
        tooltips = this.dragon.tooltips;
      }
      // Comparing button id with tooltip id and assigning correct text to the this.tooltip property.
      for (tooltip of tooltips) {
        if (tooltip.id === btnID) {
          this.tooltip = tooltip.text;
        }
      }
    },

    //This function will convert current amount of defense into a percentage of MAX DEFENSE and use it to display a defensebar
    convert: function (opponent) {
      let percentInMaxDEF = (
        (opponent.currentDEF / opponent.maxDEF) *
        100
      ).toFixed();
      opponent.defenseBar = percentInMaxDEF;
    },

    // Starts the battle and changes the UI layout
    startBattle: function () {
      this.startBattleSound.play();
      // dodajem klasu na start btn image - rotation
      this.attachRotation = true;
      // Delaying the change so that the animation can run normally.
      setTimeout(() => {
        this.gameIsRunning = !this.gameIsRunning;
        // mičem klasu na start btn image - rotation
        this.attachRotation = false;
      }, 500);
      // Ovaj setTimeout je stavljen na 600ms jer kad se klikne start button, zelim da svi game elementi se pokazu postepeno - 0.5s
      // Medjutim, da bi se odigrala animacija za start button - odgađam gameIsrunning promjenu za 500ms
      // Taman kad se elementi stvore, opacitiy im je 0%
      // 100 ms poslije dodajem klasu .completeOpacity koja im stavlja opacity na 100%;
      setTimeout(() => {
        // dodajem klasu .completeOpacity pomoću propertija showContainer na sve elemente koji se trebaju pojaviti kad igra krene
        this.showContainer = true;
      }, 600);
    },

    // Switches roles of attacker and defender - also will change UI layout
    switchRoles: function () {
      if (this.player === 0) {
        this.player = 1;
      } else if (this.player === 1) {
        this.player = 0;
      }
      // rolledDice je stavljen na 0 kad se promijeni turn - usput miče i status luck.
      this.rolledDice = 0;
      this.diceImage = "/images/dice.png";
      this.hero.lucky = false;
      this.dragon.lucky = false;

      // this.attachActive property se mijenja sa svakim callanjem ove funkcije - daje do znanja koji igrač je aktivan
      this.attachActive = !this.attachActive;
    },

    // When the turn ends - the roles are switched.
    endTurn: function () {
      this.disableButtons();

      this.endTurnSound1.play();
      this.rotateEndTurn += 180;

      // Kad se klikne end turn - dodam switchSkill klasu na image od svakog skill buttona pomoću ovog propertija
      this.attachSwitchSkill = true;
      // switchRoles - Delay od 500 ms je iz razloga što  hourglassu u end turn buttonu treba 1s da se okrene - i zelim da mi se sličice na skill buttonima promijene u trenutku kad im se zbog animacije smanji opacity na 0% i onda se vrati na 100%;
      setTimeout(() => {
        this.switchRoles();
      }, 500);

      setTimeout(() => {
        this.endTurnSound2.play();
        this.diceThrown = false; // enabled roll dice button
        this.attachSwitchSkill = false;
      }, 1000);
    },

    // Resets entire game and UI to default
    resetGame: function () {
      this.startBattleSound.play();
      this.hero.currentHP = 100;
      this.dragon.currentHP = 100;
      this.hero.currentDEF = 0;
      this.dragon.currentDEF = 0;
      this.hero.defenseBar = 0;
      this.dragon.defenseBar = 0;
      this.hero.image = "/images/hero.jpg";
      this.dragon.image = "/images/dragon.jpg";
      this.diceImage = "/images/dice.png";
      this.rolledDice = 0;
      this.diceThrown = false;
      this.hero.buffed = false;
      this.dragon.buffed = false;
      this.hero.lucky = false;
      this.dragon.lucky = false;
      this.dragon.dead = false;
      this.battleRecords = [];
      this.player = 0;
      // this.attachActive property se resetira nazad na true;
      this.attachActive = true;
      document.getElementById("battlelog").textContent = "";
      // Mičem klasu completeOpacity pomoću propertija showContainer na sve elemente koji se trebaju pojaviti kad igra krene i kad se igra resetira.
      this.showContainer = false;

      // Odgađam promjenu na gameIsRunning kako bi se elementi stigli postepeno vratit na 0% opacity prije nego posve budu maknuti iz  DOM-a.
      setTimeout(() => {
        this.gameIsRunning = false;
      }, 500);
    },

    //************************************ GAMEPLAY  METHODS ****************************************************************//

    // Determine who is attacker and who is defender because all skills and functions should change based on that.

    determineRoles: function () {
      // ako je  player property jednak 0, attacker je hero, defender je dragon.

      if (this.player === 0) {
        this.attacker = this.hero;
        this.defender = this.dragon;
      } else {
        this.attacker = this.dragon;
        this.defender = this.hero;
      }
    },

    enableButtons: function (rolledDice) {
      //here we test which buttons should be enabled
      const nodeList = document.querySelectorAll(".skill-buttons");

      const skillButtons = Array.from(nodeList);

      //Now compare id of the buttons to the rolledDice and attach a .enabled class to those that are equal or lower

      for (const button of skillButtons) {
        if (parseInt(button.id) <= rolledDice) {
          button.classList.add("enabled");
        }
      }
    },

    //This will remove .enabled class from skill buttons right after the skill buttons is clicked and after the turn ended!
    disableButtons: function () {
      const nodeList = document.querySelectorAll(".skill-buttons");
      const skillButtons = Array.from(nodeList);
      for (const button of skillButtons) {
        button.classList.remove("enabled");
      }
    },

    // MAIN FUNCTION FOR ACTIVATING SKILLS *************************************************************************************

    activate: function (event) {
      // Determine active roles of attacker and defender.
      // This is also checked when the dice is thrown!.
      this.determineRoles();

      //Get ID of the button that was pressed.
      const btnID = parseInt(event.currentTarget.id);

      // Get the skill object that needs to be activated based on the button id - skill id needs to be identical.
      const skill = this.getSkill(btnID);

      // Play prepareSkillSound based on type of skills used.
      let prepareSkillSound = null;
      if (btnID <= 2) {
        prepareSkillSound = new Audio(`/sounds/attack ${this.player}.mp3`);
      } else if (btnID === 3) {
        prepareSkillSound = new Audio(`/sounds/healing ${this.player}.mp3`);
      } else if (btnID === 6) {
        prepareSkillSound = new Audio(`/sounds/readyranged ${this.player}.mp3`);
      }

      if (prepareSkillSound) {
        prepareSkillSound.play();
      }

      //Disable skill button!
      this.disableButtons();

      //Extract output range of the skill, calculate raw output and return it.
      let rawOutput = this.calculateOutput(...skill.range);
      console.log("This is RAW output for the skill: ", rawOutput);
      // determine type of skill - if it does damage, heals, or raises defense.

      const outputType = this.determineOutputType(skill);

      //Check if attacker is already buffed & check for critical HIT or MISS. (if attacker is buffed he cannot critical miss and will always do a critical hit.

      let criticalMiss = null;
      let criticalHit = null;

      if (this.attacker.buffed) {
        // After making sure attacker cannot miss and will critical hit for certain...
        criticalMiss = false;
        criticalHit = true;

        // ...remove the buff from the attacker
        this.attacker.buffed = false;
        console.log(
          `${this.attacker.name} buffed status:`,
          this.attacker.buffed
        );
      }
      // If attacker isn't buffed already from the previous attack, normal checks apply.
      else {
        // If CRITICAL MISS - output is set to 0. Chance for a critical miss is 5%.
        criticalMiss = this.isCritical(100);
        // If CRITICAL HIT - raise skill effect by 50%. Chance for a hit to be critical 5%.
        criticalHit = this.isCritical(100);
      }

      if (criticalMiss) {
        this.attackCritMiss = true;

        rawOutput = 0;
        console.log("this is a critical MISS: ", rawOutput);
      } else if (criticalMiss && criticalHit) {
        this.attackCritMiss = true;
        rawOutput = 0;
        console.log("this is a critical MISS: ", rawOutput);
      } else if (!criticalMiss && criticalHit) {
        this.attackCritHit = true;
        rawOutput *= 1.5;
        console.log("this is a critical HIT: ", rawOutput);
      }

      // Determine if output is allowed or needs adjustments - this is mainly because health is connected to width of ui element

      let finalOutput = this.adjustedOutput(rawOutput, outputType);

      // execute skill now that output is corrected to the final value and output type is known!
      this.executeSkill(
        finalOutput,
        outputType,
        skill,
        this.attacker,
        this.defender
      );
    },

    getSkill: function (btnID) {
      // Check array of attacker skills - find the one with same id as the button and return it!

      for (const element of this.attacker.skills) {
        if (element.id === btnID) {
          return element;
        }
      }
    },

    // Calculate Raw Output of damage, healing or defense ***************************************************************************
    calculateOutput: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    // Determine the type of output the skill produces - damage, healing, defense

    determineOutputType: function (skill) {
      const { doesDMG, raiseDEF, raiseHP } = skill;

      if (doesDMG) {
        return "DAMAGE";
      } else if (raiseDEF) {
        return "DEFENSE";
      } else if (raiseHP) {
        return "HEALING";
      } else {
        return "BUFF";
      }
    },

    //Calculate if critical Hit

    isCritical: function (num) {
      const crit = Math.floor(Math.random() * num) + 1;

      if (crit <= 5) {
        return true;
      } else {
        return false;
      }
    },

    // Adjust output effect based on its type (damage, healing, defense, buff) and on defenderHP and attackerHP

    adjustedOutput: function (output, outputType) {
      let maxAllowedOutput = null;

      if (outputType === "DAMAGE") {
        maxAllowedOutput = this.checkMinHP(output, this.defender);
      } else if (outputType === "HEALING") {
        maxAllowedOutput = this.checkMaxHP(output, this.attacker);
      } else if (outputType === "DEFENSE") {
        maxAllowedOutput = this.checkMaxDEF(output, this.attacker);
      } else if (outputType === "BUFF") {
        maxAllowedOutput = this.isBuffed(output);
      } else {
        console.log("this output is not valid!");
      }

      return maxAllowedOutput; // returned to activate().
    },

    // Determines which skills can be played during active turn.

    rollDice: function () {
      // Roles must be determined (who is attacker and who is defender)
      // Roles are determined here when the dice is thrown AND when the skill is clicked!!!! - is it really necessary to have both?
      this.determineRoles();

      // Play throw dice sound
      this.throwDiceSound.play();
      //Alternate sounds of dice throwing
      this.throwDiceSound = new Audio(
        `/sounds/roll dice plastic ${Math.floor(Math.random() * 3) + 1}.mp3`
      );

      // generate a random number between 1 and 6 and return the result of the dice throw
      const diceResult = Math.floor(Math.random() * 6) + 1;
      console.log("Dice roll result: ", diceResult);

      // set the this.rolledDice property to the value of diceResult

      this.rolledDice = diceResult;

      //Čim se dobije diceResult treba disablati roll dice btn i opet ga enablati kad se klikne endTurn() i kad se klikne resetGame()
      this.diceThrown = true;

      // Sad treba enablati one skill buttone koji imaju ID jednak ili manji od rolledDice, delay od 1000ms da se ne vide prije nego se kockica pokaze.
      setTimeout(() => {
        this.enableButtons(this.rolledDice);
      }, 1000);

      //ovo je bitno - ako je lucky true onda ćemo luck klasu dodavati attackeru u HTML-u preko computed propertija.
      setTimeout(() => {
        if (this.rolledDice === 6) {
          this.attacker.lucky = true;
          console.log(this.attacker.name);
        }
      }, 1000);

      //change the dice image that gets displayed
      this.diceImage = `/images/${diceResult}.jpg`;

      //Animate the dice throw
      this.attachRoll = !this.attachRoll;

      setTimeout(() => {
        //ovo resetira klasu - tako da uvijek kad počne mi završi na istu foru animacija ili transition. zaboravio što je ovdje treba vidit.
        this.attachRoll = !this.attachRoll;
      }, 1000);
    },

    // checkMinHP  ********************************************************************************

    checkMinHP: function (rawOutput, defender) {
      let defenderHP = defender.currentHP;
      //Treba uzeti u obzir i currentDEF od defendera - umanjiti rawOutput za iznos currentDEF a tek zatim napraviti check je li damage toliko jak da će remainingHP i u tom slučaju pasti ispod 0.

      const remainingHP = defenderHP - (rawOutput - defender.currentDEF);
      // if the damage amount would lower the defender health BELOW 0, reduce the damage so that defender health only reaches 0

      // ako je remainingHP manji od 0, treba zbrojiti taj negativni iznos s rawOutputom - tako da ga umanji, i tako da defenderHP nikad ne pređe u negativan broj.
      if (remainingHP < 0) {
        return remainingHP + rawOutput;
      }
      // Ako bi s dobivenim rawOutputom executao skill i defender HP bi bio  0 ili veći od 0, onda nema potrebe da umanjujem rawOutput!
      else if (remainingHP >= 0) {
        return rawOutput;
      }
    },

    // checkMaxHP ***********************************************************************************************************

    checkMaxHP: function (rawOutput, attacker) {
      let { currentHP, maxHP } = attacker;

      const totalHP = currentHP + rawOutput;

      let allowedHealing = null;

      if (totalHP >= maxHP) {
        allowedHealing = rawOutput - (totalHP - maxHP);
        console.log(`Healing was reduced by: ${totalHP - maxHP} points.`);
      } else {
        allowedHealing = rawOutput;
        console.log(`No need for reduction.`);
      }

      console.log(`Allowed healing is ${allowedHealing} points`);
      return allowedHealing;
    },

    // checkMaxDEF *****************************************************************************************************

    checkMaxDEF: function (rawOutput, attacker) {
      let { currentDEF, maxDEF } = attacker;

      const totalDEF = currentDEF + rawOutput;

      let allowedDefense = null;

      if (totalDEF >= maxDEF) {
        allowedDefense = rawOutput - (totalDEF - maxDEF);
        console.log(`Defense was reduced by: ${totalDEF - maxDEF} points.`);
      } else {
        allowedDefense = rawOutput;
        console.log(`No need for reduction.`);
      }

      console.log(`Allowed defense raise is ${allowedDefense} points`);
      return allowedDefense;
    },

    //isBuffed ************************************************************************************************************

    isBuffed: function (buff) {
      console.log("my buff: ", buff);

      return buff;
    },

    // get sounds of injuries *****************************************************************************************

    getInjurySound: function (defender) {
      const sound =
        defender.generalSounds.injurySounds[Math.floor(Math.random() * 3)];
      const playThisSound = new Audio(sound);
      playThisSound.play();
    },

    // Execute skill *********************************************************************************************************

    executeSkill: function (output, outputType, skill, attacker, defender) {
      // rolledDice je stavljen na 0 kad se skill executa kako bi se luck status maknuo čim igrač igra.
      this.rolledDice = 0;
      // Play the actual skill sound with slight delay but if output type is "DEFENSE" or "BUFF" play the sound right away because those skills do not have a "preparation sound" playing before the actual skill sound

      if (outputType === "DEFENSE" || outputType === "BUFF") {
        skill.skillSounds.play();
      }

      // Other output types have some preparation sound before the skill executes - this is the reason for the delay.
      setTimeout(() => {
        skill.skillSounds.play();
      }, 500);

      // Stop the skill sound after 3500 ms.
      setTimeout(() => {
        skill.skillSounds.pause();
        skill.skillSounds.currentTime = 0;
      }, 3500);

      let criticalMissSound = new Audio(`/sounds/crit miss ${this.player}.mp3`);
      let criticalHitSound = new Audio(`/sounds/crit hit.mp3`);

      // Play sounds for critical miss or hit
      if (this.attackCritMiss) {
        criticalMissSound.play();
      } else if (this.attackCritHit) {
        criticalHitSound.play();
      }

      //Execute skill effect.

      let beforeReductionDMG = null;

      setTimeout(() => {
        if (outputType === "DAMAGE" && !this.attackCritMiss) {
          defender.wasAttacked = true; // shakes the defender potrait
          // set defender.wasAttacked to false after a delay (enough time for animation to play out and the .impact class does not get removed)
          setTimeout(() => {
            defender.wasAttacked = false;
          }, 1500);
          beforeReductionDMG = output;
          // check if defender's current DEF is above 0
          if (defender.currentDEF > 0) {
            //I want to reduce damage output by the defenders defense
            output -= defender.currentDEF;
            //I also want to reduce the defenders defense by the output before it was reduced
            defender.currentDEF -= beforeReductionDMG;

            //This sound play when defender has defense up and attack happens (not a critical miss)
            let defenseSound = new Audio(
              `/sounds/defense impact ${this.player}.mp3`
            );
            defenseSound.play();
            // now I need to make sure neither output nor defense went below 0!

            if (output < 0) {
              output = 0;
            }

            if (defender.currentDEF < 0) {
              defender.currentDEF = 0;
            }
          }

          //this should update the DEFENDER defense bar at the moment the defense LOWERS
          this.convert(defender);

          defender.currentHP -= output;
          // This plays only for damage output type and ONLY if critical miss is not true
          //defender.generalSounds.injurySounds.play();
          this.getInjurySound(defender);
        } else if (outputType === "HEALING") {
          attacker.currentHP += output;
        } else if (outputType === "DEFENSE") {
          attacker.currentDEF += output;
          //this should update the attacker defense bar at the moment the defense RAISES
          this.convert(attacker);
        } else if (outputType === "BUFF" && !this.attackCritMiss) {
          attacker.buffed = true;
          console.log(`${attacker.name} is now buffed!`, attacker.buffed);
        }

        //Write skill result to battle log.
        this.writeToLog(output, outputType, this.attacker, this.defender);

        // Reset those back to false after each attack is done.
        this.attackCritMiss = false;
        this.attackCritHit = false;
      }, 1000);
    },

    // ***************************  WRITE TO THE BATTLE LOG *****************************************************/

    writeToLog: function (num, outputType, attacker, defender) {
      //Entry is created empty first.
      let entry = null;

      let points = "points";
      if (num === 1) {
        points = "point";
      }

      // If defender HP is 0, write a special entry and RESET the game after 5 seconds delay.
      if (defender.currentHP === 0) {
        entry = `${attacker.victoryQuote}`;
        defender.dead = true;
        defender.image = `/images/dead ${this.player}.png`;
        defender.generalSounds.defeatSounds.play();

        // After 1 second delay, play victory sound of the attacker.
        setTimeout(() => {
          attacker.generalSounds.victorySounds.play();
        }, 1000);

        // Reset the game
        setTimeout(() => {
          this.resetGame();
        }, 5000);
      }
      //If defender HP is NOT below 0, write an entry with turn information and push it to the log.
      else if (outputType === "DAMAGE") {
        entry = `${attacker.name} dealt ${num} ${points} of damage to ${defender.name}!`;
      } else if (outputType === "HEALING") {
        entry = `${attacker.name} is healed for ${num} ${points}!`;
      } else if (outputType === "DEFENSE" && this.attackCritMiss) {
        entry = `${attacker.name} failed to raise defense!`;
      } else if (outputType === "DEFENSE") {
        entry = `${attacker.name} raised defense by ${num} ${points}!`;
      } else if (outputType === "BUFF" && this.attackCritMiss) {
        entry = `${attacker.name} failed to buff up!`;
      } else if (outputType === "BUFF") {
        entry = `${attacker.name} is buffed! Critical success on next turn!!!`;
      }

      //Push entry at the start of array.
      this.battleRecords.unshift(entry);

      // Create list item and prepend it to the list.
      const item = document.createElement("li");

      if (this.attacker === this.hero) {
        item.style.background =
          "radial-gradient(rgb(24, 141, 33), rgba(0, 0, 0,0.5))";
        item.style.color = "white";
      } else {
        item.style.background =
          "radial-gradient(rgb(187, 8, 8), rgba(0, 0, 0, 0.5))";
        item.style.color = "white";
      }
      item.textContent = entry;

      document.getElementById("battlelog").prepend(item);
    },
  },
});
