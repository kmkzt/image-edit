const testFunc = require('./library').default

describe('sample', () => {
  it('test', () => {
    document.body.innerHTML = `
      <body>
        <div id="sample">sample</div>
      </body>
    `
    testFunc('#sample')
    expect(document.querySelector('#sample').innerHTML).not.toBe('sample')
  })
})
