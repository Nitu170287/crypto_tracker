import Footer from "../components/Common/Footer"
import Header from "../components/Common/Header"
import MainComponent from "../components/LandingPage/MainComponent"


const HomePage = ({setMode, mode})=>{

    return(
        <div>
            <Header setMode={setMode} mode={mode} />
            <MainComponent mode={mode}/>
            <Footer/>
        </div>
    )
}
export default HomePage