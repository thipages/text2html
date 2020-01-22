# text2html
Text to HTML formatter and more ...


## Basic usage
```javascript
const format = {
    blue:{tag:'span',style:'color:blue;'}
}
// returns I am <span style="color:blue;">stuck</span>
text2html(format)("I am $blue{stuck}").output;
```

## Features                                     
| #   | Pattern       | Feature             |  
| --- | ------------- |---------------------|  
|  1  | $key{text}    | wraps text          |  
|  2  | $key{         | wraps content       |  
|     | }             |                     |  
|  3  | ${key}        | adds content        |  
|  4  | $_key[:type]  | segments content*   |

\* not yet implemented

## Rules applied
* Empty lines are removed
* Line breaks are mapped to *br*
* Pattern #1 #3 can be inline
* Pattern #2 #4 cannot be inline
  * They must fill one line
  * Content leading spaces are removed
* *ul* key or tag wraps content mapping line breaks to *li* tag
  * Leading spaces are removed
* *span* is the default format tag property
* *text* CANNOT have embedded pattern
* *key* starts with a letter followed by letter/digit/hyphen
* Some *keys* are matching HTML tags
  * *ul*, *i*, *strong*, *b*, *em*, *code*, *pre*, *blockquote*, *h1*, *h2*, *h3*, *h4*, *h5*, *h6*