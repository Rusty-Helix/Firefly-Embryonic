import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiImage,
    EuiProvider,
    EuiSpacer,
    EuiText,
    EuiTextColor,
    EuiButton,
    EuiPanel
} from "@elastic/eui";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup } from "firebase/auth";
import {
    collection,
    addDoc,
    getDoc,
    getDocs,
    query,
    where, } from "firebase/firestore";
import React from "react"
import animation from "../assets/animation.gif"
// import logo from "../assets/logo.png";
import firefly_logo from "../assets/firefly-logo-aesthetic-without-background.png"
import { firebaseAuth, userRef } from "../utils/FirebaseConfig";
import {useNavigate} from "react-router-dom"
import {useAppDispatch} from "../app/hooks";
import {setUser} from "../app/slices/AuthSlice";

function Login() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    onAuthStateChanged(firebaseAuth, (currentUser)=> {
        if(currentUser) navigate("/")
    })



    const login = async () => {
        const provider = new GoogleAuthProvider()
        const {
            user: { displayName, email, uid }
        } = await signInWithPopup(firebaseAuth, provider);
        if(email) {
            const firestoreQuery = query(userRef, where("uid", "==", uid));
            const fetchedUsers = await getDocs(firestoreQuery);
            if(fetchedUsers.docs.length===0) {
                await addDoc(userRef, {
                    uid,
                    name:displayName,
                    email,
                });
            }
        }
        dispatch(setUser({
            uid,
            name: displayName,
            email
        }))
        navigate("/")
    };

    return (
            <EuiProvider colorMode="dark">
                <EuiFlexGroup
                    alignItems="center"
                    justifyContent="center"
                    style={{width: "100vw", height: "100vh"}}>

                <EuiFlexItem grow={false}>
                    <EuiPanel paddingSize="xl">
                        <EuiFlexGroup justifyContent="center" alignItems="center">
                            
                        <EuiFlexItem>
                            <EuiImage src={animation} alt="logo" />
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiImage src={firefly_logo} alt="firefly logo" size="230px" />
                            <EuiSpacer size="xs"/>
                            <EuiText textAlign="center" grow={false}>
                                <h3>
                                    {/* <EuiTextColor>
                                        Customize Your Meeting Room
                                    </EuiTextColor> */}
                                    {/* <EuiTextColor color="#0b5cff"> Customize Your Meeting Rooms</EuiTextColor> */}
                                    <EuiSpacer size="s"/>
                                    {/* xs, s, m, l, xl, xxl */}
                                    <EuiTextColor color="#7091FF"> Customize Your Meeting Rooms</EuiTextColor>
                                </h3>
                            </EuiText>
                            <EuiSpacer size="l"/>
                            <EuiButton fill onClick={login}>Login with Google</EuiButton>
                        </EuiFlexItem>

                        </EuiFlexGroup>
                    </EuiPanel>
                </EuiFlexItem>
                    
                    
                </EuiFlexGroup>
            </EuiProvider>
            
        );
}

export default Login;