# tilestrata-utfmerge

A TileStrata plugin for merging JSON [utfgrids](https://github.com/mapbox/utfgrid-spec), usually provided by the [tilestrata-mapnik](https://github.com/naturalatlas/tilestrata-mapnik) plugin.

### Sample Usage

```js
var utfmerge = require('tilestrata-utfmerge');

server.layer('mylayer').route('combined.json')
    .use(utfmerge([
        ['utfgrid-poi','t.json'],
        ['utfgrid-labels','t.json']
    ]));
```

## License

Copyright &copy; 2015 [Natural Atlas, Inc.](https://github.com/naturalatlas) & [Contributors](https://github.com/naturalatlas/tilestrata-utfmerge/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
