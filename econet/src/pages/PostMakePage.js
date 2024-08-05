import styled from "styled-components";
import LineInput from "../components/LineInput";
import { useState } from "react";
import Radio from "../components/Radio";

const Title = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #56d8bc;
  margin-top: 20px;
  border-bottom: 4px solid #56d8bc;
  padding-bottom: 20px;
`;

const StyledForm = styled.form`
  width: 700px;
  margin: 40px auto;
`;

const OneLineInput = styled(LineInput)`
  margin-bottom: 5px;

  & label {
    margin-left: 5px;
    font-weight: 600;
  }

  & span {
    margin-left: 5px;
    color: #ff0000;
  }

  & input {
    border: 1px solid #959595;
    height: 38px;
    padding: 0 13px;
  }
`;

const ShortInput = styled(LineInput)`
  width: 250px;
  margin-bottom: 5px;

  & label {
    margin-left: 5px;
    font-weight: 600;
  }

  & span {
    margin-left: 5px;
    color: #ff0000;
  }

  & input {
    border: 1px solid #959595;
    height: 38px;
    padding: 0 13px;
  }
`;

const Styledtextarea = styled.textarea`
  width: 700px;
  height: 100px;
  font-size: 15px;
  resize: none;
  border-radius: 5px;
  padding: 7px 13px;
`;

const RowFlexBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 40px;
`;

const RadiosContainer = styled.div`
  margin: 5px 0;

  & .radios {
    display: flex;
    gap: 20px;
  }

  & h3 {
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
  }

  & span {
    margin-left: 5px;
    color: #ff0000;
  }
`;

const StyledRadio = styled(Radio)`
  display: flex;
  align-items: center;

  & input {
    display: none;
    
  }

  & input:checked +label{
    background-color: #6bddc4;
  }

  & label {
    display: block;
    border-radius: 10px;
    background-color:#ffffff;
    text-align: center;
    padding:5px 10px;
    box-shadow: 1px 1px 2.5px 1px rgba(0, 0, 0, 0.2);
`;

const DescriptionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  margin: 30px auto;
  display: block;
  background-color: #6bddc4;
  color: #ffffff;
  font-weight: 600;
  border: 0;
  border-radius: 5px;
  padding: 7px 16px;

  &:disabled {
    background-color: #d5d5d5;
  }
`;

function PostMakePage() {
  const [clubInfo, setClubInfo] = useState({
    name: "",
    subject: "",
    chat_link: "",
    activity_scope: "online",
    status: "on",
    location: "",
    description: "",
  });

  const handleClubInfoChange = (e) => {
    const { name, value } = e.target;
    setClubInfo((clubInfo) => ({
      ...clubInfo,
      [name]: value,
    }));
    console.log(clubInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //서버로 전송
  };

  return (
    <>
      <Title>모임 게시판</Title>
      <StyledForm onSubmit={handleSubmit}>
        <OneLineInput
          type="text"
          content="모임 이름"
          value={clubInfo.name}
          name="name"
          onChange={handleClubInfoChange}
          required
        />
        <OneLineInput
          type="text"
          content="모임 주제"
          value={clubInfo.subject}
          name="subject"
          onChange={handleClubInfoChange}
          required
        />
        <OneLineInput
          type="url"
          content="모임 단톡방 링크"
          value={clubInfo.chat_link}
          name="chat_link"
          onChange={handleClubInfoChange}
        />
        <RowFlexBox>
          <RadiosContainer>
            <h3>
              활동 범위<span>*</span>
            </h3>
            <div className="radios">
              <StyledRadio
                name="activity_scope"
                value="online"
                title="온라인"
                checked={clubInfo.activity_scope == "online"}
                onChange={handleClubInfoChange}
              />
              <StyledRadio
                name="activity_scope"
                value="offline"
                title="오프라인"
                onChange={handleClubInfoChange}
              />
              <StyledRadio
                name="activity_scope"
                value="etc"
                title="기타"
                onChange={handleClubInfoChange}
              />
            </div>
          </RadiosContainer>
          <RadiosContainer>
            <h3>
              모집 현황<span>*</span>
            </h3>
            <div className="radios">
              <StyledRadio
                name="status"
                value="on"
                title="모집중"
                onChange={handleClubInfoChange}
                checked={clubInfo.status == "on"}
              />
              <StyledRadio
                name="status"
                value="off"
                title="모집마감"
                onChange={handleClubInfoChange}
              />
            </div>
          </RadiosContainer>
        </RowFlexBox>
        <ShortInput
          type="text"
          content="활동 지역"
          value={clubInfo.location}
          name="location"
          onChange={handleClubInfoChange}
        />
        <DescriptionTitle>모임 설명</DescriptionTitle>
        <Styledtextarea
          value={clubInfo.description}
          name="description"
          onChange={handleClubInfoChange}
        />
        <SubmitButton type="submit">모임 만들기</SubmitButton>
      </StyledForm>
    </>
  );
}

export default PostMakePage;
