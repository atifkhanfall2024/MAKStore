
function homesection(){
var t1 = gsap.timeline({
    scrollTrigger:{
        trigger:"#home" ,
        scroller:"#home",
      
        start:"top top" ,
        end:"bottom -250%",
        scrub:2 ,
        markers:true,
        pin:true,
      
    }
})

t1.to("#blue" ,{
    top:"40%" ,
    stagger:.1,
    duration:1 ,
    ease:Power1 ,
} ,"hello")
t1.to("#black" ,{
    top:"40%" ,
    stagger:.1,
    duration:2,
    ease:Power1 ,
} ,"hello")
t1.to("#black" ,{
    left:"48%",
    stagger:.1,
    duration:1,
    ease:Power1 ,
} ,"hi")
t1.to("#blue" ,{
    opacity:0
} , "who")
t1.to("#black" , {
    scale:12 ,
    background: "linear-gradient(to right ,  rgba(0, 191, 255, 0.514) , rgba(0, 191, 255, 0.53) ,#fff)",
} ,"who")
t1.to("#circles img" ,{
    opacity:1 ,
    top:"10%" ,
    right:"10%",
    duration:1.5 ,
    ease:Power1 ,
    stagger:.1,
})
t1.to("#hometext" ,{
    opacity:1 ,
    duration:1.5 ,
    ease:Power1 ,
    stagger:.1,
    left:"15%",
    delay:-1 ,
    top:"30%"
})



}
homesection() 
var t6 = gsap.timeline({


    scrollTrigger:{
      trigger:"#content" , 
      markers:true ,
      scrub:4 ,
      pin:true ,

      start:"top 40%",
      end:"top 100%"
    }
   

    })

    t6.to("#circleimg" , {
        opacity:1 ,
        top:"60%" ,
        duration:2
    })

let section = JSON.parse(localStorage.getItem('data'))|| []   
 let pickcard =document.querySelector("#cards")

 
// now create an event listner when we addsomething to cart then the value of card increase by one 
// when we remove somrthing from card it will decrease the value of cart
   let generate_shops = ()=>{

   pickcard .innerHTML = arr.map((x)=>{
         
    let{ id , brandname , img , name  , description ,Price , Quantity_in_stock } = x ;

      return `
             <div  class="card">
          
                    
        <div id="cardtext">
                        <h4>${brandname}</h4>
                        <img src="${img}" alt="">
                        <h2>${name}</h2>
                       <div id="icons">
                        <i class="ri-star-fill"></i><i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i><i class="ri-star-fill"></i>
                        </div>
                        <h6>${description} </h6>
                        <h5>Price in PKR &nbsp:&nbsp <span id="pricess" data-id="${id}">${Price}</span></h5>
                        <h5>Quantity in stock &nbsp:&nbsp<span id="Quantity" data-id="${id}">${Quantity_in_stock}</span></h5>
                        <h5>Quantity(Pieces):
                            </h5>
                         <div id="buttton">
                        <button class="btn1" data-id="${id}">+</button>
                        <p class="counting" data-id="${id}">1</p>
                      
                        <button class="btn2" data-id="${id}">-</button><br>
                    </div>
                             <div id="mycart" >
             <button id="add_cart" onclick="add_to_cart(${id}, &quot;${brandname}&quot;, &quot;${img}&quot;, &quot;${Price}&quot;, &quot;${Quantity_in_stock}&quot;, &quot;${description}&quot;, &quot;${name}&quot;)">
    <i class="ri-shopping-cart-fill"></i>&nbsp; Add to cart 
</button>

                     </div>

                    </div>
                    </div>
                           
      `;
    }).join('');
   };
         //here addto cart is onclick of a button so we create a function of it aand passing an  arguments on it                  
       let add_to_cart = (id , brandname , img  , pricee , Quantity_in_stock, description , name)=>{
        
        section.push({
            id:id , 
            brandname:brandname ,
            img:img ,
          item:1 ,
            Quantity_in_stock :Quantity_in_stock ,
            price:pricee ,
            description:description ,
            name:name ,
        })
       
        localStorage.setItem('data' , JSON.stringify(section))
           calculate()
           cehckout()
          
       }
       

    // its used to calculate the values of inside  its value is start from zero so actually if we check the section .length it give to us 8 length 
      let calculate = ()=>{
        let atifo = document.querySelector("#atif")
        let amountss = section.length
        atifo.innerHTML = amountss
      }
      calculate()
      generate_shops()


      // for review i have make an event listner on it
            
      var i =   document.querySelectorAll("#icons i")
 

      i.forEach((icon)=>{
       icon.addEventListener("click" ,function(){
      
         this.classList.toggle('active'); 
  
       
       });
      });


      // now for selecting multiple items
                function cehckout(){
      const  mybutton = document.querySelectorAll(".btn1")
      const btn2 = document.querySelectorAll(".btn2")
   
            
      mybutton.forEach((btn1)=>{
        btn1.addEventListener("click" , (event)=>{
        
            const id = event.target.dataset.id;// get the data id attribute from clicked button
            const counting = document.querySelector(`.counting[data-id = "${id}"]`)
            var price = document.querySelector(`#pricess[data-id = "${id}"]`)
            var qunatityy = document.querySelector(`#Quantity[data-id = "${id}"] `)
             var myqunatity =  parseInt(qunatityy.innerHTML)
            var total_pricess = parseFloat(price.innerHTML);
                 let count=parseInt(counting.innerHTML)
                 if(count>=1){
                    count++ ; 
                    myqunatity-- ;
                    var myprice = (total_pricess * count);
                    counting.innerHTML = count ;
                    price.innerHTML = myprice.toFixed(2)
                    qunatityy.innerHTML = myqunatity
                 }
        })
      })
      btn2.forEach((btn22)=>{
        btn22.addEventListener("click" , (event)=>{
        
            const id = event.target.dataset.id;// get the data id attribute from clicked button
            const counting = document.querySelector(`.counting[data-id = "${id}"]`)
            var qunatityy = document.querySelector(`#Quantity[data-id = "${id}"] `)
            var myqunatity =  parseInt(qunatityy.innerHTML)
                 let count=parseInt(counting.innerHTML)
                 if(count>1){
                    count--
                    myqunatity++
                    counting.innerHTML = count ;
                    qunatityy.innerHTML = myqunatity
                 }
        })
      })
    }
    cehckout()