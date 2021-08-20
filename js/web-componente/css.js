export const css = /*css*/`
@import url('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/styles/atom-one-light.min.css');

.editor {   
    font-family: "Source Code Pro", monospace;
    font-size: 12px;
    font-weight: 400;
    min-height: 240px;
    letter-spacing: normal;
    line-height: 20px;
    padding: 10px;
    tab-size: 4;
    height: var(--alto);
    overflow: auto;
    resize: none;
    line-height: 1.3;    
}

[contenedor] {
    display: none;
}

.activo {
    display: block;
}
.tabs {
    overflow: hidden;    
    position: sticky;
    top: 0;
    z-index: 1;
}
.tabs button{
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 4px 5px;
    transition: 0.3s;    
    filter: invert(100%);
}

.tabs button:hover {    
    filter: invert(0%);
}

.tabs button.activo {    
    filter: invert(0%);
}
`