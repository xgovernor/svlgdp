"use client";

import { memo } from "react";
import AppSidebar from "./AppSidebar";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { INote, useNoteStore } from "@/store/note";
import { Label } from "../ui/label";
import { useLayout } from "@/store/layout";


export interface ISidebarNewNote {
    open: boolean
    toggleDrawer: () => void
}

const SidebarNewNote = ({ open = true, toggleDrawer }: ISidebarNewNote) => {
    const { addNewNote } = useNoteStore();
    const { toggleSidebar } = useLayout();

    const addNote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

    // Parse and create the new note object
        const newNote: INote = {
            id: Date.now().toString(), // Can be replaced with a UUID for more uniqueness
            title: formData.get("title") as string,
            coordinates: {
                lat: parseFloat(formData.get("lat") as string) || 0, // Fallback to 0 if invalid or empty
                lng: parseFloat(formData.get("lng") as string) || 0, // Fallback to 0 if invalid or empty
            },
            content: formData.get("content") as string,
            date: new Date().toISOString(), // Use ISO string for the current date
            layer: formData.get("mapType") as string,
            tags: (formData.get("tags") as string)
                .split(",")
                .map((tag) => tag.trim()) // Split and trim tags by commas
                .filter((tag) => tag !== ""), // Ensure no empty tags
        };

        // Add the note to the store
        await addNewNote(newNote);
        toggleSidebar();

        // Reset the form fields after submission
        form.reset();
    };


    return (
        <AppSidebar
            title="Add New Note"
            toggleDrawer={toggleDrawer}
            open={open}
        >
            <div >
                <form onSubmit={addNote} className="space-y-4">
                    <div className="">
                        <Label>Title</Label>
                        <Input className="dark:bg-[#24282A] dark:border-black rounded" name="title" placeholder="Title" required />
                    </div>

                    <div className="">
                        <Label>Note</Label>
                        <Textarea className="dark:bg-[#24282A] dark:border-black rounded" name="content" placeholder="Note content" required />
                    </div>

                    <div className="">
                        <Label>Tags</Label>
                        <Input className="dark:bg-[#24282A] dark:border-black rounded" name="tags" placeholder="Tags (comma-separated)" autoComplete="on" required />
                    </div>

                    <Button className="dark:text-[#CBD0D0] dark:bg-[#24282A] border dark:border-black rounded" type="submit">Add Note</Button>
                </form>
            </div>
        </AppSidebar>
    )
};

SidebarNewNote.displayName = 'ProjectSidebarNewNote';

export default memo(SidebarNewNote)


