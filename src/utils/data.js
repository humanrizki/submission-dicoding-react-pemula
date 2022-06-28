function getData(){
    return {
        notes: [
            {
                id: +new Date()+1,
                title: 'Title note 1',
                note: 'Ini adalah note ku',
                added: new Date(+new Date()+1).toLocaleDateString(),
                edited: null
            },
            {
                id: +new Date()+2,
                title: 'Title note 2',
                note: 'Ini adalah note ku',
                added: new Date(+new Date()+2).toLocaleDateString(),
                edited: null
            },
        ],
        isBeingAdd: false,
        isBeingEdit: false,
        isBeingRead: false,
        editId: null,
        readId: null
    }
}
export default getData