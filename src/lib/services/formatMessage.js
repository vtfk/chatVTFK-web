import { marked } from 'marked'

export const formatedMessage = (message) => {
    const option = {
        pedantic: false,
        gfm: true,
        breaks: true,
        sanitize: false, //DO NOT SET THIS TO TRUE
        smartypants: false,
        xhtml: false
    }

    let formatedMessage = marked(message, option)
    return formatedMessage
}