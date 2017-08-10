function sleep (milliseconds) {
  var start = new Date().getTime()
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break
    }
  }
}

var webComponentsSupported = ('registerElement' in document &&
  'import' in document.createElement('link') &&
  'content' in document.createElement('template'))

if (!webComponentsSupported) {
  var script = document.createElement('script')
  script.async = true
  script.src = '../../bower_components/webcomponentsjs/webcomponents-lite.min.js'
  script.onload = finishLazyLoading
  document.head.appendChild(script)
} else {
  finishLazyLoading()
}

function finishLazyLoading () {
  // (Optional) Use native Shadow DOM if it's available in the browser.
  window.Polymer = window.Polymer || {dom: 'shadow'}

  // 6. Fade splash screen, then remove.
  var onImportLoaded = function () {
    sleep(500)
    var loadEl = document.getElementById('splash')
    loadEl.addEventListener('transitionend', loadEl.remove)
    document.body.classList.remove('loading')

    // App is visible and ready to load some data!
  };

  var link = document.querySelector('#bundle')

  if (link.import && link.import.readyState === 'complete') {
    onImportLoaded()
  } else {
    link.addEventListener('load', onImportLoaded)
  }
}
