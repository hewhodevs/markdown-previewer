import React from "react";
import styled from "styled-components";
import marked from "marked";
import DOMPurify from "dompurify";

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
`;

const PreviewContainer = styled.div`
  border: 1px solid #000000;
  width: 400px;
  height: 200px;
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
    this.onChangeInputText = this.onChangeInputText.bind(this);
  }

  componentDidMount() {
    // Append FreeCodeCamp tests to the DOM to see the test suite
    const script = document.createElement("script");
    script.src =
      "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    script.async = true;
    document.body.appendChild(script);
  }

  onChangeInputText(e) {
    // convert to markup string using marked
    const compiledMarkup = marked(e.target.value);
    // sanitize string using DOMPurify to prevent XSS attacks
    const sanitizedString = DOMPurify.sanitize(compiledMarkup);
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
          ></textarea>
        </TextAreaContainer>
        <TextAreaContainer>
          <StyledLabel>Markdown Preview</StyledLabel>
          <PreviewContainer
            className="preview"
            dangerouslySetInnerHTML={{ __html: this.state.markupPreview }}
          ></PreviewContainer>
        </TextAreaContainer>
      </MarkdownPreviewerContainer>
    );
  }
}

export default MarkdownPreviewer;
