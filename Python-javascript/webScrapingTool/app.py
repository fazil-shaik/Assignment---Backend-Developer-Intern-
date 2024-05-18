import requests
from bs4 import BeautifulSoup
import csv

url = 'http://books.toscrape.com/'

response = requests.get(url)
response.raise_for_status()  

soup = BeautifulSoup(response.text, 'html.parser')

book_container = soup.find_all('article', class_='product_pod')

with open('books.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Title', 'Author'])

    for book in book_container:
        title = book.h3.a['title']
        author = book.find('p', class_='author').text.strip()

        writer.writerow([title, author])

print('Scraping completed and data saved to books.csv')
