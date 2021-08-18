var players = []
var playersScore = []
var gameCards = []
var gameCardsVal=[]
var potCardsVal=[]
var potCards = []

var hostCards=[]

var matchCard=[]
var isRiver = false


// console.log(a.indexOf(1))
//Spade=17 Heart=19 Diamond=23 Club=29
var suits = ['S', 'H', 'D', 'C']
var cardVal = ['A']
var num = [1.4]
for(i=2;i<=10;i++){
    cardVal.push(i)
    num.push(i*0.1) //----為了sort
} 
num.push(1.1,1.2,1.3)
cardVal.push('J','Q','K')
// console.log(cardVal)

for(i=0;i<cardVal.length;i++){
    for(j=0;j<suits.length;j++){
        gameCards.push(''+suits[j]+cardVal[i])
        gameCardsVal.push([suits[j], num[i]])
    }
}

console.log(gameCardsVal)



function addPlayers(){
    for (i = 1; i < 6; i++) {
        players.push($('#p' + i).html())
    }
    // console.log(players)
    // alert('遊戲開始')
    $('#addPlayer').hide()
    $('#gameOn').show()
}

function licensing() {
    for(i=0;i<players.length*2;i++){
        var x =Math.floor(Math.random()*gameCards.length)
        
        potCards.push(gameCardsVal[x])
        // $('#card' + (i + 1)).html(''+gameCards[x])
        $('#c'+(i+1)).attr('src','img/'+gameCards[x]+'.png')
        gameCards.splice(x,1)
        gameCardsVal.splice(x,1)
        
    }
    //-----host pot---------

    for(i=0;i<3;i++){
        var x = Math.floor(Math.random()*gameCards.length)
        hostCards.push(gameCardsVal[x])
        $('#hostCard'+(i+1)).attr('src','img/'+gameCards[x]+'.png')
        gameCards.splice(x,1)
        gameCardsVal.splice(x, 1)
    }
    // console.log(gameCards)
    console.log('發牌pot'+potCards.length)
    $('#gameOn').hide()
    $('#turnNRiver').show()
}

// var premon = $("#potmoney").html()
var postraise =0
var isFold = false
function raise(){
    var pm =parseInt($("#potmoney").html())
    var chips = parseInt($("#chips").val())
    var um = parseInt($("#p3money").html())
    
    
    pm+=chips
    um-=chips
    postraise = chips
    $("#p3money").html('' + um)
    $("#potmoney").html(''+pm)
}

function call() {
    var pm = parseInt($("#potmoney").html())
    var chips = postraise
    var um = parseInt($("#p3money").html())
    pm+= chips
    um-=chips
    $("#potmoney").html('' + pm)
    $("#p3money").html(''+um)
}

function allIn() {
    var pm = parseInt($("#potmoney").html())
    var chips = parseInt($("#p3money").html())
    pm += chips

    $("#potmoney").html('' + pm)
    $("#p3money").html('' + 0)
}

function fold(){
    $("#chips").attr('disabled', 'disabled')
    $("#raise").attr('disabled','disabled')
    $("#call").attr('disabled', 'disabled')
    $("#allIn").attr('disabled', 'disabled')
    $("#fold").attr('disabled', 'disabled')
    isFold = true
}

function turnNRiver(){
    
    var x = Math.floor(Math.random()*gameCards.length)
    hostCards.push(gameCardsVal[x])

    if(isRiver==true){
        match()
        $('#hostCard5').attr('src','img/'+gameCards[x]+'.png')
        $('#turnNRiver').hide()
        $('#newGame').show()
    }
    else{
        $('#hostCard4').attr('src', 'img/' + gameCards[x] + '.png')
    }
    
    gameCards.splice(x,1)
    gameCardsVal.splice(x, 1)
    isRiver = true
    // console.log(gameCards)
    // console.log(potCards)
}

