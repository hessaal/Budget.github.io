var cal = document.getElementById('budget-btn');
var addexpense = document.getElementById("expense-btn");
var expense = document.getElementById("expense");
var budgetinput = document.getElementById("bn");
var balancespan = document.getElementById('balance');
var balance = 0 ;
var budget = 0;
var totalexpenes=0;
// var expenseId = 0 ;
// var expenses = new Array();



cal.addEventListener("click" , function(){
if (budgetinput.value <= 0){
document.getElementById("budgetErrormsg").classList.remove("invisable");
  }
else{
document.getElementById("budgetErrormsg").classList.add("invisable");
budget = Number(budgetinput.value);
balance = budget - totalexpenes;
document.getElementById("budgetspan").textContent = splitnum(budget);
balancespan.textContent = splitnum(balance);
balancecolor();
budgetinput.value = "";
window.location='#container';
}
});

addexpense.addEventListener("click" , function(){
if (expense.value <= 0 || document.getElementById("expenseTitle-text").value == ""){
  document.getElementById("expenseErrormsg").classList.remove("invisable");
}
else{
document.getElementById("expenseErrormsg").classList.add("invisable");
createExpense();
totalexpenes+=Number(expense.value);
balance = budget - totalexpenes ; 
document.getElementById("expensespan").textContent = splitnum(totalexpenes);
balancespan.textContent = splitnum(balance);
balancecolor();
expense.value = ""; 
document.getElementById("expenseTitle-text").value = "";
window.location='#container'; }
});

document.addEventListener('click',function(e){
    if(e.target && e.target.classList.contains("fa-edit")){
          expensetr =e.target.parentNode.parentNode.parentNode.parentNode;
          document.getElementById("expenseTitle-text").value = expensetr.childNodes[0].textContent.substr(2, expensetr.childNodes[0].textContent.length);
          document.getElementById("expense").value = Number(expensetr.childNodes[1].textContent.replace(/\s/g, ''));
          expensetr.remove();
          deleteexpense(expensetr.childNodes[1].textContent.replace(/\s/g, '')); 
        }
      if(e.target && e.target.classList.contains("fa-trash")){
         expensetr =e.target.parentNode.parentNode.parentNode.parentNode;
         expensetr.remove();
         deleteexpense(expensetr.childNodes[1].textContent.replace(/\s/g, ''));
        }
     
 });

function balancecolor() {
if (balance > 0){
  document.getElementById('balanceshow').classList.add("green");
  document.getElementById('balanceshow').classList.remove("red");
}
else if (balance< 0){
  document.getElementById('balanceshow').classList.remove("green");
  document.getElementById('balanceshow').classList.add("red");
}
else {
  document.getElementById('balanceshow').classList.remove("green");
  document.getElementById('balanceshow').classList.remove("red");
}}

function createExpense(){
  expensetr = document.createElement("tr");
  expensetitle = document.createElement("td");
  var textexpense = document.createTextNode("- " + document.getElementById("expenseTitle-text").value);
  expensetitle.style.textTransform = "capitalize";
  expensetitle.appendChild(textexpense);
  expensetr.appendChild(expensetitle);
  expensevalue = document.createElement("td");
  var valueexpense = document.createTextNode(splitnum(document.getElementById("expense").value));
  expensevalue.appendChild(valueexpense);
  expensetr.appendChild(expensevalue);
  expensecontrolsbox = document.createElement("td");
  expensecontrols = document.createElement("Div");
  expenseedit = document.createElement("Span");
  expenseedit.innerHTML = "<i class=\"fas fa-edit expensecontrols\"></i>  ";
  expensedelete = document.createElement("Span");
  expensedelete.innerHTML = "  <i class=\"fas fa-trash expensecontrols\"></i>";
  expensecontrols.appendChild(expenseedit);
  expensecontrols.appendChild(expensedelete);
  expensecontrolsbox.appendChild(expensecontrols);
  expensetr.appendChild(expensecontrolsbox);
  document.getElementById("table").appendChild(expensetr);
}

function deleteexpense(value){
balance = balance + Number(value);
totalexpenes-=Number(value);
document.getElementById("expensespan").textContent = splitnum(totalexpenes);
balancespan.textContent = splitnum(balance);
balancecolor();
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
}

function splitnum(num){
  var numstr = num.toString();

  if ((numstr.length % 3) == 0){
    for (i=3;i<numstr.length;i+=4)
    {
      numstr = numstr.splice(i,0," ");
    }
  }
  else
  {
 for (i=numstr.length-3;i>0;i-=3)
    {
      numstr = numstr.splice(i,0," ");
    }
  }
  return numstr;
}

