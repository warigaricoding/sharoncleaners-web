//ToDo
//CHECKED make calendar be more functionable, depending on businessowner's preference
//make payment gateway
//make visuals more appealing
//CHECKED make registration checks work
//CHECKED add more items for delivery and message, and custom item
window.Swal = swal;

var emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
passwordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
//Register
function signup() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zipcode = document.getElementById("zipcode").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (phoneNumber.length > 10) {
        swal({
            icon: 'error',
            title: 'Error',
            text: "Please make sure the phone number is 10 digits"
        })
        return;
    }
    else if (phoneNumber.length < 10) {
        swal({
            icon: 'error',
            title: 'Error',
            text: "Please make sure the phone number is 10 digits"
        })
        return;
    }
    else if (confirmPassword != password) {
        swal({
            icon: 'error',
            title: 'Error',
            text: "Confirm password must match password"
        })
    }
    //with below, firebase also checks email and password format
    firebase.auth().createUserWithEmailAndPassword(email, password).then((success) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        }
        var ref = firebase.database().ref();
        var userData = {
            FirstName: firstName,
            LastName: lastName,
            PhoneNumber: phoneNumber,
            Email: email,
            Address: address,
            City: city,
            State: state,
            Zipcode: zipcode,
        }
        ref.child("user").child(uid).set(userData);
        swal('Account Created', 'Account created successfully').then((value) => {
            setTimeout(function () {
                window.location.replace("index.html");
            }, 1000)
        });
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        swal({
            icon: 'error',
            title: 'Error',
            text: "Error. Email needs to have email@email.com format" +
                "\n" + "password must be required, with at least 6 characters," +
                "\n" + "and password must match with confirm password",
        })
    });

}
//makes phonenumber input be only numbers
function isInputNumber(evt) {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(ch))) {
        evt.preventDefault();
    }
}

function checkLoginEmail() {
    var loginEmail = document.getElementById("email").value;
    var loginEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var check;

    if (loginEmail.value.match(loginEmailFormat)) {
        check = false;
    } else {
        check = true;
    }
    if (check = true) {
        document.getElementById("loginEmailError").style.display = "block";
    } else {
        document.getElementById("loginEmailError").style.display = "none";
    }

}

function checkLoginPassword() {
    var loginPassword = document.getElementById("password").value;
    var loginPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var check = false;
    if (loginPassword.value.match(loginPasswordFormat)) {
        check = true;
    } else {
        check = false;
    }
    if (check = false) {
        document.getElementById("loginPasswordError").style.display = "block";
        document.getElementById("loginPasswordError").style.display = "none";

    }
}

//when login button is clicked  
var fname;
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email == "admin@sharoncleaners.com") {
        firebase.auth().signInWithEmailAndPassword(email, password)
        window.location.replace("admin-console.html");
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password).then((success) => {

            swal({
                icon: 'success',
                title: 'Succesfully signed in',
            }).then((value) => {
                setTimeout(function () {
                    ref = firebase.database().ref().child("user").child(firebase.auth().currentUser.uid);
                    //good ref
                    ref.on('value', function (snapshot) {
                        fname = snapshot.child("FirstName").val();
                        document.getElementById("login").innerHTML = '<div id="logged-in">Welcome, ' + fname + ' <br>&nbsp   &nbsp <Button type="BUTTON" onclick="logout();">Logout</Button></div>';
                    })
                }, 1000)
            });

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                icon: 'error',
                title: 'Error',
                text: "Error, please check your inputs.",
            })
        });
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    }
}
function autologin() {
    setTimeout(function () {
        var user = firebase.auth().currentUser;
        if (user) {
            ref = firebase.database().ref().child("user").child(firebase.auth().currentUser.uid);
            //good ref
            ref.on('value', function (snapshot) {
                fname = snapshot.child("FirstName").val();
                document.getElementById("login").innerHTML = "Welcome, " + fname + '     <br>&nbsp   &nbsp   <Button type="BUTTON" id="button-gen"onclick="logout();">Logout</Button>';
            })
        }
    }, 500)
}


