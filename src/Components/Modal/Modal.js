import React, {useState, useEffect} from 'react'

import './Modal.scss'


const Modal = ({
  visible = false,
  onClose,
  createHandler,
}) => {

  const onKeydown = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose()
        break
    }
  }
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  if (!visible) return null

  
  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-dialog' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h3 className='modal-title'>Create new post</h3>
          <span className='modal-close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <div className='modal-content'>
              <textarea
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          placeholder="Enter text..."
        /></div>

        </div>
       
          <footer>

          <div className='modal-footer'>
          <button onClick={(e) => {e.preventDefault();createHandler(newNoteText);setNewNoteText('');}}>
            Add
          </button>
          <button onClick={onClose}>Закрыть</button>
          </div>
          </footer>
        
      </div>
    </div>
  )
}

export default Modal;