import { fail, redirect } from "@sveltejs/kit";
import {supabase} from '$lib/supabaseClient';

/** @type {import { './$types' }.Actions} */
export const actions = {
	login: async (request, locals, url) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
		});

		if (error) {
			console.log(error);
			return fail(400, {
				message: "Something went wrong.",
			});
		}

		console.log("가즈아아아ㅏㅏ", data);
		throw redirect(303, data.url);
	},
};
