export class Service {
  static URL = 'https://rickandmortyapi.com/api/';

  _url(path) {
    return Service.URL + path;
  }

  _get(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => data);
  }

  async getAllCharacters() {
    const numberOfPages = (await this._get(this._url('character'))).info.pages;
    const characters = [];

    for (let i = 1; i <= numberOfPages; i++) {
      const page = (await this._get(this._url('character?page=' + i))).results;
      characters.push(...page);
    }
    return characters;
  }
}

console.log(new Service().getAllCharacters());


