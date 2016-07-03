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
    if (profile.scam) {
      return this.tarif.scam
    } else if (profile.suspend) {
      return this.tarif.suspend
    } else if (profile.photo) {
      return this.tarif.withPhoto
    } else {
      return this.tarif.withOutPhoto
    }
  }
}
