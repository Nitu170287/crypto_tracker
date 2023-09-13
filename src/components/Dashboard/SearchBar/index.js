import "./Style.css"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBar =({search, onChange})=>{


    return(
        <div className='search-box'>
        <SearchRoundedIcon className="search-icon"/>
           <input type="text" value={search} placeholder="Search" onChange={onChange}/>
        </div>
    )
}
export default SearchBar