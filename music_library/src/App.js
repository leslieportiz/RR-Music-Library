import { useState, useRef } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'

function App() {
    // let [searchTerm, setSearchTerm] = useState('')
    let [data, setData] = useState([])
    let [message, setMessage] = useState('Search for Music!')
    let searchInput = useRef('')

    const API_URL = 'https://itunes.apple.com/search?term='

    // const handleSearch = (e, term) => {
    //     e.preventDefault()
    //     // Fetch Data
    //     const fetchData = async () => {
    //         document.title = `${term} Music`
    //         const response = await fetch(API_URL + term)
    //         const resData = await response.json()
    //         if (resData.results.length > 0) {
    //             // Set State and Context value
    //             return setData(resData.results)
    //         } else {
    //             return setMessage('Not Found')
    //         }
    //     }
    //     fetchData()
    // }

    // const handleSearch = (e,term) => {
    //     e.preventDefault()
    //     setSearchTerm(term)
    // }

    const handleSearch = (e, term) => {
        e.preventDefault()
        const fetchData = async () => {
            document.title = `${term} Music`
            const response = await fetch(API_URL + term)
            const resData = await response.json()
            if (resData.results.length > 0) {
                return setData(resData.results)
            } else {
                return setMessage('Not Found.')
            }
        }
        fetchData()
    }
    

    return (
        <div className="App">
            <SearchContext.Provider value={{
                term: searchInput,
                handleSearch: handleSearch
            }}>
                <SearchBar />
            </SearchContext.Provider>
            {/* <SearchBar handleSearch={handleSearch} /> */}
            {message}
            <DataContext.Provider value={data}>
                <Gallery />
            </DataContext.Provider>
        </div>
    );
}

export default App;

