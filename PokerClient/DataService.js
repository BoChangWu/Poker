var uname = '';
var uremaining = 0;
var uTBB = 0;
var uFS = 0;
var uVPiP = 0;
var uAgg = 0;
var uCBet = 0;
var uBB = 0;

function getPlayers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3300/api/players"
    }).done(function (players) {
        //alert(JSON.stringify(players));
        var tb = "";
        var gr = "";
        tb += "<table class='table table-striped table-hover'>";
        tb += "<thead>";
        tb += "<tr>";
        tb += "<td>Name</td>";
        tb += "<td>Remaining</td>";
        tb += "<td>TBB</td>";
        tb += "<td>FS</td>";
        tb += "<td>VPiP</td>";
        tb += "<td>Agg</td>";
        tb += "<td>CBet</td>";
        tb += "<td>BB</td>";
        tb += "<td></td>"
        tb += "</tr>";
        tb += "</thead>";
        tb += "<tbody>";
        tb += "<tr>";
        $.each(players, function (index, player) {
            tb += "<tr>";
            tb += "<td>" + player.name + "</td>";
            tb += "<td>" + player.remaining + "</td>";
            tb += "<td>" + player.TBB + "</td>";
            tb += "<td>" + player.FS + "</td>";
            tb += "<td>" + player.VPiP + "</td>";
            tb += "<td>" + player.Agg + "</td>";
            tb += "<td>" + player.CBet + "</td>";
            tb += "<td>" + player.BB + "</td>";
            tb += "</tr>";
        })
        tb += "</tbody>";

        //gr += "<table class='table table-striped table-hover'>";
        //gr += "<thead>"
        //gr += "<tr>"
        //tb += "<td>GameNo.</td>";
        //tb += "<td>Pot</td>";
        //tb += "<td>Date</td>";
        //tb += "<td>Preflop</td>";
        //tb += "<td>Flop</td>";
        //tb += "<td>Turn</td>";
        //tb += "<td>River</td>";
        //gr += "</tr>"
        //gr += "</thead>"
        //gr += "<tbody>"
        //gr += "</tbody>"
        //gr += "</table>"
        $('#players').html(tb);
    }).fail(function (err) {
        alert(err.statusText);
    });
};

function insertPlayer() {
    var player = {
        name: $('#insertName').val(),
        remaining: $('#insertRemaining').val(),
        TBB: 0,
        FS: 0,
        VPiP: 0,
        Agg: 0,
        CBet: 0,
        BB: 0,
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:3300/api/players",
        data: player
    }).done(function (data) {
        alert("新增成功");
    }).fail(function (err) {
        alert(err.statusText);
    });
}

//修改資料只修改金額,其他資料照常,所以先建立get的按鈕,再put按鈕
function getOne() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3300/api/players/" + $('#UpdateName').val()
    }).done(function (player) {
        //alert(JSON.stringify(player).name);
        var one = player[0]
        var tb = "";
        tb += "<table class='table table-striped table-hover'>";
        tb += "<thead>";
        tb += "<tr>";
        tb += "<td>Name</td>";
        tb += "<td>Remaining</td>";
        tb += "<td>TBB</td>";
        tb += "<td>FS</td>";
        tb += "<td>VPiP</td>";
        tb += "<td>Agg</td>";
        tb += "<td>CBet</td>";
        tb += "<td>BB</td>";
        tb += "</tr>";
        tb += "</thead>";
        tb += "<tbody>";
        tb += "<td>" + one.name + "</td>";
        tb += "<td>" + one.remaining + "</td>";
        tb += "<td>" + one.TBB + "</td>";
        tb += "<td>" + one.FS + "</td>";
        tb += "<td>" + one.VPiP + "</td>";
        tb += "<td>" + one.Agg + "</td>";
        tb += "<td>" + one.CBet + "</td>";
        tb += "<td>" + one.BB + "</td>";
        tb += "</tr>";
        tb += "</tbody>";
        $('#checkhere').html(tb);
        uremaining = one.remaining
    }).fail(function (err) {
        alert(err.statusText);
    });
    $('#edit').prop('disabled', false)
}


function UpdatePlayer() {
    var player = {
        name: $('#UpdateName').val(),
        remaining: uremaining += parseInt($('#UpdateRemaining').val()),
        TBB: uTBB,
        FS: uFS,
        VPiP: uVPiP,
        Agg: uAgg,
        CBet: uCBet,
        BB: uBB
    }
    $.ajax({
        type: "PUT",
        url: "http://localhost:3300/api/players",
        data: player
    }).done(function (player) {
        //var who = player[0];
        //who.remaining += $('UpdateRemaining').val();
        //edit(who)
        alert('加值成功')
    }).fail(function (err) {
        alert(err.statusText);
    });
};


function deletePlayer() {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3300/api/players/" + $('#deleteName').val()
    }).done(function (data) {
        alert('刪除成功');
    }).fail(function (err) {
        alert(err.statusText);
    })
}
    </script >