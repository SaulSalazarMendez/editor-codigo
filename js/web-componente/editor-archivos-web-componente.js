import {html} from './htm.js';
import {css} from './css.js';

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
        this.editoresJar = [];
    }
    getTodoElCodigo() {
        let codigo = [];
        for(let editor of this.editoresJar) {
            codigo.push(editor.jar.toString());
        }
        return codigo;
    }
    /**
     * Emite cambio del archivo modificado
     * @param {HTMLElement} target 
     * @param {string} codigo 
     */
    emiteCambio(target, codigo) {
        let ev = new CustomEvent('cambio-editor', {
            detail: {
                target: target,                
                codigo: codigo
            }
        });        
        this.dispatchEvent(ev);
    }
    /**
     * Emite el clip del icono que se haya dado clic
     * @param {HTMLElement} target 
     * @param {number} con 
     */
    emiteclipIcono(target, con) {
        let ev = new CustomEvent('click-icono', {
            detail: {
                target: target,
                index: con-1
            }
        })
        this.dispatchEvent(ev);
    }

    creaTab(titulo, icono, con) {
        let tab = document.createElement('button');
        this.tabs.append(tab);
        tab.innerHTML = `<span icono>${icono}</span> ${titulo}`;
        tab.id = `tab-${con}`;
        tab.setAttribute('tab', '');
        let spanIcono = tab.querySelector('[icono]');
        spanIcono.addEventListener('click', ev => this.emiteclipIcono(spanIcono, con))
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
            icono: '',
            fcolor: null
        }
    }

    addEventosEditoresJar() {        
        for (let editor of this.editoresJar) {
            editor.jar.onUpdate( codigo => {
                this.emiteCambio(editor.editor, codigo);
            });            
        }
    }

    render() {
        this.innerHTML =`
        <style variables>
        .variables {
            --alto: 100vh;
        }
        </style>
        <style>
        ${css}
        </style>
        ${html}
        `;
        this.tabs = this.querySelector('.tabs');
        this.variables = this.querySelector('[variables]');
        console.log(this.variables);
        this.editores = this.querySelector('.editores');        
        for(let item of this.files) {
            this.contadorTab ++;
            let dato = this.getMetadataFile();
            dato = Object.assign(dato, item);            
            let tab = this.creaTab(dato.titulo, dato.icono, this.contadorTab);
            let editor = this.creaEditor(dato, this.contadorTab);
            this.addListenersTabEditor(tab, editor.editor);
            this.editoresJar.push(editor);            
            if (this.contadorTab == 1){
                this.activa(tab, editor.editor);
            }            
        }
        this.addEventosEditoresJar();
    }

    setAlto(alto) {
        this.variables.innerHTML = `
            .variables {
                --alto: ${alto};
            }
        `;
    }

    setFiles(files) {
        this.files = files;
        this.render();
    }
}

customElements.define('editor-archivos-codejar', EditorArchivos);