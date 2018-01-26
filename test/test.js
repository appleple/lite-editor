const Nightmare = require('nightmare');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const test_url = "file:///"+path.resolve(__dirname,"../examples/vanilla.html");

const nightmare = Nightmare({
    webPreferences  : {
    partition : 'nopersist',
    preload: path.resolve(__dirname,'./preload.js')
  },
  show: true
});

describe('test',() => {
});