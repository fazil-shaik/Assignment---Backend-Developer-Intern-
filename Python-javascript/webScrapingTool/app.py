import requests
from bs4 import BeautifulSoup
import csv

# URL of the website to scrape
url = 'http://books.toscrape.com/'

# Send a GET request to the website
response = requests.get(url)
response.raise_for_status()  # Check if the request was successful

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# Find the container that holds the book information
book_container = soup.find_all('article', class_='product_pod')

# Open a CSV file to write the data
with open('books.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Title', 'Author'])

    # Loop through each book container and extract the required data
    for book in book_container:
        title = book.h3.a['title']
        author = book.find('p', class_='author').text.strip()

        # Write the data to the CSV file
        writer.writerow([title, author])

print('Scraping completed and data saved to books.csv')
