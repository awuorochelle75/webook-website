document.addEventListener('DOMContentLoaded',function(){
    const bookList = document.getElementById('book-collection')
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(data=>{
        

        data.forEach(book =>{
            const bookcard = document.createElement('div')
            bookcard.classList.add('card')

            bookcard.innerHTML=`
                <img src = '${book.image}' width=200px height=300px/>
                <button id='${book.description}'>View</button>
                <button id='${book.id}'>Purchase Book</button>
            `
            bookList.appendChild(bookcard)
        })


    })

    const contact=document.getElementById('contacts')
        contact.addEventListener('click',function(e){
            e.preventDefault()

    const contactContent=document.getElementById('contacts-info')

        const main=document.getElementById('main-content')
            
        const bookList=document.getElementById('book-collection')
        const search = document.querySelector('.search')
       
            main.innerHTML=' ';
            bookList.innerHTML='';
            search.innerHTML=' ';
      
            contactContent.innerHTML=`
           
              <section class="contact-con" id="contacts">
              <h1 id="contact-header">Contact us</h1>
          
              
        <div class="contact1">
        <h1>We value your input! Tell us what's working and what's not.!!</h1>
        <p><b>Phone</b><br> +254 712562728</p>
        <p><b>Email</b><br><a href="">webooks@gmail.com</a></p>
        <p><b>Country</b><br>Nairobi,Kenya.</p></div>
       
        <div class="contact2">
         <form action="" class="form">
            <input type="text" placeholder="Your Name"><br><br>
            <input type="text" placeholder="Your Email"><br><br>
            <textarea placeholder="Your message"></textarea><br><br>
            <button type="sendmessage" class="btn1">Send Message</button>
            </form></div>
        </div>  
    </section>
     
    
    `
             
   

        })
    
})