import { supabase } from "$lib/supabaseClient";
export const ssr = false;

export async function load () {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const userId = user?.id;
	const userName = user?.identities[0].identity_data.full_name;
	const picture = user?.identities[0].identity_data.picture;
	const email = user?.identities[0].identity_data.email;
	const data = {
		id: userId,
		name: userName,
		image: picture,
		email: email
	}

	return data;
}