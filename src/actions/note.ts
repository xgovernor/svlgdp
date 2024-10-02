"use server";

import { INote } from "@/store/note";
import { ObjectId } from "mongodb";
import { dbClient } from "@/lib/db";

// Add a new note to the collection
export async function addNote(note: INote) {
  try {
    const client = await dbClient.connect(); // Ensure connection
    const result = await client
      .db("svlgdp")
      .collection("notes")
      .insertOne(note); // Insert the note

    console.log("Inserted note:", result);

    // Return the inserted note with the new _id
    return {
      ...note,
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Error adding note:", error);
    throw error; // No need to wrap the error again
  }
}

// Retrieve all notes from the collection
export async function getNotes(): Promise<INote[]> {
  try {
    const client = await dbClient.connect(); // Ensure connection
    const notes = await client
      .db("svlgdp")
      .collection("notes")
      .find({})
      .toArray();

    // Transform the MongoDB documents to match the INote structure
    return notes.map((note) => ({
      id: note._id.toString(), // Convert ObjectId to string
      title: note.title,
      coordinates: note.coordinates,
      content: note.content,
      date: note.date,
      layer: note.layer,
      overlay: note.overlay || [], // Set default value if undefined
      zoom: note.zoom || 0, // Set default value if undefined
      tags: note.tags || [], // Set default value if undefined
    }));
  } catch (error) {
    console.error("Error retrieving notes:", error);
    throw error; // No need to wrap the error again
  }
}

// Delete a note by ID
export async function deleteNote(id: string) {
  try {
    const client = await dbClient; // Ensure connection
    const db = client.db("svlgdp");

    // Validate the ID to ensure it is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    // Convert the string ID to ObjectId for MongoDB
    const objectId = new ObjectId(id);

    const result = await db.collection("notes").deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      throw new Error("Note not found");
    }

    return result.deletedCount; // Return the number of deleted documents
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}