//After logging in or registering
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;


        /*    var uid;
              if(user != null){
                uid = user.uid;
               //checkpoint
               let uidKey = firebase.database().ref().child(uid);
               uidKey.on('value',(dataSnapShot)=> {
                   document.getElementById("welcomeMessage").innerHTML = "Welcome, " + dataSnapShot.val().FirstName;
               })
              }
          
            } else {
              // No user is signed in.
            }*/
    };
});

//counter functions
count1 = 0;
count2 = 0;
count3 = 0;
count4 = 0;
count5 = 0;
count6 = 0;
count7 = 0;
pickupDay = "";
function reset1() {
    count1 = 0;
    document.getElementById("count1").innerHTML = 0
}
function reset2() {
    count2 = 0;
    document.getElementById("count2").innerHTML = 0
}
function reset3() {
    count3 = 0;
    document.getElementById("count3").innerHTML = 0
}
function reset4() {
    count4 = 0;
    document.getElementById("count4").innerHTML = 0
}
function reset5() {
    count5 = 0;
    document.getElementById("count5").innerHTML = 0
}
function reset6() {
    count6 = 0;
    document.getElementById("count6").innerHTML = 0
}
function reset7() {
    count7 = 0;
    document.getElementById("count7").innerHTML = 0
}
function plus1() {
    count1 += 1;
    document.getElementById("count1").innerHTML = count1;
}
function plus2() {
    count2 += 1;
    document.getElementById("count2").innerHTML = count2;
}
function plus3() {
    count3 += 1;
    document.getElementById("count3").innerHTML = count3;
}
function plus4() {
    count4 += 1;
    document.getElementById("count4").innerHTML = count4;
}
function plus5() {
    count5 += 1;
    document.getElementById("count5").innerHTML = count5;
}
function plus6() {
    count6 += 1;
    document.getElementById("count6").innerHTML = count6;
}
function plus7() {
    count7 += 1;
    document.getElementById("count7").innerHTML = count7;
}
function minus1() {
    if (count1 > 0) {
        count1 -= 1;
        document.getElementById("count1").innerHTML = count1;
    } else {
    }
}
function minus2() {
    if (count2 > 0) {
        count2 -= 1;
        document.getElementById("count2").innerHTML = count2;
    } else {
    }
}
function minus3() {
    if (count3 > 0) {
        count3 -= 1;
        document.getElementById("count3").innerHTML = count3;
    } else {
    }
}
function minus4() {
    if (count4 > 0) {
        count4 -= 1;
        document.getElementById("count4").innerHTML = count4;
    } else {
    }
}
function minus5() {
    if (count5 > 0) {
        count5 -= 1;
        document.getElementById("count5").innerHTML = count5;
    } else {
    }
}
function minus6() {
    if (count6 > 0) {
        count6 -= 1;
        document.getElementById("count6").innerHTML = count6;
    } else {
    }
}
function minus7() {
    if (count7 > 0) {
        count7 -= 1;
        document.getElementById("count7").innerHTML = count7;
    } else {
    }
}

//submit delivery request
function submitDelivery() {
    var pdate = document.getElementById("datepickup").value;
    var rdate = document.getElementById("datereturn").value;


    if (count1.toString() == "0" && count2.toString() == "0" && count3.toString() == "0" && count4.toString() == "0" && count5.toString() == "0" && count6.toString() == "0" && count7.toString() == "0") {
        window.alert("We cannot receive a request of 0 clothes to dryclean!" + "\n" + "Please check your form")
    } else if (pdate == "1111-11-11") {
        window.alert("Please set Date in order to continue");
    } else if (rdate == "1111-11-11") {
        window.alert("Please set Date in order to continue");
    } else {
        submitLaundryBasket();
    }
}


