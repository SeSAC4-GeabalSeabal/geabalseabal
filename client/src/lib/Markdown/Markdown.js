import React, { useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";

const Markdown = React.memo(({ linkStopPropagation, ...props }) => {
  return (
    <ReactMarkdown
      {...props}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              // PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              <SyntaxHighlighter>{children}</SyntaxHighlighter>
            </code>
          );
        },
      }}
    />
  );
});

export default Markdown;
