'use strict';
export default class MonkeyCounter {
  constructor({elem, count}) {
    this.elem = elem;
    console.log('user-count', count);
    if (typeof count != 'undefined') {
      this.count = count;
    } else if (localStorage['profiles']) {
      this.count = parseInt(localStorage['profiles']);
    } else {
      this.count = 0;
      localStorage['profiles'] = 0;
    }

    localStorage['profiles'] = this.count;
    console.log('count', this.count);

    const counter = document.createElement('div');
    this.elem.appendChild(counter);

    this.counter = counter;

    const incButton = document.createElement('button');
    incButton.innerHTML = '+50';
    this.elem.appendChild(incButton);

    const decButton = document.createElement('button');
    decButton.innerHTML = '-50';
    this.elem.appendChild(decButton);

    const resButton = document.createElement('button');
    resButton.innerHTML = 'reset';
    this.elem.appendChild(resButton);

    const incCustomButton = document.createElement('button');
    incCustomButton.innerHTML = '+X';
    this.elem.appendChild(incCustomButton);

    incButton.addEventListener('click', () => this.increment(50));
    decButton.addEventListener('click', () => this.decrement(50));
    resButton.addEventListener('click', () => this.reset());
    incCustomButton.addEventListener('click', () => this._incCustom());

    this.render();
  }

  increment(count) {
    this.count = parseInt(localStorage['profiles']) + +(count || 1);
    localStorage['profiles'] = this.count;
    this.render();
  }

  decrement(count) {
    if (confirm('you sure?')) {
      this.count = parseInt(localStorage['profiles']) - +(count || 1);
      localStorage['profiles'] = this.count;
      this.render();
    }
  }

  reset() {
    if (confirm('you sure?')) {
      this.count = 0;
      localStorage['profiles'] = this.count;
      this.render();
    }
  }

  _incCustom() {
    const inc = parseInt(prompt('how much', 50));
    if (!Number.isNaN(inc)) {
      this.increment(inc);
    }
  }

  render() {
    this.counter.innerHTML = `Profiles: ${this.count}`;
  }
}
