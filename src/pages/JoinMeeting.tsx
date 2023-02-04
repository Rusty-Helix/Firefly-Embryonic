import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState }from "react";
import { firebaseAuth, meetingsRef } from "../utils/FirebaseConfig";
import {useNavigate, useParams} from "react-router-dom";
import useToast from "../hooks/useToast";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment"
import { generateMeetingID } from "../utils/generateMeetingId";

import { updateProfile } from "firebase/auth";


export default function JoinMeeting() {
    const params = useParams();
    const navigate = useNavigate();
    const [createToast] = useToast();
    const [isAllowed, setIsAllowed] = useState(false);
    const [user, setUser] = useState<any>(undefined);
    const [userLoaded, setUserLoaded] = useState(false);

    onAuthStateChanged(firebaseAuth, (currentUser)=>{
        if(currentUser) {
            setUser(currentUser);
        }
        setUserLoaded(true)
        
    });

    updateProfile(user, {
        displayName: "Your Display Name for the Meeting"
    }).then(()=>{
        console.log("succeeded")
    }).catch((error)=>{
        console.log("foiled")
    });

    useEffect(()=>{
        const getMeetingData = async () => {
            
            if( params.id && userLoaded ){

                const firestoreQuery = query(
                    meetingsRef,
                    where("meetingId", "==", params.id)
                );

                const fetchedMeetings = await getDocs(firestoreQuery);
                
                if (fetchedMeetings.docs.length) {
                    const meeting = fetchedMeetings.docs[0].data();
                    const isCreator = meeting.createdBy === user?.uid;

                    if(meeting.meetingType==="1-on-1") {
                        if (meeting.invitedUsers[0] === user?.uid || isCreator) {
                            if (meeting.meetingDate === moment().format("L")){
                                setIsAllowed(true);
                            } else if (
                                moment(meeting.meetingDate).isBefore(moment().format("L"))
                            ) {
                                createToast({ title: "Meeting has ended.", type: "danger"});
                                navigate(user ? "/scheduledmeetings" : "/login"); 
                            } else if (moment(meeting.meetingDate).isAfter()) {
                                createToast({
                                    title: `Meeting is on ${meeting.meetingDate}`,
                                    type: "warning",
                                });
                                navigate(user ? "/" : "/login");
                            }
                        } else navigate(user ? "/" : "/login")
                    }
                    else if (meeting.meetingType==="private-video-conference") {
                        const index = meeting.invitedUsers.findIndex(
                                (invitedUser: string) => invitedUser === user?.uid
                            );
                            if (index !== -1 || isCreator) {
                                if (meeting.meetingDate === moment().format("L")) {
                                    setIsAllowed(true);
                                } else if (
                                    moment(meeting.meetingDate).isBefore(moment().format("L"))
                                ) {
                                    createToast({ title: "Meeting has ended.", type: "danger"});
                                    navigate(user ? "/" : "/login");
                                } else if (moment(meeting.meetingDate).isAfter()){
                                    createToast({
                                        title: `Meeting is on ${meeting.meetingDate}`,
                                        type: "warning",
                                    });
                                }
                            } else {
                                createToast({
                                    title: `You are not invited to the meeting.`,
                                    type: "danger",
                                });
                                navigate(user ? "/" : "/login");
                            }
                        } else {
                            setIsAllowed(true)
                        }
                    } else navigate("/");
                }
            };
            getMeetingData();

        }, [params.id, user, userLoaded, createToast, navigate]);

    const appID = 1798897680;
    const serverSecret = "3dd422133e30f857f6112110eca22696";

    const meetingRoom = async(element:any) => {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            params.id as string,
            user.uid ? user.uid : generateMeetingID(),
            user.displayName ? user.displayName : generateMeetingID()    
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container:element,
            maxUsers:50,
            sharedLinks:[
                {
                    name:"Copy Link",
                    url:window.location.origin + window.location.pathname
                },
            ],
            scenario: {
                mode:ZegoUIKitPrebuilt.VideoConference,
            },
        });
    };

    return <div>
            {isAllowed && (
            <div
                className="myCallContainer"
                ref={meetingRoom}
                style={{width:"100%", height: "100vh"}}
            ></div>
        )}

    </div>;
}