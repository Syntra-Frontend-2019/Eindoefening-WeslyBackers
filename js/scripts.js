/* 
    Created on : 20-mrt-2019, 14:34:03
    Author     : backerwe
*/


/*uitvoeren van functie 'mndrtndr' bij load body */

document.getElementById("body").onload = function() {mndrtndr();};

/*uitvoeren van functie 'setMonthActive' bij aanpassen van het jaartal */
document.getElementById("year").onchange = function() {setMonthActive();};

/*uitvoeren van functie 'setdayList' bij aanpassen van het maand */
document.getElementById("month").onchange = function() {setdayList();};

document.getElementById("addTinder").onclick = function(){addTinder();};

/* globale declaraties */

var minyear;
var maxyear;
var monthIndex;
var year;
var schrikkeljaar = false;
var fieldsFilled = false;
var days;

var setYear = document.querySelector("#year");
var monthField = document.querySelector("#month");
var daylist = document.querySelector("#day");
var getName = document.querySelector("#nameInput");
var selectedGender;
var genderFields = document.getElementsByName("genders");

/* hoofd-functie mndrtndr */

function mndrtndr(){

    months();
    minmaxYear();

}

/* aanvullen van months in lijst */

function months(){

    var months =  ["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"];
    
    var selectlist = document.querySelector("#month");

    for (var x=0; x < months.length; x++){
        addmonth = months[x];
        var new_option = document.createElement("option");
        var content = document.createTextNode(addmonth);
        new_option.appendChild(content);
        selectlist.appendChild(new_option);
    }
}

/* bepalen van het geboortejaar van de minimum leeftijd(18 jaar) voor het toestaan op deze site */

function minmaxYear(){
    var date = new Date();
    minyear =(date.getFullYear() - 100);
    maxyear =(date.getFullYear() - 18);
   // alert(minyear);
   
    setYear.setAttribute("min", minyear);
    setYear.setAttribute("max", maxyear);
    
    
}

/* activeren van de maandlijst na het aanpassen van het jaar */

function setMonthActive(){
    monthField.disabled = false;
    daylist.value = '';
    if (monthField.selectedIndex > 0){
        setdayList();
    }
}


/* instellen van het aantal dagen op basis van maand en (schrikkel-)jaar */

function setdayList(){
    
    
    daylist.value = ''; /* dag op "waardeloos" veld zetten */
    var year = setYear.value;
    monthIndex = monthField.selectedIndex;
      
    schrikkeljaar = getIfLeap(year);
    
    //alert(schrikkeljaar);
    
    if (schrikkeljaar === true){
        days = daysLeapYear(monthIndex);
        }
        else {
            days = daysNormalYear(monthIndex);
        }
     
    daylist.setAttribute("min", 1);
    daylist.setAttribute("max", parseInt(days));
    daylist.disabled = false;
}

/* bereken of schrikkeljaar en geef terug aan setDayList() */

function getIfLeap(year){
    
  if ((year % 4) === 0){
      
      schrikkeljaar = true;
      
      if ((year % 100 ) === 0){
         
            schrikkeljaar = false; 
         
          if((year % 400) === 0){
          
            schrikkeljaar = true;
      }
  }
}
else{
    schrikkeljaar = false;
}
    return schrikkeljaar;
}

function daysLeapYear(monthIndex){
    
    if (monthIndex === 2){
        days = 29;
        }
    else {
                
        if (monthIndex <= 7){
                        
        
        if ((monthIndex % 2) === 1){
            days = 31;
        }
        else{
             days = 30;      
            }
          }
          
        else {
            if (monthIndex > 7){
                        
        
            if ((monthIndex % 2) === 1){
            days = 30;
                }
            else{
                  days = 31;      
             }
            }           
            
        }
          
    }
  return days;
}

function daysNormalYear(monthIndex){
    if (monthIndex === 2){
        days = 28;
    }
    else {
              
        if (monthIndex <= 7){
                        
        
         if ((monthIndex % 2) === 1){
            days = 31;
        }
        else{
             days = 30;      
            }
          }
          
        else {
            if (monthIndex > 7){
                        
        
            if ((monthIndex % 2) === 1){
            days = 30;
                }
            else{
                  days = 31;      
             }
            }           
        }          
    }
  return days;
}


/* Gender-selectie */
function getGender(){
   
    var gender = "";
    
    for (x = 0; x < genderFields.length; x++){
        
        if (genderFields[x].checked){
            gender = genderFields[x].value;
        }
    }
    return gender;
}

/*convert to 2-digit number for date-format xx/mm/yyyy */
function twoDigits(number){
    
    if(number < 10){
        number = "0"+number.toString();
    }
    return number;
}

function checkFields(selectedName,selectedDay,selectedMonth,selectedYear,selectedGender){
    
    var fieldsFilled = "false";
    if (selectedName !== ""){
        if (selectedDay > 0 && selectedDay <= days){
            if (selectedMonth > 0){
                if ((selectedYear >= minyear) && (selectedYear <= maxyear)){
                    if (selectedGender !== ""){
                        fieldsFilled = true;
                    }
                }
            }
        }
    }
    return fieldsFilled;
}

/* AANPASSEN */
function addTinder(){
    
 
    var selectedName = getName.value;
    /*convert to 2-digit number for date-format xx/mm/yyyy */
    var selectedDay = twoDigits(daylist.value);
    
    /*convert to 2-digit number for date-format xx/mm/yyyy */
    var selectedMonth = twoDigits(monthField.selectedIndex);
    
    var selectedYear = setYear.value;
    var selectGender = getGender();

    //alert(selectedName+","+selectedDay+"/"+selectedMonth+"/"+selectedYear+"-"+selectGender);

    fieldsFilled = checkFields(selectedName,selectedDay,selectedMonth,selectedYear,selectedGender); 
    
    
    if (fieldsFilled === true){
    
    /* create elemenents for new mndrtndr */
    var newtinder = document.createElement("div");
    var namepart = document.createElement("h3");
    var birthpart = document.createElement("p");
    
    /* combine fields to content */
    var name = document.createTextNode(selectedName);         
    var birth = document.createTextNode(selectedDay+"/"+selectedMonth+"/"+selectedYear);
    
    namepart.appendChild(name);
    birthpart.appendChild(birth);
    newtinder.appendChild(namepart);
    newtinder.appendChild(birthpart);
    document.getElementById("tinders").appendChild(newtinder);
    newtinder.setAttribute("class",selectGender);
    }
    
    else{
        
        alert("fill in all fields correctly");
    }
}