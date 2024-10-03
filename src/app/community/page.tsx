'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, ThumbsUp, UserPlus, Users } from 'lucide-react'
import React from 'react'
import { IPost, PostType, useCommunityStore } from '@/store/community.store'
import { useSession } from 'next-auth/react'


export default function CommunityPage() {
    const { data: session } = useSession()
    const { posts, fetchPosts, addNewPost, handleInteraction } = useCommunityStore()

    const [newPost, setNewPost] = useState({
        type: 'post' as PostType,
        content: '',
        eventTitle: '',
        eventLocation: '',
        eventDateTime: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget;
        // const formData = new FormData(form);

        const post: Omit<IPost, "_id"> = {
            type: newPost.type,
            author: session?.user?.email || '',
            content: newPost.content,
            likes: 0,
            comments: 0,
            date: new Date().toISOString()
        }
        if (newPost.type === 'event') {
            post.eventDetails = {
                title: newPost.eventTitle,
                location: newPost.eventLocation,
                dateTime: newPost.eventDateTime,
                interested: 0,
                going: 0
            }
        }

        await addNewPost(post).then(() => {
            form.reset()
        }).catch((error) => {
            console.error('Error adding post:', error)
            alert('Failed to add post')
        })
    }

    const onInteraction = async (id: string, type: 'like' | 'interested' | 'going') => {
        await handleInteraction(id, type)
    }


    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <div className="container max-w-xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Community Page</h1>

            <Card className="mb-6 bg-[#1c1c1c] border-black shadow-lg">
                <CardHeader>
                    <CardTitle>Create a Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Select
                            value={newPost.type}
                            onValueChange={(value: PostType) => setNewPost({ ...newPost, type: value })}
                        >
                            <SelectTrigger className='bg-[#24282A] border-black'>
                                <SelectValue placeholder="Select post type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="post">Regular Post</SelectItem>
                                <SelectItem value="event">Event</SelectItem>
                            </SelectContent>
                        </Select>
                        <Textarea
                            className='resize-none bg-[#24282A] border-black'
                            placeholder="What's on your mind?"
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            required
                        />
                        {newPost.type === 'event' && (
                            <>
                                <Input
                                    placeholder="Event Title"
                                    value={newPost.eventTitle}
                                    onChange={(e) => setNewPost({ ...newPost, eventTitle: e.target.value })}
                                    required
                                />
                                <Input
                                    placeholder="Event Location"
                                    value={newPost.eventLocation}
                                    onChange={(e) => setNewPost({ ...newPost, eventLocation: e.target.value })}
                                    required
                                />
                                <Input
                                    type="datetime-local"
                                    value={newPost.eventDateTime}
                                    onChange={(e) => setNewPost({ ...newPost, eventDateTime: e.target.value })}
                                    required
                                />
                            </>
                        )}
                        <Button type="submit">Post</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {posts.map(post => (
                    <CommunityPostCard key={post._id} post={post} onInteraction={onInteraction} />
                ))}
            </div>
        </div>
    )
}


interface CommunityPostCardProps {
    post: IPost
    onInteraction: (id: string, type: 'like' | 'interested' | 'going') => void
}
const CommunityPostCard = ({ post, onInteraction }: CommunityPostCardProps) => {
    return (
        <Card key={post._id}>
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`} />
                        <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{post.author}</CardTitle>
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {post.type === 'event' && post.eventDetails && (
                    <div className="mb-4 space-y-2">
                        <h3 className="text-xl font-semibold">{post.eventDetails.title}</h3>
                        <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date(post.eventDetails.dateTime).toLocaleString()}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4" />
                            {post.eventDetails.location}
                        </div>
                    </div>
                )}
                <p>{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" onClick={() => onInteraction(post._id, 'like')}>
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        {post.likes}
                    </Button>
                    {/* <Button variant="ghost" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {post.comments}
                    </Button> */}
                </div>
                {post.type === 'event' && post.eventDetails && (
                    <div className="flex space-x-4">
                        <Button variant="outline" size="sm" onClick={() => onInteraction(post._id, 'interested')}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Interested ({post.eventDetails.interested})
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onInteraction(post._id, 'going')}>
                            <Users className="mr-2 h-4 w-4" />
                            Going ({post.eventDetails.going})
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}
