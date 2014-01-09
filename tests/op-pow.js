// MathML.js
// Copyright (C) 2014  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

phantom.injectJs("driver.js");

var suite = [{
    name: opPowMiMi,
    tests: [
        ['<msup class="clickHere"><mi>x</mi><mi>x</mi></msup>',
            '<msup><mi>x</mi><mi>x</mi></msup>'
        ],
        ['<msup class="clickHere"><mi>x</mi><mi>y</mi></msup>',
            '<msup><mi>x</mi><mi>y</mi></msup>'
        ]
    ]
}, {
    name: opPowMnMn,
    tests: [
        ['<msup class="clickHere"><mn>1</mn><mn>0</mn></msup>',
            '<mn>1.00</mn>'
        ],
        ['<msup class="clickHere"><mn>1</mn><mn>1</mn></msup>',
            '<mn>1.00</mn>'
        ],
        ['<msup class="clickHere"><mn>1</mn><mn>2</mn></msup>',
            '<mn>1.00</mn>'
        ],
        ['<msup class="clickHere"><mn>2</mn><mn>0</mn></msup>',
            '<mn>1.00</mn>'
        ],
        ['<msup class="clickHere"><mn>2</mn><mn>1</mn></msup>',
            '<mn>2.00</mn>'
        ],
        ['<msup class="clickHere"><mn>2</mn><mn>2</mn></msup>',
            '<mn>4.00</mn>'
        ],
        ['<msup class="clickHere"><mn>2</mn><mn>0.5</mn></msup>',
            '<mn>1.41</mn>'
        ]
    ]
}, {
    name: opPowMrowMrow,
    tests: []
}];

run_suite(suite);
slimer.exit();
