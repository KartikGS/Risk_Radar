'use server'

export async function query(data:string) {
    console.log(process.env.HF_token);
    const response = await fetch(
        "https://api-inference.huggingface.co/models/KartikGPT/Gemma-2b-finetune",
        {
            headers: {
                'Authorization': `Bearer ${process.env.HF_token}`,
                'Content-Type': "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}