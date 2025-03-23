
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

// Get or create a unique user ID for anonymous tracking
const getUserId = (): string => {
  let userId = localStorage.getItem("anonymous_user_id");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("anonymous_user_id", userId);
  }
  return userId;
};

// Track product clicks
export const trackProductClick = async (productId: string, productName: string) => {
  const userId = getUserId();
  const currentUrl = window.location.href;
  
  try {
    // Check if entry exists
    const { data: existingData } = await supabase
      .from("user_interactions")
      .select("id, visit_count")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .eq("interaction_type", "product_click")
      .maybeSingle();
    
    if (existingData) {
      // Update existing entry
      await supabase
        .from("user_interactions")
        .update({
          visit_count: existingData.visit_count + 1,
          last_visited: new Date().toISOString()
        })
        .eq("id", existingData.id);
    } else {
      // Create new entry
      await supabase
        .from("user_interactions")
        .insert({
          user_id: userId,
          product_id: productId,
          page_url: currentUrl,
          interaction_type: "product_click"
        });
    }
    
    console.log(`Product click tracked: ${productName} (${productId})`);
  } catch (error) {
    console.error("Error tracking product click:", error);
  }
};

// Track page views
export const trackPageView = async (pageUrl: string) => {
  const userId = getUserId();
  
  try {
    // Check if entry exists
    const { data: existingData } = await supabase
      .from("user_interactions")
      .select("id, visit_count")
      .eq("user_id", userId)
      .eq("page_url", pageUrl)
      .eq("interaction_type", "page_view")
      .maybeSingle();
    
    if (existingData) {
      // Update existing entry
      await supabase
        .from("user_interactions")
        .update({
          visit_count: existingData.visit_count + 1,
          last_visited: new Date().toISOString()
        })
        .eq("id", existingData.id);
    } else {
      // Create new entry
      await supabase
        .from("user_interactions")
        .insert({
          user_id: userId,
          page_url: pageUrl,
          interaction_type: "page_view"
        });
    }
    
    console.log(`Page view tracked: ${pageUrl}`);
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
};
