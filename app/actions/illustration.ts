'use server';

import { Profile } from "@/models/profile.model";
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
    // console.log("images:", images);
    const avatarPicture = images ? JSON.parse(images as string)[0] : null;

    const { data, error } = await supabase.from('tbl_illustrations').insert({
        customer_id: customerId,
        description: description,
        gestational_week: gestationalWeek,
        images: images,
        user_id: 'd4036871-7639-499d-bc22-8c37d0242a8a',
        avatar_picture: avatarPicture,
    }).select('id').single();
    

    if (error) {
        throw new Error(error.message);
    }
    
    console.log("data:", data);

    return {
        data: data,
    };
}

export async function getProfiles({ limit = 10, page = 1, query = '', order = 'created_at', ascending = false }: { limit?: number, page?: number, query?: string, order?: string, ascending?: boolean }): Promise<Profile[]> {
    const supabase = await createClient();
    const from = (page - 1) * limit;
    const to = from + limit;

    try {
        const req = supabase.from('tbl_profiles').select('*', { count: 'exact' }).range(from, to).order(order, { ascending: ascending }); 
        
        if(query !== '' && query) {
            console.log("query:", query);
            req.ilike('name', `%${query}%`);
        }
        
        const { data, count, error } = await req;

        if (error) {
            throw new Error(error.message);
        }
        
        return data as Profile[];

    } catch (error: any | Error ) {
        console.log("error:", error);
        throw new Error(error.message);
    }
}

export async function getIllustrations() {
    const supabase = await createClient();

    const { data, error } = await supabase.from('tbl_illustrations').select('*').order('created_at', { ascending: false });

    console.log("data:", data);
    if (error) {
        throw new Error(error.message);
    }

    return data;
}