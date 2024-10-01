"use server";

import { dbClient } from "@/config/mongodb";
import { INote } from "@/store/note";
import { ObjectId } from "mongodb";

// Add a new note to the collection
export async function addNote(note: INote) {
  try {
    await dbClient.connect();
    const result = await dbClient
      .db("svlgdp")
      .collection("notes")
      .insertOne(note); // Save the full
    return result; // Return the note object
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add note");
  }
}

// Retrieve all notes from the collection
export async function getNotes(): Promise<INote[]> {
  try {
    await dbClient.connect();
    const notes = await dbClient
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
    console.log(error);
    throw new Error("Failed to get notes");
  } finally {
    await dbClient.close();
  }
}

// Delete a note by ID
export async function deleteNote(id: string) {
  try {
    const db = dbClient.db("svlgdp");

    // Validate the ID to ensure it is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    const result = await db
      .collection("notes")
      .deleteOne({ _id: new ObjectId(id) });

    // Check if the note was deleted
    if (result.deletedCount === 0) {
      throw new Error("Note not found");
    }

    return result.deletedCount; // Return the number of deleted documents
  } catch (error) {
    console.error("Error deleting note:", error); // Log detailed error
    throw new Error("Failed to delete note");
  }
}