//submit data to firebase
function submitLaundryBasket() {
    var datePickup = document.getElementById("datepickup").value;
    var dateReturn = document.getElementById("datereturn").value;
    //var nameOfCustom = document.getElementById("custom").value;
    var notes = document.getElementById("notes").value;
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }
    var ref = firebase.database().ref();
    var laundryBasket = {
        /*Shirts: count1,
        Pants: count2,
        Blouse: count3,
        Suits: count4,
        Shoes: count5,
        Comforters: count6,
        Custom: count7,
        CustomsName: nameOfCustom*/
        PickupDate: datePickup,
        ReturnDate: dateReturn,
        Notes: notes,
        ItemCount: count1
    }
    ref.child("user").child(uid).child("Delivery").push().set(laundryBasket);
    swal('Delivery Request Received', 'Your Submission was received').then((value) => {
        setTimeout(function () {
            notifySingleDelivery();
            window.location.replace("delivery-confirm.html");
        }, 1000)
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
function notifySingleDelivery() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    ref = firebase.database().ref().child("user").child(firebase.auth().currentUser.uid);
    //good ref
    ref.on('value', function (snapshot) {
        console.log("hi")
        firstNameN = snapshot.child("FirstName").val();
        emailN = snapshot.child("Email").val();
        phoneNumberN = snapshot.child("PhoneNumber").val();
        addressN = snapshot.child("Address").val();
        cityN = snapshot.child("City").val();
        stateN = snapshot.child("State").val();
        lastNameN = snapshot.child("LastName").val();
        zipcodeN = snapshot.child("Zipcode").val();
        console.log(zipcodeN)
        newRef = firebase.database().ref()
        console.log(newRef)
        var notification = {

            RequestDate: today,
            FirstName: firstNameN,
            State: stateN,
            LastName: lastNameN,
            PhoneNumber: phoneNumberN,
            Email: emailN,
            Address: addressN,
            City: cityN,
            Zipcode: zipcodeN,
            Type: "Single Delivery"
        }
        newRef.child("DeliveryRequests").push().set(notification);
    })
}
function notifyContinuousDelivery() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    ref = firebase.database().ref().child(firebase.auth().currentUser.uid);
    //good ref
    ref.on('value', function (snapshot) {
        emailN = snapshot.child("Email").val();
        phoneNumberN = snapshot.child("PhoneNumber").val();
        addressN = snapshot.child("Address").val();
        cityN = snapshot.child("City").val();
        lastNameN = snapshot.child("LastName").val();
        zipcodeN = snapshot.child("Zipcode").val();
        newRef = firebase.database().ref()
        var notification = {
            LastName: lastNameN,
            PhoneNumber: phoneNumberN,
            Email: emailN,
            Address: addressN,
            City: cityN,
            Zipcode: zipcodeN,
            Type: "Continuous Delivery"
        }
        newRef.child("DeliveryRequests").child(today).push(notification);
    })
}