function match(){
    console.log('pot:'+potCards)
    console.log(hostCards)
    for(i=0;i<players.length;i++){
    var mArray= hostCards.concat([potCards[i],potCards[i+5]])
    
    mArray.sort()
    matchCard.push(mArray)
    // var a = mArray.join('/')
    // console.log(a)
    }
    
    for(i=0;i<matchCard.length;i++){
        var score =0

        if (StraightFlushOrFlush(i)==false){
            if (FourOfAKind(i)==false){
                if (FullHouse(i)==false){
                    if (straight(i)==false){
                        if (threeOfAKind(i)==false){
                            if(pairOrTwoPairs(i)==false){
                                score =HighCard(i)
                            }else{
                                score = pairOrTwoPairs(i)
                            }
                        } else { 
                            score=threeOfAKind(i)
                        }
                    } else {
                        score=straight(i)
                    }
                } else {
                    score=FullHouse(i)
                }
            }else{
                score=FourOfAKind(i)
            }
        }else{
            score=StraightFlushOrFlush(i)
        }
        playersScore.push(score)
        // console.log(matchCard[i])
        // console.log(score)
    }
    // console.log(playersScore)
    if(isFold==true){
        playersScore[2]=0
    }
    var scoreSort=playersScore.concat([])
    scoreSort.sort()
    // console.log('score: '+scoreSort)
    // console.log(playersScore)
    console.log(playersScore)
    console.log(scoreSort)
    var winner= players[playersScore.indexOf(scoreSort[players.length-1])] //索引分數最高的人
     
    var who = players.indexOf(winner)
      
    var pm = parseInt($("#potmoney").html())
    var wm = parseInt($("#p"+(who+1)+"money").html())
    totalm = wm + pm
    console.log(totalm)
    console.log(who)
    $("#p" + (who+1) + "money").html('' + totalm)

    alert(winner+" wins !!")

    // console.log(players[playersScore.indexOf(scoreSort[players.length - 1])])
    // console.log(playersScore[players.indexOf(players[playersScore.indexOf(scoreSort[players.length - 1])])])
    // console.log(matchCard[players.indexOf(players[playersScore.indexOf(scoreSort[players.length - 1])])])
    // winnerIs()
}




function StraightFlushOrFlush(x){ //straight flush min=7200 / flush min=12.5 max=31.5
    var n0 = matchCard[x][0]
    var n1 = matchCard[x][1]
    var n2 = matchCard[x][2]
    var n3 = matchCard[x][3]
    var n4 = matchCard[x][4]
    var n5 = matchCard[x][5]
    var n6 = matchCard[x][6]
    var subb = [Math.floor(10 * (n6[1] - n5[0])),
                Math.floor(10 * (n5[1] - n4[1])),
                Math.floor(10 * (n4[1] - n3[1])),
                Math.floor(10 * (n3[1] - n2[1])),
                Math.floor(10 * (n2[1] - n1[1])),
                Math.floor(10 * (n1[1] - n0[1]))]

    if (n0[0] == n1[0] == n2[0] == n4[0] == n4[0]){
        var rpt1 = subb.filter(function (element, index, arr) {
            return arr.indexOf(element) !== index;
        })
        if (rpt1.length==4){
            return n4[1]* n3[1]*n2[1]*n1[1]*n0[1]*Math.pow(10,5)*suits.indexOf(n0[0])*10
        }
        else{
            return ((n4[1] + n3[1] + n2[1] + n1[1] + n0[1])*10 + suits.indexOf(n0[0]))/3*1.5
        }
        
        
    }

    if(n1[0] == n2[0] == n3[0] == n4[0] == n5[0]){
        var rpt2 = subb.filter(function (element, index, arr) {
            return arr.indexOf(element) !== index;
        })
        if (rpt2.length == 4) {
            return n5[1] * n4[1] * n3[1] * n2[1] * n1[1] * Math.pow(10, 5)* suits.indexOf(n1[0])*10
        }
        else {
            return ((n5[1] + n4[1] + n3[1] + n2[1] + n1[1]) * 10 + suits.indexOf(n1[0]))/3*1.5
        }
    } 

    if(n2[0] == n3[0] == n4[0] == n5[0] == n6[0]){
        var rp3 = subb.filter(function (element, index, arr) {
            return arr.indexOf(element) !== index;
        })
        if (rpt3.length == 4) {
            return n6[1] * n5[1] * n4[1] * n3[1] * n2[1] * Math.pow(10, 5)* suits.indexOf(n2[0])*10
        }
        else {
            return ((n6[1] + n5[1] + n4[1] + n3[1] + n2[1]) * 10 + suits.indexOf(n2[0]))/3*1.5
        }
    }
    else{
        return false 
    }
}
// var a = [1, 1, 1, 1, 0.9,0.9]
// var rpt = a.filter(function (element, index, arr) {
//     return arr.indexOf(element) !== index;
// })

