const arrayToMap=(a)=>a.reduce((acc,v,i)=>{
        if ((i+1)%2===0) acc.set(a[i-1],v);
        return acc;
    },new Map());
const oTagger=(t,a)=>`<${t}${a?' '+a:''}>`;
const cTagger=(t)=>`</${t}>`;
const specials=". \ + * ? [ ^ ] $ ( ) { } = ! < > | : -";
const prep=(input,d1,d2)=> {
    let c=[d1,d2].map (v=> specials.indexOf(v)?'\\'+v:v);
    let re= [
        new RegExp(`${c[0]}([a-zA-Z][a-zA-Z0-9]*)${c[1]}`,"g"),
        new RegExp(`${c[1]+c[0]}`,"g")
    ];
    let all=[
        ...Array.from(input.matchAll(re[0])),
        ...(Array.from(input.matchAll(re[1])).map(v=>{v._=true;return v;}))
    ];
    all=all.sort((a,b)=>a.index===b.index?0:a.index<b.index?-1:1);
    return {matches:all,offset:0,endLength:2}
};
export const text2html=(input, def=[], oChar='|', cChar='^')=> {
    let c=0,
        markers=[],
        {matches,offset, endLength}=prep(input,oChar,cChar),
        output=[],
        warnings=[],
        ulIndexes=[],
        map=arrayToMap(def);
    for (let temp of map.entries()) {
        map.set (temp[0],
            {
                tag:temp[1].tag?temp[1].tag:'span',
                attr:Object.keys(temp[1]).reduce ((acc,v)=>{
                    if (v!=='tag') acc.push(`${v}="${temp[1][v]}"`);
                    return acc;
                },[]).join(' ')
            });
    }
    matches.forEach(
        (v,i)=> {
            if(v._) {
                let b=markers.pop();
                if (b) {
                    output.push(input.substring(c,v.index));
                    // Index Separation between ul and enclosed text
                    output.push(cTagger(b.tag));
                    c=v.index+endLength;
                    if (b.tag==='ul') {
                        let bul=ulIndexes.pop();
                        if (bul!==null) {
                            output[bul]+= output
                                .splice(bul+1,output.length-2)
                                .join('').replace(/^\n|\n$/g, '')
                                .split("\n")
                                .map (l=>`<li>${l.replace(/^\s+/g, '')}</li>`).join("");
                        } else {
                            warnings.push();
                        }
                    }
                } else {
                    warnings.push();
                }
            } else {
                if (!map.has(v[1])) {
                    v.tag='undefined';
                    v.attr=null,
                    warnings.push();
                } else {
                    v.tag=map.get(v[1]).tag;
                    v.attr=map.get(v[1]).attr;
                }
                output.push(input.substring(c,v.index+offset)+oTagger(v.tag,v.attr));
                c=v.index+v[0].length-offset;
                if (v.tag==='ul') ulIndexes.push(output.length-1);
                markers.push(v);
            }
        }
    );
    output.push(input.substr(c));
    output=output.join("");
    return {output,warnings};
};