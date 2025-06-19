import Elysia, { error, StatusMap,  } from "elysia";
import { IsJsonString } from "../common";

export const ErrorHandlerPlugin = new Elysia().onError({ as: 'scoped' }, ({ error, set, code, response, }) => { 
    console.log('Error Handle Code :',code)
    switch (code) {
        case "NOT_FOUND":
            return {
                success : false,
                message: error.message,
                error : error
            }
        case "VALIDATION":
            return {
                // name: error.name,
                success : false,
                message: error.all[0].summary,
                error : error.all
            }
        default:

            console.log("response", response);
            const res = response as any
            const msg = res.message && IsJsonString(res.message) ? JSON.parse(res.message) : res.message;
            set.status = msg && msg.status || StatusMap["Internal Server Error"];
            return {
                success : false,
                message: msg && msg.message || "Internal Server Error",
                error : msg 
            }
    }
});

export const AfterHandlerPlugin = new Elysia().onAfterHandle({ as: 'scoped' }, ({ response }: { response: { success: boolean, message: string, status: number } }) => {
    console.log('After Handle');
    if (!response.success) {
        throw error(response.status, {
            message: response.message,
        });
    }
});


export class ValidationError{
    status : number;
    success: boolean;
    message: string;
    constructor(status : number,success: boolean, message: string) {
        this.status = status;
        this.success = success;
        this.message = message;
    }
}