import React from 'react'
// import { useAppSelector } from "../app/hooks";
import {useNavigate} from "react-router-dom"
import useAuth from "../hooks/useAuth";
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiImage,
 } from "@elastic/eui";

import dashboard1 from "../assets/dashboard1.png";
import dashboard2 from "../assets/dashboard2.png";
import dashboard3 from "../assets/dashboard3.png";
import Header from '../components/Header'

function Dashboard() {



    useAuth();

    const navigate = useNavigate();

    return (
            <>
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
                                icon={<EuiImage size="5rem" alt="icon" src={dashboard3} />}
                                title={`Extensions`}
                                description="Customize your meetings with plug-ins"

                                onClick={() => navigate('/scheduledmeetings')}
                                paddingSize="xl"
                            />

                        </EuiFlexItem>

                        <EuiFlexItem>
                            <EuiCard 
                                icon={<EuiImage size="100%" alt="icon" src={dashboard1} />}
                                title={`Arrange a Meeting`}
                                description="Create a new meeting and invite people"

                                onClick={() => navigate('/create')}
                                paddingSize="xl"
                            />

                        </EuiFlexItem>

                        <EuiFlexItem>
                            <EuiCard 
                                icon={<EuiImage size="5rem" alt="icon" src={dashboard2} />}
                                title={`Manage Meetings`}
                                description="View the meetings hosted by you"

                                onClick={() => navigate('/managemeetings')}
                                paddingSize="xl"
                            />

                        </EuiFlexItem>
                        
                    </EuiFlexGroup>
                </div>
            </>
        )
}

export default Dashboard