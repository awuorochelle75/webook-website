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

    // ✅ Handle "Contact Us" section
    contact.addEventListener('click', async function (e) {
        e.preventDefault();

        const contactContent = document.getElementById('contacts-info');
        const main = document.getElementById('main-content');
        const search = document.querySelector('.search');

        // Clear content
        main.innerHTML = '';
        bookList.innerHTML = '';
        search.innerHTML = '';

        // Display contact information
        contactContent.innerHTML = `
            <section class="contact-con" id="contacts">
                <h1 id="contact-header">Contact us</h1>
                <div class="contact1">
                    <h1>We value your input! Tell us what's working and what's not.!!</h1>
                    <p><b>Phone</b><br> +254 712562728</p>
                    <p><b>Email</b><br><a href="mailto:webooks@gmail.com">webooks@gmail.com</a></p>
                    <p><b>Country</b><br>Nairobi, Kenya.</p>
                </div>
                <div class="contact2">
                    <form action="" class="form">
                        <input type="text" placeholder="Your Name"><br><br>
                        <input type="text" placeholder="Your Email"><br><br>
                        <textarea placeholder="Your message"></textarea><br><br>
                        <button type="sendmessage" class="btn1">Send Message</button>
                    </form>
                </div>  
            </section>
        `;
    });
});
