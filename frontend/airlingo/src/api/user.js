import instance from "./instance";
import processApiResponse from "@/utils/api";

const getUserProfile = async ({ responseFunc, data }) => {
    const { userId } = data;
    try {
        const response = await instance.get(`/api/user/${userId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const postSignUp = async ({ responseFunc, data }) => {
    try {
        console.log(data);
        const response = await instance.post(`/api/user/signup`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

export { getUserProfile, postSignUp };
