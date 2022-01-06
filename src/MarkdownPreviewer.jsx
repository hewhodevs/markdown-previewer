import React from "react";
import styled from "styled-components";
import marked from "marked";
import DOMPurify from "dompurify";

// default markdown input displayed on page load
const defaultImage = 'https://code.visualstudio.com/assets/apple-touch-icon.png';
const defaultMarkdown = `
# Markdown Previewer

## Links
A link [Link to Google](https://www.google.com)

## Inline Code
Some inline \`code\` here \`npm install\` <br>

## Code Blocks
    <html>
      <head>
      </head>
    </html>

## List Items
1. item
2. item
3. item

## Blockquotes
> Dorothy followed her through many of the beautiful rooms in her castle.

## Images
![vscode](${defaultImage})

## Bold Text
Some **bold text** here
`;

// -----------------------------------
// Styled Components
// -----------------------------------

const MarkdownPreviewerContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const TextAreaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 400px;
  textarea {
    width: 100%;
  }
`;

const PreviewContainer = styled.div`
  width: 400px;
  height: 200px;
  border: 1px solid black;
  overflow-y: scroll;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  padding: 5px;
`;

// -----------------------------------
// React Components
// -----------------------------------

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markupPreview: ""
    };
    this.convertToMarkdown = this.convertToMarkdown.bind(this);
    this.onChangeInputText = this.onChangeInputText.bind(this);
  }

  componentDidMount() {
    // Append FreeCodeCamp tests to the DOM to see the test suite
    const script = document.createElement("script");
    script.src =
      "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    script.async = true;
    document.body.appendChild(script);
    // Set default text on load, and show it's corresponding markdown
    const editorText = document.getElementById('editor').value;
    this.convertToMarkdown(editorText);
  }

  onChangeInputText(e) {
    this.convertToMarkdown(e.target.value);
  }

  convertToMarkdown(str) {
    marked.setOptions({
      breaks: true,
    });
    // convert to markup string using marked lib method
    const compiledMarkup = marked(str);
    // sanitize the string using DOMPurify to prevent XSS attacks
    const sanitizedString = DOMPurify.sanitize(compiledMarkup);
    // update component state
    this.setState({
      markupPreview: sanitizedString
    });
  }

  render() {
    return (
      <MarkdownPreviewerContainer>
        <TextAreaContainer>
          <StyledLabel>Markdown Input</StyledLabel>
          <textarea
            name="editor"
            id="editor"
            cols="30"
            rows="10"
            onChange={this.onChangeInputText}
            defaultValue={defaultMarkdown}
          ></textarea>
        </TextAreaContainer>
        <TextAreaContainer>
          <StyledLabel>Markdown Preview</StyledLabel>
          <PreviewContainer
            id="preview"
            className="preview"
            dangerouslySetInnerHTML={{ __html: this.state.markupPreview }}
          ></PreviewContainer>
        </TextAreaContainer>
        <footer>
          <p>Created by <a href="https://github.com/hewhodevs">Joshua Kelly</a>. Code available on <a href="https://github.com/hewhodevs/markdown-previewer">GitHub.</a></p>
        </footer>
      </MarkdownPreviewerContainer>
    );
  }
}

export default MarkdownPreviewer;