//retrieving delivery data
//going to need 2d 3x? table
var eventListnerChecker = document.getElementById("clickToCheck");
//remember, if I don't do the below, eventlistener checks all pages
if (eventListnerChecker) {
    eventListnerChecker.addEventListener("click", checkDeliveryRequests);
}
//check delivery requests
function checkDeliveryRequests(e) {
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }
    var ref = firebase.database().ref().child(uid).child("Delivery");

    ref.on("value", function (snapshot) {
        //console.log(snapshot.val());

    })
    ref.once("value", gotData, errData);
    e.target.removeEventListener(e.type, arguments.callee);

}
//going to display data as table
//first, get data as arraylists
//next, make a 2d arraylist made up of those arraylists
//transpose that arraylist
//push keys: date shirts pants blouse suits coats shoes comforters as A[0]
//generate table
//voala! Could do it by snapshot but wanted this because i wanted to keep table format without messing up the tables with headers
var pickupDayList = [];
var shirtsList = [];
var pantsList = [];
var blouseList = [];
var suitsList = [];
var shoesList = [];
var comfortersList = [];
var customList = [];
var itemCountList = [];
var returnDayList = [];
var multiList = [];
var transposedList;
function gotData(data) {
    var Delivery = data.val();
    //keys to the Delivery Details, array size of number of deliveries 
    var keys = Object.keys(Delivery);
    //get arraylists
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i]
        var pickupDay = Delivery[k].PickupDate
        var returnDay = Delivery[k].ReturnDate
        var itemCount = Delivery[k].ItemCount
        //var shirts = Delivery[k].Shirts
        //var pants = Delivery[k].Pants
        // var blouse = Delivery[k].Blouse
        //var suits = Delivery[k].Suits
        //var shoes = Delivery[k].Shoes
        // var comforters = Delivery[k].Comforters
        // var custom = Delivery[k].Custom
        pickupDayList.push(pickupDay);
        itemCountList.push(itemCount);
        returnDayList.push(returnDay);
        //shirtsList.push(shirts);
        //pantsList.push(pants);
        //blouseList.push(blouse);
        //suitsList.push(suits);
        //shoesList.push(shoes);
        // comfortersList.push(comforters);
        // customList.push(custom);
    }

    //make the 2d list
    multiList[0] = pickupDayList;
    multiList[1] = returnDayList;
    multiList[2] = itemCountList;
    /*multiList[1] = shirtsList;
    multiList[2] = pantsList;
    multiList[3] = blouseList;
    multiList[4] = suitsList;
    multiList[5] = shoesList;
    multiList[6] = comfortersList;
    multiList[7] = customList;*/
    //transpose 2d list
    var multiListLength = multiList[0].length;
    transposeList(multiList, multiListLength);
    //console.log(transposedList);
    addKeyVars();
    //let table = document.querySelector("table");
    generateTable();
    //console.log(transposedList);
    adddButton();
}
function transposeList(array, arrayLength) {
    var tempTransposedList = [];
    for (var i = 0; i < array[0].length; i++) {
        //if array.length, transpose automatically becomes square, and creates empty lists or breaks. 
        tempTransposedList.push([]);
    };
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < arrayLength; j++) {
            tempTransposedList[j].push(array[i][j]);
        };
    };
    //console.log(tempTransposedList);
    transposedList = tempTransposedList;
    return transposedList;
    //TIL returned cannot be called or used. this is why I should do projects
}
function addKeyVars() {
    var keysList = ["Request Date", "Return Date", "Item Count"/*"Shirts", "Pants", "Blouse", "Suits", "Shoes", "Comforters", "Custom"*/];
    //after, change this to snapshot and then keys or forloop keys
    list = transposedList.unshift(keysList);
    return list;
    //console.log(list);
}
//generate table
function generateTable() {
    //console.log(transposedList);
    tablehere = document.getElementById("tablehere");

    tHB = "";
    for (var i = 0; i < transposedList.length; i++) {
        tHB += '<tr ' + 'id="row' + i.toString() + '">'
        for (var j = 0; j < transposedList[i].length; j++) {
            //tablehere.innerHTML += '<td>' + transposedList[i][j] + '</td>';
            tHB += '<td>' + transposedList[i][j].toString() + '</td>'
        } tHB += '</tr>';

    }
    var table = tablehere.innerHTML = tHB;
    //console.log(table)
    return table;
}
function adddButton() {
    var row0 = document.getElementById("row0");
    var x = row0.insertCell(-1);
    x.innerHTML = " ";
    for (i = 1; i < transposedList.length; i++) {
        var row = document.getElementById("row" + i);
        y = row.insertCell(-1);
        y.innerHTML = '<button id= "dButton' + i + '" onclick="dRow(' + i + ')">Delete</button>';
        //console.log(y);
    }
    //var key = Object.keys(snapshot.val())[0];

}

function dRow(i) {
    console.log(i)
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }
    var ref = firebase.database().ref().child(uid).child("Delivery");

    ref.once("value", function (snapshot) {
        console.log(snapshot.val());
        var keyDeleted = Object.keys(snapshot.val())[i - 1]
        console.log(Object.keys(snapshot.val())[i - 1])
        ref.child(keyDeleted).remove();
        swal('Request Deleted', 'Your delivery request has been deleted').then((value) => {
            setTimeout(function () {
                window.location.replace("checkdelivery.html");
            }, 500)
        })
    })
}







