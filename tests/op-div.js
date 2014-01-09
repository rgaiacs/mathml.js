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
    name: opDivMiMi,
    tests: [
        ['<mi>x</mi><mo class="clickHere">÷</mo><mi>x</mi>',
            '<mn>1</mn>'
        ],
        ['<mi>x</mi><mo class="clickHere">∕</mo><mi>x</mi>',
            '<mn>1</mn>'
        ],
        ['<mi>x</mi><mo class="clickHere">/</mo><mi>x</mi>',
            '<mn>1</mn>'
        ],
        ['<mi>x</mi><mo class="clickHere">÷</mo><mi>y</mi>',
            '<mi>x</mi><mo>÷</mo><mi>y</mi>'
        ],
        ['<mi>x</mi><mo class="clickHere">∕</mo><mi>y</mi>',
            '<mi>x</mi><mo>∕</mo><mi>y</mi>'
        ],
        ['<mi>x</mi><mo class="clickHere">/</mo><mi>y</mi>',
            '<mi>x</mi><mo>/</mo><mi>y</mi>'
        ]
    ]
}, {
    name: opDivMnMn,
    tests: [
        ['<mn>1</mn><mo class="clickHere">÷</mo><mn>1</mn>',
            '<mn>1.00</mn>'
        ],
        ['<mn>1</mn><mo class="clickHere">∕</mo><mn>1</mn>',
            '<mn>1.00</mn>'
        ],
        ['<mn>1</mn><mo class="clickHere">/</mo><mn>1</mn>',
            '<mn>1.00</mn>'
        ],
        ['<mn>1</mn><mo class="clickHere">÷</mo><mn>2</mn>',
            '<mn>0.50</mn>'
        ],
        ['<mn>1</mn><mo class="clickHere">∕</mo><mn>2</mn>',
            '<mn>0.50</mn>'
        ],
        ['<mn>1</mn><mo class="clickHere">/</mo><mn>2</mn>',
            '<mn>0.50</mn>'
        ]
    ]
}, {
    name: opDivMrowMrow,
    tests: []
}];

run_suite(suite);
slimer.exit();
