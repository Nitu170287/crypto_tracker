import Switch from '@mui/material/Switch';
import "./style.css"

const Toggle = ({setMode})=>{

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return(
        <div className="toggle">
            <Switch {...label} defaultChecked color="warning" onChange={()=>setMode(prevMode=> prevMode === 'light' ? 'dark' : 'light')}  />
        </div>
    )
}
export default Toggle