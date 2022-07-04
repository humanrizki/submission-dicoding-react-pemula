import React, {Component} from 'react'
import ModalAddNewNote from './ModalAddNewNote'
import ModalEditNote from './ModalEditNote'
import ModalReadNote from './ModalReadNote'
import NoteInputBar from './NoteInputBar'
import NoteList from './NoteList'
import {getInitialData, showFormattedDate} from './../utils/index'
class NoteApp extends Component {
    constructor(props){
        super(props)
        this.state = getInitialData()
    }
    handleOpenElementSearch(){
        this.setState((previousState)=>{
            return {
                notes: [
                    ...previousState.notes
                ],
                isBeingEdit: false,
                isBeingAdd: false,
                isBeingRead: false,
                isBeingSearch: !previousState.isBeingSearch,
                editId: null,
                readId: null
            }
        })
    }
    handleOpenModalNewNote(){
        this.setState((previousState)=>{
            return {
                notes: [
                    ...previousState.notes
                ],
                isBeingEdit: false,
                isBeingAdd: !previousState.isBeingAdd,
                isBeingRead: false,
                isBeingSearch: false,
                editId: null,
                readId: null
            }
        })
    }
    handleOpenModalEditNote(id){
        let ids = null
        if(id) ids = id
        this.setState((previousState)=>{
            return {
                notes: [
                    ...previousState.notes
                ],
                isBeingEdit: !previousState.isBeingEdit,
                isBeingAdd: false,
                isBeingRead: false,
                isBeingSearch: false,
                editId: ids,
                readId: null
            }
        })
    }
    handleOpenModalReadNote(id){
        let ids = null
        if(id) ids = id
        this.setState((previousState)=>{
            return {
                notes: [
                    ...previousState.notes
                ],
                isBeingEdit: false,
                isBeingAdd: false,
                isBeingRead: !previousState.isBeingRead,
                isBeingSearch: false,
                editId: null,
                readId: ids
            }
        })
    }
    onHandleAddNewNote({title, note}){
        this.setState((previous)=>{
            return {
                notes: [
                    ...previous.notes,
                    {
                        id: +new Date(),
                        title: title,
                        note: note,
                        createdAt: new Date().getTime(),
                        updatedAt: null,
                        archived: false
                    }
                ],
                isBeingAdd: false,
                isBeingEdit: false,
                isBeingRead: false,
                isBeingSearch: false,
                editId: null,
                readId: null
            }
        })
    }
    onHandleUpdateNote({id, title, note, createdAt}){
        let allNotes = this.state.notes
        const updateNotes = allNotes.map((allNote)=>{
            if(allNote.id === id){
                return {...allNote, 
                    title: title, 
                    note: note,
                    createdAt: createdAt, 
                    updatedAt: new Date().getTime()}
            }
            return allNote
        })
        this.setState((previous)=>{
            return {
                notes: [
                    ...updateNotes
                ],
                isBeingAdd: false,
                isBeingEdit: false,
                isBeingRead: false,
                isBeingSearch: false,
                editId: null,
                readId: null
            }
        })
    }
    onHandleDeleteNote(id){
        this.setState((previous)=>{
            return {
                notes: [
                    ...previous.notes.filter((note)=>{
                        return note.id !== id
                    })
                ],
                isBeingAdd: false,
                isBeingEdit: false,
                isBeingRead: false,
                isBeingSearch: false,
                editId: null,
                readId: null
            }
        })
    }
    onHandleArchivedNote(id){
        let allNotes = this.state.notes
        const updateNotes = allNotes.map((allNote)=>{
            if(allNote.id === id){
                return {...allNote, 
                    archived: !allNote.archived}
            }
            return allNote
        })
        this.setState(()=>{
            return {
                notes: [
                    ...updateNotes
                ],
                isBeingAdd: false,
                isBeingEdit: false,
                isBeingRead: false,
                isBeingSearch: this.state.isBeingSearch,
                editId: null,
                readId: null
            }
        })
    }
    onHandleSearchNote({title}){
        console.log(this.state.notes.filter((note)=>note.note.includes(title)))
    }
    render(){
        return (
            <>
                <NoteInputBar onClickAdd={this.handleOpenModalNewNote.bind(this)} onClickSearch={this.handleOpenElementSearch.bind(this)} isBeingSearch={this.state.isBeingSearch} notes={this.state.notes}/>
                <NoteList notes={this.state.notes} thisNoteInstance={this} handleOpenModalReadNote={this.handleOpenModalReadNote.bind(this)} handleDeleteNote={this.onHandleDeleteNote.bind(this)} onShowFormattedDate={showFormattedDate} onHandleArchivedNote={this.onHandleArchivedNote.bind(this)}/>
                <AddNote isBeingAdd={this.state.isBeingAdd} thisInstanceOpen={this.handleOpenModalNewNote.bind(this)} thisHandleAddNewNote={this.onHandleAddNewNote.bind(this)}/>
                <UpdateNote isBeingEdit={this.state.isBeingEdit} thisInstanceOpen={this.handleOpenModalEditNote.bind(this)} thisHandleUpdateNote={this.onHandleUpdateNote.bind(this)} notes={this.state.notes} editId={this.state.editId}/>
                <ReadNote isBeingRead={this.state.isBeingRead} thisInstanceOpen={this.handleOpenModalReadNote.bind(this)} notes={this.state.notes} readId={this.state.readId}/>
            </>
        )
    }
}
function AddNote({isBeingAdd, thisInstanceOpen, thisHandleAddNewNote}){
    if(isBeingAdd){
        return (<ModalAddNewNote onClickOpen={thisInstanceOpen} handleAddNewNote={thisHandleAddNewNote}/>)
    } else {
        return
    }
}
function UpdateNote({isBeingEdit, thisInstanceOpen, thisHandleUpdateNote, notes,editId}){
    if(isBeingEdit){
        let notesInstance = notes[notes.findIndex((val)=>{
            return val.id === editId
        })]
        return (<ModalEditNote onClickOpen={thisInstanceOpen} handleUpdateNote={thisHandleUpdateNote} notes={notesInstance}/>)
    } else {
        return
    }
}
function ReadNote({isBeingRead, thisInstanceOpen, notes, readId}){
    if(isBeingRead){
        let notesInstance = notes[notes.findIndex((val)=>{
            return val.id === readId
        })]
        return (<ModalReadNote onClickOpen={thisInstanceOpen} notes={notesInstance}/>)
    } else {
        return
    }
}
export default NoteApp