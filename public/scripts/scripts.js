
$("#logo").attr("src", "logo.jpg");
var submit_name_button = document.getElementById("submit_name");
var player_name = localStorage.getItem('player_name');
var player_wins = localStorage.getItem('player_wins');
var winCount = 0;
var loseCount = 0;
var tieCount = 0;
//localStorage.setItem("Total Games", 0);
//localStorage.setItem("Total Wins", 0);
//localStorage.setItem("Win Loss Ratio", 0);
//var stats_list = ["Total Games", "Total Wins", "Total Ties", "Win Loss Ratio"];
//var player = {"totalGames":0,"totalWins":0,"totalTies":0,"winLoss":0,"rock":0,"paper":0,"scissors":0};
//var npc = {"totalGames":0,"totalWins":0,"totalTies":0,"winLoss":0,"rock":0,"paper":0,"scissors":0};
localStorage.setItem("player", JSON.stringify(player));
localStorage.setItem("npc", JSON.stringify(npc));

if (!player){
  //console.log("Hello")
  var player = {"totalGames":0,"totalWins":0,"totalLoss":0,"totalTies":0,"winLoss":0,"rock":0,"paper":0,"scissors":0};
} if (!npc){
  var npc = {"totalGames":0,"totalWins":0,"totalLoss":0,"totalTies":0,"winLoss":0,"rock":0,"paper":0,"scissors":0};
}

throwChoice();


function updateMessage(text_element, message){
  document.getElementById(text_element).textContent = message;
}

function toggleDiv(type,a){
  if (a ==1){
    document.getElementById(type).classList.remove("visible");
    document.getElementById(type).classList.add("hidden");
  } else {
    document.getElementById(type).classList.remove("hidden");
    document.getElementById(type).classList.add("visible");
  }
}

submit_name_button.addEventListener("click", function(){
  var input = document.getElementById("name").value;
  localStorage.setItem("player_name", input);
  console.log(player_name);
  player_name = localStorage.getItem('player_name');
  updateMessage("game_header", "Make your move, " + player_name +"!")
  toggleDiv("enter_name",1);
  toggleDiv("game_results",2);
  toggleDiv("throw_choice_div",2);
  localStorage.setItem("player", JSON.stringify(player));

});

if(!player_name || player_name==""|| player_name==" "){
  toggleDiv("enter_name",2);
  toggleDiv("game_results",1);
  toggleDiv("throw_choice_div",1);
  feedback.innerHTML ="Enter name, please!";
  feedback.classList.remove("good");
  feedback.classList.add("bad");
} else {
  updateMessage("game_header", "Make your move, " + player_name +"!")
  feedback.innerHTML ="Good job entering your name!";
  feedback.classList.remove("bad");
  feedback.classList.add("good");
}

function throwChoice(){
  var throw_button = document.getElementById("throw_choice");
  var value_choice = document.getElementById("dropdown");
  var winner;
  throw_button.addEventListener("click", function(){
    player["totalGames"]+=1;
    npc["totalGames"]+=1;
    var player_choice =  value_choice.options[value_choice.selectedIndex].value;
    var npc_choice = Math.floor(Math.random() * 3)+1;
    if (player_choice == 0){
        document.getElementById("result_header").innerHTML = "Error: Please input throw choice";
        document.getElementById("player").innerHTML = "";
        document.getElementById("npc").innerHTML = "";
        document.getElementById("winner").innerHTML = ""
        winner = "";
        feedback.innerHTML ="Error: Please input throw choice";
        feedback.classList.add("bad");
        feedback.classList.remove("good");
    } else {
      toggleDiv("throw_choice_div",1);
      toggleDiv("game_results",2);
      document.getElementById("result_header").innerHTML = "Game Results";
      feedback.innerHTML ="Nice throw!";
      feedback.classList.remove("bad");
      feedback.classList.add("good");
      if(player_choice==npc_choice){
          winner = "Tie";
          player["totalTies"]+=1;
          npc["totalTies"]+=1;
        } else if (player_choice == 1 && npc_choice == 2 || player_choice == 2 && npc_choice == 3 || player_choice == 3 && npc_choice == 1) {
          winner = "Computer";
          player["totalLoss"]+=1;
          console.log("player: " + player["loseCount"])
          npc["totalWins"]+=1;
        } else if (player_choice == 2 && npc_choice == 1 || player_choice == 3 && npc_choice == 2 || player_choice == 1 && npc_choice == 3) {
          winner = "Player";
          player["totalWins"]+=1;
          npc["totalLoss"]+=1;
        }
        console.log(player);
        console.log(npc);
    }

    var npcVar;
    var playerVar;
    var thing;
    function type(choice, person){
      if(choice==1){
        thing = "Rock";
      } else if(choice==2){
        thing = "Paper";
      } else if (choice==3){
        thing = "Scissors";
      }else{
        thing="Error";
      }
      return thing;
    }

    function statUpdate(statType,choice){
      if(choice==1){
        statType["rock"]+=1;
      } else if (choice==2){
        statType["paper"]+=1;
      } else {
        statType["scissors"]+=1;
      }
      if(!(player["totalLoss"]==0 || npc["totalLoss"]==0)){
        player["winLoss"] = player["totalWins"]/player["totalLoss"]
        npc["winLoss"] = npc["totalWins"]/npc["totalLoss"]
      }
      localStorage.setItem("player", JSON.stringify(player));
      localStorage.setItem("npc", JSON.stringify(npc));
    }

    if(!(type(player_choice,player)=="Error")){
      total_games = localStorage.getItem("Total Games");
      document.getElementById("player").innerHTML = "Player choice: "+type(player_choice,player);
      document.getElementById("npc").innerHTML = "Computer choice: "+type(npc_choice,npc);
      document.getElementById("winner").innerHTML = "Winner: " +winner;
      var totalLoss = loseCount+tieCount;
      statUpdate(player,player_choice);
      statUpdate(npc,npc_choice);

      $("#player_image").attr("src", player_choice+".png");
      $("#npc_image").attr("src", (npc_choice+3)+".png");
    }
  });
}

document.getElementById("reset").addEventListener("click", function() {
//  localStorage.setItem("Total Games", 0);
//  localStorage.setItem("Total Wins", 0);
//  localStorage.setItem("Win Loss Ratio", 0);
//  var stats_list = ["Total Games", "Total Wins", "Win Loss Ratio"];
 player = {"totalGames":0,"totalWins":0,"totalLoss":0,"totalTies":0,"winLoss":0,"rock":0,"paper":0,"scissors":0};
 npc = {"totalGames":0,"totalWins":0,"totalLoss":0,"totalTies":0,"winLoss":0,"rock":0,"paper":0,"scissors":0};
  document.getElementById("game_results").classList.remove("visible");
  document.getElementById("game_results").classList.add("hidden");
  document.getElementById("dropdown").selectedIndex = 0;
});


document.getElementById("playAgain").addEventListener("click", function() {
        toggleDiv("throw_choice_div",2);
              toggleDiv("game_results",1);
  document.getElementById("dropdown").selectedIndex = 0;
});
