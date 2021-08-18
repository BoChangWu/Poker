
    var uname = '';
    var uremaining = 0
    var uTBB = 0;
    var uFS = 0;
    var uVPiP = 0;
    var uAgg = 0;
    var uCBet = 0;
    var uBB = 0;

            function chooseUsr() {
        $.ajax({
            type: "GET",
            url: "http://localhost:3300/api/players/" + $('#usrName').val()
        }).done(function (player) {
            var usr = player[0]
            console.log(usr)
            $("#p3").html(usr.name + '');
            $("#p3money").html(usr.remaining + '')
        }).fail(function (err) {
            alert(err.statusText);
        });
                $("#chooseUsr").hide()
            };
            function exit() {
        uremaining = parseInt($("#p3money").html())
                var player = {
        name: $('#p3').html(),
                    remaining: uremaining,
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
                    alert('離開牌桌')
                    window.location.reload()
    }).fail(function (err) {
        alert(err.statusText);
                });
            }
