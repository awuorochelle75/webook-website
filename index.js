document.addEventListener('DOMContentLoaded', async function () {
    const bookList = document.getElementById('book-collection');
    const searchbar = document.getElementById('searchbar');
    const genreFilter = document.getElementById('genre-filter');
    
    let books = [];

    //In this section i am fetching my books and displaying them to the web
    async function fetchBooks() {
        try {
            const response = await fetch('https://webook-website.onrender.com/books');
            books = await response.json(); 
            //This is what allows my books now to be displayed in page load
            displayBooks(books); 
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }


    // Here basically is just my function display books,that i called
    function displayBooks(bookArray) {
        //The reason for using this innerHTML is that when it loads now,it will remove anything that is to be displayed and replaces with my books.
        bookList.innerHTML = ''; 
        bookArray.forEach(book => {
            const bookcard = document.createElement('div');
            bookcard.classList.add('card');

            bookcard.innerHTML = `
                <img src='${book.image}' width=200px height=300px/>
                <button class="btn-view"  data-id="${book.id}">View</button>
                <button class="purchase-btn">Purchase Book</button>
            `;

          
          
          //This appendchild is adding the new element(which is my bookcard) to the parent node(which is bookcard)
            bookList.appendChild(bookcard);
        });
        bookList.addEventListener('click', async function (event) {
            if (event.target.classList.contains('btn-view')) {
                const bookId = event.target.dataset.id;
               // console.log("Fetching book details for ID:", bookId)
                
                try {
                    const response = await fetch(`https://webook-website.onrender.com/books/${bookId}`);
                    if (!response.ok) throw new Error('Failed to fetch book details');
                    
                    const book = await response.json();

                    const message = `📖 Title: ${book.title}\n✍️ Author: ${book.author}\n📝 Description: ${book.description}\n💰 Price: ${book.price}\n📚 Genre: ${book.genre}`;
                    message.style

                    alert(message); 
        
                  
                } catch (error) {
                    alert('Error fetching book details. Please try again.');
                }
            }
        });
        
        
        

      
        
        bookList.addEventListener('click', async function (event) {
            if (event.target.classList.contains('purchase-btn')) {
                const bookId = event.target.closest('.card').querySelector('[data-id]').dataset.id;
            
            
                const book = books.find(book => book.id === bookId);
                if (confirm(`Do you want to buy "${book.title}" for ${book.price}?`)) {
                    alert('Thank you for your purchase! Enjoy your book. 📚');

                }
            }
        });
        
    }
    
   




    //now this is what loads my books in a card when you immediatelty open my web page.
    //and it also ensures you dont have to call another function for the books to load
    await fetchBooks(); 
    

    // This is my filter function that deals with filtering the books according to the search of the user
    function filterBooks() {
        const searchText = searchbar.value.toLowerCase();
        const selectedGenre = genreFilter.value.toLowerCase();
    
        const filteredBooks = books.filter(book => {
            const matchesTitle = book.title.toLowerCase().startsWith(searchText);
            const matchesGenre = selectedGenre === "all" || selectedGenre === "" || book.genre.toLowerCase() === selectedGenre;
    
            return matchesTitle && matchesGenre;
        });
    
        displayBooks(filteredBooks); 
    }
    

   


    //Here i am basically adding the event listeners to listen for an input in my searchbar and
    searchbar.addEventListener('input', filterBooks);

    //Here my  filter for genre is listen for a change in the genre.
    genreFilter.addEventListener('change', filterBooks);

    
    //Here we are dealing with my contact/Get in Touch section,allowing any of my users to send me message.
    const form=document.getElementById('form-contact')
        form.addEventListener('submit',function(event){
            event.preventDefault();
            const name=document.getElementById('name').value
            const email = document.getElementById('email').value
            const text = document.getElementById('text').value
            const message= document.getElementById('message')

                //This here is the message will appear after my users click the button(send message)
                //Just defininig the styles i have also placed,some styles are also in my css
                message.style.display="block"
                message.style.opacity="1"

                //Here i have set the time for how long the message should appear.
                setTimeout(()=>{
                    message.style.transition = "opacity 1s ease-out";
                    message.style.opacity="0"
                },5000)
             

           

                
            form.reset();
           

        })

    });

   

