import { supabase } from "$lib/supabaseClient";

async function getMokwonList() {
    const {data: { user }} = await supabase.auth.getUser();
	const userId = user?.id;

    
}