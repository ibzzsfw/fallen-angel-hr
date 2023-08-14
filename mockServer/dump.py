# execute .sql file to ./db.sqlite3

import sqlite3
import os

# get current path
path = os.getcwd()
# get file path
file_path = path + '/db.sqlite3'
# connect to database
conn = sqlite3.connect(file_path)
# get cursor
cursor = conn.cursor()
# execute sql
cursor.execute(open('mockServer/dblite.sql', 'r', encoding='utf-8').read())
# commit
conn.commit()
# close
cursor.close()
conn.close()