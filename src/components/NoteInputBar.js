import React from "react"
import { PlusCircle, Search, X } from "react-bootstrap-icons"
import FormSearchNote from "./FormSearchNote"
function NoteInputBar({onClickAdd, onClickSearch, isBeingSearch, notes}){
    return (
        <div className="note-app__input-bar-container">
            <div className="note-app__input-bar-option border-dashed border-2 border-black w-full rounded-lg bg-gray-100 h-72 inline-flex gap-5 justify-center items-center relative">
                <div className="text-center">
                    <button onClick={onClickAdd} className="p-2 rounded-full w-16 h-16" style={{ 
                        backgroundColor: '#DDDCFF'
                    }}><PlusCircle color="#4176FF" className="h-full w-full"/></button>
                    <p className="text-md mt-5" style={{ 
                        color: '#4176FF'
                    }}>Add some note</p>
                    
                </div>
                <div className="text-center absolute top-2 right-2">
                    <button onClick={onClickSearch} className="p-2 rounded-full w-10 h-10" style={{ 
                        backgroundColor: '#DDDCFF'
                    }}>{isBeingSearch ? <X color="#4176FF" className="h-full w-full"/> : <Search color="#4176FF" className="h-full w-full"/>}</button>
                </div>
            </div>
            {isBeingSearch ? 
                <div className="note-app__input-bar__search-note border-dashed border-2 border-black w-full rounded-lg h-72 inline-flex gap-5 justify-center items-center overflow-y-auto">
                    <FormSearchNote notes={notes}/>
                </div> :
                <></>
            }
            
        </div>
        
    )
}
export default NoteInputBar