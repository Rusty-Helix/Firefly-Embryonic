import { 
    EuiHeader,
    EuiText,
    EuiTextColor,
    EuiFlexGroup,
    EuiFlexItem,
    EuiButtonIcon,
} from "@elastic/eui";
import { signOut } from "firebase/auth";
import React, {useState, useEffect} from "react"
import { useDispatch } from "react-redux";
import {
    useNavigate,
    useLocation,
    Link,
} from "react-router-dom"
import { useAppSelector } from "../app/hooks";
import { changeTheme } from "../app/slices/AuthSlice";
import {
    getCreateMeetingBreadCrumbs,
    getOneOnOneMeetingsBreadCrumbs,
    getVideoConferenceBreadCrumbs,
    getManageMeetingsBreadCrumbs,
    getScheduledMeetingsBreadCrumbs,
} from "../utils/breadCrumbs";
import { firebaseAuth } from "../utils/FirebaseConfig";
// import firefly_pure_logo from "../assets/firefly-pure-logo.png"

function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const username = useAppSelector((zoom)=>zoom.auth.userInfo?.name);
    const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme)

    const [breadCrumbs, setBreadCrumbs] = useState([{ text: "Dashboard"}])
    const [isResponsive, setIsResponsive] = useState(false)
    const dispatch = useDispatch();
    const logout = () => {
        signOut(firebaseAuth);
    };

useEffect(() => {
    const {pathname} = location;
    if(pathname==="/create") {
        setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    } else if (pathname==="/create1on1") {
        setBreadCrumbs(getOneOnOneMeetingsBreadCrumbs(navigate));
    } else if (pathname==="/createvideoconference") {
        setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    } else if (pathname==="/managemeetings") {
        setBreadCrumbs(getManageMeetingsBreadCrumbs(navigate));
    } else if (pathname==="/scheduledmeetings") {
        setBreadCrumbs(getScheduledMeetingsBreadCrumbs(navigate));
    }
}, [location, navigate])

    const invertTheme = () => {
        const theme = localStorage.getItem("zoom-theme")
        localStorage.setItem("zoom-theme", theme==="light"?"dark":"light")
        dispatch(changeTheme({isDarkTheme:!isDarkTheme}))
    }

    const section = [{
        items: [
            <Link to="/">
                <EuiText>
                    <h2 style={{padding:"0 1vw"}}>
                        <EuiTextColor color="#7091FF">Firefly 焰蠅</EuiTextColor>
                    </h2>
                </EuiText>
                {/* <EuiImage src={firefly_pure_logo} alt="firefly logo" size="230px" /> */}
            </Link>
        ]
    },
    {
        items:[
            <>
                {username? (
                    <EuiText>
                        <h3>
                            <EuiTextColor color="white">Tentative Site for Project Proposition</EuiTextColor>
                            {/* <EuiTextColor color="#0b5cff">{username}</EuiTextColor> */}
                        </h3>
                    </EuiText>
                ):null
                }
            </>
        ]
    },
    {
        items:[
            <EuiFlexGroup
                justifyContent="center"
                alignItems="center"
                direction="row"
                style={{gap:"2vw"}}
            >
                <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                    {

                    isDarkTheme ? (
                    <EuiButtonIcon
                        onClick={invertTheme}
                        iconType="sun"
                        display="fill"
                        size="s" 
                        color="warning"
                        aria-label="invert-theme-button"
                    />
                    ):(                    
                    <EuiButtonIcon
                        onClick={invertTheme}
                        iconType="moon"
                        display="fill"
                        size="s"
                        color="ghost"
                        aria-label="invert-theme-button"
                    />                    
                )
                
                
                }
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                    <EuiButtonIcon
                        onClick={logout}
                        iconType="popout"
                        display="fill"
                        size="s"
                        aria-label="logout-button"
                    />
                </EuiFlexItem>

            </EuiFlexGroup>
        ]
    },
];

    const responsiveSection = [{
        items: [
            <Link to="/">
                <EuiText>
                    <h2 style={{padding:"0 1vw"}}>
                        <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
                    </h2>
                </EuiText>
            </Link>
        ]
    },{
        items:[
            <EuiFlexGroup
                justifyContent="center"
                alignItems="center"
                direction="row"
                style={{gap:"2vw"}}
            >
                
                <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                    {
                    isDarkTheme ? (
                    <EuiButtonIcon
                        onClick={invertTheme}
                        iconType="sun"
                        display="fill"
                        size="s" 
                        color="warning"
                        aria-label="invert-theme-button"
                    />
                    ):(                    
                    <EuiButtonIcon
                        onClick={invertTheme}
                        iconType="moon"
                        display="fill"
                        size="s"
                        color="ghost"
                        aria-label="invert-theme-button"
                    />                    
                )}
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                    <EuiButtonIcon
                        onClick={logout}
                        iconType="lock"
                        display="fill"
                        size="s"
                        aria-label="logout-button"
                    />
                </EuiFlexItem>

            </EuiFlexGroup>
        ]
    },

];

    useEffect(()=>{
        if(window.innerWidth<480) setIsResponsive(true);
    }, []);

    return (<>

    <EuiHeader
        style={{ minHeight: "8vh" }}
        theme="dark"
        sections= {isResponsive ? responsiveSection : section}
    />

    <EuiHeader 
        style={{minHeight: "8vh"}}
        // theme="light"
        sections={[{ breadcrumbs: breadCrumbs }]}
    />


    
    </>);
}

export default Header;