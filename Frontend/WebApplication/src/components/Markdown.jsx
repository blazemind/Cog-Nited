import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const MarkDown = ({ markdown }) => {
  return (
    <div>
      <article className="prose prose-a:text-blue-600 hover:prose-a:text-blue-500 xs:m-10 m-2 font-poppins xs:text-base text-xs ">
        <Markdown
          components={{
            code: ({ className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter language={match[1]} style={tomorrow}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {markdown}
        </Markdown>
      </article>
    </div>
  )
}

export default MarkDown