//retriving customer info
var dAddress, dCity, dDelivery, dEmail, dFirstName, dLastName, dPhoneNumber, dState, dZipcode
function getUserInfo() {
    var user = firebase.auth().currentUser;
    var uid;
    var userInfo = [];
    if (user != null) {
        uid = user.uid;
    }
    var ref = firebase.database().ref().child(firebase.auth().currentUser.uid);
    ref.on('value', function (snapshot) {
        var dFirstName = snapshot.child("FirstName").val();
        var dLastName = snapshot.child("LastName").val();
        var dPhoneNumber = snapshot.child("PhoneNumber").val();
        var dEmail = snapshot.child("Email").val();
        var dAddress = snapshot.child("Address").val();
        var dCity = snapshot.child("City").val();
        var dState = snapshot.child("State").val();
        var dZipcode = snapshot.child("Zipcode").val();
        document.getElementById("displayhere1").innerHTML = dFirstName
        document.getElementById("displayhere2").innerHTML = dLastName
        document.getElementById("displayhere3").innerHTML = dPhoneNumber
        document.getElementById("displayhere4").innerHTML = dEmail
        document.getElementById("displayhere5").innerHTML = dAddress
        document.getElementById("displayhere6").innerHTML = dCity
        document.getElementById("displayhere7").innerHTML = dState
        document.getElementById("displayhere8").innerHTML = dZipcode
    })
}
function errData(data) {
    console.log("error");
}




//next updates firebase
function updateAndNext() {
    if (!(document.getElementById("checkbox1").checked)) {
        swal('Error', 'Please click the checkbox to confirm your review')
    } else {
        dFirstName = document.getElementById("displayhere1").innerHTML
        dLastName = document.getElementById("displayhere2").innerHTML
        dPhoneNumber = document.getElementById("displayhere3").innerHTML
        dEmail = document.getElementById("displayhere4").innerHTML
        dAddress = document.getElementById("displayhere5").innerHTML
        dCity = document.getElementById("displayhere6").innerHTML
        dState = document.getElementById("displayhere7").innerHTML
        dZipcode = document.getElementById("displayhere8").innerHTML
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        }
        var ref = firebase.database().ref().child(uid);
        ref.update({
            FirstName: dFirstName, LastName: dLastName, PhoneNumber: dPhoneNumber,
            Email: dEmail, Address: dAddress, City: dCity, State: dState, Zipcode: dZipcode
        });
        notifyContinuousDelivery();
        window.location.replace("delivery-confirm.html");

    }
}









