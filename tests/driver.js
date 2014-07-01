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

// Test Driver

// Include libraries
phantom.injectJs("../jquery-2.0.3.min.js");
phantom.injectJs("../mathml.js");

function run_test(function2test, input, expect) {
    math = document.createElement('math');
    math.innerHTML = input;
    mathmlHandleClick(math.getElementsByClassName('clickHere')[0]);
    if (math.innerHTML.replace(/( draggable="true"| class="clickHere")/g, '') != expect) {
        console.log("FAIL: " + function2test.name + " at " + input);
        console.log("  Expect: " + expect);
        console.log("  Get:    " + math.innerHTML.replace(/ draggable="true"/g, ''));
    }
}

// A suite have the form
//
//     [
//         {'name': function,
//          'tests': [
//                       ['input1',
//                        'output2'],
//                       ['input1',
//                        'output2']
//                   ]
//         }
//     ]
//
function run_suite(suite) {
    for (var i = 0; i < suite.length; i++) {
        for (var j = 0; j < suite[i].tests.length; j++) {
            run_test(suite[i].name, suite[i].tests[j][0], suite[i].tests[j][1]);
        }
    }
}
