import styled from "@emotion/styled";
import { ReactComponent as PassportTextIcon } from "@/assets/icons/passport-text-icon.svg";
import { ReactComponent as ServiceLogoIcon } from "@/assets/icons/service-logo-icon.svg";
import { ReactComponent as BiometricIcon } from "@/assets/icons/biometric-icon.svg";

function MyPageHome() {
    return (
        <PassportContainer>
            <PassportCover>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="505"
                    height="705"
                    viewBox="0 0 505 705"
                    fill="none"
                >
                    <path
                        d="M5 5H485C496.046 5 505 13.9543 505 25V685C505 696.046 496.046 705 485 705H5L0 700L5 5Z"
                        fill="#949494"
                    />
                    <path
                        d="M0 0H480C491.046 0 500 8.95431 500 20V680C500 691.046 491.046 700 480 700H0V0Z"
                        fill="#00A8B3"
                    />
                </svg>
            </PassportCover>
            <PassportBox>
                <PassportTextIcon />
                <ServiceLogoIcon />
                <BiometricIcon />
            </PassportBox>
        </PassportContainer>
    );
}

const PassportContainer = styled.div`
    width: 505px;
    height: 705px;
    flex-shrink: 0;
    cursor: pointer;
`;

const PassportCover = styled.div`
    width: 505px;
    height: 705px;
    flex-shrink: 0;
    z-index: -1;
    position: absolute;
`;

const PassportBox = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 113px;
    margin-top: 94px;
    margin-left: 75px;
`;

export default MyPageHome;
