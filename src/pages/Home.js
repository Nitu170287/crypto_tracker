import Header from "../components/Common/Header"
import MainComponent from "../components/LandingPage/MainComponent"


const HomePage = ({setMode})=>{

    return(
        <div>
            <Header setMode={setMode} />
            <MainComponent/>
        </div>
    )
}
export default HomePage