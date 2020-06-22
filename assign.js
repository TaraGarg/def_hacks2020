var userNames = [];
var userTimes = [];
var userValues = [];
var userChores = [];

var daySections = [];
var morningChores = [];
var afternoonChores = [];
var eveningChores = [];
var midnightChores = [];

var userNamesSorted = [];
var userTimesSorted = [];
var userValuesSorted = [];
var choresAssigned = [];

var e="y";
var l=0;

q=0;
var choreNames = [];
var timeSlot = [];

while (e==="y") {
  userNames [l] = prompt ("enter the name of the family member");
  console.log (userNames [l]);
  var timeInput = prompt("enter the time the member is free(morning/afternoon/evening/midnight) with commas")
  userTimes [l] = timeInput.split (",");
  userValues [l] = userTimes.length;
  console.log (userTimes [l]);
  e = prompt("do you want to add another member y/n")
  l++;
}

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByClassName("any");
var i;
for (i = 0; i < myNodelist.length; i++) {
var span = document.createElement("SPAN");
var txt = document.createTextNode("\u00D7");
span.className = "close";
span.appendChild(txt);
myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
close[i].onclick = function() {
 var div = this.parentElement;
 div.style.display = "none";
}
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('#myUL');
list.addEventListener('click', function(ev) {
if (ev.target.tagName === 'LI') {
 ev.target.classList.toggle('checked');
}
}, false);





// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
   alert("You must write something!");
  } else {
   document.getElementById("myUL").appendChild(li);
  }

  if (inputValue !== "") {
    choreNames [q]= inputValue;   //or you can directly call li
    timeSlot [q] = prompt("enter one time at which the task be completed(morning/afternoon/evening/midnight)");
    q++;
  }
  document.getElementById("myInput").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  li.className="any";
  for (i = 0; i < close.length; i++) {
   close[i].onclick = function() {
     var div = this.parentElement;
     div.style.display = "none";
     }
  }
}

function checkCompatible (ts, t) {
  for (var i = 0; i < ts.length; i++) {
    if (ts [i] == t) {
      return true;
    }
  }
  return false
}

function getNumCompatibleUsers (t) {
  var num = 0;
  for (var i = 0; i < userTimes.length; i++) {
    if (checkCompatible (userTimes[i], t)) {
      num += 1;
    }
  }
  return num;
}

var list2 = document.querySelector('#btn');
list2.addEventListener('click', function() {
    var output = [];
    assign ();
    for (var i = 0; i < userNamesSorted.length; i++) {
      console.log (choresAssigned [i]);
      output.push (String (userNamesSorted [i]) + ":" + choresAssigned [i].substring(10, choresAssigned [i].length)  + "               ");

    }
      document.write (output);
});

function assign(){

  for (var i = 0; i < choreNames.length; i++) {
    if (timeSlot [i] === "morning") {
      morningChores.push (choreNames [i]);
    } else if (timeSlot [i] === "afternoon") {
      afternoonChores.push (choreNames [i]);
    } else if (timeSlot [i] === "evening") {
      eveningChores.push (choreNames [i]);
    } else if (timeSlot [i] === "midnight") {
      midnightChores.push (choreNames [i]);
    }
  }

  for (var i = 0; i < userNames.length; i++) {
    if (userValues [i] === 1) {
      userNamesSorted.push (userNames [i]);
      userTimesSorted.push (userTimes [i]);
      userValuesSorted.push (userValues [i]);
    }
  }
  for (var i = 0; i < userNames.length; i++) {
    if (userValues [i] === 2) {
      userNamesSorted.push (userNames [i]);
      userTimesSorted.push (userTimes [i]);
      userValuesSorted.push (userValues [i]);
    }
  }
  for (var i = 0; i < userNames.length; i++) {
    if (userValues [i] === 3) {
      userNamesSorted.push (userNames [i]);
      userTimesSorted.push (userTimes [i]);
      userValuesSorted.push (userValues [i]);
    }
  }
  for (var i = 0; i < userNames.length; i++) {
    if (userValues [i] === 4) {
      userNamesSorted.push (userNames [i]);
      userTimesSorted.push (userTimes [i]);
      userValuesSorted.push (userValues [i]);
    }
  }

  var x = getNumCompatibleUsers ("morning");
  var y = getNumCompatibleUsers ("afternoon");
  var z = getNumCompatibleUsers ("evening");
  var a = getNumCompatibleUsers ("midnight")
  var valuesSorted = [x, y, z, a];
  var sectionsSorted = [];

  valuesSorted.sort (function (a,b) {return a - b});
  for (var i = 0; i < 4; i++) {
    if (getNumCompatibleUsers ("morning") === valuesSorted [i] && !sectionsSorted.includes ("morning")) {
      daySections.push (morningChores);
      sectionsSorted.push ("morning");
    } else if (getNumCompatibleUsers ("afternoon") === valuesSorted [i] && !sectionsSorted.includes ("afternoon")) {
      daySections.push (afternoonChores);
      sectionsSorted.push ("afternoon");
    } else if (getNumCompatibleUsers ("evening") === valuesSorted [i] && !sectionsSorted.includes ("evening")) {
      daySections.push (eveningChores);
      sectionsSorted.push ("evening");
    } else if (getNumCompatibleUsers ("midnight") === valuesSorted [i] && !sectionsSorted.includes ("midnight")) {
      daySections.push (midnightChores);
      sectionsSorted.push ("midnight");
    }
  }
  console.log (userNamesSorted);
  console.log (sectionsSorted);
  console.log (daySections);

  for (var i = 0; i < 4; i++) {
    choresAssigned = assignUsersToChores (daySections [i], sectionsSorted [i], choresAssigned);
    //console.log (choresAssigned);
  }

  for (var i = 0; i < userNames.length; i++) {
    console.log (userNames [i] + " chores: " + choresAssigned [i]);
  }
}

function clearValues () {
  userChores = [];

  daySections = [];
  morningChores = [];
  afternoonChores = [];
  eveningChores = [];
  midnightChores = [];

  userNamesSorted = [];
  userTimesSorted = [];
  userValuesSorted = [];
   choresAssigned = [];

}
function assignUsersToChores (section, n, c) {
  var userChoresArray = c;
  var leastNumber = 9999999;
  var index = 0;
  var deservingUserName = "";
  var dIndex = 0;

  for (var c = 0; c < section.length; c++) {
    for (var u = 0; u < userNamesSorted.length; u++) {
      if (checkCompatible (userTimesSorted [u], n) && getLength (userChoresArray[u]) < leastNumber) {
        deservingUserName = userNamesSorted [u];
        dIndex = u;
        leastNumber = arrayFromString (userChoresArray[u]).length;
      } else if (checkCompatible (userTimesSorted [u], n) && getLength (userChoresArray[u]) === leastNumber) {
        var flip = Math.random() >= 0.5;
        if (flip) {
          deservingUserName = userNamesSorted [u];
          dIndex = u;
        }
      }
      index += 1;
      if (index === userNamesSorted.length) {
        userChoresArray [dIndex] = String (userChoresArray [dIndex]).concat ("," + section [c]);

        dIndex = 0;
        index = 0;
        leastNumber = 9999999;
        deservingUserName = "";
      }
    }
  }
  return userChoresArray;
}

function getLength (a) {
  var l = 0;
  for (var z in arrayFromString (a)){
    l += 1;
  }
  return l;
}

function arrayFromString (a) {
  if (String (a).includes (",")) {
    return a.split (",");
  } else {
    return "";
  }
}
