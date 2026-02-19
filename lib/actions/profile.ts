"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateProfileAction(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Nejste přihlášeni." };
  }

  const name = (formData.get("name") as string) || null;
  const company = (formData.get("company") as string) || null;
  const job_title = (formData.get("job_title") as string) || null;

  const { error } = await supabase
    .from("profiles")
    .update({ name, company, job_title })
    .eq("id", user.id);

  if (error) {
    return { error: `Chyba při ukládání profilu: ${error.message}` };
  }

  revalidatePath("/organizer/settings");
  return { success: true };
}
