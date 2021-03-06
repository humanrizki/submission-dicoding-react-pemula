import React, {Component} from 'react'
import { X } from 'react-bootstrap-icons'
class ModalAddNewNote extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            note: '',
            isLimitCharTitle: false
        }
    }
    handleTitleChange(event){
        if(event.target.value.length >= 50){
            this.setState((previous)=>{
                return {
                    title: previous.title,
                    note: previous.note,
                    isLimitCharTitle: true
                }
            })
        } else {
            this.setState((previous)=>{
                return {
                    title: previous.title,
                    note: previous.note,
                    isLimitCharTitle: false
                }
            })
        }
        this.setState((previous)=>{
            return {
                title: event.target.value,
                note: previous.note
            }
        })
    }
    handleNoteChange(event){
        this.setState((previous)=>{
            return {
                title: previous.title,
                note: event.target.value
            }
        })
    }
    handleSubmitNewNote(event){
        event.preventDefault()
        this.props.handleAddNewNote(this.state)
    }
    render(){
        return (
            <div className='note-app__modal-new-note__container mx-auto w-full h-full z-50  fixed inset-0 flex items-center justify-center' style={{ 
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}>
                <div className='note-app__modal-new-note__container-inner bg-white relative px-3 py-4 rounded-md h-max text-lg flex items-center justify-center shadow shadow-white w-11/12 lg:w-8/12 md:w-11/12 sm:w-11/12 xs:w-11/12 border-2 border-black '>
                    <button className='absolute h-10 hover:bg-red-300 hover:text-white w-10 top-0 right-0 p-2 rounded-bl-md rounded-tr-md border-t-0 border-r-0 bg-gray-100 hover:border-b-2 hover:border-l-2 hover:border-black' 
                    onClick={this.props.onClickOpen}>
                        <X/>
                    </button>
                    <div className='note-app__modal-new-note__body-input-bar mt-6 w-full h-full flex justify-center'>
                        <form className='note-app__modal-new-note__form-input  h-96 overflow-y-auto md:w-4/5  w-full flex flex-col items-center p-2' onSubmit={this.handleSubmitNewNote.bind(this)}>
                            <div className='note-app__modal-new-note__group-form-input w-full box-border'>
                                <label htmlFor='title' className='w-full text-base'>Title</label>
                                <input placeholder='' type='text' id='title' className={this.state.isLimitCharTitle ? 'text-sm w-full border-2 p-2 border-dashed  focus:border-2 focus:border-dashed focust:outline-0 focus:outline-none focus:ring-0 rounded border-red-500' : 'text-sm w-full border-2 p-2 border-dashed  focus:border-2 focus:border-dashed focust:outline-0 focus:outline-none focus:ring-0 rounded '} value={this.state.title} onChange={this.handleTitleChange.bind(this)} required />
                                {/* <p className='font-medium text-red-500 text-sm'>*title terlalu panjang </p> */}
                                {this.state.isLimitCharTitle ? <p className='font-medium text-red-500 text-sm'>*title terlalu panjang </p> : <></>}
                            </div>
                            <div className='note-app__modal-new-note__group-form-input w-full h-96 overflow-y-auto'>
                                <label htmlFor='note'  className='w-full text-base'>Note</label>
                                <textarea id='note' className='text-sm w-full h-52 mb-5 border-2 p-2 border-dashed  focus:border-2 focus:border-dashed focust:outline-0 focus:outline-none focus:ring-0 rounded' value={this.state.note} onChange={this.handleNoteChange.bind(this)} required></textarea>
                            </div>
                            <button className={this.state.isLimitCharTitle ? 'w-4/5 rounded mt-2 p-2 bg-gray-300 text-base text-white' : 'w-4/5 rounded mt-2 p-2 bg-green-400 text-base text-white'} type="submit" disabled={this.state.isLimitCharTitle}>Submit</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        )
    }
} 
export default ModalAddNewNote