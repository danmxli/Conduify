import { useState, useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';
import DialogueWindow from '../components/DialogueWindow';
import PromptNextPage from '../components/PromptNextPage';
import CompanyNotFound from '../components/CompanyNotFound';

const Chat = () => {
    const location = useLocation();
    const navigatedFromHome = localStorage.getItem('navigatedFromHome');
    const [companyData, setCompanyData] = useState(null);
    const [sessionData, setSessionData] = useState(null);
    const fetchExecuted = useRef(false);
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(false)
    const [open, SetOpen] = useState(true);
    const [sessionUser, setSessionUser] = useState()

    useEffect(() => {
        if (navigatedFromHome === 'true' && !fetchExecuted.current) {
            const { company, position, selectedLanguages, userName } = location.state;
            setSessionUser(userName)
            handleFetchFromHome(company, position, selectedLanguages, userName);
        }
    }, [navigatedFromHome, location.state, fetchExecuted]);

    const handleFetchFromHome = (company, position, selectedLanguages, userName) => {
        const requestBody = {
            name: company,
            position: position,
            languages: selectedLanguages,
            interviewee: userName
        };
        console.log(requestBody)
        try {
            fetch('http://localhost:8001/company/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error('Request failed with status:', response.status);
                    }
                })
                .then(data => {
                    if (data) {
                        if (data["information"] === "not found") {
                            setFound(false)
                            console.log("Company data not found")
                        }
                        else {
                            setFound(true)
                        }
                        setCompanyData(data["information"])
                        setSessionData(data["user_session"])
                        setLoading(false)
                    }
                })
                .catch(error => {
                    console.error('Request failed:', error);
                });
        }
        catch (error) {
            console.error('Fetch request error:', error);
        }
        fetchExecuted.current = true;
    };

    if (navigatedFromHome === 'true') {
        return (
            loading ? <Loading /> : (
                (found ? (
                    <div className='sm:flex inline-grid bg-white'>
                        <div className="flex flex-row">
                            <Sidebar open={open} toggleSidebar={SetOpen} companyData={companyData} sessionData={sessionData} />
                            <div className='pl-2 pr-2'>
                                <DialogueWindow sessionUser={sessionUser} />
                            </div>
                        </div>
                        <PromptNextPage open={open} toggleSidebar={SetOpen} companyData={companyData} />
                    </div>
                ) : (
                    <CompanyNotFound />
                    ))
            )
        );
    } else {
        return <Navigate to="/" />;
    }
};

export default Chat;