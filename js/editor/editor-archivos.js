const html = /*html*/`
<div>
    <div class="tabs hljs">
    </div>
    <div class="editores">    
    </div>
</div>
`;

function createEditor(element, tipo, fcolor = null) {
    const highlight = (editor) => {
        editor.textContent = editor.textContent;
        let code = editor.textContent;                
        let html = hljs.highlight(code, {language: tipo}).value;
        editor.innerHTML = html;
    }
    if (fcolor == null){
        return CodeJar(element,  withLineNumbers(highlight) );
    }
    return CodeJar(element,  withLineNumbers(fcolor) );
}


class EditorArchivos extends HTMLElement {
    constructor() {
        super();
        this.files = [];
        this.contadorTab = 0;
    }

    creaTab(titulo, con) {
        let tab = document.createElement('button');
        this.tabs.append(tab);
        tab.innerHTML = `${titulo}`;
        tab.id = `tab-${con}`;
        tab.setAttribute('tab', '');        
        return tab;
    }

    creaEditor(dato, con) {
        let editor = document.createElement('div');
        this.editores.append(editor);
        editor.innerHTML = `<div id="file+${con}" class="editor hljs language-${dato.tipo}"></div>`;
        editor.classList.add('contenedor-'+con);
        editor.setAttribute('contenedor', '');
        let div = editor.querySelector('div');
        let jar = createEditor(div, dato.tipo, dato.fcolor);
        jar.updateCode(dato.codigo);
        return {editor, jar};
    }

    remueveActivo(selector) {
        let items = this.querySelectorAll(selector);
        for(let item of items) {
            item.classList.remove('activo');
        }
    }
    
    activa(tab, contenedor) {
        this.remueveActivo('[tab]');
        this.remueveActivo('[contenedor]');
        tab.classList.add('activo');
        contenedor.classList.add('activo');
    }

    addListenersTabEditor(tab, editor) {
        tab.addEventListener('click', ev=> {
            this.activa(tab,editor);
        });
    }

    getMetadataFile() {
        return {        
            titulo: '',
            tipo: '',
            codigo: '',
            fcolor: null            
        }
    }

    render() {        
        this.innerHTML = `        
        ${html}
        `;
        this.tabs = this.querySelector('.tabs');
        this.editores = this.querySelector('.editores');
        for(let item of this.files) {
            this.contadorTab ++;
            let dato = this.getMetadataFile();
            dato = Object.assign(dato, item);            
            let tab = this.creaTab(item.titulo, this.contadorTab);
            let editor = this.creaEditor(dato, this.contadorTab);
            this.addListenersTabEditor(tab, editor.editor);
        }
    }

    setFiles(files) {
        this.files = files;
        this.render();
    }
}

customElements.define('editor-archivos-codejar', EditorArchivos);