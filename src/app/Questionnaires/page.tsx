import Header from "@/widgets/header/Header";
import Qustionaires from "./Qustionaries/Qustionaires";
import Participants from "./sections/Participants/Participants";
import FormParcipants from "./sections/FormParcipants/FormParcipants";

export default function Questionnaires(){
    return(
        <div>
            <Header/>
            <Qustionaires/>
            {/* <FormParcipants/> */}
        </div>
    )
}