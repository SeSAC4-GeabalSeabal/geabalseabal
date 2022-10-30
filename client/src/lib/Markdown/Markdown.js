import React, { useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Markdown = React.memo(({ linkStopPropagation, ...props }) => {
  const handleLinkClick = useCallback((event) => {
    event.stopPropagation();
  }, []);
  const linkRenderer = useCallback(({ node, ...linkProps }) => <a {...linkProps} onClick={handleLinkClick} />, [handleLinkClick]);

  let renderers;
  if (linkStopPropagation) {
    renderers = {
      link: linkRenderer,
    };
  }
  return <SyntaxHighlighter language="javascript" style={docco} {...props} remarkPlugins={[remarkGfm]} components={renderers} />;
});

export default Markdown;
