'use strict';

const monkey = '@(^..^)@';

import profile_dating_com from "./profile_dating_com";
import profile_yourtravelmates_com from "./profile_yourtravelmates_com";
import profile_triptogether_com from "./profile_triptogether_com";

export default class MonkeyPager {
  constructor() {
    switch (window.location.host) {
      case "www.dating.com":
        new profile_dating_com();
        break;
      case "www.yourtravelmates.com":
        new profile_yourtravelmates_com();
        break;
      case "www.triptogether.com":
        new profile_triptogether_com();
        break;
    }
    console.log(`monkey is ready to keep track of your page ${monkey}`);
  }
}
