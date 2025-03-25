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
                <button id='${book.description}'>View Description</button>
                <button id='${book.id}'>Purchase Book</button>
            `
            bookList.appendChild(bookcard)
        })


    }
    )
    .catch(error => console.error('Error fetching data:', error));
})