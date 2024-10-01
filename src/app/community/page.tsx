'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, ThumbsUp, MessageSquare, UserPlus, Users } from 'lucide-react'
import React from 'react'

type PostType = 'post' | 'event'

interface Post {
    id: string
    type: PostType
    author: string
    content: string
    likes: number
    comments: number
    date: string
    eventDetails?: {
        title: string
        location: string
        dateTime: string
        interested: number
        going: number
    }
}

export default function CommunityPage() {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: '1',
            type: 'post',
            author: 'Jane Doe',
            content: 'Just finished a great GIS project! Can\'t wait to share the results with the community.',
            likes: 15,
            comments: 3,
            date: '2023-09-20'
        },
        {
            id: '2',
            type: 'event',
            author: 'John Smith',
            content: 'Join us for an exciting workshop on the latest GIS technologies!',
            likes: 32,
            comments: 7,
            date: '2023-09-21',
            eventDetails: {
                title: 'GIS Tech Workshop',
                location: 'Tech Hub, Downtown',
                dateTime: '2023-10-15T14:00',
                interested: 45,
                going: 28
            }
        }
    ])

    const [newPost, setNewPost] = useState({
        type: 'post' as PostType,
        content: '',
        eventTitle: '',
        eventLocation: '',
        eventDateTime: ''
    })

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const post: Post = {
            id: Date.now().toString(),
            type: newPost.type,
            author: 'Current User',
            content: newPost.content,
            likes: 0,
            comments: 0,
            date: new Date().toISOString().split('T')[0]
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
        setPosts([post, ...posts])
        setNewPost({
            type: 'post',
            content: '',
            eventTitle: '',
            eventLocation: '',
            eventDateTime: ''
        })
    }

    const handleInteraction = (id: string, type: 'like' | 'interested' | 'going') => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                if (type === 'like') {
                    return { ...post, likes: post.likes + 1 }
                } else if (post.type === 'event' && post.eventDetails) {
                    return {
                        ...post,
                        eventDetails: {
                            ...post.eventDetails,
                            [type]: post.eventDetails[type] + 1
                        }
                    }
                }
            }
            return post
        }))
    }

    return (
        <div className="container max-w-xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Community Page</h1>

            <Card className="mb-6 bg-[#1c1c1c] border-black shadow-lg">
                <CardHeader>
                    <CardTitle>Create a Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePostSubmit} className="space-y-4">
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
                    <Card key={post.id}>
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
                                <Button variant="ghost" size="sm" onClick={() => handleInteraction(post.id, 'like')}>
                                    <ThumbsUp className="mr-2 h-4 w-4" />
                                    {post.likes}
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    {post.comments}
                                </Button>
                            </div>
                            {post.type === 'event' && post.eventDetails && (
                                <div className="flex space-x-4">
                                    <Button variant="outline" size="sm" onClick={() => handleInteraction(post.id, 'interested')}>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Interested ({post.eventDetails.interested})
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleInteraction(post.id, 'going')}>
                                        <Users className="mr-2 h-4 w-4" />
                                        Going ({post.eventDetails.going})
                                    </Button>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
