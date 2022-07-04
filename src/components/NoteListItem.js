import React from 'react'
import {ThreeDotsVertical, X} from 'react-bootstrap-icons'
function NoteListItem({title, createdAt, updatedAt, note, keyId, openPopUp, selectedId, closePopUp, handleOpenEditModal, handleDeleteNote, onHandleOpenReadModal, showFormattedDate, handleArchivedNote}){
        let changeTitle;
        if(String(title).length >= 15){
            changeTitle = String(title).substring(0,13)+'...'
        } else {
            changeTitle = String(title)
        }
        return (
            <div className='note-app__list-item h-50 grid-cols-1 bg-white border-2 border-dashed border-black rounded-lg p-2 shadow' id={'note-'+keyId}>
                <div className='note-app__list-item-header w-full flex justify-between items-center p-1'>
                    <div className='note-app__list-item-header_item flex items-center gap-2'>
                        <h1 className='text-2xl w-40'>{changeTitle}</h1><div className='w-3 h-3 rounded-full bg-gray-300'></div><p className='text-sm text-gray-400'>{showFormattedDate(createdAt)}</p>
                    </div>
                    <div className='note-app__list-item-header_item relative'>
                        <button className='p-1 rounded text-base w-7 h-7 rounded-full hover:bg-gray-200' onClick={()=>{
                            openPopUp(keyId)
                        }}><ThreeDotsVertical className="w-full h-full"/></button>
                        <CheckOpenPopUp keyId={keyId} state={selectedId} onClosePopUp={closePopUp} onHandleOpenEditModal={handleOpenEditModal} onHandleDeleteNote={handleDeleteNote} onHandleArchivedNote={handleArchivedNote}/>
                    </div>
                </div>
                <hr/>
                <div className='note-app__list-item-body overflow-y-auto h-24 mt-2'>
                    <p className='text-base'>{note}</p>
                </div>
                <CheckEdited updatedAt={updatedAt} onHandleOpenReadModal={onHandleOpenReadModal} keyId={keyId} showFormattedDate={showFormattedDate}/>
            </div>
        )
} 
function CheckEdited({updatedAt, onHandleOpenReadModal, keyId, showFormattedDate}){
    if(updatedAt){
        return (
            <div className='note_app__list-item-footer mt-2 flex justify-between h-max items-center'>
                <p className='w-2/5 h-full text-gray-300 text-sm'>edited : {showFormattedDate(updatedAt)}</p>
                <button className='w-1/5 h-full p-2 rounded bg-gray-200 border-2 border-black border-dashed' onClick={()=>{
                        onHandleOpenReadModal(keyId)
                    }} type="button">Read</button>
            </div>
        )
    } else {
        return (
            <div className='note_app__list-item-footer mt-2 flex justify-end h-max items-center'>
                <button className='w-1/5 h-full p-2 rounded bg-gray-200 border-2 border-black border-dashed' onClick={()=>{
                        onHandleOpenReadModal(keyId)
                    }} type="button">Read</button>
            </div>
        )
    }
}
function CheckOpenPopUp({keyId, state, onClosePopUp, onHandleOpenEditModal, onHandleDeleteNote, onHandleArchivedNote}){
    if(state === keyId){
        return (
            <div className='absolute top-10 right-0 w-28 h-max z-100 rounded bg-white border-2 border-black border-dashed pt-4'>
                <button className='absolute top-0 right-0 h-7 w-7 rounded-bl rounded-tr border-2 border-black border-dashed inline-flex justify-center items-center' onClick={onClosePopUp}><X className='w-full h-full'/></button>
                <button className='w-full text-left mt-5 hover:bg-yellow-300 p-2' onClick={()=>{
                    onHandleOpenEditModal(state)
                    onClosePopUp()
                }}>Edit</button>
                <button className='w-full text-left hover:bg-gray-300 p-2 hover:text-white' onClick={()=>{
                    onHandleArchivedNote(state)
                    onClosePopUp()
                }}>Archive</button>
                <button className='w-full text-left p-2 hover:bg-red-400 hover:text-white' onClick={()=>{
                    onHandleDeleteNote(state)
                    onClosePopUp()
                }}>Delete</button>
            </div>
        )
    }
    return
}
export default NoteListItem