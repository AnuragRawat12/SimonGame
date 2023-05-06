
let colorList = ["red", "green", "blue", "yellow"];
let userClickColor = [];
let botClickColor = [];
let level = 0;
let botCount = 1;
const wrongAudio = new Audio("music/wrong.mp3");

const startGame = () => {
  $("h1").text("Level - " + level);
  setTimeout(() => {
    botTurn();
  }, 10);
};

const botTurn = () => {
  setTimeout(() => {
    let count = 0;
    const blinkInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * 4);
      var colorName = colorList[randomNumber];
      $("#" + colorName)
        .fadeIn(75)
        .fadeOut(75)
        .fadeIn(75);
      botClickColor.push(colorName);
      playSound(colorName);
      count++;
      if (count === botCount) {
        clearInterval(blinkInterval);
        userTurn(botCount);
      }
    }, 800);
  }, 100);
};

const userTurn = (botCount) => {
  let count = 0;
  $(".boxes").on("click", (e) => {
    click(e, botCount);
    count++;
    if (count === botCount) {
      $(".boxes").off("click");
      checkUserBotColor();
    }
  });
};
const click = (e, botCount) => {
  if (userClickColor.length < botCount) {
    var colorSelector = $(e.target).attr("id");
    userClickColor.push(colorSelector);
    playSound(colorSelector);
    animateBox(colorSelector);
  }
};

const checkUserBotColor = () => {
  userClickColor = JSON.stringify(userClickColor);
  botClickColor = JSON.stringify(botClickColor);
  if (userClickColor === botClickColor) {
    level++;
    botCount++;
    $("h1").text("Level - " + level);
    botClickColor = [];
    userClickColor = [];
    setTimeout(() => {
      botTurn();
    }, 700);
  } else {
    botCount = 1;
    count = 0;
    setTimeout(() => {
      $("body").css("background-color", "rgb(8 8 55)");
    }, 1000);
    wrongAudio.play();
    $(".p").css("visibility", "visible");
    $("body").css("background-color", "red");
    botClickColor = [];
    userClickColor = [];
    $("h1").text("Wrong! Try again, Press any key to start");
  }
};

window.addEventListener("keypress", () => {
  $(".p").css("visibility", "hidden");
  level = 0;
  startGame();
});

const animateBox = (anim) => {
  $("#" + anim).addClass("animation");
  setTimeout(() => {
    $("#" + anim).removeClass("animation");
  }, 100);
};

const playSound = (name) => {
  let song = new Audio("music/" + name + ".mp3");
  song.play();
};