//adds payment info to firebase
function updatePaymentInfoAndNext() {
    cardNumber = document.getElementById("cardnumber").innerHTML
    cardName = document.getElementById("cardname").innerHTML
    cardMonth = document.getElementById("cardmonth").innerHTML
    cardYear = document.getElementById("cardyear").innerHTML
    var user = firebase.auth().currentUser;
    var uid;
    var userInfo = [];
    if (user != null) {
        uid = user.uid;
    }
    if (cardMonth === "") {
        swal('Please fill out all the information before continuing')
    }
    if (cardName === "") {
        swal('Please fill out all the information before continuing')
    }
    if (cardYear === "") {
        swal('Please fill out all the information before continuing')
    }
    if (cardNumber === "") {
        swal('Please fill out all the information before continuing')
    }
    var ref = firebase.database().ref().child(uid);
    var cardData = {
        CardNumber: cardNumber,
        CardName: cardName,
        CardMonth: cardMonth,
        CardYear: cardYear
    }
    ref.child("CardInfo").push().set(cardData);
    swal('Card Info Received', 'Your payment method has been updated').then((value) => {
        setTimeout(function () {
            window.location.replace("continuousdelivery3.html");
        }, 1000)
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


//submit message to drycleaners
function submitMessage() {
    var message = document.getElementById("message").value;
    var name = document.getElementById("name").value;
    window.open('mailto:scdcwj@gmail.com?subject=CustomerMessage&body=  From: ' + name + ". Message: " + message);
    window.location.replace("index.html");
}














//navigations
function goToRegister() {
    window.location.href = "register.html";
}
function backToLogin() {
    window.location.href = "index.html";
}
function toDelivery() {
    var user = firebase.auth().currentUser;
    if (user != null) {
        window.location.href = "deliverypage.html";
    }
    else {
        window.alert("Please Login Before Making a Delivery")
    }
}
function toContinuousDelivery() {
    var user = firebase.auth().currentUser;
    if (user != null) {
        window.location.href = "continuousdelivery.html";
    }
    else {
        window.alert("Please Login Before Signing Up For a Continuous Delivery")
    }
}

function goToMain() {
    window.location.href = "main.html";
}
function goToContactPage() {
    window.location.href = "contactpage.html"
}
function logout() {
    firebase.auth().signOut();
    window.location.href = "index.html";
}
function goToDeliveryPage() {
    window.location.href = "checkdelivery.html";
}


/*function welcome() {

    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }
    ref = firebase.database().ref().child(firebase.auth().currentUser.uid);
    //good ref
    ref.on('value',function (snapshot) {
        var fname = snapshot.child("FirstName").val();
        document.getElementById("welcomeMessage").innerHTML = "Welcome, " + fname;

    })


}*/


/////////////////////////////////////
//admin backend
/////////////////////////////////////

function loadUserInfo() {
    setTimeout(function () {

        functionx();

        //check delivery requests
        function functionx(e) {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var ref = firebase.database().ref().child("user");
            ref.on("value", function (snapshot) {
            })
            ref.once("value", gotUserInfoData, errData);
        }
    }, 500)

}

var firstNameList = [];
var lastNameList = [];
var emailList = [];
var phoneNumberList = [];
var addressList = [];
var cityList = [];
var stateList = [];
var zipcodeList = [];
var multiList = [];
var transposedList;
function gotUserInfoData(data) {
    var userInfo = data.val();
    //keys to the Delivery Details, array size of number of deliveries 
    var keys = Object.keys(userInfo);
    //get arraylists
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i]
        var firstName = userInfo[k].FirstName
        var lastName = userInfo[k].LastName
        var email = userInfo[k].Email
        var phoneNumber = userInfo[k].PhoneNumber
        var address = userInfo[k].Address
        var city = userInfo[k].City
        var state = userInfo[k].State
        var zipcode = userInfo[k].Zipcode
        firstNameList.push(firstName);
        lastNameList.push(lastName);
        emailList.push(email);
        phoneNumberList.push(phoneNumber);
        addressList.push(address);
        cityList.push(city);
        stateList.push(state);
        zipcodeList.push(zipcode);
    }

    //make the 2d list
    multiList[0] = firstNameList;
    multiList[1] = lastNameList;
    multiList[2] = emailList;
    multiList[3] = phoneNumberList;
    multiList[4] = addressList;
    multiList[5] = cityList;
    multiList[6] = stateList;
    multiList[7] = zipcodeList;
    //transpose 2d list
    var multiListLength = multiList[0].length;
    transposeList(multiList, multiListLength);
    //console.log(transposedList);
    addKeyVars();
    //let table = document.querySelector("table");
    generateTable();
    //console.log(transposedList);
    adddButton();
}
function transposeList(array, arrayLength) {
    var tempTransposedList = [];
    for (var i = 0; i < array[0].length; i++) {
        //if array.length, transpose automatically becomes square, and creates empty lists or breaks. 
        tempTransposedList.push([]);
    };
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < arrayLength; j++) {
            tempTransposedList[j].push(array[i][j]);
        };
    };
    //console.log(tempTransposedList);
    transposedList = tempTransposedList;
    return transposedList;
    //TIL returned cannot be called or used. this is why I should do projects
}
function addKeyVars() {

    var keysList = ["First Name", "Last Name", "Email", "Phone Number", "&nbsp&nbsp&nbsp&nbspAddress&nbsp&nbsp&nbsp&nbsp", "City", "State", "Zipcode"];
    //after, change this to snapshot and then keys or forloop keys
    list = transposedList.unshift(keysList);
    return list;
    //console.log(list);
}
//generate table
function generateTable() {
    //console.log(transposedList);
    tablehere = document.getElementById("tablehere");

    tHB = "";
    for (var i = 0; i < transposedList.length; i++) {
        tHB += '<tr ' + 'id="row' + i.toString() + '">'
        for (var j = 0; j < transposedList[i].length; j++) {
            //tablehere.innerHTML += '<td>' + transposedList[i][j] + '</td>';
            tHB += '<td' + ' id="column-gen">' + transposedList[i][j].toString() + '</td>'
        } tHB += '</tr>';

    }
    var table = tablehere.innerHTML = tHB;
    //console.log(table)
    return table;
}
function adddButton() {
    var row0 = document.getElementById("row0");
    var x = row0.insertCell(-1);
    x.innerHTML = " ";
    for (i = 1; i < transposedList.length; i++) {
        var row = document.getElementById("row" + i);
        y = row.insertCell(-1);
        y.innerHTML = '<button id= "dButton' + i + '" onclick="dRow(' + i + ')">Delete</button>';
        //console.log(y);
    }
    //var key = Object.keys(snapshot.val())[0];

}

