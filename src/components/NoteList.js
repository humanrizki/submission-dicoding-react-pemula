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
        console.log(this.props.notes)
        return (
            <>
                {/* {this.props.notes !== [] ? 
                    <div className="note-app__list-container grid md:grid-cols-3 grid-cols-1 gap-3 mt-3">
                        {this.props.notes.map((note)=>(
                            <NoteListItem key={note.id.toString()} {...note} openPopUp={this.handleOpenPopUp} keyId={note.id} selectedId={this.state.selectedId} closePopUp={this.handleClosePopUp} handleOpenEditModal={this.props.thisNoteInstance.handleOpenModalEditNote.bind(this.props.thisNoteInstance)} handleDeleteNote={this.props.handleDeleteNote} onHandleOpenReadModal={this.props.handleOpenModalReadNote.bind(this.props.thisNoteInstance)} edited={note.edited}/>
                        ))}
                    </div> :
                    <EmptyNotes/>
                } */}
                <CheckEmptyOrNotTheNotes notes={this.props.notes} handleClosePopUp={this.handleClosePopUp} handleOpenPopUp={this.handleOpenPopUp} selectedId={this.state.selectedId} handleOpenModalEditNote={this.props.thisNoteInstance.handleOpenModalEditNote} thisNoteInstance={this.props.thisNoteInstance} handleDeleteNote={this.props.handleDeleteNote} handleOpenModalReadNote={this.props.handleOpenModalReadNote}/>
            </>
            
        )
    }
} 
function CheckEmptyOrNotTheNotes({notes, handleOpenPopUp, selectedId, handleClosePopUp, handleOpenModalEditNote,handleDeleteNote, handleOpenModalReadNote, thisNoteInstance}){
    if(notes.length === 0){
        return <EmptyNotes/>
    } else {
        return (
            <div className="note-app__list-container grid md:grid-cols-3 grid-cols-1 gap-3 mt-3">
                {notes.map((note)=>(
                    <NoteListItem key={note.id.toString()} {...note} openPopUp={handleOpenPopUp} keyId={note.id} selectedId={selectedId} closePopUp={handleClosePopUp} handleOpenEditModal={handleOpenModalEditNote.bind(thisNoteInstance)} handleDeleteNote={handleDeleteNote} onHandleOpenReadModal={handleOpenModalReadNote.bind(thisNoteInstance)} edited={note.edited}/>
                ))}
            </div>
        )
    }
}
function EmptyNotes(){
    return (
        <div className='note-app_list-item-empty w-full bg-red-100 border-dashed border-2 border-black rounded-lg mt-3 h-72 inline-flex justify-center items-center'>
            <div className="text-center w-full inline-flex flex-col items-center">
                <div className="p-2 rounded-full bg-red-300 w-16 h-16"><EmojiFrown className="h-full w-full text-red-500"/></div>
                <p className="text-md mt-5 text-red-500">Empty data here! Lets add some note!</p>
                
            </div>
        </div>
    )
}
export default NoteList