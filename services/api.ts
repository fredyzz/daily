const JOURNAL_URL = '/api/journal'

const createURL = (path : string) => {
    return window.location.origin + path
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