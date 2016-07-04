'use strict';
import Pricer from "./../pricer/";

export default class profile_dating_com {
  constructor() {
    this.pricer = new Pricer();
    this.buttons = {};
    this.profile = {
      project: 'DC',
      uid: window.location.hash.slice(1),
      result: null,
      price: 0
    };

    const buttons = document.querySelectorAll('.control.button.toggle');
    for(let i = 0; i < buttons.length; i++) {
      switch (buttons[i].childNodes[5].innerText) {
        case 'Suspend':
        {
          buttons[i].addEventListener('click', ()=> this._onSuspend());
          break;
        }

        case 'Scam':
        {
          this.buttons.scam = buttons[i];
          break;
        }

        case 'Approve':
        {
          buttons[i].addEventListener('click', ()=> this._onApprove());
          break;
        }
      }
    }
  }

  _onSuspend() {
    this.profile.date = Date.now();
    this.profile.result = 'suspend';
    if (!!this.buttons.scam.classList.contains('pressed')) {
      alert('Упс, это как то странно, суспендить скамера');
      return;
    }

    console.log('suspend');
    this.profile.price = this.pricer.calculate(this.profile);
    this._sendData();
  }

  _onApprove() {
    if (this.buttons.scam.classList.contains('pressed')) {
      this.profile.result = 'scam';
    } else if (this._checkAvatar()) {
      this.profile.result = 'with-photo';
    } else {
      this.profile.result = 'with-OUT-photo';
    }

    console.log('approve');
    this.profile.price = this.pricer.calculate(this.profile);
    this._sendData();
  }

  _sendData() {
    chrome.runtime.sendMessage(JSON.stringify(this.profile));
  }

  _checkAvatar() {
    return document.querySelector('.thumbnail-wrapper:not(.loading) img').dataset.url;
  }
}
