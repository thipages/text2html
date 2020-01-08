import {text2html} from "../index.js";
const format=[
    'A',{style:"color:red;"},
    'B',{style:"color:yellow;"},
    'oops',{style:"color:blue;"},
    'list',{tag:'ul'},
];
let testSet=[
    'basic non nested',
    `I am \\oops{stuck}`,
    `I am <span style="color:blue;">stuck</span>`,
    'non nested twice',
    `start\\A{Here I am} and \\B{Here I am stuck}end`,
    `start<span style="color:red;">Here I am</span> and <span style="color:yellow;">Here I am stuck</span>end`,
    'non nested with keys as html tag',
    `start\\em{Here I am} and \\h1{Here I am stuck}end`,
    `start<em>Here I am</em> and <h1>Here I am stuck</h1>end`,
    'nested span',
    `start\n\\begin(A)\nHere I am\n\\begin(B)\nembedded\n\\end\n\\end\nend`,
    `start<span style="color:red;">Here I am<span style="color:yellow;">embedded</span></span>end`,
    'simple list',
    `start\n\\begin(list)\nitem1\nitem2\n\\end\nend`,
    `start<ul><li>item1</li><li>item2</li></ul>end`,
    'list with leading/trailing spaces li',
    `\\begin(list)\n   item1\nitem2   \n\\end`,
    `<ul><li>item1</li><li>item2   </li></ul>`
];

testSet.forEach(
    (v,i)=>{
        if (i%3===0) {
            let r = text2html(testSet[i+1], format);
            if (r.output === testSet[i+2]) {
                console.log("ok",testSet[i]);
            } else {
                console.log("nok",testSet[i], r.output);
            }
        }
    }
);



