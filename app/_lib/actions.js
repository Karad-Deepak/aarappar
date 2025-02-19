"use server";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";

export async function fetchMenu() {
  const { data, error } = await supabase.from("menu").select("*");

  if (error) {
    console.error("Error fetching Products:", error);
    return [];
  }

  return data;
}