// console.log(rpt)
function FourOfAKind(x) { //min=320 max=5600
    var n0 = matchCard[x][0]
    var n1 = matchCard[x][1]
    var n2 = matchCard[x][2]
    var n3 = matchCard[x][3]
    var n4 = matchCard[x][4]
    var n5 = matchCard[x][5]
    var n6 = matchCard[x][6]
    var f4 = [n0[1], n1[1], n2[1], n3[1], n4[1], n5[1], n6[1]]
    var f4s = [n0[0], n1[0], n2[0], n3[0], n4[0], n5[0], n6[0]]

    var rpt= f4.filter(function (element,index,arr) {
        return arr.indexOf(element) !== index;
    })
    var nRpt= f4.filter(function(element,index,arr){
        return element != rpt[0]
    })
    nRpt.sort()
    // var suitIndex = suits.indexOf(f4s.indexOf(nRpt[2]))

    if(rpt.length==3&& rpt[0]==rpt[1]==rpt[2]){
        return rpt[0]*4*100*3
    }
    else{
        return false
    }

}

function FullHouse(x) { //min=40 max=280
    var n0 = matchCard[x][0]
    var n1 = matchCard[x][1]
    var n2 = matchCard[x][2]
    var n3 = matchCard[x][3]
    var n4 = matchCard[x][4]
    var n5 = matchCard[x][5]
    var n6 = matchCard[x][6]
    var f23 = [n0[1], n1[1], n2[1], n3[1], n4[1], n5[1], n6[1]]
    var f23s = [n0[0], n1[0], n2[0], n3[0], n4[0], n5[0], n6[0]]
    var rpt = f23.filter(function (element, index, arr) {
        return arr.indexOf(element) !== index;
    })
    rpt.sort()
    var nRpt = f23.filter(function (element, index, arr) {
        return (element != rpt[0])||(element !=rpt[2])
    })

    // var suitIndex = suits.indexOf(f23s.indexOf(nRpt[2]))

    if(rpt.length==3){
        return rpt[1]*5*3
    }
    else{
        return false
    }
}

function straight(x){ //min=4.04 max=12.06
    var n0 = matchCard[x][0]
    var n1 = matchCard[x][1]
    var n2 = matchCard[x][2]
    var n3 = matchCard[x][3]
    var n4 = matchCard[x][4]
    var n5 = matchCard[x][5]
    var n6 = matchCard[x][6]
    var y=[n0[1],n1[1],n2[1],n3[1],n4[1],n5[1],n6[1]]
    y.sort()
    var subb = [Math.floor(10 * (y[6] - y[5])),
    Math.floor(10 * (y[5] - y[4])),
    Math.floor(10 * (y[4] - y[3])),
    Math.floor(10 * (y[3] - y[2])),
    Math.floor(10 * (y[2] - y[1])),
    Math.floor(10 * (y[1] - y[1]))]
    var rpt = subb.filter(function (element, index, arr) {
        return arr.indexOf(element) !== index;
    })
    if(rpt[rpt.indexOf(1)]==1){
        
        return (n0[1]+n1[1]+n2[1]+n3[1]+n4[1])*2+subb.lastIndexOf(1)*0.01
    }
    else{
        return false
    }
}

