from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data
books = [
    {"id": 1, "title": "1984", "author": "George Orwell"},
    {"id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee"},
]

# Utility function to find book by ID
def find_book(book_id):
    return next((book for book in books if book["id"] == book_id), None)

#main page:

@app.route('/')
def display():
    return "<h1>welcome to Books page Have fun with CRUD operations</h1>"
# Route to get all books
@app.route('/books', methods=['GET'])
def getallbooks():
    return jsonify(books)

# Route to get a book by ID
@app.route('/books/<int:book_id>', methods=['GET'])
def getabook(book_id):
    book = find_book(book_id)
    if book:
        return jsonify(book)
    return jsonify({"error": "Book not found"}), 404

# Route to create a new book
@app.route('/books', methods=['POST'])
def createbook():
    new_book = request.get_json()
    new_book["id"] = books[-1]["id"] + 1 if books else 1
    books.append(new_book)
    return jsonify(new_book), 201

# Route to update a book by ID
@app.route('/books/<int:book_id>', methods=['PUT'])
def updateBook(book_id):
    book = find_book(book_id)
    if book:
        data = request.get_json()
        book.update(data)
        return jsonify(book)
    return jsonify({"error": "Book not found"}), 404

# Route to delete a book by ID
@app.route('/books/<int:book_id>', methods=['DELETE'])
def deletebook(book_id):
    book = find_book(book_id)
    if book:
        books.remove(book)
        return jsonify({"message": "Book deleted"})
    return jsonify({"error": "Book not found"}), 404

if __name__ == '__main__':
    app.run(debug=True,port=5002)
