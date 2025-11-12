"use server";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { sendReservationEmail } from "./sendReservationEmail";
import { sendPickupOrderEmail } from "./sendPickupOrderEmail";
import { sendEnquiryEmail } from "./sendEnquiryEmail";

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
export async function deleteMenuItem(id) {
  const { data, error } = await supabase
    .from("menu_items")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting menu item:", error);
    throw new Error("Failed to delete menu item");
  }
  revalidatePath("/menu");
  revalidatePath("/admin/change-menu");
  return { message: "Menu item deleted successfully" };
}
export async function addItems(formData) {
  const item_name = formData.get("item_name");
  const price = formData.get("price");
  const description = formData.get("description");
  const category = formData.get("category");
  const subcategory = formData.get("subcategory");

  const { error } = await supabase.from("menu_items").insert({
    item_name,
    price: parseFloat(price),
    description,
    category,
    subcategory,
  });

  if (error) throw new Error("Failed to add menu item");

  // Revalidate the cache for pages that display the menu.
  revalidatePath("/menu");
  revalidatePath("/admin/menu");

  return { message: "Menu item added successfully" };
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
export async function updateSoldoutStatus(id, soldout) {
  const { data, error } = await supabase
    .from("menu_items")
    .update({ soldout })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/menu");
  revalidatePath("/admin/menu");

  return { message: "Sold-out status updated successfully", data };
}

// removed category-level toggle server action

export async function submitEnquiry(formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const message = formData.get("message");

  // Insert and return the inserted row
  const { data, error } = await supabase
    .from("enquiries")
    .insert([{ name, phone, message }], { returning: "representation" })
    .select("*")
    .maybeSingle();

  console.log("Enquiry inserted:", data);

  if (error) {
    console.error("Error inserting enquiry:", error);
    throw new Error("Failed to submit enquiry. Please try again later.");
  }

  revalidatePath("/admin/catering");

  if (!data) {
    console.error("Enquiry data is null; email not sent.");
    return data;
  }

  try {
    await sendEnquiryEmail(data);
  } catch (err) {
    console.error("Error sending enquiry email:", err);
  }

  return data;
}

export async function submitReservation(formData) {
  const salutation = formData.get("salutation");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const timeSlot = formData.get("time_slot");
  const guests = formData.get("guests");
  const message = formData.get("message");

  // Insert reservation and immediately select the inserted row
  const { data, error } = await supabase
    .from("reservations")
    .insert(
      [
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
      ],
      { returning: "representation" }
    )
    .select("*")
    .maybeSingle();

  console.log("Data returned from insert:", data);
  if (error) {
    console.error("Error inserting reservation:", error);
    throw new Error("Failed to reserve table. Please try again later.");
  }

  revalidatePath("/admin/reservations");

  if (!data) {
    console.error("Reservation data is null; email notification not sent.");
    return data;
  }

  try {
    await sendReservationEmail(data);
  } catch (err) {
    console.error("Error sending email notification:", err);
    // Optionally, handle the error further.
  }

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
  revalidatePath("/admin/catering");
  return { success: true, message: "Enquiry deleted successfully" };
}

export async function deleteReservationAction(id) {
  "use server";
  const { error } = await supabase.from("reservations").delete().eq("id", id);
  if (error) throw new Error("Failed to delete reservation");
  revalidatePath("/admin/reservations");
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

// Upload popup image to Supabase Storage
export async function uploadPopupImage(formData) {
  "use server";
  const file = formData.get("file");

  if (!file) {
    throw new Error("No file provided");
  }

  // Validate file size (max 500KB)
  const maxSize = 500 * 1024; // 500KB in bytes
  if (file.size > maxSize) {
    throw new Error("File size exceeds 500KB limit");
  }

  // Validate file type (only images)
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed");
  }

  try {
    // Convert file to buffer for Supabase upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("popup-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      throw new Error("Failed to upload image");
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("popup-images")
      .getPublicUrl(data.path);

    return { success: true, url: publicUrl, path: data.path };
  } catch (error) {
    console.error("Error in uploadPopupImage:", error);
    throw new Error(error.message || "Failed to upload image");
  }
}

// Delete popup image from Supabase Storage
export async function deletePopupImage(imagePath) {
  "use server";

  if (!imagePath) {
    return { success: true, message: "No image to delete" };
  }

  try {
    // Extract filename from full URL or path
    const fileName = imagePath.includes("/")
      ? imagePath.split("/").pop()
      : imagePath;

    const { error } = await supabase.storage
      .from("popup-images")
      .remove([fileName]);

    if (error) {
      console.error("Delete error:", error);
      throw new Error("Failed to delete image");
    }

    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    console.error("Error in deletePopupImage:", error);
    throw new Error(error.message || "Failed to delete image");
  }
}

// Update the popup settings
export async function updatePopupSettings(formData) {
  "use server";
  const id = formData.get("id");
  const type = formData.get("type"); // 'content' or 'image'
  const content = formData.get("content");
  const imageUrl = formData.get("image_url");
  const oldImageUrl = formData.get("old_image_url"); // To delete old image
  const active = formData.get("active") === "on" ? true : false;

  try {
    // If switching from image to content, delete the old image
    if (type === "content" && oldImageUrl) {
      try {
        await deletePopupImage(oldImageUrl);
      } catch (err) {
        console.error("Error deleting old image:", err);
        // Continue even if delete fails
      }
    }

    // Prepare update data based on type
    const updateData = {
      type,
      active,
      content: type === "content" ? content : null,
      image_url: type === "image" ? imageUrl : null,
    };

    const { error } = await supabase
      .from("popup_settings")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
      throw new Error("Failed to update popup settings");
    }

    // Revalidate the home page and admin page
    revalidatePath("/");
    revalidatePath("/admin/popup-settings");

    return { success: true, message: "Popup settings updated successfully" };
  } catch (error) {
    console.error("Error in updatePopupSettings:", error);
    throw new Error(error.message || "Failed to update popup settings");
  }
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

export async function fetchOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error("Error fetching orders: " + error.message);
  return data;
}

