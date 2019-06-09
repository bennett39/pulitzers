import requests
import json
import csv

books = []

with open('winners.csv') as f:
    csv_reader = csv.reader(f, delimiter=',')
    first_row = True
    for row in csv_reader:
        if first_row:
            first_row = False
            continue
        books.append({
            'year': row[0],
            'title': row[1],
            'author_full': ' '.join((row[2], row[3])),
            'author_first': row[2],
            'author_last': row[3]
        })

authors = {}
url = 'http://pulitzer39.herokuapp.com/api/'

for book in books:
    if book['author_full'] not in authors:
        payload = {
            'first_name': book['author_first'],
            'last_name': book['author_last']
        }
        r = requests.post(url + 'authors/', json=payload)
        try:
            authors[book['author_full']] = r.json()['id']
        except:
            print(f"Error posting {book['author_full']}")
    author_id = authors[book['author_full']]
    payload = {
        'title': book['title'],
        'author': url + 'authors/' + str(author_id) + '/',
        'completed': False,
        'year_won': book['year']
    }
    r = requests.post(url + 'upload/', json=payload)
