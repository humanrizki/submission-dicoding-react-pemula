import React, {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import ModalAddNewNote from './ModalAddNewNote'
import ModalEditNote from './ModalEditNote'
import ModalReadNote from './ModalReadNote'
import v4Options from '../config/v4Options'
import NoteInputBar from './NoteInputBar'
import NoteList from './NoteList'
import getData from './../utils/data'
class NoteApp extends Component {
    constructor(props){
        super(props)
        this.state = getData()
    }
    onAddNewNoteHanler({title, note}){
        this.setState((previousState)=>{
            return {
                notes: [
                    ...previousState.notes,
                    {
                        id: uuidV4(v4Options),
                        title: title,
                        note: note,
                        added: null,
                        edited: null
                    }
                ],
                isBeingEdit: false,
                isBeingAdd: false,
                isBeingRead: false,
                editId: null,
                readId: null
            }
        })
    }
    handleOpenModalNewNote(){
        if(this.state.isBeingAdd){
            this.setState((previousState)=>{
                return {
                    notes: [
                        ...previousState.notes
                    ],
                    isBeingEdit: false,
                    isBeingAdd: false,
                    isBeingRead: false,
                    editId: null,
                    readId: null
                }
            })
        } else {
            this.setState((previousState)=>{
                return {
                    notes: [
                        ...previousState.notes
                    ],
                    isBeingEdit: false,
                    isBeingAdd: true,
                    isBeingRead: false,
                    editId: null,
                    readId: null
                }
            })
        }
    }
    handleOpenModalEditNote(id){
        if(this.state.isBeingEdit){
            this.setState((previousState)=>{
                return {
                    notes: [
                        ...previousState.notes
                    ],
                    isBeingEdit: false,
                    isBeingAdd: false,
                    isBeingRead: false,
                    editId: null,
                    readId: null
                }
            })
        } else {
            this.setState((previousState)=>{
                return {
                    notes: [
                        ...previousState.notes
                    ],
                    isBeingEdit: true,
                    isBeingAdd: false,
                    isBeingRead: false,
                    editId: id,
                    readId: null
                }
            })
        }
    }
    handleOpenModalReadNote(id){
        console.log(this)
        if(this.state.isBeingRead){
            this.setState((previousState)=>{
                return {
                    notes: [
                        ...previousState.notes
                    ],
                    isBeingEdit: false,
                    isBeingAdd: false,
                    isBeingRead: false,
                    editId: null,
                    readId: null
                }
            })
        } else {
            this.setState((previousState)=>{
                return {
                    notes: [
                        ...previousState.notes
                    ],
                    isBeingEdit: false,
                    isBeingAdd: false,
                    isBeingRead: true,
                    editId: null,
                    readId: id
                }
            })
        }
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
                        added: new Date().toLocaleDateString(),
                        edited: null
                    }
                ],
                isBeingAdd: false,
                isBeingEdit: false,
                isBeingRead: false,
                editId: null,
                readId: null
            }
        })
    }
    onHandleUpdateNote({id, title, note, added}){
        let allNotes = this.state.notes
        const updateNotes = allNotes.map((allNote)=>{
            if(allNote.id == id){
                return {...allNote, 
                    title: title, 
                    note: note,
                    added:added, 
                    edited: new Date().toLocaleDateString()}
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
                editId: null,
                readId: null
            }
        })
    }
    onHandleDeleteNote(id){
        console.log(this)
        this.setState((previous)=>{
            return {
                notes: [
                    ...previous.notes.filter((note)=>{
                        return note.id != id
                    })
                ],
                isBeingAdd: false,
                isBeingEdit: false,
                isBeingRead: false,
                editId: null,
                readId: null
            }
        })
    }
    render(){
        return (
            <>
                <NoteInputBar onClick={this.handleOpenModalNewNote.bind(this)}/>
                <NoteList notes={this.state.notes} thisNoteInstance={this} handleOpenModalReadNote={this.handleOpenModalReadNote.bind(this)} handleDeleteNote={this.onHandleDeleteNote.bind(this)}/>
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
            return val.id == editId
        })]
        return (<ModalEditNote onClickOpen={thisInstanceOpen} handleUpdateNote={thisHandleUpdateNote} notes={notesInstance}/>)
    } else {
        return
    }
}
function ReadNote({isBeingRead, thisInstanceOpen, notes, readId}){
    if(isBeingRead){
        let notesInstance = notes[notes.findIndex((val)=>{
            return val.id == readId
        })]
        return (<ModalReadNote onClickOpen={thisInstanceOpen} notes={notesInstance}/>)
    } else {
        return
    }
}
export default NoteApp