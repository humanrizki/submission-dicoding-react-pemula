import React, {Component} from 'react'
import NoteListItem from './NoteListItem'
import { EmojiFrown } from 'react-bootstrap-icons'
class NoteList extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedId: null
        }
        this.handleOpenPopUp = this.handleOpenPopUp.bind(this)
        this.handleClosePopUp = this.handleClosePopUp.bind(this)
    }
    handleOpenPopUp(keyId){
        this.setState({
            selectedId: keyId
        })
    }
    handleClosePopUp(){
        this.setState({
            selectedId: null
        })
    }
    render(){
        return (
            <>
                <CheckArchivedToPlacedElementTarget notes={this.props.notes} handleClosePopUp={this.handleClosePopUp} handleOpenPopUp={this.handleOpenPopUp} selectedId={this.state.selectedId} handleOpenModalEditNote={this.props.thisNoteInstance.handleOpenModalEditNote} thisNoteInstance={this.props.thisNoteInstance} handleDeleteNote={this.props.handleDeleteNote} handleOpenModalReadNote={this.props.handleOpenModalReadNote} showFormattedDate={this.props.onShowFormattedDate} handleArchivedNote={this.props.onHandleArchivedNote}/>
            </>
            
        )
    }
} 

function CheckArchivedToPlacedElementTarget({notes,handleOpenPopUp, selectedId, handleClosePopUp, handleOpenModalEditNote,handleDeleteNote, handleOpenModalReadNote, thisNoteInstance, showFormattedDate, handleArchivedNote}){
        const archivedNote = []
        const activeNote = []
        notes.forEach((note)=>{
            if(note.archived === false){
                activeNote.push(note)
            } else {
                archivedNote.push(note)
            }
        })
        return (
            <>
                <div className='note-app__list-container-active_note mt-3'>
                    <h1 className='note-app__list-container__title-active-note text-2xl text-center'>Active Note</h1>
                    {activeNote.length === 0 ? 
                        <EmptyNotes message="Tidak ada notes yang aktif!"/> : 
                        <div className='grid md:grid-cols-3 gap-3 mt-3'>
                            {activeNote.map((note)=>(
                                <NoteListItem key={note.id} {...note} openPopUp={handleOpenPopUp} keyId={note.id} selectedId={selectedId} closePopUp={handleClosePopUp} handleOpenEditModal={handleOpenModalEditNote.bind(thisNoteInstance)} handleDeleteNote={handleDeleteNote} onHandleOpenReadModal={handleOpenModalReadNote.bind(thisNoteInstance)} showFormattedDate={showFormattedDate} handleArchivedNote={handleArchivedNote}/>
                            ))}
                        </div>
                    }
                </div>
                <div className='note-app__list-container-archive_note mt-3'>
                    <h1 className='note-app__list-container__title-archive-note text-2xl text-center'>Archive Note</h1>
                    {archivedNote.length === 0 ? 
                        <EmptyNotes message="Tidak ada di archive!"/> :
                        <div className='grid md:grid-cols-3 gap-3 mt-3'>
                            {archivedNote.map((note)=>(
                                <NoteListItem key={note.id} {...note} openPopUp={handleOpenPopUp} keyId={note.id} selectedId={selectedId} closePopUp={handleClosePopUp} handleOpenEditModal={handleOpenModalEditNote.bind(thisNoteInstance)} handleDeleteNote={handleDeleteNote} onHandleOpenReadModal={handleOpenModalReadNote.bind(thisNoteInstance)} showFormattedDate={showFormattedDate} handleArchivedNote={handleArchivedNote}/>
                            ))}
                        </div>
                    }
                </div>
            </>
        )
}
function EmptyNotes({message}){
    return (
        <div className='note-app_list-item-empty w-full bg-red-100 border-dashed border-2 border-black rounded-lg mt-3 h-72 inline-flex justify-center items-center'>
            <div className="text-center w-full inline-flex flex-col items-center">
                <div className="p-2 rounded-full bg-red-300 w-16 h-16"><EmojiFrown className="h-full w-full text-red-500"/></div>
                <p className="text-md mt-5 text-red-500">{message}</p>
                
            </div>
        </div>
    )
}
export default NoteList