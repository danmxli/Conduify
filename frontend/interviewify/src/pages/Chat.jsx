import { useState, useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';

const Chat = () => {
    const location = useLocation();
    const navigatedFromHome = localStorage.getItem('navigatedFromHome');
    const [companyData, setCompanyData] = useState(null);
    const fetchExecuted = useRef(false);
    const [loading, setLoading] = useState(true);
    const [open, SetOpen] = useState(true);

    useEffect(() => {
        if (navigatedFromHome === 'true' && !fetchExecuted.current) {
            const { company, position, selectedLanguages } = location.state;
            handleFetchFromHome(company, position, selectedLanguages);
        }
    }, [navigatedFromHome, location.state, fetchExecuted]);

    const handleFetchFromHome = (company, position, selectedLanguages) => {
        const requestBody = {
            name: company,
            position: position,
            languages: selectedLanguages,
        };
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
                        console.log('Successful response:', data);
                        setCompanyData(data)
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
            <div className="inline-grid grid-cols-2 h-screen">
                {loading && <Loading />}
                <Sidebar open={open} toggleSidebar={SetOpen} companyData={companyData} /> {/* Use the Sidebar component here */}
            </div>
        );
    } else {
        return <Navigate to="/" />;
    }
};

export default Chat;