const arrayToMap=(a)=>a.reduce((acc,v,i)=>{
        if ((i+1)%2===0) acc.set(a[i-1],v);
        return acc;
    },new Map());
const htmlMap=(a)=> {
    let map=arrayToMap(a);
    for (let temp of map.entries()) {
        let t=temp[1].tag;
        if (t!=='script') {
            map.set(temp[0],
                {
                    tag: t ? t : 'span',
                    attr: Object.keys(temp[1]).reduce((acc, v) => {
                        if (v !== 'tag') acc.push(`${v}="${temp[1][v]}"`);
                        return acc;
                    }, []).join(' ')
                });
        }
    }
    return map;
};
const oTagger=(t,a)=>`<${t}${a?' '+a:''}>`;
const cTagger=(t)=>`</${t}>`;
const wrapper=(tag,text,attr="")=>`${oTagger(tag,attr)}${text}${cTagger(tag)}`;
const begin=/^\\(begin)\(([a-zA-Z][A-Za-z0-9]*)\)$/gm;
const end=/^\\(end)$/gm;
const nonNested=/\\([a-zA-Z][a-zA-Z0-9]*){([^\\]*)}/g;
const trimNewline=(s)=>s.replace(/^[\r\n|\r|\n]|[\r\n|\r|\n]$/g,'');
const defaultTags=['ul','i','b','em','code','pre','blockquote','h1','h2','h3','h4','h5','h6'];
const ul=(a)=> a.join('').split("\n").map(
            v=>wrapper('li',v.replace(/^\s*/,''))
        ).join('')+cTagger('ul');
export const text2html=(input, def=[],transformer={})=> {
    let map=htmlMap(def);
    defaultTags.forEach (t=>{
        if (!map.has(t)) map.set(t,{tag:t,attr:""});
    });
    if (!transformer['ul']) transformer.ul=ul;
    let output=input
        // remove nested blank lines
        .replace(/^$/g,"\n")
        // resolve non nested pattern
        .replace (nonNested,function (all,key,text) {
        if (map.has(key)) {
            let t=map.get(key);
            return  wrapper(t.tag,text,t.attr);
        } else {
            return 'ERR';
        }
    });
    // resolve nested pattern
    let final=[],index=0, buffer=[], warnings=[];
    const nested=[...Array.from(output.matchAll(begin)), ...Array.from(output.matchAll(end))]
        .sort((a,b)=>a.index===b.index?0:a.index<b.index?-1:1);
    if (nested.length!==0) {
        nested.forEach(
            v => {
                // store text before wrapping structure, remove linebreaks belonging to the pattern
                let o = trimNewline(output.substring(index, v.index));
                if (o!=="") final.push(o);
                if (v[1] === 'end') {
                    let nItem = buffer.pop();
                    if (!nItem) {
                        warnings.push();
                    } else if (map.has(nItem[1])) {
                        let tag=map.get(nItem[1]).tag;
                        final.push(
                            transformer[tag]
                                ? transformer[tag](final.splice(nItem[0]+1, final.length))
                                : cTagger(tag)
                        );
                     } else {
                        warnings.push();
                    }
                } else if (v[1] === 'begin') {
                    if (map.has(v[2])) {
                        let t=map.get(v[2]);
                        final.push(oTagger(t.tag,t.attr));
                    } else {
                        final.push(oTagger("span"));
                        warnings.push();
                    }
                    buffer.push([final.length - 1, v[2]]);
                }
                index = v[0].length + v.index;
            }
        );
        final.push(output.substr(index + 1));
        output=final.join('');
    }
    return {output,all: nested, warnings}
};