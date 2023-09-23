import Header from "../components/Common/Header"
import MainComponent from "../components/LandingPage/MainComponent"


const HomePage = ({setMode, mode})=>{

    return(
        <div>
            <Header setMode={setMode} />
            <MainComponent mode={mode}/>
        </div>
    )
}
export default HomePage