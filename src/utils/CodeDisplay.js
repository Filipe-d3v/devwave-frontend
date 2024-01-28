import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeDisplay = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={vs}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeDisplay;