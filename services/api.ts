const JOURNAL_URL = '/api/journal'
const QUESTION_URL = '/api/question'

const createURL = (path : string) => {
    return window.location.origin + path
}

export const updateEntry = async (id: string, content: string) => {
    const url = createURL(`${JOURNAL_URL}/${id}`)
    const res = await fetch(new Request(url, {
        method: 'PATCH',
        body: JSON.stringify({content})
    }))

    if(res.ok){
        const {data} = await res.json()
        return data
    }

    //... when error
    return {error: true, code: 500, messageForUi: 'There was an error updating the entry'}
}

export const createNewEntry = async () => {
    const url = createURL(JOURNAL_URL)
    const res = await fetch(new Request(url, {
        method: 'POST',
        // this is not needed for now, because we're hardcoding the entry content in the API
        // body: JSON.stringify({})
    }))

    if(res.ok){
        const {data} = await res.json()
        return data
    }
}

export const askQuestion = async(question) => {
    const url = createURL(QUESTION_URL)
    const res = await fetch(new Request(url, {
        method: 'POST',
        body: JSON.stringify({question})
    }))

    if(res.ok){
        const {data} = await res.json()
        return data
    }

}