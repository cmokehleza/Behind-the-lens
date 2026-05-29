import { createClient } from "@supabase/supabase-js";

export type BlogPost = {
  id?: string | number;
  type: "featured" | "standard";
  badge: string | null;
  title: string;
  description: string | null;
  author: string | null;
  category: string;
  category_color: string;
  image_url: string;
  display_order: number;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Fallback data — mirrors what should live in the Supabase `blog_posts` table.
 *
 * SQL to provision the table (run in Supabase SQL editor):
 *
 * create table public.blog_posts (
 *   id uuid primary key default gen_random_uuid(),
 *   type text not null,
 *   badge text,
 *   title text not null,
 *   description text,
 *   author text,
 *   category text not null,
 *   category_color text not null,
 *   image_url text not null,
 *   display_order int not null default 0
 * );
 *
 * alter table public.blog_posts enable row level security;
 *
 * create policy "Public read access"
 *   on public.blog_posts for select
 *   to anon, authenticated
 *   using (true);
 */
export const fallbackPosts: BlogPost[] = [
  {
    id: "featured",
    type: "featured",
    badge: "Must Read",
    title: "Full-Frame vs. Crop Sensor: Which for Photography?",
    description:
      "An honest look at the real-world differences between these camera systems to help you choose what's actually right for your photography needs.",
    author: "By August Renner (c)",
    category: "Gear",
    category_color: "#7d1a4a",
    image_url:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_155500_808e6fdd-761f-4acd-b3be-cb7e6e700def.mp4",
    display_order: 1,
  },
  {
    id: "card-1",
    type: "standard",
    badge: null,
    title: "Finding Natural Light in Unexpected Places",
    description: null,
    author: null,
    category: "Lighting",
    category_color: "#2c4c34",
    image_url:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4",
    display_order: 2,
  },
  {
    id: "card-2",
    type: "standard",
    badge: null,
    title: "My Approach to Editing: Creating a Consistent Photography Style",
    description: null,
    author: null,
    category: "Editing",
    category_color: "#a63e2d",
    image_url:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4",
    display_order: 3,
  },
  {
    id: "card-3",
    type: "standard",
    badge: null,
    title: "Pricing Your Photography: Strategies That Work",
    description: null,
    author: null,
    category: "Business",
    category_color: "#1a2b8c",
    image_url:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154232_f8809bd2-a6c3-4a38-908d-2005e5b3cb3e.mp4",
    display_order: 4,
  },
];

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!supabase) return fallbackPosts;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("display_order", { ascending: true });
  if (error || !data || data.length === 0) return fallbackPosts;
  return data as BlogPost[];
}
