import {
  Service
} from "./service.js";

export class PageComponent {
  search;
  characters;

  constructor() {
    this.errorContainer = document.querySelector(".error");
    this.suggestions = document.querySelector(".suggestions");
    this.searchInput = document.querySelector(".search");

    this.service = new Service();

    this._loadData();
  }

  onInput(event) {
    this.search = event.target.value;
    console.log(this.search);
    this._filterData();
  }

  _filterData() {
    const searchCharacters = this.characters.filter(item => {
      const regex = new RegExp(this.search, 'gi');
      return item.name.match(regex);
    });
    this._prepareHtml(searchCharacters)
  }

  _loadData() {
    this.service.getAllCharacters()
      .then(res => this._onUpdateSuccess(res))
      .catch(err => this._errorMessage(err))
  }

  _onUpdateSuccess(characters) {
    this.characters = characters;
    this._prepareHtml(this.characters);
    this.searchInput.addEventListener("change", this.onInput.bind(this));
    this.searchInput.addEventListener("keyup", this.onInput.bind(this));
  }

  _errorMessage(message) {
    alert(message)
  }

  _prepareHtml(characters) {
    if (typeof this.search == "undefined") {
      this.search = '';
    }
    console.log(characters.length);
    if (characters.length === 0) {
      this.suggestions.innerHTML = `Не найдено результатов по запросу ${this.search}`;
      return;
    }
    this.suggestions.innerHTML = "";
    const html = characters.map(item => {
      const regex = new RegExp(this.search, 'gi');
      const name = item.name.replace(regex, `<span style='background-color:yellow;'>${this.search}</span>`);
      return `
      <li><span>${name}</span>  <img class="character-image" src="${item.image}"></li>
      `
    }).join('');
    this.suggestions.innerHTML = html;
  }
}