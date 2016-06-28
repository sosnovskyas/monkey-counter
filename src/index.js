'use strict';
class MonkeyCounter {
  constructor({elem, count}) {
    this.elem = elem;
    console.log('user-count', count);
    if (typeof count != 'undefined') {
      this.count = count;
    } else if (localStorage['profiles']) {
      this.count = parseInt(localStorage['profiles']);
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

    incButton.addEventListener('click', () => this.increment(50));
    decButton.addEventListener('click', () => this.decrement(50));

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

  render() {
    this.counter.innerHTML = `Profiles: ${this.count}`;
  }
}

new MonkeyCounter({
  elem: document.querySelector('.mc')
});
