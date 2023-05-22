import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

import 'katex/dist/katex.min.css';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vs} from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ReactMarkdownRender({markdownSource, ...pros})
{
    if (!markdownSource) {
        markdownSource = `Given a positive integer $n$, generate an $n * n$ matrix filled with elements from 1 to $n^2$ in spiral order.`
    }
    return (
        <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
            components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, '')}
                            style={vs}
                            language={match[1]}
                            PreTag="div"
                        />
                    ) : (
                        <code {...props} className={className}>
                            {children}
                        </code>
                    )
                }
            }}
        >{markdownSource}</ReactMarkdown>
    )
}