'use strict';

export default class {
  constructor() {
    this.tarif = {
      suspend: 0.01,
      withOutPhoto: 0.01,
      withPhoto: 0.03,
      scam: 0.03
    }
  }

  calculate(profile) {
    switch (profile.result) {
      case 'scam':
        return this.tarif.scam;
      case 'suspend':
        return this.tarif.suspend;
      case 'with-photo':
        return this.tarif.withPhoto;
      case 'with-OUT-photo':
        return this.tarif.withOutPhoto;
    }
  }
}
