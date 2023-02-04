import { 
    EuiFlexGroup,
    EuiForm,
    EuiFormRow,
    EuiSpacer,
    EuiSwitch,
} from "@elastic/eui";
import {useState} from "react";
import MeetingNameField from "../components/FormComponents/MeetingNameField"
import MeetingUsersField from "../components/FormComponents/MeetingUsersField"
import MeetingDateField from "../components/FormComponents/MeetingDateField"
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons"
import MeetingMaximumUsersField from "../components/FormComponents/MeetingMaximumUsersField"

import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import moment from "moment";

import { FieldErrorType, UserType } from "../utils/Types";
import { generateMeetingID } from "../utils/generateMeetingId";
import { addDoc } from "firebase/firestore";
import { meetingsRef } from "../utils/FirebaseConfig";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";


function VideoConference() {

    useAuth();
    const [users] = useFetchUsers();
    const [createToast] = useToast()
    const navigate = useNavigate();

    const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
    const [meetingName, setMeetingName] = useState("")
    const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([])
    const [startDate, setStartDate] = useState(moment());
    const [size, setSize] = useState(1); // capacity of the meeting room
    const [isUniversallyAccessible, setIsUniversallyAccessible] = useState(false);
    const [showErrors, setShowErrors] = useState<{
        meetingName: FieldErrorType;
        meetingUser: FieldErrorType;
    }>({
        meetingName:{
            show: false,
            message: [],
        },
        meetingUser: {
            show: false,
            message: [],
        },
    });

    const onUserChange = (selectedOptions:any) => {
        setSelectedUsers(selectedOptions);
    }

    const validationForm = () => {
        let errors = false;
        const clonedShowErrors = {...showErrors}
        if (!meetingName.length) {
            clonedShowErrors.meetingName.show=true;
            clonedShowErrors.meetingName.message=["Please Enter Meeting Name"];
            errors = true;
        } else {
            clonedShowErrors.meetingName.show=false;
            clonedShowErrors.meetingName.message=[];
        }
        if(!selectedUsers.length) {
            clonedShowErrors.meetingUser.show=true;
            clonedShowErrors.meetingUser.message=["Please Select a User"];
        } else {
            clonedShowErrors.meetingUser.show=false;
            clonedShowErrors.meetingUser.message=[];
        }
        setShowErrors(clonedShowErrors)
        return errors;
    };

    const createMeeting = async () => {
        if(!validationForm()) {
            const meetingId = generateMeetingID();
            await addDoc(meetingsRef, {
                createdBy: uid,
                meetingId,
                meetingName,
                meetingType: isUniversallyAccessible ? "universally-accessible-video-conference" : "private-video-conference",
                inviteUsers: isUniversallyAccessible 
                    ? [] : selectedUsers.map((user: UserType)=>user.uid),
                meetingDate:startDate.format("L"),
                maxUsers: isUniversallyAccessible ? 100 : size,
                status: true,
            });
            createToast({
                title: isUniversallyAccessible
                    ? "Universally Accessible Video Conference Created" : "Private Video Conference Created",
                type: "success",
            });
            navigate("/")
        }
    }

    return (
    <div
        style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column"
        }}
    >
        <Header />
        <EuiFlexGroup justifyContent="center" alignItems="center">
            <EuiForm>
                <EuiFormRow display="columnCompressedSwitch" label="Universally Accessible Meeting">
                    <EuiSwitch 
                        showLabel={false}
                        label="Is Universally Accessible"
                        checked={isUniversallyAccessible}
                        onChange={e=>setIsUniversallyAccessible(e.target.checked)}
                        compressed
                    />

                </EuiFormRow>
                <MeetingNameField
                    label="Meeting Name"
                    placeholder="Meeting Name"
                    value={meetingName}
                    setMeetingName={setMeetingName}
                    isInvalid={showErrors.meetingName.show}
                    error={showErrors.meetingName.message}
                />

                {
                    isUniversallyAccessible ? (
                    <MeetingMaximumUsersField value={size} setValue={setSize} />
                    ):(
                        <MeetingUsersField 
                        label="Invite User"
                        options={users}
                        onChange={onUserChange}
                        selectedOptions={selectedUsers}
                        singleSelection={false}
                        isClearable={false}
                        placeholder="select a user"
                        isInvalid={showErrors.meetingUser.show}
                        error={showErrors.meetingUser.message}
                        />
                    )}
                    <MeetingDateField
                    selected={startDate}
                    setStartDate={setStartDate}
                    />
                <EuiSpacer />
                <CreateMeetingButtons createMeeting={createMeeting}/>
            </EuiForm>
        </EuiFlexGroup>

    </div>);
}

export default VideoConference;