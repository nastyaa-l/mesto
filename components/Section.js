//класс, отвечающий за отрисовку элементов на странице
export class Section {
  constructor ({data, renderer}, containerSelector){
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }


//перебор массив данных
  renderItems() {
    this._renderedItems.forEach((item) =>{
      this._renderer(item);
    })
  };


//вставка элемента в контейнер
  setItem(element){
    this._container.append(element);
  }

//вставка элемента вначало контейнера
  prependItem(element){
    this._container.prepend(element);
  }
}


