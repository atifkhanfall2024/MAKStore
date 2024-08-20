let section = JSON.parse(localStorage.getItem('data')) || []
       

// to calculate the total number of value in cart
let calculate = () => {
   let amount = document.querySelector("#atif");
   let totalItems = section.map((x) => x.item || 1).reduce((x, y) => x + y, 0);
              
   amount.innerHTML = totalItems ;
};