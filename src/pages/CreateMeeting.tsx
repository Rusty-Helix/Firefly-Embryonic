import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiImage,
} from "@elastic/eui";
import  React from 'react';
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import meeting1 from "../assets/meeting1.png";
import meeting2 from "../assets/meeting2.png";
import { useNavigate } from "react-router-dom";

function CreateMeeting() {

    useAuth()
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                flexDirection: "column"
            }}
        >
            <Header />

            <EuiFlexGroup
                justifyContent="center"
                alignItems="center"
                style={{margin:"5vh 10vw"}}
            >
                <EuiFlexItem>
                    <EuiCard 
                        icon={<EuiImage size="100%" alt="icon" src={meeting1} />}
                        title={`1-on-1 Meeting`}
                        description="Create A Personal Meeting For Only 2 People"
                        onClick={()=>navigate("/create1on1")}
                        paddingSize="xl"
                    />
                </EuiFlexItem>

                <EuiFlexItem>
                    <EuiCard 
                        icon={<EuiImage size="100%" alt="icon" src={meeting2} />}
                        title={`General Video Conference`}
                        description="Use Default Meeting Setup"
                        onClick={()=>navigate("/createvideoconference")}
                        paddingSize="xl"
                    />
                </EuiFlexItem>

            </EuiFlexGroup>

        </div>
        )
}

export default CreateMeeting