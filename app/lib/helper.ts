import { FormEvent } from "react";
import { query } from "../lib/actions";

export default async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
 
    const formData = new FormData(event.currentTarget)
    const chatValue = formData.get('chat');

    const response = await query({inputs: `Quote: ${chatValue}`});
    console.log(JSON.stringify(response))
    document.getElementById('response')!.innerText = !response.error?response[0].generated_text:response.error;
}
