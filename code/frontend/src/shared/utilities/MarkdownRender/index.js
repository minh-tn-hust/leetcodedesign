import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'

import 'katex/dist/katex.min.css'

export default function ReactMarkdownRender({markdownSource, ...pros})
{
    if (!markdownSource) {
        markdownSource = `Given a positive integer $n$, generate an $n * n$ matrix filled with elements from 1 to $n^2$ in spiral order.`
    }
    return (
        <ReactMarkdown
            remarkPlugins={[remarkMath, [remarkGfm, {singleTilde: false}]]}
            rehypePlugins={[rehypeKatex]}
        >{markdownSource}</ReactMarkdown>
    )
}