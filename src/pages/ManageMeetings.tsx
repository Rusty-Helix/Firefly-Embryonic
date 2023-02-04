import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState }from "react"
import { useAppSelector } from "../app/hooks";
import useAuth from "../hooks/useAuth";
import { meetingsRef } from "../utils/FirebaseConfig";
import { MeetingType } from "../utils/Types";
import Header from '../components/Header'
import EditFlyout from '../components/EditFlyout'

import moment from "moment"
import { Link } from "react-router-dom";

import {
    EuiFlexGroup, 
    EuiFlexItem,
    EuiPanel,
    EuiBasicTable,
    EuiCopy,
    EuiButtonIcon,
    EuiBadge,
} from "@elastic/eui"


export default function ManageMeetings() {
    useAuth();
    const [meetings, setMeetings] = useState<Array<any>>([])
    const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);

    const getManageMeetings = async () => {
        const firestoreQuery = query(meetingsRef, where("createdBy", "==", userInfo?.uid))
        const fetchedMeetings = await getDocs(firestoreQuery);
        
        if (fetchedMeetings.docs.length) {
            const ManageMeetings: Array<MeetingType> = [];
            fetchedMeetings.forEach((meeting)=>{
                ManageMeetings.push({
                    docId:meeting.id,
                    ...(meeting.data() as MeetingType),
                });
            });
            setMeetings(ManageMeetings);
        }};  

    useEffect(()=> {
        
            getManageMeetings()
        
        }, [userInfo]);

        const [showEditFlyout, setShowEditFlyout] = useState(false)
        const [editMeeting, setEditMeeting] = useState<MeetingType>()

        const openEditFlyout = (meeting:MeetingType) => {
            setShowEditFlyout(true);
            setEditMeeting(meeting);

        };

        const closeEditFlyout = (dataChanged=false) => {
            setShowEditFlyout(false);
            setEditMeeting(undefined);
            
            if(dataChanged) {
                getManageMeetings();
            }
        };

        const columns = [
            {
                field:"meetingName",
                name:"Meeting Name",
            },{
                field: "meetingType",
                name: "Meeting Type",
            },{
                field: "meetingDate",
                name: "Meeting Date",
            }, {
                field:"",
                name: "Status",
                render:(meeting:MeetingType)=>{
                    if(meeting.status) {
                        if(meeting.meetingDate === moment().format("L")) {
                            return <EuiBadge color="success">
                                <Link style={{color:"black"}} to={`/join/${meeting.meetingId}`}>
                                    Join Now
                                </Link>
                                </EuiBadge>
                        } else if (moment(meeting.meetingDate).isBefore(moment().format('L'))){
                            return <EuiBadge color="default">
                                Ended
                            </EuiBadge>
                        } else {
                            return <EuiBadge color="primary">Upcoming</EuiBadge>
                        }
                    } else return <EuiBadge
                        color="danger"
                    >Canceled</EuiBadge>
                }
            }, {
                field: "",
                name: "Edit",
                render:(meeting:MeetingType)=>{
                    return (
                            <EuiButtonIcon 
                                aria-label="meeting-label"
                                iconType="indexEdit"
                                color="danger"
                                display="base"
                                isDisabled={
                                    !meeting.status || // canceled 
                                    moment(meeting.meetingDate).isBefore(moment().format("L"))
                                }
                                onClick={()=> openEditFlyout(meeting)}
                            />
                        )
                }
            }, {
                field: "meetingId",
                name: "Meeting Link",
                render:(meetingId:string)=> {
                    return (<EuiCopy textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
                    >
                        {(copy:any)=>(
                            <EuiButtonIcon 
                                iconType="copy"
                                onClick={copy}
                                display="base"
                                aria-label="Meeting-copy"
                            />
                        )}

                    </EuiCopy>
                    );
                }
            }

        ]

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                flexDirection: "column",
            }}
        >
            <Header />
            <EuiFlexGroup
                justifyContent="center"
                // alignItems="center"
                style={{margin:"1rem"}}
            >
                <EuiFlexItem>
                    <EuiPanel>
                        <EuiBasicTable 
                            items={meetings}
                            columns={columns}    
                        />
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGroup>
            {
                showEditFlyout && (<EditFlyout
                    closeFlyout={closeEditFlyout} 
                    meetings={editMeeting!}
                />)
            }

        </div>
        );
}