var listCellLeader = ["정화종", "박찬주", "김찬주"];
var listLeader = [];
var listMember = [];

function assignCellLeader() {
    return;
}
function addLeader() {
    var nameLeader = document.getElementById("name-leader").value;
    var ref = firebase.database().ref();
    ref.child("벧엘청년부멤버리스트").child("리더리스트").push(nameLeader);
    swal('Success', '추가 되었습니다').then((value) => {
        updateLeaderList();
        setTimeout(function () {
            //window.location.replace("random-gen.html");
        }, 500)
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        swal({
            icon: 'error',
            title: 'Error',
            text: "Error. Submission not received!.",
        })
    })

}
function addMember() {
    var nameLeader = document.getElementById("name-member").value;
    var ref = firebase.database().ref();
    ref.child("벧엘청년부멤버리스트").child("멤버리스트").push(nameMember);
    swal('Success', '추가 되었습니다').then((value) => {
        updateMemberList();
        setTimeout(function () {
            //window.location.replace("random-gen.html");
        }, 500)
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        swal({
            icon: 'error',
            title: 'Error',
            text: "Error. Submission not received!.",
        })
    });
}
function updateLeaderList() {
    ref = firebase.database().ref().child("벧엘청년부멤버리스트");
    ref.on('value', function (snapshot) {
        listLeader = snapshot.child("리더리스트").val();
        console.log(listLeader)
        document.getElementById("list-leader").innerHTML = listLeader
    })
}
function updateMemberList() {
    ref = firebase.database().ref().child("벧엘청년부멤버리스트");
    ref.on('value', function (snapshot) {
        listLeader = snapshot.child("멤버리스트").val();
        document.getElementById("list-member").innerHTML = listLeader
    })
}
function dom(){
    /*ref = firebase.database().ref().child("벧엘청년부멤버리스트");

    ref.on('value', function (snapshot) {
        listLeader = snapshot.child("리더리스트").val();
        document.getElementById("list-leader").innerHTML = listLeader
    })*/}