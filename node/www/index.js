import {EditorState, EditorView, basicSetup} from "@codemirror/next/basic-setup"
import {ViewPlugin} from "@codemirror/next/view"

import debounce from 'lodash/debounce'

const updateView = debounce((encodedDoc) => {
  const preview = document.querySelector('#preview')
  fetch(`/${encodedDoc}`).then(r => r.text()).then(data => {
    preview.innerHTML = data
  })
})

const updateDoc = doc => {
  const encodedDoc = Buffer.from(doc.toString()).toString('base64') 
  updateView(encodedDoc)  
}

const markdownPreviewPlugin = ViewPlugin.fromClass(class {
  update(update) {
    if (update.docChanged) {
      updateDoc(update.state.doc)
    }
  }
})

let view = new EditorView({
  state: EditorState.create({
    extensions: [basicSetup, markdownPreviewPlugin, EditorView.lineWrapping],
    doc: `# Modularity

CodeMirror is set up as a collection of separate modules that, together, provide a full-featured text and code editor. On the bright side, this means that you can pick and choose which features you need, and even replace core functionality with a custom implementation if you need to. On the less bright side, this means that setting up an editor requires you to put together a bunch of pieces.
    
The putting-together part isn't hard, but you will have to install and import the pieces you need. The core packages, without which it'd be hard to set up an editor at all, are:`
  }),
  parent: document.querySelector('#editor')
})

window.editorView = view
window.markdownPreviewPlugin = markdownPreviewPlugin

view.plugin(markdownPreviewPlugin)

updateDoc(view.state.doc)