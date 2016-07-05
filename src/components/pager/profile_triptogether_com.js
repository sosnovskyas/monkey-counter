'use strict';
import Pricer from "./../pricer/";

export default class profile_triptogether_com {
  constructor() {
    this.pricer = new Pricer();
    this.buttons = {};
    this.profile = {
      project: 'TT',
      uid: window.location.hash.slice(1).split("&")[0],
      result: null,
      price: 0
    };

    const userControl = document.querySelectorAll('.control.button.toggle');

    this.buttons.scam = userControl[0];
    userControl[1].addEventListener('click', ()=> this._onSuspend());
    userControl[2].addEventListener('click', ()=> this._onApprove());
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
    } else if (this._checkPhoto()) {
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

  _checkPhoto() {
    // return (document.querySelector('.touchcarousel-container').childNodes.length > 1);
    const hasGalleryPhotos = !!(document.querySelectorAll('.photos.form li.photo-wrapper:not(.main-photo)').length);
    const hasAvatar = !document.querySelector('.thumbnail.primary-photo img').classList.contains('dummy');

    return hasGalleryPhotos || hasAvatar;

  }
}
