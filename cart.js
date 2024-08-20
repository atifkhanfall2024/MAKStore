

 let label  = document.querySelector("#label")
 let addtocart = document.querySelector("#addtocart")


   let section = JSON.parse(localStorage.getItem('data')) || []
       

 // to calculate the total number of value in cart
 let calculate = () => {
    let amount = document.querySelector("#atif");
    let totalItems = section.map((x) => x.item || 1).reduce((x, y) => x + y, 0);
               
    amount.innerHTML = totalItems ;
};
        calculate();

           // here i generate carts
        let generate_cart = ()=>{

            if(section.length !== 0){

                return(addtocart.innerHTML = section.map((x)=>{
                   
                      let { id , brandname , img , name  , description ,price , Quantity_in_stock , item } = x ;
           
                        
                      return `
                        <div  class="cart_items">
                       
                         <h4 id = "bname"> ${brandname} </h4>
                         <div id = "cart_image">
                         <img src = "${img}" alt = "" >
                         </div>
                         <h3>${name}</h3>
                         <h4 id = "pname" >price : <span id = "prose" data-id= "${id}" >${price}</span></h4>
                          <div id="butttoon">
                        <button class = "mybtnn" id="btn1" data-id = "${id}">+</button>
                        <p  id="countting" data-id = "${id}">1</p>
                        <button id="btn2" data-id = "${id}">-</button><br>
                       </div>
                         <h5 data-id = "${id}">Quantity in stock :<span id = "Qstock" data-id = "${id}" > ${Quantity_in_stock}</span> </h5>
                         <button  id  = "remove" onclick ="remove_me(${id})">Remove</button>
                        
                        </div>
          
        
                      `
                }).join(""));
            }else {
                addtocart.innerHTML = `<h3>Shopping cart is empty</h3>`;
              }
            
            
        }
      generate_cart()
        /*

section = [
  { id: 1, name: "Card A", price: 100 },
  { id: 2, name: "Card B", price: 200 },
  { id: 3, name: "Card C", price: 300 }
];
If you click on the card with id 2, you might call remove_me(2). In this case:
id: The value of id is 2, because that's the identifier of the card you want to remove.
x.id: During the filter method execution:
For the first item ({ id: 1, name: "Card A", price: 100 }), x.id is 1.
For the second item ({ id: 2, name: "Card B", price: 200 }), x.id is 2.
For the third item ({ id: 3, name: "Card C", price: 300 }), x.id is 3.

        */

        let remove_me = (id)=>{
        
            section = section.filter((x)=> x.id != id)
            localStorage.setItem('data', JSON.stringify(section));
            calculate();
            generate_cart();
          
        }
  

         

        let Total_amount = () => {
          let totalamount = 0 ;
       
          section.map((item) => {
            let quantity = item.item || 1; // Default to 1 if item is undefined or falsy
            let price = item.price || 0;
          
           
            totalamount += quantity * price;
       
          });


  

           label.innerHTML = `
           <div id="total_check">
              <h3>Total Price : ${totalamount.toFixed(2)}</h3>

               <button id="update"   onClick=window.location.reload()>Update Cart</button><br>
               <button id="checkout">Check Out</button><br>
               <a href="" download="total_check"> <button id="download" >Generate Slip</button></a>

             </div>
           `
           }
           Total_amount();



           // now create an event listner or onlick function on btn1 and btn2
              function incrementanddecrement(){
           const first = document.querySelectorAll(".mybtnn")
           const second = document.querySelectorAll("#btn2")
      

           // now for every card wr create a for each function 

           first.forEach((mybtn1)=>{
            mybtn1 .addEventListener("click" , (eventt)=>{
            const id = eventt.target.dataset.id;// get the data id attribute from clicked button
        //  console.log(id);

               var counting = document.querySelector(`#countting[data-id = "${id}"]`)
               var price = document.querySelector(`#prose[data-id = "${id}"]`)
               var Qstock = document.querySelector(`#Qstock[data-id = "${id}"]`)
              var total_pricess = parseFloat(price.innerHTML);
             var q = parseInt(Qstock.innerHTML)
              
             //  console.log(price);
             //  console.log(counting);
               var count = parseInt(counting.innerHTML)
          
              
                if(count>=1 && q>=count){
                
                  count++ 
                  q--
                  var myprice = (total_pricess * count);
                  console.log(myprice);
                  console.log(total_pricess);
                  counting.innerHTML = count 
                price.innerHTML = myprice.toFixed(2)
                Qstock.innerHTML = q 
         
                }
                

            })
           })
           second.forEach((mybtn2)=>{
            mybtn2 .addEventListener("click" , (eventtt)=>{
            const id = eventtt.target.dataset.id;// get the data id attribute from clicked button
        //  console.log(id);
               var counting = document.querySelector(`#countting[data-id = "${id}"]`)
               var price = document.querySelector(`#prose[data-id = "${id}"]`)
               var Qstock = document.querySelector(`#Qstock[data-id = "${id}"]`)
              var total_pricess = parseFloat(price.innerHTML);
             var q = parseInt(Qstock.innerHTML)
            //   console.log(counting);
               var count = parseInt(counting.innerHTML)
                if(count>1){
                  count-- 
                  q++
                  var myprice = (total_pricess * count);
                  counting.innerHTML = count
                  price.innerHTML = myprice.toFixed(2)
                  Qstock.innerHTML = q  
                }
                

            })
           })
          }
          incrementanddecrement()