document
    .querySelector('.create-form')
    .addEventListener('submit', async (event) => {
        event.preventDefault()

        const data = new FormData(event.target)

        const value = Object.fromEntries(data.entries())

        console.log(JSON.stringify(value))

        try {
            const res = await fetch('/voucher/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(value),
            })
            alert('Voucher added, reloading...')
            window.location.reload()
        } catch {
            alert('Some thing went wrong')
        }
    })

fetch('/voucher/view', {method: 'GET'})
    .then((data) => data.json())
    .then((data) => {})
