$("#logo").attr("src", "logo.jpg");
var player = JSON.parse(localStorage.getItem("player"));
var npc = JSON.parse(localStorage.getItem("npc"));

document.getElementById("Total Games").innerHTML = "Total Games: " + player["totalGames"];
document.getElementById("Total Wins").innerHTML = "Total Wins: " + player["totalWins"];
document.getElementById("Win Loss Ratio").innerHTML = "Win Loss Ratio: " + parseFloat((player["winLoss"]).toFixed(2));
document.getElementById("player_stats").innerHTML = "Player Stats: Rock: "+((player["rock"]/player["totalGames"])*100).toFixed(2)+"%; Paper: "+((player["paper"]/player["totalGames"])*100).toFixed(2)+"%; Scissors: "+((player["scissors"]/player["totalGames"])*100).toFixed(2)+"%";
document.getElementById("npc_stats").innerHTML = "Browster Stats: Rock: "+((npc["rock"]/player["totalGames"])*100).toFixed(2)+"%; Paper: "+((npc["paper"]/player["totalGames"])*100).toFixed(2)+"%; Scissors: "+((npc["scissors"]/player["totalGames"])*100).toFixed(2)+"%";
