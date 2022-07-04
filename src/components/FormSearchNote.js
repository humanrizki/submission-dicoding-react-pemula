import React, {Component} from 'react'
class FormSearchNote extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            resultSeach: []
        }
    }
    handleTitleChange(event){
        this.setState((previous)=>{
            return {
                title: event.target.value,
                resultSeach: previous.resultSeach
            }
        })
    }
    handleSubmitSearchNote(event){
        event.preventDefault()
        this.setState((previous)=>{
            return {
                ...previous,
                resultSeach:this.props.notes.filter((filterNote)=>filterNote.title.includes(this.state.title))
            }
        })
    }
    render(){
        return (
            <div className='md:w-4/5 sm:w-11/12 w-11/12 p-2 h-max'>
                <form onSubmit={this.handleSubmitSearchNote.bind(this)} className='flex flex-col items-end'>
                    <input className='w-full border-2 p-2 border-dashed  focus:border-2 focus:border-dashed focust:outline-0 focus:outline-none focus:ring-0 rounded' placeholder='Cari judul...' value={this.state.value} onChange={this.handleTitleChange.bind(this)} required></input>
                    <button className='p-2 text-sm bg-green-400 mt-3 rounded text-white' type='submit'>Cari catatan</button>
                </form>
                <hr className='w-full my-3'/>
                {this.state.resultSeach.length !== 0 ? <div className='result-search w-full h-32 overflow-y-auto'>
                    {this.state.resultSeach.map((result, index)=>(
                        <div className='w-full p-2 flex border-2 border-dashed rounded mb-2 h-14 items-center' key={result.id}>
                            <div className='number-result w-[30px] h-[30px] inline-flex justify-center items-center rounded-full bg-gray-400 mr-5 text-white'><p>{index+1}</p></div>
                            <div className='body w-11/12'>
                                <p className='text-base'><a href={'#note-'+result.id} className='text-blue-400'>{result.title}</a></p>
                                {result.archived ? <p className='text-sm text-yellow-300'>arsip</p> : <p className='text-sm text-green-400'>aktif</p>}
                            </div>
                            
                        </div>
                    ))}
                </div> : <div className='result-search inline-flex w-full  justify-center items-center h-10 border-2 border-dashed rounded'>
                    <p className='text-sm'>Tidak ada hasil data yang telah dicari!</p>
                </div>
                }
            </div>
        )
    }
}
export default FormSearchNote