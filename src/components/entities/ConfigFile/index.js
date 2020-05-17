import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ConfigFile = props => {
  const [copied, setCopied] = useState(false);

  const copySnippet = () => {
    const target = document.getElementById('config-file-content');

    if (document.createRange) {
      let range = document.createRange();
      let select = window.getSelection();
      range.selectNode(target);
      select.removeAllRanges();
      select.addRange(range);
      document.execCommand('copy');
      select.removeAllRanges();
    } else {
      let range = document.body.createTextRange();
      range.moveToElementText(target);
      range.select();
      document.execCommand('copy');
    }

    return setCopied(true);
  };
  return (
    <div>
      <pre id="config-file-content">{props.content}</pre>
      {document.queryCommandSupported('copy') && (
        <div>
          <Button onClick={copySnippet} variant="info">
            Copy snippet
          </Button>{' '}
          {copied && <p>Content copied!</p>}
        </div>
      )}
    </div>
  );
};

export default ConfigFile;