function dRow(i) {
    console.log(i)
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }
    var ref = firebase.database().ref().child("user");

    ref.once("value", function (snapshot) {
        console.log(snapshot.val());
        var keyDeleted = Object.keys(snapshot.val())[i - 1]
        console.log(Object.keys(snapshot.val())[i - 1])
        ref.child(keyDeleted).remove();
        swal('Request Deleted', 'Account info deleted').then((value) => {
            setTimeout(function () {
                window.location.replace("admin-console.html");
            }, 500)
        })
    })
}








var dRDateList = [];
function loadDeliveryRequests() {
    setTimeout(function () {

        functionx();

        //check delivery requests
        function functionx(e) {

            /* 
             var ref = firebase.database().ref().child("DeliveryRequests");
             ref.on("value", function (snapshot) {
             })
             ref.once("value", gotData, errData);
             */
            ref = firebase.database().ref().child("DeliveryRequests");
            ref.on("value", function (snapshot) {
            })
            ref.once("value", gotDeliveryRequestData, errData);

        }
    }, 500)

}


var dRFirstNameList = [];
var dRLastNameList = [];
var dREmailList = [];
var dRPhoneNumberList = [];
var dRAddressList = [];
var dRCityList = [];
var dRStateList = [];
var dRZipcodeList = [];
var dRMultiList = [];
var dRTransposedList;
function gotDeliveryRequestData(data) {
    
    var deliveryRequest = data.val();
    //keys to the Delivery Details, array size of number of deliveries
    var keys = Object.keys(deliveryRequest);
    //get arraylists
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i]
        var requestDate = deliveryRequest[k].RequestDate
        var firstName = deliveryRequest[k].FirstName
        var lastName = deliveryRequest[k].LastName
        var email = deliveryRequest[k].Email
        var phoneNumber = deliveryRequest[k].PhoneNumber
        var address = deliveryRequest[k].Address
        var city = deliveryRequest[k].City
        var state = deliveryRequest[k].State
        var zipcode = deliveryRequest[k].Zipcode
        dRDateList.push(requestDate);
        dRFirstNameList.push(firstName);
        dRLastNameList.push(lastName);
        dREmailList.push(email);
        dRPhoneNumberList.push(phoneNumber);
        dRAddressList.push(address);
        dRCityList.push(city);
        dRStateList.push(state);
        dRZipcodeList.push(zipcode);
        //here i learned that forloop can call other functions with their [i]'s
    }
 
    multiList = [];
    //make the 2d list
    multiList[0] = dRDateList;
    multiList[1] = dRFirstNameList;
    multiList[2] = dRLastNameList;
    multiList[3] = dREmailList;
    multiList[4] = dRPhoneNumberList;
    multiList[5] = dRAddressList;
    multiList[6] = dRCityList;
    multiList[7] = dRStateList;
    multiList[8] = dRZipcodeList;
    //transpose 2d list
    var multiListLength = multiList[0].length;
    dRTransposeList(multiList, multiListLength);
    //console.log(transposedList);
    dRAddKeyVars();
    //let table = document.querySelector("table");
    dRGenerateTable();
    //console.log(transposedList);
    dRAdddButton();
}

