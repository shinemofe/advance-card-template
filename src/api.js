export const MOCK_URL = 'https://mock.uban360.com/butterfly/mock/api/detail?id='

export function myFetch (id, method, data = {}) {
  return new Promise((resolve, reject) => {
    window.xm
      .fetch(MOCK_URL + id, {
        method: method || 'GET',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: true,
        isRelative: false
      })
      .then(res => res.json())
      .then(res => {
        // console.log('my fetch receive', res)
        if (res.success || res.retcode === 0) {
          resolve(res.data)
        } else {
          reject(res)
          if (res.msg) {
            window.xm.showToast({
              message: res.msg
            })
          }
        }
      })
  })
}

function addScript (id, cbName) {
  const s = document.createElement('script')
  s.src = MOCK_URL + id + '&callback=' + cbName
  document.body.appendChild(s)
}

myFetch.jsonp = function (id) {
  return new Promise((resolve) => {
    const cbName = `callback_${id}`
    addScript(id, cbName)
    window[cbName] = resolve
  })
}
