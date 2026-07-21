import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth-utils";

// Projects
export async function getProjects(limit = 50, offset = 0) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  return { data, error };
}

export async function getProjectById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}

export async function getUserProjects() {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function createProject(projectData: any) {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").insert([
    {
      ...projectData,
      owner_id: user.id,
    },
  ]).select().single();
  return { data, error };
}

export async function updateProject(id: string, updates: any) {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .eq("owner_id", user.id)
    .select()
    .single();
  return { data, error };
}

// Project Updates
export async function getProjectUpdates(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_updates")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function createProjectUpdate(updateData: any) {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { data, error } = await supabase.from("project_updates").insert([
    {
      ...updateData,
      creator_id: user.id,
    },
  ]).select().single();
  return { data, error };
}

// Project Followers
export async function getProjectFollowers(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_followers")
    .select("*")
    .eq("project_id", projectId);
  return { data, error };
}

export async function followProject(projectId: string) {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { data, error } = await supabase.from("project_followers").insert([
    {
      user_id: user.id,
      project_id: projectId,
    },
  ]).select().single();
  return { data, error };
}

export async function unfollowProject(projectId: string) {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("project_followers")
    .delete()
    .eq("user_id", user.id)
    .eq("project_id", projectId);
  return { error };
}

// AI Agents
export async function getAIAgents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ai_agents")
    .select("*")
    .order("rating", { ascending: false });
  return { data, error };
}

export async function createAIAgent(agentData: any) {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { data, error } = await supabase.from("ai_agents").insert([
    {
      ...agentData,
      creator_id: user.id,
    },
  ]).select().single();
  return { data, error };
}

// Poker Matches
export async function getPokerMatches() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("poker_matches")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function getPokerMatchById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("poker_matches")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}

// Generated Apps
export async function getGeneratedApps() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("generated_apps")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function getUserGeneratedApps() {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("generated_apps")
    .select("*")
    .eq("creator_id", user.id)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function createGeneratedApp(appData: any) {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { data, error } = await supabase.from("generated_apps").insert([
    {
      ...appData,
      creator_id: user.id,
    },
  ]).select().single();
  return { data, error };
}

// Incubator Houses
export async function getIncubatorHouses() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("incubator_houses")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function createIncubatorHouse(houseData: any) {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { data, error } = await supabase.from("incubator_houses").insert([
    {
      ...houseData,
      creator_id: user.id,
    },
  ]).select().single();
  return { data, error };
}

// Studio Access Requests
export async function requestStudioAccess(projectId: string, message?: string) {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { data, error } = await supabase.from("studio_access_requests").insert([
    {
      requester_id: user.id,
      project_id: projectId,
      message,
    },
  ]).select().single();
  return { data, error };
}

export async function approveAccessRequest(requestId: string) {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("studio_access_requests")
    .update({
      status: "approved",
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", requestId)
    .select()
    .single();
  return { data, error };
}
