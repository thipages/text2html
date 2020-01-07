import {text2html} from "../index.js";
const format=[
    'A',{style:"color:red"},
    'B',{style:"color:yellow"},
    'oops',{style:"color:blue;"},
    'list',{tag:'ul'},
];
let inputs=[
        `start\\A{Here I am} and \\B{Here I am stuck}end`,
        `start\n\\begin(A)\nHere I am\n\\begin(B)\nembedded\n\\end\n\\end\nend`,
        `start\n\\begin(list)\nitem1\nitem2\n\\end\nend`,
        `I am \\oops{stuck}`,
        `\\begin(list)\n   item1\nitem2   \n\\end`
];

let excepted= [
    `start<span style="color:red">Here I am</span> and <span style="color:yellow">Here I am stuck</span>end`,
    `start<span style="color:red">Here I am<span style="color:yellow">embedded</span></span>end`,
    `start<ul><li>item1</li><li>item2</li></ul>end`,
    `I am <span style="color:blue;">stuck</span>`,
    `<ul><li>item1</li><li>item2   </li></ul>`
];

inputs.forEach(
    (v,i)=>{
        let r=text2html(inputs[i],format);
        if (r.output===excepted[i]) {
            console.log("ok");
        } else {
            console.log("nok",r.output);
        }

    }
);



