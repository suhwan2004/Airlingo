/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { OpenVidu } from "openvidu-browser";
import { useSelector } from "react-redux";
import { selectMeeting } from "@/features/Meeting/MeetingSlice";
import languageCodeConfig from "@/config/languageCodeConfig";

// ----------------------------------------------------------------------------------------------------

const useOpenVidu = () => {
    // 카메라
    const OV = useRef(new OpenVidu());
    const [session, setSession] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [subscribers, setSubscribers] = useState([]);

    // 화면 공유
    const shareOV = useRef(new OpenVidu());
    const [shareSession, setShareSession] = useState(null);
    const [sharePublisher, setSharePublisher] = useState(null);
    const [shareSubscribers, setShareSubscribers] = useState([]);

    const { otherUser } = useSelector(selectMeeting);

    async function joinSession() {
        const cameraSession = OV.current.initSession();
        const screenSession = shareOV.current.initSession();
        cameraSession.on("streamCreated", (event) => {
            if (event.stream.typeOfVideo === "CAMERA") {
                const subscriber = cameraSession.subscribe(event.stream, undefined);
                setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
                cameraSession.subscribeToSpeechToText(
                    event.stream,
                    languageCodeConfig.find(
                        (cur) => cur.languageId === otherUser.userStudyLanguageId,
                    ).languageCode,
                );
            }
        });

        screenSession.on("streamCreated", (event) => {
            if (event.stream.typeOfVideo === "SCREEN") {
                const screenSubscriber = screenSession.subscribe(event.stream, undefined);
                setShareSubscribers((prevShareSubscribers) => [
                    ...prevShareSubscribers,
                    screenSubscriber,
                ]);
            }
        });

        cameraSession.on("speechToTextMessage", (event) => {
            const currentUserNickname = JSON.parse(event.connection.data).clientData;
            if (event.reason === "recognized") {
                cameraSession.signal({
                    data: JSON.stringify({
                        name: currentUserNickname,
                        text: event.text,
                    }),
                    to: [],
                    type: "chatlist-add",
                });
            }
        });

        cameraSession.on("streamDestroyed", (event) => {
            setSubscribers((prevSubscribers) =>
                prevSubscribers.filter((sub) => sub.stream.streamId !== event.stream.streamId),
            );
        });

        cameraSession.on("exception", (exception) => {
            console.warn(exception);
        });

        setSession(cameraSession);
        setShareSession(screenSession);
    }

    useEffect(() => {
        joinSession();
        return () => {
            if (session) session.disconnect();
            if (shareSession) shareSession.disconnect();
        };
    }, []);

    return {
        OV,
        session,
        setSession,
        publisher,
        setPublisher,
        subscribers,
        setSubscribers,
        shareOV,
        shareSession,
        setShareSession,
        sharePublisher,
        setSharePublisher,
        shareSubscribers,
        setShareSubscribers,
    };
};

// ----------------------------------------------------------------------------------------------------

export default useOpenVidu;
