import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import React = require('react');


describe("ProfileStatus", () => {
    test("status props should be in the state", () => {
        // @ts-ignore
        const component = create(<ProfileStatus status={"TEXT"}  updateStatus={'text'}/>)
        const instance = component.getInstance()
        expect(instance.state.status).toBe("TEXT")
    })
})