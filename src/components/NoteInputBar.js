import React from "react"
import { PlusCircle } from "react-bootstrap-icons"
function NoteInputBar({onClick}){
    return (
        <div className="note-app__input-bar border-dashed border-2 border-black w-full rounded-lg bg-gray-100 h-72 inline-flex justify-center items-center">
            <div className="text-center">
                <button onClick={onClick} className="p-2 rounded-full w-16 h-16" style={{ 
                    backgroundColor: '#DDDCFF'
                }}><PlusCircle color="#4176FF" className="h-full w-full"/></button>
                <p className="text-md mt-5" style={{ 
                    color: '#4176FF'
                }}>Add some note</p>
                
            </div>
            
        </div>
    )
}
export default NoteInputBar