function dRTransposeList(array, arrayLength) {
    var tempTransposedList = [];
    for (var i = 0; i < array[0].length; i++) {
        //if array.length, transpose automatically becomes square, and creates empty lists or breaks.
        tempTransposedList.push([]);
    };
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < arrayLength; j++) {
            tempTransposedList[j].push(array[i][j]);
        };
    };
    //console.log(tempTransposedList);
    dRTransposedList = tempTransposedList;
    console.log(dRTransposedList)
    return dRTransposedList;
    //TIL returned cannot be called or used. this is why I should do projects
}
function dRAddKeyVars() {

    var keysList = ["Date", "First Name", "Last Name", "Email", "Phone Number", "&nbsp&nbsp&nbsp&nbspAddress&nbsp&nbsp&nbsp&nbsp", "City", "State", "Zipcode"];
    //after, change this to snapshot and then keys or forloop keys
    list = dRTransposedList.unshift(keysList);
    return list;
    //console.log(list);
}
//generate table
function dRGenerateTable() {
    //console.log(transposedList);
    tablehere1 = document.getElementById("tablehere1");

    tHB = "";
    for (var k = 0; k < dRTransposedList.length; k++) {
        tHB += '<tr ' + 'id="dRRow' + k.toString() + '">'
        for (var l = 0; l < dRTransposedList[k].length; l++) {
            //tablehere.innerHTML += '<td>' + transposedList[i][j] + '</td>';
            tHB += '<td' + ' id="column-gen">' + dRTransposedList[k][l] + '</td>'
        } tHB += '</tr>';

    }
    var table = tablehere1.innerHTML = tHB;
    //console.log(table)
    return table;
}
function dRAdddButton() {
    var dRRow0 = document.getElementById("dRRow0");
    var x = dRRow0.insertCell(-1);
    x.innerHTML = " ";
    for (var i = 1; i < dRTransposedList.length; i++) {
        var dRRow = document.getElementById("dRRow" + i);
        y = dRRow.insertCell(-1);
        y.innerHTML = '<button id= "button-email1-' + i + '" onclick="sendReceivedEmail(' + i + ')">Received</button> <button id= "button-email2-' + i + '" onclick="sendFinishedEmail(' + i + ')">Finished</button> <button id= "button-email3-' + i + '" onclick="sendMiscEmail(' + i + ')">Misc</button> <button id= "dRdButton' + i + '" onclick="dRdRow(' + i + ')">Delete</button>';
        //console.log(y);
    }
    //var key = Object.keys(snapshot.val())[0];

}

function dRdRow(i) {
    console.log(i)
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }
    ref = firebase.database().ref().child("DeliveryRequests");
    //good ref

    ref.once("value", function (snapshot) {
        var keyDeleted = Object.keys(snapshot.val())[i - 1]
        ref.child(keyDeleted).remove();
        swal('Request Deleted', 'delivery request has been deleted').then((value) => {
            setTimeout(function () {
                window.location.replace("admin-console.html");
            }, 500)
        })
    })
}

function sendReceivedEmail(i){
    ref = firebase.database().ref().child("DeliveryRequests");
    ref.once("value", function (snapshot) {
        var requestKey = Object.keys(snapshot.val())[i - 1]
        newRef = firebase.database().ref().child("DeliveryRequests").child(requestKey);
        newRef.on("value", function (sSnapshot) {
            sREmail = sSnapshot.child("Email").val();
            sendMail1(sREmail)
        })

    })
}
function sendFinishedEmail(i){
    ref = firebase.database().ref().child("DeliveryRequests");
    ref.once("value", function (snapshot) {
        var requestKey = Object.keys(snapshot.val())[i - 1]
        newRef = firebase.database().ref().child("DeliveryRequests").child(requestKey);
        newRef.on("value", function (sSnapshot) {
            sFEmail = sSnapshot.child("Email").val();
            sendMail2(sFEmail)
        })

    })
}
function sendMiscEmail(i){
    ref = firebase.database().ref().child("DeliveryRequests");
    ref.once("value", function (snapshot) {
        var requestKey = Object.keys(snapshot.val())[i - 1]
        newRef = firebase.database().ref().child("DeliveryRequests").child(requestKey);
        newRef.on("value", function (sSnapshot) {
            sMEmail = sSnapshot.child("Email").val();
            sendMail3(sMEmail)
        })

    })
}
function sendMail1(sREmail) {
    window.open('mailto:' + sREmail + '?subject=Your Clothes Were Received&body=Your clothes were received, and we will let you know when the clothes are ready. Thank you for using our drycleaning service! ');
}
function sendMail2(sFEmail) {
    window.open('mailto:' + sFEmail + '?subject=Your Clothes Are Ready&body= Your Clothes Were Received&body=Your clothes have been washed, and we will deliver them to you promptly. Thank you for using our drycleaning service!  ');
}
function sendMail3(sMEmail) {
    window.open('mailto:' + sMEmail + '?subject=Empty&body=  Empty');
}
