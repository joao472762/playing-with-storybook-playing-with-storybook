import clsx from "clsx"
import { ReactNode } from "react"
import { Slot } from "@radix-ui/react-slot"

import { Text } from "./Text"
import { Avatar } from "./Avatar"
import { Link } from "./Link"
import { TextArea } from "./TextArea"
import { Button } from "./Button"
import { Trash } from "phosphor-react"
import { ActionButton } from "./ActionButton"

export interface PostRootProps {
    asChild?: boolean,
    children: ReactNode,
    className?: string
}
export function PostRoot({asChild,children,className}: PostRootProps){
    const Comp = asChild ? Slot : 'main'
    return(
        <Comp className={clsx('bg-gray-800 rounded-lg p-10',className)}>
            {children}
        </Comp>
    )
}

PostRoot.displayName = 'Post.Root'

interface PostHeaderProps {
    asChild?: boolean,
    className?: string,
    avatarUrl: string,
    userName: string,
    userRole?: string,
    publisedAt: string,
}

 function PostHeader({
    avatarUrl,
    className,
    publisedAt,
    userName,
    userRole
 }:PostHeaderProps){
    
    return(
        <header className={clsx('flex justify-between',className)}>
           <div className="flex gap-4">
                <Avatar src={avatarUrl} hasBorder/>
                <div className="flex flex-col">
                    <Text asChild>
                        <strong>{userName}</strong>
                    </Text>
                    <Text className="text-sm text-gray-300">
                        <span>{userRole}</span>
                    </Text>
                </div>

           </div>
           <Text size="sm" asChild className="text-gray-300">
                <time>{publisedAt}</time>
           </Text>
        </header>
    )
}

PostHeader.displayName = 'Post.Header'


interface PostContentProps {
    className?: string,
    asChild?: boolean,
    children: ReactNode
}

function PostContent({asChild,children,className}:PostContentProps){
    const Comp = asChild ? Slot : 'section'
    return(
        <Comp className={clsx('mt-6',className)}>
            {children}
        </Comp>
    )
}
interface PostCreateProps {
    className?: string,
}
function PostCreate({className}:PostCreateProps){
    return(
        <footer className={
            clsx(
                'flex flex-col gap-4 mt-6 pt-6 border-gray-700 border-solid border-t'
            ,className
            )}
        >
            <Text asChild>
                <strong>Deixe seu feedback</strong>
            </Text>
            <TextArea placeholder="digite a plublicação"/>
            <Button.Root className="w-28">
                Publicar
            </Button.Root>
        </footer>
    )
}

PostContent.displayName = 'Post.Create'


interface PostComentProps {
    postContent: string,
    userName: string,
    publisedAt: string,
    avatarUrl: string,
    className?: string
    likesCounter: number,
    
}
function PostComent({likesCounter,postContent,publisedAt,userName,avatarUrl,className}:PostComentProps){
    return(
        <section className={clsx('flex gap-4 w-full',className)}>
            <Avatar src={avatarUrl}/>
            <div className="flex-1 flex flex-col gap-4 ">
                <div className="bg-gray-750 p-4 pb-6 rounded-lg">
                    <header className="flex justify-between " >
                        <div className="flex flex-col">
                            <Text size="sm" asChild >
                                <strong className="text-green-500">{userName}</strong>
                            </Text>
                            <Text size="xs" asChild className="text-gray-300" >
                                <time>
                                    {publisedAt}
                                </time>

                            </Text>

                        </div>
                        
                        <ActionButton.Root className="w-min h-min ">
                            <ActionButton.Icon>
                                <Trash/>
                            </ActionButton.Icon>
                        </ActionButton.Root>
                    </header>
                    <Text asChild size="sm" className="mt-4">
                        <p>{postContent}</p>
                    </Text>
                </div>
                <div>
                    <ActionButton.Root className="w-max">
                        <ActionButton.Icon>
                            <Trash/>
                        </ActionButton.Icon>
                        <Text className="text-green-500 relative after:">aplaudir {likesCounter}</Text>
                    </ActionButton.Root>
                </div>
        
            </div>
        </section>
    )
}

PostComent.displayName = 'Post.Coment'


export const Post = {
    Root: PostRoot,
    Header: PostHeader,
    Content: PostContent,
    Create: PostCreate,
    Coment: PostComent
}

 