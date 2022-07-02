import {follow} from "./friends-reducer";
import {usersAPI} from "../api/usersAPI";
import {ResultCodesEnum} from "../api/api";
jest.mock('../api/usersAPI')
const userAPIMock = usersAPI

const result = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}
// @ts-ignore
userAPIMock.Follow.mockReturnValue(result)

test("", async ()=>{
    const thunk = follow(1)
    const dispatch = jest.fn();
    // @ts-ignore
    await thunk(dispatch)
    expect(dispatch).toBeCalledTimes(3)
})