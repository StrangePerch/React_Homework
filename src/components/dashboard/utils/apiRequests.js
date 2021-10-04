export function Get(api, callback) {
    fetch(api)
        .then(response => response.json())
        .then(data => callback(data)
        ).catch(err => console.log(err))
}

export function Post(api, body, callback) {
    fetch(api,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(err => console.log(err))
}

export function Put(api, body, callback) {
    fetch(api,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(err => console.log(err))
}

export function Delete(api, id, callback) {
    fetch(api + id,
        {
            method: "DELETE",
        })
        .then(response => callback(response))
        .catch(error => {
            console.log("Error while trying delete " + api)
            console.log("Item id: " + id)
            console.log("Error: " + error)
        })
}