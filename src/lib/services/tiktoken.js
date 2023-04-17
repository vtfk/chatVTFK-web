import assert from 'node:assert'
import { get_encoding, encoding_for_model } from '@dqbd/tiktoken'

export const token = (string) => {
    // encodings that is valid found in this link https://github.com/dqbd/tiktoken/blob/main/tiktoken/model_to_encoding.json
    const enc = get_encoding("cl100k_base")
    const test = new TextDecoder().decode(enc.decode(enc.encode(string)))
 
    return test
} 
