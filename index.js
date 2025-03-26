document.addEventListener('DOMContentLoaded', async function () {
    const bookList = document.getElementById('book-collection');
    const searchbar = document.getElementById('searchbar');
    const genreFilter = document.getElementById('genre-filter');
    
    let books = []; // ✅ Store books globally

    // ✅ Fetch books and display them
    async function fetchBooks() {
        try {
            const response = await fetch('https://webook-website.onrender.com/books');
            books = await response.json(); // ✅ Store books globally
            displayBooks(books); // ✅ Show books on page load
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    // ✅ Function to display books
    function displayBooks(bookArray) {
        bookList.innerHTML = ''; // Clear old books before displaying
        bookArray.forEach(book => {
            const bookcard = document.createElement('div');
            bookcard.classList.add('card');

            bookcard.innerHTML = `
                <img src='${book.image}' width=200px height=300px/>
                <button class="btn-view" id="${book.id}">View</button>
                <button class="purchase-btn">Purchase Book</button>
            `;
            bookList.appendChild(bookcard);
        });
        bookList.addEventListener('click', async function (event) {
            if (event.target.classList.contains('purchase-btn')) {
                const bookId = event.target.previousElementSibling.id;
                const book = books.find(b => b.id == bookId);
        
                if (confirm(`Do you want to buy "${book.title}" for ${book.price}?`)) {
                    alert('Purchase successful! Thank you for buying.');
                }
            }
        });
        
   
    }
   





    await fetchBooks(); // ✅ Load books when the page loads

    // ✅ Filtering function
    function filterBooks() {
        const query = searchbar.value.toLowerCase();
        const selectedGenre = genreFilter.value.toLowerCase();

        const filteredBooks = books.filter(book => {
            const titleMatch = book.title.toLowerCase().includes(query);
            const genreMatch = selectedGenre === "all" || book.genre.toLowerCase() === selectedGenre || selectedGenre === "";

            return titleMatch && genreMatch;
        });

        displayBooks(filteredBooks); // ✅ Update book list after filtering
    }

   


    // ✅ Attach event listeners
    searchbar.addEventListener('input', filterBooks);
    genreFilter.addEventListener('change', filterBooks);

    const form=document.getElementById('form-contact')
        form.addEventListener('submit',function(event){
            event.preventDefault();
            const name=document.getElementById('name').value
            const email = document.getElementById('email').value
            const text = document.getElementById('text').value
            const message= document.getElementById('message')

                message.style.display="block"
                message.style.opacity="1"

                setTimeout(()=>{
                    message.style.transition = "opacity 1s ease-out";
                    message.style.opacity="0"
                },4000)
             

           

                
            form.reset();
           

        })

    });

    form-section

