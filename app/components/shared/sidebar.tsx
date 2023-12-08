import { FC, useState, useEffect } from "react"
import UserCard from "./user-card"
import Image from "next/image"

interface ChatDataItem {
    _id: string,
    c_business: string,
    c_name: string,
    c_description: string,
    c_logo: string,
    interview_sessions: Array<any> // TODO  
    interviewee: string
    languages: Array<string>
}

interface SidebarProps {
    name: string | null | undefined
    email: string | null | undefined
    picture: string | null | undefined
    updatePhase: (newPhase: string) => void;

    simpleHistory: Array<{
        _id: string,
        company: string,
        position: string,
        languages: Array<string>
        c_logo: string
    }>
    updateChatData: (newChatData: ChatDataItem) => void;

    selectedItem: string
    updateSelectedItem: (newItem: string) => void;
}

const Sidebar: FC<SidebarProps> = (props): JSX.Element => {

    const getItemFromHistory = async (item_id: string) => {
        const requestBody = {
            name: props.name,
            email: props.email,
            _id: item_id
        }
        try {
            const response = await fetch('http://127.0.0.1:5000/users/history_item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    props.updateSelectedItem(requestBody._id)

                    const chatData: ChatDataItem = {
                        _id: data["_id"],
                        c_business: data["info"]["business"],
                        c_name: data["info"]["c_name"],
                        c_description: data["info"]["description"],
                        c_logo: data["info"]["logo"],
                        interview_sessions: data["interview_sessions"],
                        interviewee: data["interviewee"],
                        languages: data["languages"]
                    }
                    props.updateChatData(chatData)
                    props.updatePhase('ActiveSession')
                }
            }
            else {
                console.error('Request failed with status:', response.status);
            }
        }
        catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    return (
        <main className="flex flex-col h-screen w-64 border-r">
            <div className="m-3 pb-3 grid justify-center border-b">
                <UserCard name={props.name} email={props.email} picture={props.picture} updatePhase={props.updatePhase} updateSelectedItem={props.updateSelectedItem} />
            </div>
            <ul className="flex-grow max-h-fit pl-3 pr-3 overflow-scroll scrollbar-hide">
                {props.simpleHistory.map((historyItem) => (
                    <li key={historyItem._id}>
                        <button
                            className={`w-full p-3 text-left ${props.selectedItem === historyItem._id ? "bg-gray-50 shadow" : ""} rounded`}
                            onClick={() => {
                                getItemFromHistory(historyItem._id)
                            }}
                        >
                            <Image
                                src={historyItem.c_logo}
                                alt="logo"
                                width={30}
                                height={30}
                                className="w-fit rounded"
                            />
                            <div>
                                <h1>{historyItem.company}</h1>
                                <p className="text-xs">{historyItem.position}</p>
                                <p className="text-xs">{historyItem.languages.join(', ')}</p>
                            </div>
                        </button>

                    </li>
                ))}
            </ul>
        </main>
    )
}

export default Sidebar