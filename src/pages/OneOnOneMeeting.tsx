import { 
    EuiFlexGroup,
    EuiForm,
} from "@elastic/eui";
import React, {useState, useEffect} from "react";
import MeetingNameField from "../components/FormComponents/MeetingNameField"
import MeetingUsersField from "../components/FormComponents/MeetingUsersField"

import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers"; 

function OneOnOneMeeting() {

    useAuth();
    const [users] = useFetchUsers();

    const [meetingName, setMeetingName] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([])

    const onUserChange = (selectedOptions:any) => {
        setSelectedUsers(selectedOptions)
    }

    return <div
        style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column"
        }}
    >
        <Header />
        <EuiFlexGroup justifyContent="center" alignItems="center">
            <EuiForm>
                <MeetingNameField
                    label="Meeting Name"
                    placeholder="Meeting Name"
                    value={meetingName}
                    setMeetingName={setMeetingName}
                />
                <MeetingUsersField 
                    label="Invite User"
                    options={users}
                    onChange={onUserChange}
                    selectedOptions={selectedUsers}
                    singleSelection={{asPlainText: true}}
                    isClearable={false}
                    placeholder="select a user"
                />
            </EuiForm>
        </EuiFlexGroup>

    </div>;
}

export default OneOnOneMeeting;