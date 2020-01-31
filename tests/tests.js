import {text2html} from "../index.js";
/*const samp=fetch ("asFile")
    .then(response => response.text()
    .then(data => {
        test(data.split("\r\n**"))
    }));*/

const format={
    A:{style:"color:red;"},
    B:{style:"color:yellow;"},
    oops:{style:"color:blue;"},
    list:{tag:'ul'},
    hr: {tag:'hr'}
};
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
    `start\n\\A{\nHere I am\n\\B{\nembedded\n}\n}\nend`,
    `start<span style="color:red;">Here I am<span style="color:yellow;">embedded</span></span>end`,
    'simple list',
    `start\n\\list{\nitem1\nitem2\n}\nend`,
    `start<ul><li>item1</li><li>item2</li></ul>end`,
    'list with leading/trailing spaces li',
    `\\list{\n   item1\nitem2   \n}\n}`,
    `<ul><li>item1</li><li>item2   </li></ul>`,
    'self-contained simple',
    `\\hr\\`,
    `<hr />`,
];


const log=(i,valid,output)=> {
    if (valid) {
        console.log(`${i}- ok`);
    } else {
        console.log(`${i}- nok ${output}`);
    }
};
const filter=(i)=> i/3<=30;
testSet.forEach(
    (v,i)=>{
        if (i%3===0 && filter(i)) {
            let r1 = text2html(format)(testSet[i+1]);
            let valid=r1.output===testSet[i+2];
            log(i/3,valid, r1.output);
        }
    }
);