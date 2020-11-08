var cal = document.getElementById('budget-btn');
var addexpense = document.getElementById("expense-btn");
var expense = document.getElementById("expense");
var budgetinput = document.getElementById("bn");
var balancespan = document.getElementById('balance');
var balance = 0 ;
var budget = 0;
var totalexpenes=0;
var expenseId = 0 ;
var expenses = new Array();



cal.addEventListener("click" , function(){
if (budgetinput.value <= 0){
document.getElementById("budgetErrormsg").classList.remove("invisable");
	}
else{
document.getElementById("budgetErrormsg").classList.add("invisable");
budget = Number(budgetinput.value);
balance = budget - totalexpenes;
document.getElementById("budgetspan").textContent = budget;
balancespan.textContent = balance;
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
document.getElementById("expensespan").textContent = totalexpenes;
balancespan.textContent = balance;
balancecolor();
expenses[expenseId-1].expenseTitle.style.textTransform = "capitalize";
expense.value = ""; 
document.getElementById("expenseTitle-text").value = "";
window.location='#container';
}	
});

document.addEventListener('click',function(e){
    if(e.target && e.target.classList.contains("fa-edit")){
    	for (var i = 0; i < expenses.length; i++) {
    		if (expenses[i].expenseControls == e.target.parentNode.parentNode){
             document.getElementById("expenseTitle-text").value = expenses[i].expenseTitle.textContent.substr(1, expenses[i].expenseTitle.textContent.length);
	         document.getElementById("expense").value = expenses[i].expenseValue.textContent;
	         deleteexpense(i);
    		}}
          
     }
      if(e.target && e.target.classList.contains("fa-trash")){
         for (var i = 0; i < expenses.length; i++) {
    		if (expenses[i].expenseControls == e.target.parentNode.parentNode){
    			deleteexpense(i);
    		}}
     }
 });

function balancecolor() {
if (balancespan.textContent > 0){
	document.getElementById('balanceshow').classList.add("green");
	document.getElementById('balanceshow').classList.remove("red");
}
else if (balancespan.textContent < 0){
	document.getElementById('balanceshow').classList.remove("green");
	document.getElementById('balanceshow').classList.add("red");
}
else {
	document.getElementById('balanceshow').classList.remove("green");
	document.getElementById('balanceshow').classList.remove("red");
}}

function createExpense(){
  expensetitle = document.createElement("P");
  var textexpense = document.createTextNode("- " + document.getElementById("expenseTitle-text").value);
  expensetitle.appendChild(textexpense);
  expensevalue = document.createElement("P");
  var valueexpense = document.createTextNode(document.getElementById("expense").value);
  expensevalue.appendChild(valueexpense);
  expensecontrols = document.createElement("Div");
  expenseedit = document.createElement("Span");
  expenseedit.innerHTML = "<i class=\"fas fa-edit expensecontrols\"></i>  ";
  expensedelete = document.createElement("Span");
  expensedelete.innerHTML = "  <i class=\"fas fa-trash expensecontrols\"></i>";
  expensecontrols.appendChild(expenseedit);
  expensecontrols.appendChild(expensedelete);
  expensecontrols.classList.add("expensecontrolsbox");
  expenses.push({expenseTitle:expensetitle,expenseValue:expensevalue,expenseControls:expensecontrols});
  document.getElementById("expenseControl").appendChild(expenses[expenseId].expenseControls);
  document.getElementById("expenseTitle").appendChild(expenses[expenseId].expenseTitle);
  document.getElementById("expenseValue").appendChild(expenses[expenseId].expenseValue);
  expenseId ++;
}

function deleteexpense(id){
balance = balance + Number(expenses[id].expenseValue.textContent);
totalexpenes-=Number(expenses[id].expenseValue.textContent);
document.getElementById("expensespan").textContent = totalexpenes;
balancespan.textContent = balance;
balancecolor();
expenses[id].expenseTitle.remove();
expenses[id].expenseValue.remove();
expenses[id].expenseControls.remove();
expenses.splice(id,1);
expenseId--;
}