export async function updateOrderStatus(orderId, newStatus) {
  const { error } = await supabase
    .from("orders")
    .update({ order_status: newStatus })
    .eq("id", orderId);
  if (error) throw new Error("Error updating order: " + error.message);
  return { success: true };
}

// ---------------------
// Pickup Orders Actions
// ---------------------

export async function fetchPickups() {
  const { data, error } = await supabase
    .from("pickup_orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error("Error fetching pickup orders: " + error.message);

  return data;
}

export async function updatePickupStatus(orderId, newStatus) {
  const { error } = await supabase
    .from("pickup_orders")
    .update({ order_status: newStatus })
    .eq("id", orderId);
  if (error) throw new Error("Error updating pickup order: " + error.message);
  revalidatePath("/admin/pickups");
  return { success: true };
}
export async function fetchSlotAvailability() {
  // Fetch `time_slot` and `guests` from your reservations table
  const { data, error } = await supabase
    .from("reservations")
    .select("time_slot, guests");
  if (error) throw new Error(error.message);

  const availability = {};
  data.forEach((res) => {
    // Use res.time_slot as the key
    const slot = res.time_slot;
    availability[slot] = (availability[slot] || 0) + Number(res.guests);
  });
  return availability; // { "28.Feb Friday: 19:30 to 21:30": totalGuests, ... }
}
export async function updateReservationStatus({ id, status }) {
  const { data, error } = await supabase
    .from("reservations")
    .update({ status })
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/admin/reservations");
  return data;
}
export async function createPickupOrder(formData) {
  const customer_name = formData.get("customer_name");
  const customer_phone = formData.get("phone");
  const customer_email = formData.get("email");
  const notesRaw = formData.get("notes") || "";
  const notes = typeof notesRaw === "string" ? notesRaw.trim() : "";
  const items = formData.get("items"); // JSON string from cart
  const payment_method = formData.get("payment_method");
  const transaction_id = formData.get("transaction_id");

  // Parse the cart items JSON string
  let parsedItems;
  try {
    parsedItems = JSON.parse(items);
  } catch (error) {
    throw new Error("Invalid order data");
  }

  // Calculate the total bill (assuming each item has a price and quantity)
  const total_bill = parsedItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  // Basic validation for payment method & transaction id rules
  if (!payment_method) {
    throw new Error("Payment method is required");
  }
  const needsTransactionId =
    payment_method === "paypal" || payment_method === "sparkasse";
  if (
    needsTransactionId &&
    (!transaction_id || String(transaction_id).trim().length === 0)
  ) {
    throw new Error(
      "Transaction ID is required for the selected payment method"
    );
  }

  // Insert the pickup order into the pickup_orders table and select the inserted row
  const { data, error } = await supabase
    .from("pickup_orders")
    .insert(
      [
        {
          customer_name,
          customer_phone,
          customer_email, // include the email in the insert
          cart_items: parsedItems,
          notes: notes || null,
          total_bill,
          order_status: "pending",
        },
      ],
      { returning: "representation" }
    )
    .select("*")
    .maybeSingle();

  console.log("Data returned from insert:", data);
  if (error) {
    console.error("Error inserting pickup order:", error);
    throw new Error("Failed to create pickup order. Please try again later.");
  }

  // Revalidate admin pickups page
  revalidatePath("/admin/pickups");

  if (!data) {
    console.error("Pickup order data is null; email notification not sent.");
    return data;
  }

  // Send the email notification for the new pickup order
  try {
    // Include payment details (not stored in DB) in the email payload
    const emailPayload = {
      ...data,
      payment_method,
      transaction_id,
      notes,
    };
    await sendPickupOrderEmail(emailPayload);
  } catch (err) {
    console.error("Error sending pickup order email notification:", err);
    // Optionally handle the error further if needed.
  }

  return data;
}
