import { getDocs, query } from "firebase/firestore";
import { useEffect, useState }from "react"
import { useAppSelector } from "../app/hooks";
import useAuth from "../hooks/useAuth";
import { meetingsRef } from "../utils/FirebaseConfig";
import { MeetingType } from "../utils/Types";
import Header from '../components/Header'

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


export default function ScheduledMeetings() {
    useAuth();
    const [meetings, setMeetings] = useState<Array<any>>([])
    const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);

    

    useEffect(()=> {
        
        if(userInfo) {
            const getUserMeetings = async () => {
                const firestoreQuery = query(meetingsRef);
                const fetchedMeetings = await getDocs(firestoreQuery);
                if (fetchedMeetings.docs.length) {
                    const scheduledMeetings:Array<MeetingType> = [];
                    fetchedMeetings.forEach(meeting=> {
                        const data = meeting.data() as MeetingType;
                        if (data.createdBy===userInfo?.uid) {
                            scheduledMeetings.push(data);
                        } else if (data.meetingType==="universally-accessible-video-conference") {
                            scheduledMeetings.push(data);
                        } else {
                            const index = data.invitedUsers.findIndex(user=>user===userInfo.uid)
                            if(index!==-1) {
                                scheduledMeetings.push(data)
                            }
                        }
                    });
                    setMeetings(scheduledMeetings)
                }
            };
            getUserMeetings();
        }
        
        
        }, [userInfo]);



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

        </div>
        );
}