import {
    EuiButton,
    EuiFlexGroup,
    EuiFlexItem,
} from "@elastic/eui";
import {useNavigate} from "react-router-dom";
import React from "react";



export default function CreateMeetingButtons({
    createMeeting
}:{
    createMeeting: () => void
}) {
    const navigate = useNavigate();
    return (
            <EuiFlexGroup>
                <EuiFlexItem grow={false}>
                    <EuiButton
                        color="danger"
                        fill
                        onClick={()=>navigate("/")}
                    >
                        Cancel
                    </ EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiButton
                        fill
                        onClick={createMeeting}
                    >
                        Submit
                    </ EuiButton>
                </EuiFlexItem>
            </EuiFlexGroup>
        )
}