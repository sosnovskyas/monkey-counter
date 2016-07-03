'use strict';
import Pricer from "../pricer/";


export default class profile_dating_com {
  constructor() {
    this.pricer = new Pricer();
    this.buttons = {};
    this.profile = {
      id: window.location.hash.slice(1),
      scam: false,
      suspend: false,
      date: null,
      price: 0
    };

    const buttons = document.querySelectorAll('.control.button.toggle');
    buttons.forEach(item => {
      switch (item.childNodes[5].innerText) {
        case 'Suspend':
        {
          this.buttons.suspend = item;
          this.buttons.suspend.addEventListener('mouseover', ()=> this._onSuspend());
          break;
        }

        case 'Scam':
        {
          this.buttons.scam = item;

          break;
        }

        case 'Approve':
        {
          this.buttons.approve = item;
          this.buttons.approve.addEventListener('mouseover', ()=> this._onApprove());
          break;
        }
      }
    });
  }

  _onSuspend() {
    this.profile.date = Date.now();
    this.profile.scam = !!this.buttons.scam.classList.contains('pressed');
    this.profile.suspend = true;
    if (this.profile.scam) alert('Упс, это как то странно, суспендить скамера');
    this.profile.price = this.pricer.calculate(this.profile);
    console.log(`suspend ${JSON.stringify(this.profile)}`);
  }

  _onApprove() {

    this.profile.date = Date.now();
    this.profile.scam = !!this.buttons.scam.classList.contains('pressed');
    // if (this.buttons.approve.classList.contains('pressed')) console.log('')
    this.profile.price = this.pricer.calculate(this.profile);
    console.log(`approve ${JSON.stringify(this.profile)}`);
  }
}
