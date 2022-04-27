
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=9f5f7d1fe825e1aed9eaae9b018e7b1c';


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch  ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllChars = async () => {
        const res = await this.getResource(`${this._apiBase}/characters?${this._apiKey}`);

        return res.data.results.map(this._transformChar);
    }

    getChar = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
        return this._transformChar(res.data.results[0]);
    }

    _transformChar = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Sorry, the descriprion of this character is not found', 
            thumbnail: char.thumbnail.path +'.'+char.thumbnail.extension,
            homepage: char.urls[0].url, 
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;