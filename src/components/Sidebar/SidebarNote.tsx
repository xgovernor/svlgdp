"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import AppSidebar from "./AppSidebar";
import React from "react";
import { Calendar, EditIcon, MapIcon, MapPinIcon, SendIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { INote, useNoteStore } from "@/store/note";


export interface ISidebarNote {
    open: boolean
    toggleDrawer: () => void
}

const SidebarNote = ({ open = true, toggleDrawer }: ISidebarNote) => {
    const { notes, fetchNotes, removeNote } = useNoteStore();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchTerm, setSearchTerm] = useState('')

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return (
        <AppSidebar
            title="Note"
            toggleDrawer={toggleDrawer}
            open={open}
        >
            <div className="grid grid-cols-1">
                {filteredNotes.map((note, i) => (
                    <NoteCard key={i} {...note} onDelete={removeNote} />
                ))}
            </div>
        </AppSidebar>
    )
};

SidebarNote.displayName = 'ProjectSidebarNote';

export default memo(SidebarNote)


export interface INoteCardProps extends INote {
    onDelete: (id: string) => void;
}
const NoteCard = ({ onDelete, ...note }: INoteCardProps) => {
    const deleteHandler = useCallback(
        (id: string) => {
            const confirm = window.confirm("Do you want to delete?")

            if (confirm) onDelete(id);
        },
        [onDelete]
    );

    const handleFlyTo = useCallback(
        (lat: number, lng: number) => {
            console.log(lat, lng);
        },
        []
    );

    const actions = useMemo(
        () => [
            {
                title: "Fly to the note location",
                icon: SendIcon,
                onClick: () => handleFlyTo(note.coordinates.lat, note.coordinates.lng)
            },
            {
                title: "Edit the note",
                icon: EditIcon,
                onClick: () => console.log("Clicked on edit")
            },
            {
                title: "Delete note",
                icon: Trash2Icon,
                onClick: () => deleteHandler(note.id)
            }
        ],
        [handleFlyTo, deleteHandler, note]
    );

    return (
        <article key={note.id} className="py-4 dark:bg-transparent dark:border-0 dark:first-of-type:border-t dark:border-b dark:border-black rounded-none">
            <h3 className="mb-2 text-[#CBDODO] font-semibold">{note.title}</h3>

            <div className="pb-3">
                <p className="text-xs text-muted-foreground mb-4">{note.content}</p>
                <div className="flex items-center text-xs text-muted-foreground mb-1">
                    <MapPinIcon className="mr-1 h-4 w-4" />
                    {note.coordinates.lat.toFixed(4)}, {note.coordinates.lng.toFixed(4)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Calendar className="mr-1 h-4 w-4" />
                    {note.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapIcon className="mr-1 h-4 w-4" />
                    {note.layer}
                </div>
                <div className="flex flex-wrap gap-1">
                    {note.tags.map(tag => (
                        <Badge className="dark:bg-[#1b1b1f] dark:border-black" key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </div>

            <div className="flex gap-1">
                {actions.map((action, i) => (
                    <Button key={i} variant="ghost" size="icon" onClick={action.onClick} title={action.title}>
                        <action.icon className="h-4 w-4" />
                    </Button>
                ))}
            </div>
        </article>
    )
}
