# tilestrata-utfmerge
A TileStrata plugin for merging utfgrids

### Sample Usage

```js
var utfmerge = require('tilestrata-utfmerge');

server.layer('mylayer').route('combined.json')
    .use(utfmerge([
        ['utfgrid-poi','t.json'],
        ['utfgrid-labels','t.json']
    ]));
```