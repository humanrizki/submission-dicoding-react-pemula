function getInitialData(){
    return {
        notes: [
            {
                id: +new Date()+1,
                title: 'Title note 1',
                note: 'Ini adalah note ku',
                createdAt: new Date(+new Date()+1).getTime(),
                updatedAt: null,
                archived: false
            },
            {
                id: +new Date()+2,
                title: 'Title note 2',
                note: 'Ini adalah note ku',
                createdAt: new Date(+new Date()+2).getTime(),
                updatedAt: null,
                archived: false
            },
        ],
        isBeingAdd: false,
        isBeingEdit: false,
        isBeingRead: false,
        isBeingSearch: false,
        editId: null,
        readId: null
    }
}
const showFormattedDate = (date) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    return new Date(date).toLocaleDateString("id-ID", options)
} 
export {getInitialData, showFormattedDate}