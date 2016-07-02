'use strict';
function _findSuspend() {
  const alarmElems = document.querySelectorAll('.admin-panel .alarm');

  for (let i = 0; i < alarmElems.length; i++) {
    if (alarmElems[i].childNodes[5].innerText == 'Suspend') {
      return alarmElems[i];
    }
  }
}

function _onApprove() {
  console.log(`approve`)
}

function _onSuspend() {
  console.log(`suspend`)
}

export default function profile_dating_com() {
  const profileId = window.location.hash.slice(1);
  const approveBtn = document.querySelector('.admin-panel .approve');
  const suspendBtn = _findSuspend();

  approveBtn.addEventListener('mouseover', () => _onApprove());
  suspendBtn.addEventListener('mouseover', () => _onSuspend());
}
