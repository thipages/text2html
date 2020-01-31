import {t2h, text2html} from "../index.js";
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
let testSet=(p,o,c)=>[
    'basic non nested',
    `I am ${p}oops${o}stuck${c}`,
    `I am <span style="color:blue;">stuck</span>`,
    'non nested twice',
    `start${p}A${o}Here I am${c} and ${p}B${o}Here I am stuck${c}end`,
    `start<span style="color:red;">Here I am</span> and <span style="color:yellow;">Here I am stuck</span>end`,
    'non nested with keys as html tag',
    `start${p}em${o}Here I am} and ${p}h1${o}Here I am stuck${c}end`,
    `start<em>Here I am</em> and <h1>Here I am stuck</h1>end`,
    'nested span',
    `start\n${p}A${o}\nHere I am\n${p}B${o}\nembedded\n${c}\n${c}\nend`,
    `start<span style="color:red;">Here I am<span style="color:yellow;">embedded</span></span>end`,
    'simple list',
    `start\n${p}list${o}\nitem1\nitem2\n${c}\nend`,
    `start<ul><li>item1</li><li>item2</li></ul>end`,
    'list with leading/trailing spaces li',
    `${p}list${o}\n   item1\nitem2   \n${c}`,
    `<ul><li>item1</li><li>item2   </li></ul>`,
    'self-contained simple',
    `${o}hr${c}`,
    `<hr />`
];
const log=(i,valid,output)=> {
    if (valid) {
        console.log(`${i}- ok`);
    } else {
        console.log(`${i}- nok ${output}`);
    }
};
const config=['$','{','}'];
const trans=t2h(config);
const filter=(i)=> i/3<=30;
const ts=testSet(...config);
ts.forEach(
    (v,i)=>{
        if (i%3===0 && filter(i)) {
            let r1 = trans(format)(ts[i+1]);
            let valid=r1.output===ts[i+2];
            log(i/3,valid, r1.output);
        }
    }
);