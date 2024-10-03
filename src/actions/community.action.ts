"use server";

import { dbClient } from "@/lib/db";
import { IPost } from "@/store/community.store";
import { ObjectId } from "mongodb";

export async function addPost(post: Omit<IPost, "_id">) {
  try {
    const client = await dbClient.connect();
    const result = await client
      .db("svlgdp")
      .collection("posts")
      .insertOne(post);

    console.log("Inserted post:", result);

    // Return the inserted post with the new _id field
    return {
      ...post,
      _id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Error adding post:", error);
    throw new Error("Failed to add post");
  } finally {
    // Optionally close connection if you're not pooling
    // client.close();
  }
}

export async function getPosts(): Promise<IPost[]> {
  try {
    const client = await dbClient.connect();
    const posts = await client
      .db("svlgdp")
      .collection("posts")
      .find({})
      .sort({ date: -1 })
      .toArray();

    return posts.map((post) => ({
      _id: post._id.toString(),
      type: post.type,
      author: post.author,
      content: post.content,
      likes: post.likes,
      comments: post.comments,
      date: post.date,
      eventDetails: post.eventDetails,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  } finally {
    // client.close();
  }
}

export async function deletePost(id: string) {
  try {
    const client = await dbClient.connect();
    const result = await client
      .db("svlgdp")
      .collection("posts")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new Error("Post not found");
    }

    return result.deletedCount;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  } finally {
    // client.close();
  }
}

export async function updatePost(id: string, post: Partial<IPost>) {
  try {
    const client = await dbClient.connect();
    const result = await client
      .db("svlgdp")
      .collection("posts")
      .updateOne({ _id: new ObjectId(id) }, { $set: post });

    if (result.modifiedCount === 0) {
      throw new Error("No post found to update or data unchanged");
    }

    return result.modifiedCount;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post");
  } finally {
    // client.close();
  }
}
