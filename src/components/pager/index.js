'use strict';

const monkey = '@(^..^)@';

import profile_dating_com from './profile_dating_com'

export default class MonkeyPager {
  constructor() {
    switch (window.location.host) {
      case "www.dating.com": new profile_dating_com();
    }
    console.log(`monkey is ready to keep track of your page ${monkey}`);
  }
}