function threeOfAKind(x) { //min=1.008 max=3.744
    var n0 = matchCard[x][0]
    var n1 = matchCard[x][1]
    var n2 = matchCard[x][2]
    var n3 = matchCard[x][3]
    var n4 = matchCard[x][4]
    var n5 = matchCard[x][5]
    var n6 = matchCard[x][6]
    var y = [n0[1], n1[1], n2[1], n3[1], n4[1], n5[1], n6[1]]
    y.sort()
    var rpt = y.filter(function (element, index, arr) {
        return arr.indexOf(element) !== index;
    })
    if(rpt.length==2&&rpt[0]==rpt[1]){
        return Math.pow(rpt[0],3)+1
    }
    else{
        return false
    }

}

function pairOrTwoPairs(x){
    var n0 = matchCard[x][0]
    var n1 = matchCard[x][1]
    var n2 = matchCard[x][2]
    var n3 = matchCard[x][3]
    var n4 = matchCard[x][4]
    var n5 = matchCard[x][5]
    var n6 = matchCard[x][6]
    var y = [n0[1], n1[1], n2[1], n3[1], n4[1], n5[1], n6[1]]
    y.sort()
    var rpt = y.filter(function (element, index, arr) {
        return arr.indexOf(element) !== index;
    })
    var nRpt = y.filter(function (element, index, arr) {
        return (element != rpt[0])||(element !=rpt[1]);
    })
    if(rpt.length>=1){
        var pairVal=0
        if(rpt.length>=2&&rpt[0]==rpt[1]){
            pairVal+= (rpt[1]*0.1+rpt[0]*0.01+nRpt[2]*0.01)
        }else if(rpt.length==3){
            pairVal+= (rpt[2] * 0.1 + rpt[1] * 0.01 + nRpt[0] * 0.01)
        }else{
            pairVal += rpt[0]*2*0.1
        }
        return pairVal
    }
    else{
        return false
    }
}

function HighCard(x){
    var n0 = matchCard[x][0]
    var n1 = matchCard[x][1]
    var n2 = matchCard[x][2]
    var n3 = matchCard[x][3]
    var n4 = matchCard[x][4]
    var n5 = matchCard[x][5]
    var n6 = matchCard[x][6]
    var y = [n0[1], n1[1], n2[1], n3[1], n4[1], n5[1], n6[1]]
    var z=y.sort()
    return matchCard[x][y.lastIndexOf(z[6])][1] / Math.pow(2, 10) + suits.indexOf(matchCard[x][y.lastIndexOf(z[6])][0])
}

function newGame() {
    $('#newGame').hide()
    $('#addPlayer').show()
    for(i=0;i<5;i++){
        players.pop()
        playersScore.pop()
        hostCards.pop()
        matchCard.pop()
    }
    isRiver = false

    for (i = 0; i < cardVal.length; i++) {
        for (j = 0; j < suits.length; j++) {
        gameCards.pop()
        gameCardsVal.pop()
        }
    }
    for(i=0;i<10;i++){
        potCards.pop()
    }
    
    //--------重新洗牌-------------
    for (i = 0; i < cardVal.length; i++) {
        for (j = 0; j < suits.length; j++) {
            gameCards.push(''+suits[j] +cardVal[i])
            gameCardsVal.push([suits[j] , num[i]])
        }
    }
    // console.log(gameCards)
    //--------欄位清空-------------
    for (i = 1; i <= 10; i++) {
        $('#c' + i).attr('src','img/Back_cut.png') //----------清不掉??
    }
    for (i = 1; i <= 5; i++) {
        $('#hostCard' + i).attr('src', 'img/Back_cut.png')
    }
    var fix=0
    $("#potmoney").html(''+fix)
    $("#chips").prop('disabled', false)
    $("#raise").prop('disabled', false)
    $("#call").prop('disabled', false)
    $("#allIn").prop('disabled', false)
    $("#fold").prop('disabled', false)
    isFold = false
    console.log(players)
    console.log(playersScore)
    console.log(gameCardsVal)
    console.log(gameCards)
    console.log(hostCards)
    console.log('M;'+matchCard.length)
    console.log(potCards)
}