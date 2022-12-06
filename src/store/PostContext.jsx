import { useState } from 'react'
import { createContext } from 'react'

export const PostContext = createContext(null)


function Post({ children }) {
    const [PostDetails, setPostDetails] = useState()
    return (
        <PostContext.Provider>
        { children }
        </PostContext.Provider >
    )
}

export default Post