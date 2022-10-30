import React, { useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
  return <ReactMarkdown {...props} remarkPlugins={[remarkGfm]} components={renderers} />;
});

export default Markdown;
