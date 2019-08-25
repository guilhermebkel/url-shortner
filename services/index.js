import fetch from 'node-fetch'

export const API = process.env.NODE_ENV === 'development' ? 'http://localhost:3939' : 'https://api.guilherr.me/'

class UrlShortnerService {
    async createShortUrl(url, id = undefined){
        try{
            const response = await fetch(API + '/u/', {
                method: 'POST',
                body: JSON.stringify({ url, id }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(result => result.json())
            .then(data => data)

            return response
        }
        catch(error){
            console.error(error)
            return error
        }
    }
}

export default new UrlShortnerService