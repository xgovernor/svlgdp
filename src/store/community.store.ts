import { create } from "zustand";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "@/actions/community.action";

// Define the types for posts and events
export type PostType = "post" | "event";
export type InteractionType = "like" | "interested" | "going";

export interface IPost {
  _id: string;
  type: PostType;
  author: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
  eventDetails?: {
    title: string;
    location: string;
    dateTime: string;
    interested: number;
    going: number;
  };
}

interface CommunityState {
  posts: IPost[];
  form: {
    type: PostType;
    content: string;
    eventTitle?: string;
    eventLocation?: string;
    eventDateTime?: string;
  };
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addNewPost: (post: Omit<IPost, "_id">) => Promise<void>;
  removePost: (id: string) => Promise<void>;
  handleInteraction: (id: string, type: InteractionType) => Promise<void>;
  updateForm: (formData: Partial<CommunityState["form"]>) => void;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  posts: [], // Start with an empty post array to fetch from server
  form: {
    type: "post",
    content: "",
  },
  loading: false,
  error: null,

  // Fetch posts from the server and update the state
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const posts = await getPosts();
      set({ posts, loading: false });
    } catch (error) {
      console.error("Error fetching posts:", error);
      set({ loading: false, error: "Failed to load posts" });
    }
  },

  // Add a new post to the list and update the state
  addNewPost: async (post) => {
    set({ loading: true, error: null });
    try {
      const newPost = await addPost(post);
      set((state) => ({
        posts: [newPost, ...state.posts],
        loading: false,
      }));
    } catch (error) {
      console.error("Error adding new post:", error);
      set({ loading: false, error: "Failed to add post" });
    }
  },

  // Remove a post and update the state
  removePost: async (id) => {
    set({ loading: true, error: null });
    try {
      await deletePost(id);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error("Error removing post:", error);
      set({ loading: false, error: "Failed to remove post" });
    }
  },

  // Handle interactions (like, interested, going)
  handleInteraction: async (id, type) => {
    const { posts } = get();
    const { _id: pid, ...post } = posts.find(
      (post) => post._id === id
    ) as IPost;

    if (type === "like") {
      post!.likes += 1;
    } else if (type === "interested") {
      post!.eventDetails!.interested += 1;
    } else if (type === "going") {
      post!.eventDetails!.going += 1;
    }

    console.log({ posts, post: { pid, post } });
    await updatePost(pid, post).then(() => {
      get().fetchPosts();
    });
  },

  // Update the form data
  updateForm: (formData) => {
    set((state) => ({
      form: { ...state.form, ...formData },
    }));
  },
}));
