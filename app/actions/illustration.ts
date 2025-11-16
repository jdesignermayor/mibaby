'use server';

import { createClient } from "@/utils/supabase/server";

export async function createIllustration(formData: FormData) {

    const supabase = await createClient();

    const customerId = formData.get('customerId');
    const description = formData.get('description');
    const gestationalWeek = formData.get('gestationalWeek');
    const images = formData.get('images');

    console.log("customerId:", customerId);
    console.log("description:", description);
    console.log("gestationalWeek:", gestationalWeek);
    console.log("images:", images);

    const { data, error } = await supabase.from('tbl_illustrations').insert({
        customer_id: customerId,
        description: description,
        gestational_week: gestationalWeek,
        images: images,
    });

    if (error) {
        throw new Error(error.message);
    }

    return {
        data: data,
    };
}

export async function getIllustrations() {
    const supabase = await createClient();

    const { data, error } = await supabase.from('tbl_illustrations').select('*').order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}