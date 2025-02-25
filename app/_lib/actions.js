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
export async function fetchMenuItems() {
  const { data, error } = await supabase.from("menu_items").select("*");

  if (error) {
    console.error("Error fetching Products:", error);
    return [];
  }

  return data;
}
export async function updateMenuItem(formData) {
  "use server";
  const id = formData.get("id");
  const item_name = formData.get("item_name");
  const price = formData.get("price");
  const description = formData.get("description");
  const category = formData.get("category");
  const subcategory = formData.get("subcategory");

  const { error } = await supabase
    .from("menu_items")
    .update({
      item_name,
      price: parseFloat(price),
      description,
      category,
      subcategory,
    })
    .eq("id", id);

  if (error) throw new Error("Failed to update menu item");

  // Revalidate the admin menu page cache.
  revalidatePath("/menu");
  revalidatePath("/admin/menu");

  // Return a success message that our client component can display.
  return { message: "Menu item updated successfully" };
}

export async function submitEnquiry(formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const message = formData.get("message");

  // Insert data into the 'enquiries' table
  const { data, error } = await supabase
    .from("enquiries")
    .insert([{ name, phone, message }]);

  if (error) {
    console.error("Error inserting enquiry:", error);
    throw new Error("Failed to submit enquiry. Please try again later.");
  }

  return data;
}

export async function submitReservation(formData) {
  const salutation = formData.get("salutation");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const timeSlot = formData.get("timeSlot");
  const guests = formData.get("guests");
  const message = formData.get("message");

  const { data, error } = await supabase
    .from("reservations")
    .insert([
      {
        salutation,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        time_slot: timeSlot,
        guests: parseInt(guests),
        message,
      },
    ])
    .single();

  if (error) {
    console.error("Error inserting reservation:", error);
    throw new Error("Failed to reserve table. Please try again later.");
  }

  revalidatePath("/admin/request/reservations");
  return data;
}

export async function fetchEnquiries() {
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error("Failed to fetch enquiries");
  return data;
}

export async function fetchReservations() {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error("Failed to fetch reservations");
  return data;
}

export async function deleteEnquiryAction(id) {
  "use server";
  const { error } = await supabase.from("enquiries").delete().eq("id", id);
  if (error) throw new Error("Failed to delete enquiry");
  // Revalidate the page to update the cache.
  revalidatePath("/admin/request/enquiries");
  return { success: true, message: "Enquiry deleted successfully" };
}

export async function deleteReservationAction(id) {
  "use server";
  const { error } = await supabase.from("reservations").delete().eq("id", id);
  if (error) throw new Error("Failed to delete reservation");
  revalidatePath("/admin/request/reservations");
  return { success: true, message: "Reservation deleted successfully" };
}
export async function fetchPopupSettings() {
  const { data, error } = await supabase
    .from("popup_settings")
    .select("*")
    .limit(1);
  if (error) throw new Error("Failed to fetch popup settings");
  return data[0] || null;
}

// Update the popup settings
export async function updatePopupSettings(formData) {
  "use server";
  const id = formData.get("id");
  const content = formData.get("content");
  const active = formData.get("active") === "on" ? true : false;

  const { error } = await supabase
    .from("popup_settings")
    .update({ content, active })
    .eq("id", id);
  if (error) throw new Error("Failed to update popup settings");

  // Revalidate the home page (or admin page if needed)
  revalidatePath("/");

  // Return a message for inline feedback (this will be returned to a client component)
  return { message: "Popup settings updated successfully" };
}
export async function createOrder(formData) {
  "use server";
  const customer_name = formData.get("customer_name");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const items = formData.get("items"); // JSON string from cart
  let parsedItems;
  try {
    parsedItems = JSON.parse(items);
  } catch (error) {
    throw new Error("Invalid order data");
  }
  // Calculate total (assuming each item has a price and quantity)
  let total = parsedItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  const { error } = await supabase.from("orders").insert([
    {
      customer_name,
      phone,
      address,
      items: parsedItems,
      total,
      order_status: "pending",
    },
  ]);

  if (error) throw new Error("Failed to create order: " + error.message);

  // Optionally revalidate admin orders page, etc.
  revalidatePath("/admin/orders");

  return { message: "Order submitted successfully" };
}
