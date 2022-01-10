'use strict'

const date = new Date()

const today =
    date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate()

function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const monthstart = date.getFullYear() + '/' + date.getMonth() + 1 + '/' + '1'
const monthend =
    date.getFullYear() + '/' + date.getMonth() + '/' + endOfMonth(date)

async function revenues() {
    await fetch('/stats/by_date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            start: today,
            end: '',
        }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
}

revenues()
