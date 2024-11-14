'use server'

export async function query(data:{ inputs: string; }) {
    try{
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
}catch(error){
    console.log(error)
}
}