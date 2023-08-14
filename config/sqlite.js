// connect to sqlite3 
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbPath = 'mockServer/db.sqlite3';

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const openDB = () => debounce(
    open({
        filename: dbPath,
        driver: sqlite3.Database,
    }),
    1000
)

export {
    openDB,
}