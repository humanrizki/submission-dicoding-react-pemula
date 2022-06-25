import React, {Component} from 'react'
import NoteListItem from './NoteListItem'

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
            <div className="note-app__list-container grid md:grid-cols-3 grid-cols-1 gap-3 mt-3">
                {this.props.notes.map((note)=>(
                    <NoteListItem key={note.id.toString()} {...note} openPopUp={this.handleOpenPopUp} keyId={note.id} selectedId={this.state.selectedId} closePopUp={this.handleClosePopUp} handleOpenEditModal={this.props.thisNoteInstance.handleOpenModalEditNote.bind(this.props.thisNoteInstance)} handleDeleteNote={this.props.handleDeleteNote} onHandleOpenReadModal={this.props.handleOpenModalReadNote.bind(this.props.thisNoteInstance)} edited={note.edited}/>
                ))}
            </div>
        )
    }
} 
export default NoteList