import React from "react";
import styled from "styled-components";
import marked from "marked";

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
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  padding: 5px;
`;

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
    }
    this.onChangeInputText = this.onChangeInputText.bind(this);
  }
  onChangeInputText(e) {
    let compiledHTMLString = marked(e.target.value);
    this.setState({
      inputText: compiledHTMLString,
    });
  }
  render() {
    return(
      <MarkdownPreviewerContainer>
        <TextAreaContainer>
          <StyledLabel>Markdown Input</StyledLabel>
          <textarea name="editor" id="editor" cols="30" rows="10" onChange={this.onChangeInputText}></textarea>
        </TextAreaContainer>
        <TextAreaContainer>
          <StyledLabel>Markdown Preview</StyledLabel>
          <textarea name="preview" id="preview" cols="30" rows="10" defaultValue={this.state.inputText} readOnly></textarea>
        </TextAreaContainer>
      </MarkdownPreviewerContainer>
    );
  }
}

export default MarkdownPreviewer;