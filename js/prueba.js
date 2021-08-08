import './editor/editor-archivos.js';

let editor = document.querySelector('editor-archivos-codejar');

const my = editor => {
    let code = editor.textContent;
    code = code.replace(
      /\((\w+?)(\b)/g,
      '(<font color="#8a2be2">$1</font>$2'
    );
    editor.innerHTML = code;
};


const rainbow = (ch, i) => {
    let red   = Math.round(Math.sin(0.01 * i + 0) * 127 + 128);
    let green = Math.round(Math.sin(0.01 * i + 2 * Math.PI / 3) * 127 + 128);
    let blue  = Math.round(Math.sin(0.01 * i + 4 * Math.PI / 3) * 127 + 128);
    return `<span style="color: rgb(${red}, ${green}, ${blue})">${ch}</span>`;
  };
  
  const lolcat = editor => {
    const code = editor.textContent
      .split('')
      .map(rainbow)
      .join('');
    editor.innerHTML = code;
  };
  

editor.setFiles([
    {
        titulo: 'HTML',
        tipo: 'html',
        codigo: '<!--HTML-->'
    },
    {
        titulo: 'CSS',
        tipo: 'css',
        codigo: '/*css*/'
    },
    {
        titulo: 'Js',
        tipo: 'js',
        codigo: '//js',
        fcolor: lolcat
    },
    {
        titulo: 'YOLO',
        tipo: 'yolo',
        codigo: '/*yolo*/',
        fcolor: my
    }
]);